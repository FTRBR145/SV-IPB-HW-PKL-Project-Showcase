export function matchesStudentProject(project, { search = '', semester = 'ALL', course = 'Semua' } = {}) {
  if (semester !== 'ALL' && Number(project.semester) !== Number(semester)) return false;
  if (course !== 'Semua' && course !== 'Projek Saya' && project.course !== course) return false;
  const query = search.trim().toLocaleLowerCase('id-ID');
  return !query || [project.title, project.student, project.nim, project.course, project.supervisor, ...(project.techStack || [])]
    .some(value => String(value || '').toLocaleLowerCase('id-ID').includes(query));
}

export function isEmptyPortfolio(activeTab, projectCount) {
  return activeTab === 'my-projects' && projectCount === 0;
}

export function isUnavailableThumbnail({ automatic, width, height }) {
  // YouTube can return its small placeholder with HTTP 200 instead of an error.
  return automatic && (width <= 120 || height <= 90);
}
