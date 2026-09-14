export function normalizeProjectVideo(value) {
  try {
    const url = new URL(value.trim());
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    const host = url.hostname.toLowerCase();
    const parts = url.pathname.split('/').filter(Boolean);
    let id = '';
    if (host === 'youtu.be') id = parts.length === 1 ? parts[0] : '';
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      else if (['embed', 'shorts', 'live'].includes(parts[0]) && parts.length === 2) id = parts[1];
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube.com/embed/${id}` : '';
  } catch {
    return '';
  }
}

export function projectContentErrors(data) {
  const errors = {};
  if (!normalizeProjectVideo(data.videoUrl || '')) errors.videoUrl = 'Masukkan tautan video YouTube yang valid (watch, youtu.be, Shorts, atau live).';
  if ((data.description || '').trim().length < 10) errors.description = 'Deskripsi projek wajib diisi, minimal 10 karakter.';
  return errors;
}

export function configuredAcademicYear(value) {
  const match = /^(\d{4})\/(\d{4})$/.exec(String(value || '').trim());
  return match && Number(match[2]) === Number(match[1]) + 1 ? match[0] : '';
}
