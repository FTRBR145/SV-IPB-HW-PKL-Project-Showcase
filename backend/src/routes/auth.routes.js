import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../schemas/index.js';
import { ApiError, asyncHandler, sendData } from '../utils/http.js';

const router = Router();

function publicUser(user) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

router.post('/login', validate(loginSchema), asyncHandler(async (request, response) => {
  const identifier = request.body.identifier || request.body.email;
  const user = request.app.locals.repository.findUserByIdentifier(identifier);
  const validPassword = user ? await bcrypt.compare(request.body.password, user.passwordHash) : false;
  if (!user || !validPassword) {
    throw new ApiError(401, 'INVALID_CREDENTIALS', 'Email atau password salah.');
  }

  const accessToken = jwt.sign(
    { role: user.role, email: user.email },
    env.jwtSecret,
    { subject: String(user.id), expiresIn: env.jwtExpiresIn }
  );

  sendData(response, { accessToken, tokenType: 'Bearer', user: publicUser(user) });
}));

router.get('/me', authenticate, (request, response) => {
  const user = request.app.locals.repository.findUserById(request.user.id);
  sendData(response, publicUser(user));
});

export default router;
