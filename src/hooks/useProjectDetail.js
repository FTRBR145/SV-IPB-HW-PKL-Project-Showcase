import { useEffect, useState } from 'react';
import { getProjectById } from '../services/projectApi';

export default function useProjectDetail(id, showToast) {
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    if (!id) return undefined;
    const controller = new AbortController();
    getProjectById(id, { signal: controller.signal }).then(project => {
      if (!controller.signal.aborted) setDetail({ id, project });
    }).catch(error => {
      if (!controller.signal.aborted) {
        setDetail({ id, project: null });
        showToast(error.status === 404 ? 'Projek tidak ditemukan atau sudah dihapus.' : error.message, 'error');
      }
    });
    return () => controller.abort();
  }, [id, showToast]);
  return id && detail?.id === id ? detail.project : null;
}
