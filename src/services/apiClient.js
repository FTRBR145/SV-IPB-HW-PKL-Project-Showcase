const API_BASE_URL = (import.meta.env?.VITE_API_URL || '/api').replace(/\/$/, '');
const ACCESS_TOKEN_KEY = 'trk_showcase_access_token';
const REQUEST_TIMEOUT_MS = 15000;

export class ApiClientError extends Error {
  constructor(message, { status = 0, code = 'NETWORK_ERROR', details } = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function getAccessToken() {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token) {
  try {
    if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
    else localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // The active session still works until refresh if browser storage is unavailable.
  }
}

export async function apiRequest(path, options = {}) {
  try {
    return await requestOnce(path, options);
  } catch (error) {
    // Only replay reads: a failed write may already have committed on the server.
    if ((options.method || 'GET').toUpperCase() !== 'GET' ||
        error.status !== 503 || error.code !== 'DATABASE_UNAVAILABLE') throw error;
    await waitForDatabase(options.signal);
    return requestOnce(path, options);
  }
}

function waitForDatabase(signal) {
  return new Promise((resolve, reject) => {
    const abort = () => {
      window.clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      reject(new DOMException('Permintaan dibatalkan.', 'AbortError'));
    };
    const timer = window.setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, 5000);
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) abort();
  });
}

async function requestOnce(path, options = {}) {
  const { method = 'GET', body, token = getAccessToken(), signal, timeout = REQUEST_TIMEOUT_MS, includeMeta = false } = options;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);
  const abortFromCaller = () => controller.abort();
  signal?.addEventListener('abort', abortFromCaller, { once: true });
  if (signal?.aborted) controller.abort();

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    const payload = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
      throw new ApiClientError(
        payload?.error?.message || `Permintaan gagal dengan status ${response.status}.`,
        {
          status: response.status,
          code: payload?.error?.code || 'API_ERROR',
          details: payload?.error?.details
        }
      );
    }

    return includeMeta ? { data: payload?.data, meta: payload?.meta } : payload?.data;
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    if (error.name === 'AbortError') {
      if (signal?.aborted) throw error;
      throw new ApiClientError('Koneksi ke server terlalu lama. Silakan coba kembali.', {
        code: 'REQUEST_TIMEOUT'
      });
    }
    throw new ApiClientError('Backend tidak dapat dihubungi. Pastikan server API sedang berjalan.');
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abortFromCaller);
  }
}
