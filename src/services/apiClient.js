const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
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
  const { method = 'GET', body, token = getAccessToken(), signal, timeout = REQUEST_TIMEOUT_MS } = options;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);
  const abortFromCaller = () => controller.abort();
  signal?.addEventListener('abort', abortFromCaller, { once: true });

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

    return payload?.data;
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    if (error.name === 'AbortError') {
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

export const demoCredentials = Object.freeze({
  student: {
    identifier: 'J0304211015',
    password: import.meta.env.VITE_DEMO_STUDENT_PASSWORD || 'MahasiswaTRK123!'
  },
  admin: {
    identifier: 'admin.trk@apps.ipb.ac.id',
    password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'AdminTRK123!'
  }
});
