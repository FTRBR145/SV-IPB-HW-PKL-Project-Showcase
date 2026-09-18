import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/http.js';

function readBearerToken(request) {
  const [scheme, token] = String(request.headers.authorization || '').split(' ');
  return scheme === 'Bearer' && token ? token : null;
}

export async function authenticate(request, _response, next) {
  const token = readBearerToken(request);
  if (!token) return next(new ApiError(401, 'UNAUTHENTICATED', 'Token autentikasi diperlukan.'));

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await request.app.locals.repository.findUserById(payload.sub);
    if (!user) return next(new ApiError(401, 'INVALID_TOKEN', 'Pengguna pada token tidak ditemukan.'));
    if ((payload.authVersion || 0) !== (user.authVersion || 0)) return next(new ApiError(401, 'INVALID_TOKEN', 'Password telah berubah. Silakan masuk kembali.'));
    request.user = {
      id: user.id,
      name: user.name,
      nim: user.nim,
      email: user.email,
      role: user.role
    };
    return next();
  } catch (error) {
    if (!['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(error.name)) return next(error);
    return next(new ApiError(401, 'INVALID_TOKEN', 'Token tidak valid atau sudah kedaluwarsa.'));
  }
}

export async function optionalAuthenticate(request, _response, next) {
  const token = readBearerToken(request);
  if (!token) return next();

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await request.app.locals.repository.findUserById(payload.sub);
    if (!user) return next(new ApiError(401, 'INVALID_TOKEN', 'Pengguna pada token tidak ditemukan.'));
    if ((payload.authVersion || 0) !== (user.authVersion || 0)) return next(new ApiError(401, 'INVALID_TOKEN', 'Password telah berubah. Silakan masuk kembali.'));
    request.user = {
      id: user.id,
      name: user.name,
      nim: user.nim,
      email: user.email,
      role: user.role
    };
    return next();
  } catch (error) {
    if (!['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(error.name)) return next(error);
    return next(new ApiError(401, 'INVALID_TOKEN', 'Token tidak valid atau sudah kedaluwarsa.'));
  }
}

export function authorize(...roles) {
  return (request, _response, next) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return next(new ApiError(403, 'FORBIDDEN', 'Anda tidak memiliki izin untuk tindakan ini.'));
    }
    return next();
  };
}
