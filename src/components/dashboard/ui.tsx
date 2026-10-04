import React from 'react';
import type { LucideIcon } from 'lucide-react';
import type { PaymentStatus, SubmissionStatus } from '../../types/db';

export const Card: React.FC<{
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, children, className = '' }) => (
  <section className={`bg-white border border-brand-gray-200 rounded-2xl shadow-sm ${className}`}>
    {(title || action) && (
      <header className="flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 sm:pt-6">
        <div>
          {subtitle && <div className="text-[11px] uppercase tracking-wider text-brand-blue font-bold mb-0.5">{subtitle}</div>}
          {title && <h2 className="text-lg font-extrabold text-brand-navy">{title}</h2>}
        </div>
        {action}
      </header>
    )}
    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

export const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon: LucideIcon;
  tone?: 'blue' | 'amber' | 'green' | 'navy';
}> = ({ label, value, hint, icon: Icon, tone = 'blue' }) => {
  const tones = {
    blue: 'bg-brand-blue-light text-brand-blue',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-emerald-50 text-emerald-600',
    navy: 'bg-brand-navy text-white'
  };
  return (
    <div className="bg-white border border-brand-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-bold text-brand-gray-500">{label}</div>
        <div className="text-2xl font-extrabold text-brand-navy leading-tight truncate">{value}</div>
        {hint && <div className="text-xs text-brand-gray-500 mt-0.5">{hint}</div>}
      </div>
    </div>
  );
};

const PAYMENT: Record<PaymentStatus, { label: string; cls: string }> = {
  pending: { label: 'Payment pending', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  awaiting_confirmation: { label: 'Awaiting confirmation', cls: 'bg-blue-50 text-brand-blue border-blue-200' },
  partial: { label: 'Part-paid', cls: 'bg-violet-50 text-violet-700 border-violet-200' },
  paid: { label: 'Paid', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
};

const SUBMISSION: Record<SubmissionStatus, { label: string; cls: string }> = {
  submitted: { label: 'In review', cls: 'bg-blue-50 text-brand-blue border-blue-200' },
  approved: { label: 'Approved', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  changes_requested: { label: 'Changes requested', cls: 'bg-amber-50 text-amber-700 border-amber-200' }
};

export const Badge: React.FC<{ cls: string; children: React.ReactNode }> = ({ cls, children }) => (
  <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${cls}`}>
    {children}
  </span>
);

export const PaymentBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => (
  <Badge cls={PAYMENT[status].cls}>{PAYMENT[status].label}</Badge>
);

export const SubmissionBadge: React.FC<{ status: SubmissionStatus }> = ({ status }) => (
  <Badge cls={SUBMISSION[status].cls}>{SUBMISSION[status].label}</Badge>
);

export const EmptyState: React.FC<{ icon: LucideIcon; title: string; text?: string }> = ({ icon: Icon, title, text }) => (
  <div className="text-center py-10 px-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-gray-100 text-brand-gray-400 flex items-center justify-center mx-auto mb-3">
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-sm font-bold text-brand-navy">{title}</div>
    {text && <p className="text-xs text-brand-gray-500 mt-1 max-w-xs mx-auto">{text}</p>}
  </div>
);

export const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-full h-2 bg-brand-gray-100 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-brand-blue to-brand-amber rounded-full transition-all duration-500"
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
);

export const Spinner: React.FC<{ label?: string }> = ({ label = 'Loading…' }) => (
  <div className="flex items-center justify-center gap-3 py-24 text-sm text-brand-gray-500">
    <span className="w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
    {label}
  </div>
);

export const inputCls =
  'w-full h-11 px-3.5 bg-white border border-brand-gray-300 rounded-lg text-sm text-brand-navy placeholder:text-brand-gray-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider px-5 h-11 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed';

export const btnGhost =
  'inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-gray-50 text-brand-navy border border-brand-gray-300 text-xs font-bold uppercase tracking-wider px-4 h-9 rounded-lg transition-colors disabled:opacity-50';

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export const fmtMoney = (n: number) => `₦${Number(n || 0).toLocaleString('en-NG')}`;
