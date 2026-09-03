import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { ApiError, sendData } from '../utils/http.js';

const router = Router();

router.use(authenticate);

router.get('/mine', authorize('student'), (request, response) => {
  sendData(response, request.app.locals.repository.listSubmissions({ nim: request.user.nim }));
});

router.get('/', authorize('admin'), (request, response) => {
  sendData(response, request.app.locals.repository.listSubmissions({ status: request.query.status }));
});

function resolveModerationResult(result, response, status = 200) {
  if (result.error === 'not_found') throw new ApiError(404, 'SUBMISSION_NOT_FOUND', 'Pengajuan tidak ditemukan.');
  if (result.error === 'invalid_status') {
    throw new ApiError(409, 'INVALID_SUBMISSION_STATUS', 'Pengajuan ini tidak lagi berstatus menunggu.');
  }
  return sendData(response, result, status);
}

router.post('/:id/approve', authorize('admin'), (request, response) => {
  resolveModerationResult(
    request.app.locals.repository.approveSubmission(request.params.id, request.user.name),
    response
  );
});

router.post('/:id/reject', authorize('admin'), (request, response) => {
  resolveModerationResult(
    request.app.locals.repository.rejectSubmission(request.params.id, request.user.name),
    response
  );
});

router.post('/:id/restore', authorize('admin'), (request, response) => {
  resolveModerationResult(
    request.app.locals.repository.restoreSubmission(request.params.id, request.user.name),
    response
  );
});

export default router;
