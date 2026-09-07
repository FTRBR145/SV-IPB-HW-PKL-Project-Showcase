import { Router } from 'express';
import { authenticate, authorize, optionalAuthenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { projectSchema, projectUpdateSchema } from '../schemas/index.js';
import { ApiError, sendData } from '../utils/http.js';

const router = Router();

router.get('/', (request, response) => {
  const { items, ...meta } = request.app.locals.repository.listProjects(request.query);
  sendData(response, items, 200, meta);
});

router.get('/:id', (request, response) => {
  const project = request.app.locals.repository.findProjectById(request.params.id);
  if (!project) throw new ApiError(404, 'PROJECT_NOT_FOUND', 'Projek tidak ditemukan.');
  sendData(response, project);
});

router.post('/', optionalAuthenticate, validate(projectSchema), (request, response) => {
  const repository = request.app.locals.repository;
  const settings = repository.getSettings();
  if (settings.maintenanceMode) {
    throw new ApiError(503, 'MAINTENANCE_MODE', 'Upload sedang dinonaktifkan selama pemeliharaan.');
  }

  if (!request.user && !settings.allowGuestUploads) {
    throw new ApiError(401, 'LOGIN_REQUIRED', 'Silakan masuk sebelum mengunggah projek.');
  }

  const actorName = request.user?.name || request.body.student || 'Tamu';
  const projectData = {
    ...request.body,
    student: request.user?.role === 'student' ? request.user.name : request.body.student || actorName,
    nim: request.user?.role === 'student' ? request.user.nim : request.body.nim || request.user?.nim || '-',
    prodi: 'Teknologi Rekayasa Komputer',
    prodiCode: 'TRK',
    year: request.body.year || settings.academicYear,
    date: request.body.date || new Date().toISOString()
  };

  if (!request.user || request.user.role === 'student' || settings.moderationRequired) {
    const submission = repository.createSubmission(projectData, actorName);
    return sendData(response, { type: 'submission', item: submission }, 202);
  }

  const project = repository.createProject(projectData, actorName);
  return sendData(response, { type: 'project', item: project }, 201);
});

router.patch('/:id', authenticate, authorize('admin'), validate(projectUpdateSchema), (request, response) => {
  const project = request.app.locals.repository.updateProject(request.params.id, request.body, request.user.name);
  if (!project) throw new ApiError(404, 'PROJECT_NOT_FOUND', 'Projek tidak ditemukan.');
  sendData(response, project);
});

router.delete('/:id', authenticate, authorize('admin'), (request, response) => {
  const project = request.app.locals.repository.deleteProject(request.params.id, request.user.name);
  if (!project) throw new ApiError(404, 'PROJECT_NOT_FOUND', 'Projek tidak ditemukan.');
  sendData(response, project);
});

export default router;
