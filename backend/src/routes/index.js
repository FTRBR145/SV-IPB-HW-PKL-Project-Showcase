import { Router } from 'express';
import authRoutes from './auth.routes.js';
import projectsRoutes from './projects.routes.js';
import submissionsRoutes from './submissions.routes.js';
import studentsRoutes from './students.routes.js';
import adminRoutes from './admin.routes.js';
import { sendData } from '../utils/http.js';

const router = Router();

router.get('/statistics', async (request, response) => {
  sendData(response, await request.app.locals.repository.getPublicStatistics());
});

router.get('/health', async (request, response) => {
  await request.app.locals.repository.health?.();
  sendData(response, {
    service: 'trk-showcase-backend',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/submissions', submissionsRoutes);
router.use('/students', studentsRoutes);
router.use('/', adminRoutes);

export default router;
