const VALID_ROLES = new Set(['student', 'admin']);

export function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function isUser(value) {
  return isRecord(value) && typeof value.name === 'string' && VALID_ROLES.has(value.role);
}

export function isStringList(value) {
  return Array.isArray(value) && value.every((item) =>
    typeof item === 'string' && item.trim().length > 0
  );
}

export function isRecordList(value) {
  return Array.isArray(value) && value.every(isRecord);
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isProjectList(value) {
  return Array.isArray(value) && value.every((item) =>
    isRecord(item) && item.id != null && hasText(item.title) && hasText(item.student)
  );
}

export function isModeratorList(value) {
  return Array.isArray(value) && value.every((item) =>
    isRecord(item) && item.id != null && hasText(item.name) && hasText(item.email)
  );
}

export function isActivityLogList(value) {
  return Array.isArray(value) && value.every((item) =>
    isRecord(item) && item.id != null && hasText(item.message) && hasText(item.timestamp)
  );
}

export function isAdminSettings(value) {
  return isRecord(value)
    && (value.siteName == null || hasText(value.siteName))
    && (value.academicYear == null || hasText(value.academicYear))
    && (value.moderationRequired == null || typeof value.moderationRequired === 'boolean')
    && (value.allowGuestUploads == null || typeof value.allowGuestUploads === 'boolean')
    && (value.maintenanceMode == null || typeof value.maintenanceMode === 'boolean');
}

export function parseStoredJson(rawValue, fallback, validator = () => true) {
  if (rawValue == null) return fallback;

  try {
    const parsed = JSON.parse(rawValue);
    return validator(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function getNextNumericId(items) {
  const validIds = items
    .map((item) => Number(item?.id))
    .filter((id) => Number.isFinite(id) && id >= 0);

  return validIds.length > 0 ? Math.max(...validIds) + 1 : 1;
}

function upsertStudent(studentMap, item, incrementProjectCount) {
  if (!item?.nim) return;

  const nim = String(item.nim);
  const existing = studentMap.get(nim) || {
    nim,
    name: item.student || 'Mahasiswa TRK',
    semester: item.semester || null,
    projectCount: 0
  };

  if (incrementProjectCount) existing.projectCount += 1;
  if (!existing.name && item.student) existing.name = item.student;
  if (!existing.semester && item.semester) existing.semester = item.semester;
  studentMap.set(nim, existing);
}

export function buildStudentSummaries(projects, submissions) {
  const studentMap = new Map();

  projects.forEach((project) => upsertStudent(studentMap, project, true));
  submissions.forEach((submission) => upsertStudent(studentMap, submission, false));

  return [...studentMap.values()].sort((a, b) =>
    a.name.localeCompare(b.name, 'id-ID', { sensitivity: 'base' })
  );
}
