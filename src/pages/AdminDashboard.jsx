import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import EditProjectModal from '../components/admin/EditProjectModal';
import {
  ModeratorsPanel,
  ProjectsPanel,
  StudentsPanel,
  TaxonomyPanel,
  TechStackPanel
} from '../components/admin/ManagementPanels';
import {
  ActivityLogsPanel,
  ReportsPanel,
  SettingsPanel
} from '../components/admin/InsightsPanels';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import UploadModal from '../components/modals/UploadModal';
import { ADMIN_MENU } from '../data/adminNavigation';
import useApp from '../hooks/useApp';

const menuDescriptions = {
  dashboard: ['Dashboard Admin', 'Pantau kondisi showcase dan proses moderasi secara real-time.'],
  projects: ['Manajemen Projek', 'Kelola seluruh projek mahasiswa yang tampil di showcase.'],
  moderators: ['Manajemen Moderator', 'Atur dosen dan admin yang memiliki akses moderasi.'],
  students: ['Data Mahasiswa', 'Lihat mahasiswa berdasarkan projek dan pengajuan yang tersimpan.'],
  courses: ['Manajemen Mata Kuliah', 'Tambah dan kelola daftar mata kuliah TRK.'],
  categories: ['Manajemen Kategori', 'Kelola kategori yang digunakan untuk mengelompokkan projek.'],
  techstack: ['Tech Stack', 'Pantau teknologi yang paling sering digunakan mahasiswa.'],
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
    categories,
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
    addCategory,
    deleteCategory,
    updateAdminSettings,
    clearActivityLogs,
    resetToDefaultData
  } = useApp();

  const requestedSection = searchParams.get('section');
  const initialMenu = ADMIN_MENU.some((item) => item.id === requestedSection) ? requestedSection : 'dashboard';
  const [activeMenu, setActiveMenu] = useState(initialMenu);
  const [projectSearch, setProjectSearch] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const students = useMemo(() => {
    const studentMap = new Map();
    [...projects, ...submissions].forEach((item) => {
      if (!item.nim) return;
      const existing = studentMap.get(item.nim) || {
        nim: item.nim,
        name: item.student,
        semester: item.semester,
        projectCount: 0
      };
      if (projects.some((project) => project.id === item.id && project.nim === item.nim)) {
        existing.projectCount += 1;
      }
      existing.semester = existing.semester || item.semester;
      studentMap.set(item.nim, existing);
    });
    return [...studentMap.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [projects, submissions]);

  const pendingCount = submissions.filter((submission) => submission.status === 'pending').length;
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
            onView={(project) => navigate(`/project/${project.id}`)}
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
      case 'categories':
        return (
          <TaxonomyPanel
            title="Kategori"
            description="Kategori membantu admin mengelompokkan jenis karya mahasiswa."
            items={categories}
            getCount={(category) => projects.filter((project) => project.category === category).length + submissions.filter((submission) => submission.category === category).length}
            onAdd={addCategory}
            onDelete={deleteCategory}
          />
        );
      case 'techstack':
        return <TechStackPanel projects={projects} onFilterProjects={(tech) => { setProjectSearch(tech); selectMenu('projects'); }} />;
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
            onReset={() => window.confirm('Reset seluruh data demo? Tindakan ini mengganti data lokal saat ini.') && resetToDefaultData()}
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
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <Navbar
        currentPage="admin"
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onOpenUpload={() => setIsUploadOpen(true)}
        onLogout={() => { logout(); navigate('/'); }}
        onNavigateToStudent={() => navigate('/student')}
        onBackToLanding={() => navigate('/')}
      />

      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar activeMenu={activeMenu} onSelectMenu={selectMenu} pendingCount={pendingCount} onBack={() => navigate('/')} />

        <main className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1500px] mx-auto space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{pageTitle}</h1>
                <p className="text-xs text-slate-500 mt-1">{pageDescription}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={activeMenu}
                  onChange={(event) => selectMenu(event.target.value)}
                  className="md:hidden flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold"
                  aria-label="Pilih menu admin"
                >
                  {ADMIN_MENU.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
                <button onClick={() => setIsUploadOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-sm whitespace-nowrap">
                  <Plus size={15} /> Tambah Projek
                </button>
              </div>
            </div>

            {adminSettings.maintenanceMode && (
              <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                Mode pemeliharaan sedang aktif. Pengaturan ini tersimpan pada dashboard.
              </div>
            )}

            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      {editingProject && <EditProjectModal key={editingProject.id} project={editingProject} onClose={() => setEditingProject(null)} />}
    </div>
  );
}
