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
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md ${
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
