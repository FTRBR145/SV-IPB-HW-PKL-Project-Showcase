import React, { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import EditProjectModal from '../components/admin/EditProjectModal';
import {
  ModeratorsPanel,
  ProjectsPanel,
  StudentsPanel,
  TaxonomyPanel
} from '../components/admin/ManagementPanels';
import {
  ActivityLogsPanel,
  ReportsPanel,
  SettingsPanel
} from '../components/admin/InsightsPanels';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProjectDetailModal from '../components/modals/ProjectDetailModal';
import UploadModal from '../components/modals/UploadModal';
import { ADMIN_MENU } from '../data/adminNavigation';
import useApp from '../hooks/useApp';
import { buildStudentSummaries } from '../utils/dataIntegrity';

const menuDescriptions = {
  dashboard: ['Dashboard Admin', 'Pantau kondisi showcase dan proses moderasi secara real-time.'],
  projects: ['Manajemen Projek', 'Kelola seluruh projek mahasiswa yang tampil di showcase.'],
  moderators: ['Manajemen Moderator', 'Atur dosen dan admin yang memiliki akses moderasi.'],
  students: ['Data Mahasiswa', 'Lihat mahasiswa berdasarkan projek dan pengajuan yang tersimpan.'],
  courses: ['Manajemen Mata Kuliah', 'Tambah dan kelola daftar mata kuliah TRK.'],
  reports: ['Laporan', 'Unduh data atau cetak ringkasan operasional showcase.'],
  settings: ['Pengaturan Sistem', 'Atur kebijakan upload, moderasi, dan informasi platform.'],
  logs: ['Log Aktivitas', 'Tinjau jejak perubahan yang dilakukan pada dashboard.']
};

function escapeCsv(value) {
  const stringValue = value == null ? '' : Array.isArray(value) ? value.join(', ') : String(value);
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function downloadCsv(filename, rows) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const content = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(','))
  ].join('\n');
  const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    projects,
    currentUser,
    isLoggedIn,
    logout,
    submissions,
    courses,
    moderators,
    adminSettings,
    activityLogs,
    approveSubmission,
    rejectSubmission,
    restoreSubmission,
    deleteProject,
    addModerator,
    toggleModerator,
    deleteModerator,
    addCourse,
    deleteCourse,
    updateAdminSettings,
    clearActivityLogs,
    resetToDefaultData
  } = useApp();

  const requestedSection = searchParams.get('section');
  const initialMenu = ADMIN_MENU.some((item) => item.id === requestedSection) ? requestedSection : 'dashboard';
  const [activeMenu, setActiveMenu] = useState(initialMenu);
  const [projectSearch, setProjectSearch] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const students = useMemo(() => {
    return buildStudentSummaries(projects, submissions);
  }, [projects, submissions]);

  useEffect(() => {
    if (requestedSection && !ADMIN_MENU.some((item) => item.id === requestedSection)) {
      setSearchParams({}, { replace: true });
    }
  }, [requestedSection, setSearchParams]);

  const [pageTitle, pageDescription] = menuDescriptions[activeMenu];

  const selectMenu = (menuId) => {
    setActiveMenu(menuId);
    setSearchParams(menuId === 'dashboard' ? {} : { section: menuId }, { replace: true });
  };

  const viewStudentProjects = (nim) => {
    setProjectSearch(nim);
    selectMenu('projects');
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'projects':
        return (
          <ProjectsPanel
            projects={projects}
            searchQuery={projectSearch}
            onSearchChange={setProjectSearch}
            onEdit={setEditingProject}
            onDelete={deleteProject}
            onView={setPreviewProject}
          />
        );
      case 'moderators':
        return <ModeratorsPanel moderators={moderators} onAdd={addModerator} onToggle={toggleModerator} onDelete={deleteModerator} />;
      case 'students':
        return <StudentsPanel students={students} onViewProjects={viewStudentProjects} />;
      case 'courses':
        return (
          <TaxonomyPanel
            title="Mata Kuliah"
            description="Mata kuliah yang tersedia pada form upload projek. Item yang masih dipakai tidak dapat dihapus."
            items={courses}
            getCount={(course) => projects.filter((project) => project.course === course).length + submissions.filter((submission) => submission.course === course).length}
            onAdd={addCourse}
            onDelete={deleteCourse}
          />
        );
      case 'reports':
        return (
          <ReportsPanel
            projects={projects}
            submissions={submissions}
            students={students}
            logs={activityLogs}
            onExportProjects={() => downloadCsv('projek-trk.csv', projects.map(({ comments, ...project }) => ({ ...project, techStack: project.techStack, comments: comments?.length || 0 })))}
            onExportSubmissions={() => downloadCsv('moderasi-trk.csv', submissions)}
            onExportLogs={() => downloadCsv('log-aktivitas-trk.csv', activityLogs)}
          />
        );
      case 'settings':
        return (
          <SettingsPanel
            settings={adminSettings}
            onSave={updateAdminSettings}
            onReset={() => window.confirm('Reset seluruh data demo backend? Tindakan ini mengganti data sistem saat ini.') && resetToDefaultData()}
          />
        );
      case 'logs':
        return <ActivityLogsPanel logs={activityLogs} onClear={clearActivityLogs} />;
      default:
        return (
          <DashboardOverview
            projects={projects}
            submissions={submissions}
            students={students}
            onApprove={approveSubmission}
            onReject={rejectSubmission}
            onRestore={restoreSubmission}
          />
        );
    }
  };

  return (
    <div className="app-workspace flex h-screen h-dvh flex-col overflow-hidden pb-[calc(5rem+env(safe-area-inset-bottom))] font-sans md:pb-0">
      <Navbar
        courses={courses}
        currentPage="admin"
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onOpenUpload={() => setIsUploadOpen(true)}
        onLogout={logout}
        onNavigateToStudent={() => navigate('/student')}
        onBackToLanding={() => navigate('/')}
      />

      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="flex min-h-[calc(100dvh-4rem)] items-stretch sm:min-h-[calc(100dvh-5rem)]">
          <AdminSidebar activeMenu={activeMenu} onSelectMenu={selectMenu} onBack={() => navigate('/')} />

          <main id="main-content" className="app-workspace min-w-0 flex-1 overflow-x-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mx-auto min-w-0 max-w-[1500px] space-y-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div>
                    <h1 className="font-heading text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{pageTitle}</h1>
                    <p className="mt-1 text-xs text-slate-600">{pageDescription}</p>
                  </div>
                  {activeMenu === 'projects' && (
                    <button type="button" onClick={() => setIsUploadOpen(true)} className="action-strong inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm whitespace-nowrap">
                      <Plus size={15} /> Tambah Projek
                    </button>
                  )}
                </div>

                {adminSettings.maintenanceMode && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
                    Mode pemeliharaan sedang aktif. Pengaturan ini tersimpan pada dashboard.
                  </div>
                )}

                {renderContent()}
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      {previewProject && (
        <ProjectDetailModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}
      {editingProject && <EditProjectModal key={editingProject.id} project={editingProject} onClose={() => setEditingProject(null)} />}
    </div>
  );
}
