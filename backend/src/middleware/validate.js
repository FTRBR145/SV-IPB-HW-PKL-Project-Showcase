import { ApiError } from '../utils/http.js';

export function validate(schema, source = 'body') {
  return (request, _response, next) => {
    const result = schema.safeParse(request[source]);
    if (!result.success) {
      return next(new ApiError(
        422,
        'VALIDATION_ERROR',
        'Data yang dikirim belum valid.',
        result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      ));
    }
    request[source] = result.data;
    return next();
  };
}
