export const ROUTE_ACCESS = Object.freeze({
  studentPortal: ['student', 'admin'],
  studentUpload: ['student'],
  admin: ['admin']
});

export function isStudentAccount(user) {
  return user?.role === 'student';
}

export function isAdminAccount(user) {
  return user?.role === 'admin';
}
