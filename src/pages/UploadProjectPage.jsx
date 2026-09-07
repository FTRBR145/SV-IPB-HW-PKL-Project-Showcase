import React from 'react';
import { ArrowLeft, FileVideo2, Info, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ProjectForm from '../components/projects/ProjectForm';
import StudentSidebar from '../components/student/StudentSidebar';
import useApp from '../hooks/useApp';

export default function UploadProjectPage() {
  const navigate = useNavigate();
  const { projects, submissions, currentUser, isLoggedIn, logout, adminSettings, courses } = useApp();
  const myPublishedCount = projects.filter((project) => project.nim === currentUser?.nim).length;
  const myPendingCount = (submissions || []).filter(
    (submission) => submission.status === 'pending' && submission.nim === currentUser?.nim
  ).length;
  const projectCount = myPublishedCount + myPendingCount;

  return (
    <div className="app-canvas flex h-screen h-dvh flex-col overflow-hidden pb-[calc(5rem+env(safe-area-inset-bottom))] font-sans md:pb-0">
      <Navbar
        courses={courses}
        currentPage="student-upload"
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onNavigateToAdmin={currentUser.role === 'admin' ? () => navigate('/admin') : undefined}
        onBackToLanding={() => navigate('/')}
      />

      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="flex min-h-[calc(100dvh-4rem)] items-stretch sm:min-h-[calc(100dvh-5rem)]">
          <StudentSidebar
            courses={courses}
            activeItem="upload"
            projectCount={projectCount}
            onSelectHome={() => navigate('/student')}
            onNavigateUpload={() => {}}
            onSelectMyProjects={() => navigate('/student?tab=my-projects')}
            onSelectCourse={(course) => navigate(`/student?course=${encodeURIComponent(course)}`)}
            onNavigateAdmin={() => navigate('/admin')}
            showAdmin={currentUser.role === 'admin'}
          />

          <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
            <button
              type="button"
              onClick={() => navigate('/student')}
              className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-bold text-slate-600 hover:text-slate-900 md:hidden"
            >
              <ArrowLeft size={17} /> Kembali ke Beranda
            </button>

            <div className="mb-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-3">
                <Upload size={14} /> Portal Mahasiswa
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                Upload Projek Baru
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                Lengkapi informasi karya, tautkan video YouTube, lalu kirim agar projek tampil di showcase TRK.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px] gap-6 items-start">
              <section className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 sm:p-8">
                {adminSettings.maintenanceMode && currentUser.role === 'student' ? (
                  <div className="py-12 text-center">
                    <h2 className="font-heading text-xl font-bold text-slate-900">Upload sedang ditutup sementara</h2>
                    <p className="text-sm text-slate-500 mt-2">Admin sedang melakukan pemeliharaan sistem. Silakan coba kembali nanti.</p>
                    <button onClick={() => navigate('/student')} className="mt-5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold">Kembali ke Beranda</button>
                  </div>
                ) : (
                  <ProjectForm
                    lockIdentity
                    submitLabel={adminSettings.moderationRequired ? 'Kirim untuk Ditinjau' : 'Simpan dan Publikasikan'}
                    onCancel={() => navigate('/student')}
                    onSuccess={() => navigate('/student?tab=my-projects', { replace: true })}
                  />
                )}
              </section>

              <aside className="space-y-4">
                <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
                  <FileVideo2 size={24} className="text-sky-400 mb-3" />
                  <h2 className="font-heading font-bold text-sm">Sebelum mengunggah</h2>
                  <ul className="mt-3 space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-4">
                    <li>Pastikan video YouTube dapat diakses.</li>
                    <li>Gunakan judul projek yang jelas dan spesifik.</li>
                    <li>Tuliskan teknologi utama yang digunakan.</li>
                  </ul>
                </div>

                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex gap-3">
                  <Info size={18} className="text-sky-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-sky-800 leading-relaxed">
                    Nama dan NIM diambil otomatis dari akun mahasiswa yang sedang masuk.
                  </p>
                </div>
              </aside>
            </div>
          </div>
          </main>
        </div>
      </div>

    </div>
  );
}
