import { createSeedData } from '../data/seed.js';

function clone(value) {
  return structuredClone(value);
}

function nextId(items) {
  return items.reduce((highest, item) => Math.max(highest, Number(item.id) || 0), 0) + 1;
}

function includesText(value, query) {
  return String(value || '').toLocaleLowerCase('id-ID').includes(query);
}

export function createMemoryRepository(initialData = createSeedData()) {
  let state = clone(initialData);

  const recordActivity = (message, type = 'info', actor = 'Sistem') => {
    const entry = {
      id: nextId(state.activityLogs),
      type,
      message,
      actor,
      timestamp: new Date().toISOString()
    };
    state.activityLogs.unshift(entry);
    state.activityLogs = state.activityLogs.slice(0, 200);
    return clone(entry);
  };

  return {
    reset() {
      state = clone(initialData);
    },

    findUserByEmail(email) {
      return state.users.find((user) => user.email === email.toLowerCase()) || null;
    },

    findUserByIdentifier(identifier) {
      const normalized = identifier.trim().toLowerCase();
      return state.users.find((user) =>
        user.email.toLowerCase() === normalized || String(user.nim || '').toLowerCase() === normalized
      ) || null;
    },

    findUserById(id) {
      return state.users.find((user) => user.id === Number(id)) || null;
    },

    listProjects({ search = '', course, semester, nim, page = 1, limit = 12 } = {}) {
      const query = search.trim().toLocaleLowerCase('id-ID');
      const filtered = state.projects.filter((project) => {
        if (course && project.course !== course) return false;
        if (semester && String(project.semester) !== String(semester)) return false;
        if (nim && project.nim !== nim) return false;
        if (!query) return true;
        return [project.title, project.student, project.nim, project.course, ...(project.techStack || [])]
          .some((value) => includesText(value, query));
      });
      const safePage = Math.max(1, Number(page) || 1);
      const safeLimit = Math.min(100, Math.max(1, Number(limit) || 12));
      const start = (safePage - 1) * safeLimit;
      return {
        items: clone(filtered.slice(start, start + safeLimit)),
        total: filtered.length,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.max(1, Math.ceil(filtered.length / safeLimit))
      };
    },

    findProjectById(id) {
      const project = state.projects.find((item) => item.id === Number(id));
      return project ? clone(project) : null;
    },

    createProject(data, actor = 'Sistem') {
      const timestamp = new Date().toISOString();
      const project = {
        ...clone(data),
        id: nextId(state.projects),
        comments: data.comments || [],
        createdAt: timestamp,
        updatedAt: timestamp
      };
      state.projects.unshift(project);
      recordActivity(`Projek “${project.title}” dipublikasikan.`, 'project', actor);
      return clone(project);
    },

    updateProject(id, updates, actor) {
      const index = state.projects.findIndex((item) => item.id === Number(id));
      if (index < 0) return null;
      state.projects[index] = {
        ...state.projects[index],
        ...clone(updates),
        id: state.projects[index].id,
        updatedAt: new Date().toISOString()
      };
      recordActivity(`Projek “${state.projects[index].title}” diperbarui.`, 'project', actor);
      return clone(state.projects[index]);
    },

    deleteProject(id, actor) {
      const index = state.projects.findIndex((item) => item.id === Number(id));
      if (index < 0) return null;
      const [removed] = state.projects.splice(index, 1);
      recordActivity(`Projek “${removed.title}” dihapus.`, 'danger', actor);
      return clone(removed);
    },

    createSubmission(data, actor) {
      const submission = {
        ...clone(data),
        id: nextId(state.submissions),
        status: 'pending',
        createdAt: new Date().toISOString(),
        moderatedAt: null
      };
      state.submissions.unshift(submission);
      recordActivity(`Pengajuan baru diterima dari ${submission.student}.`, 'submission', actor);
      return clone(submission);
    },

    listSubmissions({ status, nim } = {}) {
      return clone(state.submissions.filter((submission) => {
        if (status && submission.status !== status) return false;
        if (nim && submission.nim !== nim) return false;
        return true;
      }));
    },

    findSubmissionById(id) {
      const submission = state.submissions.find((item) => item.id === Number(id));
      return submission ? clone(submission) : null;
    },

    approveSubmission(id, actor) {
      const index = state.submissions.findIndex((item) => item.id === Number(id));
      if (index < 0) return { error: 'not_found' };
      if (state.submissions[index].status !== 'pending') return { error: 'invalid_status' };
      const submission = state.submissions[index];
      const project = this.createProject({
        title: submission.title,
        student: submission.student,
        nim: submission.nim,
        prodi: 'Teknologi Rekayasa Komputer',
        prodiCode: 'TRK',
        course: submission.course,
        category: submission.category,
        semester: submission.semester,
        techStack: submission.techStack,
        videoUrl: submission.videoUrl,
        thumbnail: submission.thumbnail,
        supervisor: submission.supervisor || 'Dosen Pembimbing TRK',
        year: submission.year || state.settings.academicYear,
        date: submission.date,
        description: submission.description
      }, actor);
      state.submissions[index] = {
        ...submission,
        status: 'approved',
        moderatedAt: new Date().toISOString()
      };
      recordActivity(`Pengajuan ${submission.student} disetujui.`, 'success', actor);
      return { submission: clone(state.submissions[index]), project };
    },

    rejectSubmission(id, actor) {
      const index = state.submissions.findIndex((item) => item.id === Number(id));
      if (index < 0) return { error: 'not_found' };
      if (state.submissions[index].status !== 'pending') return { error: 'invalid_status' };
      state.submissions[index] = {
        ...state.submissions[index],
        status: 'rejected',
        moderatedAt: new Date().toISOString()
      };
      recordActivity(`Pengajuan ${state.submissions[index].student} ditolak.`, 'danger', actor);
      return { submission: clone(state.submissions[index]) };
    },

    restoreSubmission(id, actor) {
      const index = state.submissions.findIndex((item) => item.id === Number(id));
      if (index < 0) return { error: 'not_found' };
      state.submissions[index] = {
        ...state.submissions[index],
        status: 'pending',
        moderatedAt: null
      };
      recordActivity(`Pengajuan ${state.submissions[index].student} dikembalikan ke antrean.`, 'submission', actor);
      return { submission: clone(state.submissions[index]) };
    },

    getCourses() {
      return clone(state.courses);
    },

    addCourse(name, actor) {
      const normalized = name.trim().toUpperCase();
      if (!normalized || state.courses.some((course) => course.toUpperCase() === normalized)) return null;
      state.courses.push(normalized);
      recordActivity(`Mata kuliah “${normalized}” ditambahkan.`, 'taxonomy', actor);
      return normalized;
    },

    deleteCourse(name, actor) {
      const inUse = [...state.projects, ...state.submissions].some((item) => item.course === name);
      if (inUse) return { error: 'in_use' };
      const index = state.courses.indexOf(name);
      if (index < 0) return { error: 'not_found' };
      const [removed] = state.courses.splice(index, 1);
      recordActivity(`Mata kuliah “${removed}” dihapus.`, 'taxonomy', actor);
      return { course: removed };
    },

    getCategories() {
      return clone(state.categories);
    },

    getModerators() {
      return clone(state.moderators);
    },

    addModerator(data, actor) {
      if (state.moderators.some((item) => item.email === data.email.toLowerCase())) return null;
      const moderator = {
        ...clone(data),
        id: nextId(state.moderators),
        email: data.email.toLowerCase(),
        status: 'active'
      };
      state.moderators.push(moderator);
      recordActivity(`Moderator ${moderator.name} ditambahkan.`, 'user', actor);
      return clone(moderator);
    },

    toggleModerator(id, actor) {
      const index = state.moderators.findIndex((item) => item.id === Number(id));
      if (index < 0) return { error: 'not_found' };
      const activeCount = state.moderators.filter((item) => item.status === 'active').length;
      if (state.moderators[index].status === 'active' && activeCount <= 1) return { error: 'last_active' };
      state.moderators[index].status = state.moderators[index].status === 'active' ? 'inactive' : 'active';
      recordActivity('Status moderator diperbarui.', 'user', actor);
      return { moderator: clone(state.moderators[index]) };
    },

    deleteModerator(id, actor) {
      const index = state.moderators.findIndex((item) => item.id === Number(id));
      if (index < 0) return { error: 'not_found' };
      if (state.moderators.length <= 1) return { error: 'last_moderator' };
      const [removed] = state.moderators.splice(index, 1);
      recordActivity(`Moderator ${removed.name} dihapus.`, 'danger', actor);
      return { moderator: clone(removed) };
    },

    getSettings() {
      return clone(state.settings);
    },

    updateSettings(updates, actor) {
      state.settings = { ...state.settings, ...clone(updates) };
      recordActivity('Pengaturan sistem diperbarui.', 'settings', actor);
      return clone(state.settings);
    },

    getActivityLogs() {
      return clone(state.activityLogs);
    },

    clearActivityLogs(actor) {
      state.activityLogs = [];
      return recordActivity('Log aktivitas dibersihkan.', 'system', actor);
    }
  };
}

export const memoryRepository = createMemoryRepository();
