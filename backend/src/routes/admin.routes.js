import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { courseSchema, moderatorSchema, settingsSchema } from '../schemas/index.js';
import { ApiError, sendData } from '../utils/http.js';

const router = Router();

router.get('/courses', (request, response) => {
  sendData(response, request.app.locals.repository.getCourses());
});

router.get('/categories', (request, response) => {
  sendData(response, request.app.locals.repository.getCategories());
});

router.get('/settings/public', (request, response) => {
  sendData(response, request.app.locals.repository.getSettings());
});

router.use(authenticate, authorize('admin'));

router.post('/courses', validate(courseSchema), (request, response) => {
  const course = request.app.locals.repository.addCourse(request.body.name, request.user.name);
  if (!course) throw new ApiError(409, 'COURSE_EXISTS', 'Mata kuliah sudah tersedia.');
  sendData(response, { name: course }, 201);
});

router.delete('/courses/:name', (request, response) => {
  const result = request.app.locals.repository.deleteCourse(request.params.name, request.user.name);
  if (result.error === 'not_found') throw new ApiError(404, 'COURSE_NOT_FOUND', 'Mata kuliah tidak ditemukan.');
  if (result.error === 'in_use') throw new ApiError(409, 'COURSE_IN_USE', 'Mata kuliah masih digunakan oleh projek atau pengajuan.');
  sendData(response, result);
});

router.get('/moderators', (request, response) => {
  sendData(response, request.app.locals.repository.getModerators());
});

router.post('/moderators', validate(moderatorSchema), (request, response) => {
  const moderator = request.app.locals.repository.addModerator(request.body, request.user.name);
  if (!moderator) throw new ApiError(409, 'MODERATOR_EXISTS', 'Email moderator sudah terdaftar.');
  sendData(response, moderator, 201);
});

router.patch('/moderators/:id/status', (request, response) => {
  const result = request.app.locals.repository.toggleModerator(request.params.id, request.user.name);
  if (result.error === 'not_found') throw new ApiError(404, 'MODERATOR_NOT_FOUND', 'Moderator tidak ditemukan.');
  if (result.error === 'last_active') throw new ApiError(409, 'LAST_ACTIVE_MODERATOR', 'Minimal satu moderator harus tetap aktif.');
  sendData(response, result.moderator);
});

router.delete('/moderators/:id', (request, response) => {
  const result = request.app.locals.repository.deleteModerator(request.params.id, request.user.name);
  if (result.error === 'not_found') throw new ApiError(404, 'MODERATOR_NOT_FOUND', 'Moderator tidak ditemukan.');
  if (result.error === 'last_moderator') throw new ApiError(409, 'LAST_MODERATOR', 'Minimal satu moderator harus tersedia.');
  sendData(response, result.moderator);
});

router.get('/settings', (request, response) => {
  sendData(response, request.app.locals.repository.getSettings());
});

router.patch('/settings', validate(settingsSchema), (request, response) => {
  sendData(response, request.app.locals.repository.updateSettings(request.body, request.user.name));
});

router.get('/activity-logs', (request, response) => {
  sendData(response, request.app.locals.repository.getActivityLogs());
});

router.delete('/activity-logs', (request, response) => {
  request.app.locals.repository.clearActivityLogs(request.user.name);
  sendData(response, []);
});

router.post('/system/reset', (request, response) => {
  request.app.locals.repository.reset();
  sendData(response, { reset: true });
});

export default router;
