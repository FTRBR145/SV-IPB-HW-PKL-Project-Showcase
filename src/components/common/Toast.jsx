import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import useApp from '../../hooks/useApp';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />,
    info: <Info size={18} className="text-sky-400 flex-shrink-0" />
  };

  const bgStyles = {
    success: 'bg-slate-900/95 text-white border-emerald-500/30',
    error: 'bg-slate-900/95 text-white border-rose-500/30',
    info: 'bg-slate-900/95 text-white border-sky-500/30'
  };

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 flex justify-center md:inset-x-auto md:bottom-6 md:right-6 md:block">
      <div
        role={toast.type === 'error' ? 'alert' : 'status'}
        aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
        className={`pointer-events-auto flex max-w-sm animate-in items-center gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md duration-300 fade-in slide-in-from-bottom-5 ${
          bgStyles[toast.type] || bgStyles.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <span className="text-xs sm:text-sm font-medium tracking-wide">
          {toast.message}
        </span>
      </div>
    </div>
  );
}
