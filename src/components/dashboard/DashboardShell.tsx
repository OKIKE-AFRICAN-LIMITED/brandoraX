import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, ExternalLink, Menu, X, type LucideIcon, ChevronRight } from 'lucide-react';

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

/** 
 * Dedicated SaaS application shell for BrandoraX.
 * Fixed sidebar on left, fixed top header on top, independent scrollable content area.
 */
export const DashboardShell: React.FC<ShellProps> = ({
  portalLabel,
  userName,
  userSub,
  nav,
  active,
  onChange,
  onSignOut,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeItem = nav.find((n) => n.id === active) || nav[0];

  const sidebarContent = (
    <div className="h-full w-full flex flex-col justify-between bg-brand-navy text-white">
      {/* Brand & Portal Header */}
      <div className="p-5 border-b border-white/10 shrink-0">
        <Link to="/" className="inline-block group" title="Go to Website">
          <img
            src="/PNG/Full logo_colored_White_BrandoraX.png"
            alt="BrandoraX"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>
        <div className="mt-3.5 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded bg-brand-blue/30 text-brand-amber border border-brand-amber/30">
            {portalLabel}
          </span>
        </div>
      </div>

      {/* Navigation Links (Independent Scrollbar if needed) */}
      <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 no-scrollbar">
        <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold px-3 mb-2">
          Navigation
        </div>
        {nav.map(({ id, label, icon: Icon, badge }) => {
          const isSelected = active === id;
          return (
            <button
              key={id}
              onClick={() => {
                onChange(id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-brand-blue text-white shadow-md font-bold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-white/60'}`} />
              <span className="flex-1 text-left truncate">{label}</span>
              {typeof badge === 'number' && badge > 0 && (
                <span className="text-[11px] font-extrabold bg-brand-amber text-brand-navy rounded-full px-2 py-0.5 shrink-0">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info & Actions at Bottom of Sidebar */}
      <div className="p-4 border-t border-white/10 bg-brand-navy-dark/40 shrink-0 space-y-3">
        {/* Return to website */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </span>
        </Link>

        {/* Profile Details */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
          <div className="w-9 h-9 rounded-full bg-brand-blue text-white font-extrabold text-sm flex items-center justify-center shrink-0 border border-brand-amber/40">
            {userName.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">{userName}</div>
            <div className="text-[11px] text-white/60 truncate">{userSub}</div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={onSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-brand-gray-50 text-brand-navy">
      {/* 1. FIXED DESKTOP SIDEBAR (Solid navy, border-r, perfectly flush) */}
      <aside className="hidden lg:flex w-64 h-full shrink-0 bg-brand-navy border-r border-white/10 z-30">
        {sidebarContent}
      </aside>

      {/* 2. MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-navy/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Slide-out drawer */}
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-fade-in-right bg-brand-navy">
            {sidebarContent}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN APPLICATION CONTAINER (Directly adjacent to sidebar) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-brand-gray-50">
        {/* FIXED TOPBAR (Header does NOT move when content is scrolled) */}
        <header className="h-16 px-6 lg:px-8 bg-white border-b border-brand-gray-200 flex items-center justify-between shrink-0 z-20">
          {/* Left: Mobile Toggle + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-brand-navy hover:bg-brand-gray-100 rounded-lg"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-brand-gray-400">
              <span className="font-semibold text-brand-gray-500 hidden sm:inline">
                {portalLabel}
              </span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
              <span className="font-extrabold text-sm text-brand-navy truncate">
                {activeItem?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right: User Status Pill & Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-200">
              {userSub}
            </span>

            <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center border border-brand-amber">
              {userName.charAt(0).toUpperCase() || 'U'}
            </div>

            <button
              onClick={onSignOut}
              title="Sign Out"
              className="p-2 text-brand-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 4. INDEPENDENT SCROLLABLE CONTENT AREA (ONLY this scrolls) */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
          <div className="w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
