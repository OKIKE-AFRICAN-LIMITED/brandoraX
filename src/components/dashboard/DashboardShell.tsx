import React from 'react';
import { LogOut, type LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface ShellProps {
  portalLabel: string;
  userName: string;
  userSub: string;
  nav: NavItem[];
  active: string;
  onChange: (id: string) => void;
  onSignOut: () => void;
  children: React.ReactNode;
}

/** Shared responsive layout for the student and admin dashboards. */
export const DashboardShell: React.FC<ShellProps> = ({
  portalLabel, userName, userSub, nav, active, onChange, onSignOut, children
}) => (
  <div className="bg-brand-gray-50 min-h-[calc(100vh-80px)] w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10 grid lg:grid-cols-[256px_minmax(0,1fr)] gap-6 lg:gap-8">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 bg-brand-navy text-white rounded-2xl p-5 shadow-brand border border-brand-navy-light">
          <div className="flex items-center gap-3 pb-5 mb-4 border-b border-white/10">
            <div className="w-11 h-11 rounded-full bg-brand-blue/30 border-2 border-brand-amber flex items-center justify-center font-bold text-lg shrink-0">
              {userName.charAt(0).toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold truncate">{userName}</div>
              <div className="text-[11px] text-white/60 truncate">{userSub}</div>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-brand-amber font-bold mb-2 px-2">{portalLabel}</div>
          <nav className="space-y-1">
            {nav.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  active === id ? 'bg-brand-blue text-white shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                {!!badge && (
                  <span className="text-[10px] font-bold bg-brand-amber text-brand-navy rounded-full px-1.5 py-0.5">{badge}</span>
                )}
              </button>
            ))}
          </nav>
          <button
            onClick={onSignOut}
            className="mt-5 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-colors border-t border-white/10 pt-4"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Tabs (mobile / tablet) */}
      <div className="lg:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-brand-blue font-bold">{portalLabel}</div>
            <div className="text-sm font-bold text-brand-navy">{userName}</div>
          </div>
          <button onClick={onSignOut} className="text-xs font-bold text-brand-gray-500 hover:text-brand-navy flex items-center gap-1.5">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {nav.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold border transition-colors ${
                active === id
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-brand-gray-600 border-brand-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {label}
              {!!badge && <span className="bg-brand-amber text-brand-navy rounded-full px-1.5 text-[10px]">{badge}</span>}
            </button>
          ))}
        </div>
      </div>

      <main className="min-w-0 space-y-6">{children}</main>
    </div>
  </div>
);
