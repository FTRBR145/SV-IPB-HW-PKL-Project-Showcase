import React, { useEffect, useState } from 'react';
import {
  DEFAULT_ADMIN_SETTINGS,
  DEFAULT_CATEGORIES,
  DEFAULT_MODERATORS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_SUBMISSIONS
} from '../data/adminData';
import { initialProjects, SV_COURSES } from '../data/projectsData';
import { DEFAULT_ADMIN_USER, DEFAULT_STUDENT_USER } from '../data/users';
import AppContext from './AppContextStore';

const STORAGE_KEYS = {
  PROJECTS: 'trk_showcase_projects',
  USER: 'trk_showcase_user',
  SUBMISSIONS: 'trk_showcase_submissions',
  LIKES: 'trk_showcase_likes',
  COURSES: 'trk_showcase_courses',
  CATEGORIES: 'trk_showcase_categories',
  MODERATORS: 'trk_showcase_moderators',
  SETTINGS: 'trk_showcase_admin_settings',
  ACTIVITY_LOGS: 'trk_showcase_activity_logs'
};

const DEFAULT_COURSES = SV_COURSES.filter((course) => course !== 'Semua Mata Kuliah');

function readStoredValue(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
    return fallback;
  }
}

function formatTimestamp() {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date());
}

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = readStoredValue(STORAGE_KEYS.PROJECTS, initialProjects);
    return Array.isArray(saved) ? saved : initialProjects;
  });
  const [currentUser, setCurrentUser] = useState(() => readStoredValue(STORAGE_KEYS.USER, null));
  const [submissions, setSubmissions] = useState(() => {
    const saved = readStoredValue(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
    return Array.isArray(saved) ? saved : INITIAL_SUBMISSIONS;
  });
  const [likedProjectIds, setLikedProjectIds] = useState(() =>
    readStoredValue(STORAGE_KEYS.LIKES, [])
  );
  const [courses, setCourses] = useState(() => readStoredValue(STORAGE_KEYS.COURSES, DEFAULT_COURSES));
  const [categories, setCategories] = useState(() =>
    readStoredValue(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
  );
  const [moderators, setModerators] = useState(() =>
    readStoredValue(STORAGE_KEYS.MODERATORS, DEFAULT_MODERATORS)
  );
  const [adminSettings, setAdminSettings] = useState(() => ({
    ...DEFAULT_ADMIN_SETTINGS,
    ...readStoredValue(STORAGE_KEYS.SETTINGS, {})
  }));
  const [activityLogs, setActivityLogs] = useState(() =>
    readStoredValue(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS)
  );
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions)), [submissions]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likedProjectIds)), [likedProjectIds]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.MODERATORS, JSON.stringify(moderators)), [moderators]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(adminSettings)), [adminSettings]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(activityLogs)), [activityLogs]);
  useEffect(() => {
    document.title = adminSettings.siteName;
  }, [adminSettings.siteName]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    window.setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3500);
  };

  const recordActivity = (message, type = 'info') => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      message,
      actor: currentUser?.name || 'Sistem',
      timestamp: formatTimestamp()
    };
    setActivityLogs((previous) => [entry, ...previous].slice(0, 100));
  };

  const loginAsStudent = () => {
    setCurrentUser(DEFAULT_STUDENT_USER);
    showToast(`Selamat datang, ${DEFAULT_STUDENT_USER.name}!`);
  };

  const loginAsAdmin = () => {
    setCurrentUser(DEFAULT_ADMIN_USER);
    showToast('Masuk sebagai Administrator TRK');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Anda telah berhasil keluar.', 'info');
  };

  const addProject = (projectData) => {
    const authorName = currentUser?.role === 'student'
      ? currentUser.name
      : projectData.student || currentUser?.name || 'Mahasiswa TRK';
    const authorNim = currentUser?.role === 'student'
      ? currentUser.nim
      : projectData.nim || currentUser?.nim || '-';

    if (adminSettings.moderationRequired && currentUser?.role === 'student') {
      const newSubmission = {
        ...projectData,
        id: submissions.length > 0 ? Math.max(...submissions.map((item) => Number(item.id))) + 1 : 1,
        student: authorName,
        nim: authorNim,
        desc: projectData.description,
        status: 'pending',
        date: projectData.date || 'Hari ini'
      };
      setSubmissions((previous) => [newSubmission, ...previous]);
      recordActivity(`Pengajuan baru diterima dari ${authorName}.`, 'submission');
      showToast('Projek dikirim dan menunggu persetujuan admin.', 'info');
      return newSubmission;
    }

    const newProject = {
      ...projectData,
      id: projects.length > 0 ? Math.max(...projects.map((project) => Number(project.id))) + 1 : 1,
      student: authorName,
      nim: authorNim,
      prodi: 'Teknik Komputer / Teknologi Rekayasa Komputer',
      prodiCode: 'TRK',
      likes: Number(projectData.likes) || 0,
      views: Number(projectData.views) || 1,
      date: projectData.date || 'Hari ini',
      year: projectData.year || adminSettings.academicYear,
      comments: projectData.comments || []
    };
    setProjects((previous) => [newProject, ...previous]);
    recordActivity(`Projek “${newProject.title}” dipublikasikan.`, 'project');
    showToast('Video projek berhasil disimpan dan dipublikasikan!');
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    const target = projects.find((project) => project.id === projectId);
    if (!target) return false;
    setProjects((previous) =>
      previous.map((project) => (project.id === projectId ? { ...project, ...updates } : project))
    );
    recordActivity(`Projek “${target.title}” diperbarui.`, 'project');
    showToast('Perubahan projek berhasil disimpan.');
    return true;
  };

  const deleteProject = (projectId) => {
    const target = projects.find((project) => project.id === projectId);
    if (!target) return false;
    setProjects((previous) => previous.filter((project) => project.id !== projectId));
    setLikedProjectIds((previous) => previous.filter((id) => id !== projectId));
    recordActivity(`Projek “${target.title}” dihapus.`, 'danger');
    showToast('Projek berhasil dihapus.', 'info');
    return true;
  };

  const toggleLike = (projectId) => {
    const isLiked = likedProjectIds.includes(projectId);
    setLikedProjectIds((previous) =>
      isLiked ? previous.filter((id) => id !== projectId) : [...previous, projectId]
    );
    setProjects((previous) => previous.map((project) => {
      if (project.id !== projectId) return project;
      return { ...project, likes: Math.max(0, (project.likes || 0) + (isLiked ? -1 : 1)) };
    }));
    if (!isLiked) showToast('Menyukai projek ini!');
  };

  const approveSubmission = (submissionId) => {
    const target = submissions.find((submission) => submission.id === submissionId);
    if (!target || target.status !== 'pending') return false;

    const approvedProject = {
      id: projects.length > 0 ? Math.max(...projects.map((project) => Number(project.id))) + 1 : 1,
      title: target.title,
      student: target.student,
      nim: target.nim,
      prodi: 'Teknik Komputer / Teknologi Rekayasa Komputer',
      prodiCode: 'TRK',
      course: target.course,
      category: target.category || categories[0],
      semester: target.semester || 4,
      techStack: target.techStack || ['ESP32', 'Sensor', 'IoT'],
      videoUrl: target.videoUrl || 'https://www.youtube.com/embed/9KxU30uM3qM',
      thumbnail: target.thumbnail,
      likes: 0,
      views: 1,
      supervisor: target.supervisor || 'Dosen Pembimbing TRK',
      year: target.year || adminSettings.academicYear,
      date: target.date || 'Hari ini',
      description: target.description || target.desc,
      comments: []
    };

    setProjects((previous) => [approvedProject, ...previous]);
    setSubmissions((previous) => previous.map((submission) =>
      submission.id === submissionId
        ? { ...submission, status: 'approved', moderatedAt: formatTimestamp() }
        : submission
    ));
    recordActivity(`Pengajuan ${target.student} disetujui dan dipublikasikan.`, 'success');
    showToast(`Projek dari ${target.student} berhasil disetujui dan dipublikasikan!`);
    return true;
  };

  const rejectSubmission = (submissionId) => {
    const target = submissions.find((submission) => submission.id === submissionId);
    if (!target || target.status !== 'pending') return false;
    setSubmissions((previous) => previous.map((submission) =>
      submission.id === submissionId
        ? { ...submission, status: 'rejected', moderatedAt: formatTimestamp() }
        : submission
    ));
    recordActivity(`Pengajuan ${target.student} ditolak.`, 'danger');
    showToast('Pengajuan projek telah ditolak.', 'info');
    return true;
  };

  const restoreSubmission = (submissionId) => {
    const target = submissions.find((submission) => submission.id === submissionId);
    if (!target) return false;
    setSubmissions((previous) => previous.map((submission) =>
      submission.id === submissionId
        ? { ...submission, status: 'pending', moderatedAt: null }
        : submission
    ));
    recordActivity(`Pengajuan ${target.student} dikembalikan ke antrean moderasi.`, 'submission');
    showToast('Pengajuan dikembalikan ke status menunggu.', 'info');
    return true;
  };

  const addModerator = (moderatorData) => {
    const email = moderatorData.email.trim().toLowerCase();
    if (moderators.some((moderator) => moderator.email.toLowerCase() === email)) {
      showToast('Email moderator sudah terdaftar.', 'error');
      return false;
    }
    const moderator = {
      name: moderatorData.name.trim(),
      nip: moderatorData.nip.trim(),
      email,
      id: moderators.length > 0 ? Math.max(...moderators.map((item) => Number(item.id))) + 1 : 1,
      status: 'active'
    };
    setModerators((previous) => [...previous, moderator]);
    recordActivity(`Moderator ${moderator.name} ditambahkan.`, 'user');
    showToast('Moderator berhasil ditambahkan.');
    return moderator;
  };

  const toggleModerator = (moderatorId) => {
    const target = moderators.find((moderator) => moderator.id === moderatorId);
    const activeCount = moderators.filter((moderator) => moderator.status === 'active').length;
    if (target?.status === 'active' && activeCount <= 1) {
      showToast('Minimal satu moderator harus tetap aktif.', 'error');
      return false;
    }
    setModerators((previous) => previous.map((moderator) =>
      moderator.id === moderatorId
        ? { ...moderator, status: moderator.status === 'active' ? 'inactive' : 'active' }
        : moderator
    ));
    recordActivity('Status moderator diperbarui.', 'user');
    showToast('Status moderator berhasil diperbarui.', 'info');
    return true;
  };

  const deleteModerator = (moderatorId) => {
    const target = moderators.find((moderator) => moderator.id === moderatorId);
    if (!target || moderators.length <= 1) {
      showToast('Minimal satu moderator harus tetap aktif.', 'error');
      return false;
    }
    setModerators((previous) => previous.filter((moderator) => moderator.id !== moderatorId));
    recordActivity(`Moderator ${target.name} dihapus.`, 'danger');
    showToast('Moderator berhasil dihapus.', 'info');
    return true;
  };

  const addCourse = (courseName) => {
    const normalized = courseName.trim().toUpperCase();
    if (!normalized || courses.includes(normalized)) {
      showToast('Nama mata kuliah kosong atau sudah tersedia.', 'error');
      return false;
    }
    setCourses((previous) => [...previous, normalized]);
    recordActivity(`Mata kuliah “${normalized}” ditambahkan.`, 'taxonomy');
    showToast('Mata kuliah berhasil ditambahkan.');
    return true;
  };

  const deleteCourse = (courseName) => {
    const inUse = projects.some((project) => project.course === courseName) ||
      submissions.some((submission) => submission.course === courseName);
    if (inUse) {
      showToast('Mata kuliah masih digunakan oleh projek atau pengajuan.', 'error');
      return false;
    }
    setCourses((previous) => previous.filter((course) => course !== courseName));
    recordActivity(`Mata kuliah “${courseName}” dihapus.`, 'taxonomy');
    showToast('Mata kuliah berhasil dihapus.', 'info');
    return true;
  };

  const addCategory = (categoryName) => {
    const normalized = categoryName.trim();
    if (!normalized || categories.some((category) => category.toLowerCase() === normalized.toLowerCase())) {
      showToast('Nama kategori kosong atau sudah tersedia.', 'error');
      return false;
    }
    setCategories((previous) => [...previous, normalized]);
    recordActivity(`Kategori “${normalized}” ditambahkan.`, 'taxonomy');
    showToast('Kategori berhasil ditambahkan.');
    return true;
  };

  const deleteCategory = (categoryName) => {
    const inUse = projects.some((project) => project.category === categoryName) ||
      submissions.some((submission) => submission.category === categoryName);
    if (inUse) {
      showToast('Kategori masih digunakan oleh projek atau pengajuan.', 'error');
      return false;
    }
    setCategories((previous) => previous.filter((category) => category !== categoryName));
    recordActivity(`Kategori “${categoryName}” dihapus.`, 'taxonomy');
    showToast('Kategori berhasil dihapus.', 'info');
    return true;
  };

  const updateAdminSettings = (updates) => {
    setAdminSettings((previous) => ({ ...previous, ...updates }));
    recordActivity('Pengaturan dashboard diperbarui.', 'settings');
    showToast('Pengaturan berhasil disimpan.');
  };

  const clearActivityLogs = () => {
    setActivityLogs([]);
    showToast('Log aktivitas dibersihkan.', 'info');
  };

  const resetToDefaultData = () => {
    setProjects(initialProjects);
    setSubmissions(INITIAL_SUBMISSIONS);
    setCourses(DEFAULT_COURSES);
    setCategories(DEFAULT_CATEGORIES);
    setModerators(DEFAULT_MODERATORS);
    setAdminSettings(DEFAULT_ADMIN_SETTINGS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setLikedProjectIds([]);
    showToast('Seluruh data demo berhasil direset.', 'info');
  };

  return (
    <AppContext.Provider value={{
      projects,
      setProjects,
      currentUser,
      setCurrentUser,
      isLoggedIn: Boolean(currentUser),
      submissions,
      likedProjectIds,
      courses,
      categories,
      moderators,
      adminSettings,
      activityLogs,
      toast,
      isLoading,
      setIsLoading,
      showToast,
      loginAsStudent,
      loginAsAdmin,
      logout,
      addProject,
      updateProject,
      deleteProject,
      toggleLike,
      approveSubmission,
      rejectSubmission,
      restoreSubmission,
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
    }}>
      {children}
    </AppContext.Provider>
  );
}
