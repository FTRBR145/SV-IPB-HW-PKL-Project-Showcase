import { ApiError } from '../utils/http.js';

export function notFound(request, _response, next) {
  next(new ApiError(404, 'ROUTE_NOT_FOUND', `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan.`));
}

export function errorHandler(error, _request, response, _next) {
  const status = error instanceof ApiError ? error.status : 500;
  const code = error instanceof ApiError ? error.code : 'INTERNAL_ERROR';
  const message = error instanceof ApiError ? error.message : 'Terjadi kesalahan pada server.';

  if (status >= 500 && process.env.NODE_ENV !== 'test') {
    console.error(error);
  }

  response.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(error.details ? { details: error.details } : {})
    }
  });
}
