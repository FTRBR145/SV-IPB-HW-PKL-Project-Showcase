import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreHorizontal,
  ShieldCheck,
  X,
} from 'lucide-react';
import { ADMIN_MENU } from '../../data/adminNavigation';
import ModalShell from '../common/ModalShell';

const MOBILE_PRIMARY_MENU_IDS = ['dashboard', 'projects', 'students'];
const MOBILE_LABELS = {
  dashboard: 'Awal',
  projects: 'Karya',
  students: 'Mhs.',
  reports: 'Lapor'
};

export default function AdminSidebar({ activeMenu, onSelectMenu, onBack }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const primaryMenu = MOBILE_PRIMARY_MENU_IDS.map((id) => ADMIN_MENU.find((item) => item.id === id)).filter(Boolean);
  const secondaryMenu = ADMIN_MENU.filter((item) => !MOBILE_PRIMARY_MENU_IDS.includes(item.id));
  const secondaryActive = secondaryMenu.some((item) => item.id === activeMenu);

  const selectMobileMenu = (id) => {
    onSelectMenu(id);
    setIsMoreOpen(false);
  };

  return (
    <>
      <aside className="workspace-sidebar hidden w-60 flex-shrink-0 select-none flex-col overflow-y-auto border-r p-3 md:sticky md:top-0 md:flex md:h-[calc(100dvh-5rem)] md:self-start">
        <div className="space-y-1 w-full pb-3 border-b border-slate-100">
          {ADMIN_MENU.slice(0, 5).map(({ icon: Icon, label, id }) => {
            const active = activeMenu === id;
            return (
              <button
                key={id}
                onClick={() => onSelectMenu(id)}
                className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={16} className={active ? 'text-sky-400' : ''} />
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="py-3 border-b border-slate-100 space-y-1">
          <span className="mb-1 block px-3 text-xs font-extrabold uppercase tracking-wider text-slate-600">
            Manajemen Sistem
          </span>
          {ADMIN_MENU.slice(5).map(({ icon: Icon, label, id }) => {
            const active = activeMenu === id;
            return (
              <button
                key={id}
                onClick={() => onSelectMenu(id)}
                className={`flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
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
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <ShieldCheck size={14} className="text-sky-600" />
              <span>Admin TRK SV IPB</span>
            </div>
            <p className="text-xs leading-tight text-slate-600">Akses moderasi dan pengelolaan sistem aktif.</p>
          </div>
          <button
            onClick={onBack}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <ArrowLeft size={14} /> Kembali ke Website
          </button>
        </div>
      </aside>

      <ModalShell
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        ariaLabel="Menu admin lainnya"
        panelId="admin-more-menu"
        overlayClassName="items-end bg-slate-950/45 p-3 pb-[calc(5rem+env(safe-area-inset-bottom))] md:hidden"
        panelClassName="max-h-[70vh] overflow-y-auto rounded-3xl border border-slate-200 p-4"
      >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-900">Menu Lainnya</h2>
                <p className="text-xs text-slate-600">Pengelolaan sistem admin</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMoreOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                aria-label="Tutup menu lainnya"
              >
                <X size={17} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {secondaryMenu.map(({ icon: Icon, label, id }) => {
                const active = activeMenu === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectMobileMenu(id)}
                    className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl px-2 py-3 text-center text-xs font-bold transition-colors ${
                      active ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Icon size={19} className={active ? 'text-sky-400' : 'text-slate-500'} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onBack}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-bold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <ArrowLeft size={14} /> Kembali ke Website
            </button>
      </ModalShell>

      <nav className="workspace-toolbar fixed inset-x-0 bottom-0 z-50 border-t px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.10)] backdrop-blur md:hidden" aria-label="Navigasi admin mobile">
        <div className="mx-auto grid min-h-16 max-w-lg grid-cols-4 items-stretch py-1.5">
          {primaryMenu.map(({ icon: Icon, label, id }) => {
            const active = activeMenu === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectMobileMenu(id)}
                aria-label={label}
                className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden px-0.5 text-center text-xs font-bold leading-tight transition-colors ${active ? 'text-sky-700' : 'text-slate-600'}`}
              >
                <span className={`rounded-xl p-1.5 ${active ? 'mobile-nav-active bg-sky-100' : ''}`}><Icon size={18} /></span>
                <span className="max-w-full">{MOBILE_LABELS[id] || label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setIsMoreOpen((open) => !open)}
            aria-expanded={isMoreOpen}
            aria-controls="admin-more-menu"
            className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden px-0.5 text-center text-xs font-bold leading-tight transition-colors ${isMoreOpen || secondaryActive ? 'text-sky-700' : 'text-slate-600'}`}
          >
            <span className={`rounded-xl p-1.5 ${isMoreOpen || secondaryActive ? 'mobile-nav-active bg-sky-100' : ''}`}><MoreHorizontal size={18} /></span>
            <span>Lain</span>
          </button>
        </div>
      </nav>
    </>
  );
}
