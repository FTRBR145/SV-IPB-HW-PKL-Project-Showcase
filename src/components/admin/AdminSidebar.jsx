import React from 'react';
import {
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { ADMIN_MENU } from '../../data/adminNavigation';

export default function AdminSidebar({ activeMenu, onSelectMenu, pendingCount, onBack }) {
  return (
    <aside className="hidden md:flex w-60 p-3 flex-col border-r border-slate-200 bg-white flex-shrink-0 overflow-y-auto select-none">
      <div className="space-y-1 w-full pb-3 border-b border-slate-100">
        {ADMIN_MENU.slice(0, 5).map(({ icon: Icon, label, id }) => {
          const active = activeMenu === id;
          return (
            <button
              key={id}
              onClick={() => onSelectMenu(id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                active
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} className={active ? 'text-sky-400' : ''} />
                {label}
              </span>
              {id === 'projects' && pendingCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="py-3 border-b border-slate-100 space-y-1">
        <span className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
          Manajemen Sistem
        </span>
        {ADMIN_MENU.slice(5).map(({ icon: Icon, label, id }) => {
          const active = activeMenu === id;
          return (
            <button
              key={id}
              onClick={() => onSelectMenu(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                active
                  ? 'bg-sky-50 text-sky-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={15} className={active ? 'text-sky-600' : 'text-slate-400'} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="pt-3 space-y-2 mt-auto">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 mb-1">
            <ShieldCheck size={14} className="text-sky-600" />
            <span>Admin TRK SV IPB</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">Akses moderasi dan pengelolaan sistem aktif.</p>
        </div>
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke Website
        </button>
      </div>
    </aside>
  );
}
