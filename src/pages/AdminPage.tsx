import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, Wallet, Video, FileCheck2, Megaphone, Search, Trash2,
  GraduationCap, Clock, TrendingUp, ExternalLink, Landmark, ChevronDown, RefreshCw,
  ShieldCheck, UserPlus, UserMinus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { PROGRAMS } from '../data/programsData';
import { DashboardShell, NavItem } from '../components/dashboard/DashboardShell';
import {
  Card, StatCard, PaymentBadge, SubmissionBadge, EmptyState, Spinner,
  inputCls, btnPrimary, btnGhost, fmtDate, fmtDateTime, fmtMoney
} from '../components/dashboard/ui';
import type {
  DbAnnouncement, DbEnrollment, DbPaymentSettings, DbProfile, DbSession, DbSubmission, PaymentStatus, DbAdmin
} from '../types/db';

type Tab = 'overview' | 'students' | 'payments' | 'sessions' | 'submissions' | 'announcements' | 'admins';

const trackName = (id: string | null) => (id ? PROGRAMS.find((p) => p.id === id)?.title || id : 'All tracks');

export const AdminPage: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<DbProfile[]>([]);
  const [enrollments, setEnrollments] = useState<DbEnrollment[]>([]);
  const [submissions, setSubmissions] = useState<DbSubmission[]>([]);
  const [sessions, setSessions] = useState<DbSession[]>([]);
  const [announcements, setAnnouncements] = useState<DbAnnouncement[]>([]);
  const [settings, setSettings] = useState<DbPaymentSettings | null>(null);
  const [admins, setAdmins] = useState<DbAdmin[]>([]);

  const load = useCallback(async () => {
    if (!supabase) return;
    setRefreshing(true);
    const [p, e, s, se, a, ps, adm] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('enrollments').select('*').order('created_at', { ascending: false }),
      supabase.from('submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('sessions').select('*').order('starts_at', { ascending: true }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('payment_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('admins').select('*').order('created_at', { ascending: false })
    ]);
    const firstErr = [p, e, s, se, a, ps].find((r) => r.error)?.error;
    if (firstErr) setError(firstErr.message);
    setProfiles((p.data as DbProfile[]) || []);
    setEnrollments((e.data as DbEnrollment[]) || []);
    setSubmissions((s.data as DbSubmission[]) || []);
    setSessions((se.data as DbSession[]) || []);
    setAnnouncements((a.data as DbAnnouncement[]) || []);
    setSettings((ps.data as DbPaymentSettings) || null);
    setAdmins((adm.data as DbAdmin[]) || []);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const byId = useMemo(() => new Map(profiles.map((p) => [p.id, p])), [profiles]);

  // Robust student resolution: shows all non-admin profiles AND any enrolled users
  const students = useMemo(() => {
    const adminEmails = new Set(admins.map((a) => a.email.toLowerCase()));
    adminEmails.add('okikeenterprises@gmail.com');

    const list = profiles.filter((p) => {
      if (p.role === 'admin') return false;
      if (adminEmails.has((p.email || '').toLowerCase())) return false;
      return true;
    });

    const existingIds = new Set(profiles.map((p) => p.id));
    enrollments.forEach((e) => {
      if (!existingIds.has(e.user_id)) {
        list.push({
          id: e.user_id,
          full_name: 'Registered Student',
          email: 'Student (Auto-syncing record)',
          phone: null,
          country: 'Nigeria',
          role: 'student',
          created_at: e.created_at
        });
        existingIds.add(e.user_id);
      }
    });

    return list;
  }, [profiles, enrollments, admins]);

  const enrollOf = useMemo(() => new Map(enrollments.map((e) => [e.user_id, e])), [enrollments]);

  const awaiting = enrollments.filter((e) => e.payment_status === 'awaiting_confirmation');
  const toReview = submissions.filter((s) => s.status === 'submitted');
  const revenue = enrollments.reduce((sum, e) => sum + Number(e.amount_paid || 0), 0);

  const nav: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users, badge: students.length },
    { id: 'payments', label: 'Payments', icon: Wallet, badge: awaiting.length },
    { id: 'sessions', label: 'Live Sessions', icon: Video },
    { id: 'submissions', label: 'Submissions', icon: FileCheck2, badge: toReview.length },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'admins', label: 'Team & Admins', icon: ShieldCheck, badge: admins.length || 1 }
  ];

  if (!profile) return null;

  return (
    <DashboardShell
      portalLabel="Admin Console"
      userName={profile.full_name || 'Admin'}
      userSub="Administrator"
      nav={nav}
      active={tab}
      onChange={(id) => setTab(id as Tab)}
      onSignOut={signOut}
    >
      {error && (
        <div className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
          Some data couldn't load: {error}. Check that <code>supabase/schema.sql</code> has been run.
        </div>
      )}
      {loading ? <Spinner /> : (
        <>
          {tab === 'overview' && (
            <Overview
              students={students} enrollments={enrollments} awaiting={awaiting.length}
              toReview={toReview.length} revenue={revenue} sessions={sessions}
              byId={byId} go={(t) => setTab(t)} onRefresh={load} refreshing={refreshing}
            />
          )}
          {tab === 'students' && <Students students={students} enrollOf={enrollOf} onChanged={load} />}
          {tab === 'payments' && <Payments awaiting={awaiting} byId={byId} settings={settings} onChanged={load} />}
          {tab === 'sessions' && <Sessions sessions={sessions} onChanged={load} />}
          {tab === 'submissions' && <Submissions submissions={submissions} byId={byId} onChanged={load} />}
          {tab === 'announcements' && <Announcements items={announcements} onChanged={load} />}
          {tab === 'admins' && <AdminsManager admins={admins} profiles={profiles} onChanged={load} />}
        </>
      )}
    </DashboardShell>
  );
};

/* ------------------------------ Overview ------------------------------ */

const Overview: React.FC<{
  students: DbProfile[]; enrollments: DbEnrollment[]; awaiting: number; toReview: number;
  revenue: number; sessions: DbSession[]; byId: Map<string, DbProfile>; go: (t: Tab) => void;
  onRefresh: () => void; refreshing: boolean;
}> = ({ students, enrollments, awaiting, toReview, revenue, sessions, byId, go, onRefresh, refreshing }) => {
  const perTrack = PROGRAMS.map((p) => ({ title: p.title, n: enrollments.filter((e) => e.track_id === p.id).length }));
  const max = Math.max(1, ...perTrack.map((t) => t.n));
  const nextSession = sessions.find((s) => new Date(s.starts_at).getTime() >= Date.now());
  const recent = enrollments.slice(0, 6);

  return (
    <>
      <div className="rounded-2xl bg-brand-navy text-white p-6 sm:p-8 border border-brand-navy-light shadow-brand relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-blue/30 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-brand-amber font-bold mb-1">Admin Console</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Cohort overview</h1>
            <p className="text-sm text-white/70 mt-1">Everything happening across BrandoraX programmes, at a glance.</p>
          </div>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="self-start sm:self-auto inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Live Data'}</span>
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Students" value={students.length} hint={`${enrollments.length} enrolments`} tone="blue" />
        <StatCard icon={TrendingUp} label="Revenue confirmed" value={fmtMoney(revenue)} tone="green" />
        <StatCard icon={Wallet} label="Awaiting payment check" value={awaiting} hint="Needs admin confirmation" tone="amber" />
        <StatCard icon={FileCheck2} label="Submissions to review" value={toReview} hint="Mentor queue" tone="navy" />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3" subtitle="Demand" title="Enrolments by programme">
          <ul className="space-y-3.5">
            {perTrack.map((t) => (
              <li key={t.title}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-brand-navy">{t.title}</span>
                  <span className="font-bold text-brand-gray-500">{t.n}</span>
                </div>
                <div className="h-2.5 bg-brand-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-blue to-brand-amber rounded-full transition-all duration-500" style={{ width: `${(t.n / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card subtitle="Action needed" title="Queue">
            <ul className="space-y-2.5 text-sm">
              <QueueRow label="Payments to confirm" n={awaiting} onClick={() => go('payments')} />
              <QueueRow label="Submissions to review" n={toReview} onClick={() => go('submissions')} />
            </ul>
          </Card>
          <Card subtitle="Next live" title={nextSession ? nextSession.title : 'No session scheduled'}>
            {nextSession ? (
              <div className="text-xs text-brand-gray-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{fmtDateTime(nextSession.starts_at)} · {trackName(nextSession.track_id)}</div>
            ) : (
              <button onClick={() => go('sessions')} className={btnGhost}>Schedule one</button>
            )}
          </Card>
        </div>
      </div>

      <Card subtitle="Latest" title="Recent enrolments">
        {recent.length === 0 ? (
          <EmptyState icon={Users} title="No enrolments yet" text="New sign-ups from the Apply page will appear here." />
        ) : (
          <ul className="divide-y divide-brand-gray-100">
            {recent.map((e) => (
              <li key={e.id} className="py-3 first:pt-0 last:pb-0 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-brand-navy truncate">{byId.get(e.user_id)?.full_name || 'Student'}</div>
                  <div className="text-xs text-brand-gray-500 truncate">{trackName(e.track_id)} · {fmtDate(e.created_at)}</div>
                </div>
                <PaymentBadge status={e.payment_status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
};

const QueueRow: React.FC<{ label: string; n: number; onClick: () => void }> = ({ label, n, onClick }) => (
  <li>
    <button onClick={onClick} className="w-full flex items-center justify-between p-3 rounded-xl border border-brand-gray-200 hover:border-brand-blue/40 bg-brand-gray-50 transition-colors">
      <span className="font-semibold text-brand-navy text-sm">{label}</span>
      <span className={`text-xs font-extrabold rounded-full px-2.5 py-0.5 ${n ? 'bg-brand-amber text-brand-navy' : 'bg-brand-gray-200 text-brand-gray-500'}`}>{n}</span>
    </button>
  </li>
);

/* ------------------------------ Students ------------------------------ */

const Students: React.FC<{
  students: DbProfile[]; enrollOf: Map<string, DbEnrollment>; onChanged: () => void;
}> = ({ students, enrollOf, onChanged }) => {
  const [q, setQ] = useState('');
  const [trackF, setTrackF] = useState('all');
  const [payF, setPayF] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = students.filter((s) => {
    const e = enrollOf.get(s.id);
    const hay = `${s.full_name} ${s.email} ${s.phone}`.toLowerCase();
    return hay.includes(q.toLowerCase())
      && (trackF === 'all' || e?.track_id === trackF)
      && (payF === 'all' || e?.payment_status === payF);
  });

  return (
    <Card subtitle="Directory" title={`Students (${rows.length})`}>
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone…" className={`${inputCls} pl-10`} />
        </div>
        <select value={trackF} onChange={(e) => setTrackF(e.target.value)} className={`${inputCls} md:w-56`}>
          <option value="all">All programmes</option>
          {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        <select value={payF} onChange={(e) => setPayF(e.target.value)} className={`${inputCls} md:w-48`}>
          <option value="all">Any payment</option>
          <option value="pending">Pending</option>
          <option value="awaiting_confirmation">Awaiting confirmation</option>
          <option value="partial">Part-paid</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <EmptyState icon={Users} title="No students match" />
      ) : (
        <div className="border border-brand-gray-200 rounded-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_2fr_1.2fr_1.2fr_32px] gap-4 px-4 py-2.5 bg-brand-gray-50 text-[11px] uppercase tracking-wider font-bold text-brand-gray-500 border-b border-brand-gray-200">
            <div>Student</div><div>Programme</div><div>Payment</div><div>Joined</div><div />
          </div>
          {rows.map((s) => {
            const e = enrollOf.get(s.id);
            const open = openId === s.id;
            return (
              <div key={s.id} className="border-b border-brand-gray-100 last:border-0">
                <button onClick={() => setOpenId(open ? null : s.id)} className="w-full text-left md:grid md:grid-cols-[2fr_2fr_1.2fr_1.2fr_32px] gap-4 items-center px-4 py-3.5 hover:bg-brand-gray-50 transition-colors flex flex-col items-start">
                  <div className="min-w-0 w-full">
                    <div className="text-sm font-bold text-brand-navy truncate">{s.full_name || '—'}</div>
                    <div className="text-xs text-brand-gray-500 truncate">{s.email}</div>
                  </div>
                  <div className="text-sm text-brand-gray-700 truncate w-full">{e ? trackName(e.track_id) : '—'}</div>
                  <div>{e ? <PaymentBadge status={e.payment_status} /> : <span className="text-xs text-brand-gray-400">No enrolment</span>}</div>
                  <div className="text-xs text-brand-gray-500">{fmtDate(s.created_at)}</div>
                  <ChevronDown className={`hidden md:block w-4 h-4 text-brand-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && e && <StudentEditor profile={s} enrollment={e} onChanged={onChanged} />}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

const StudentEditor: React.FC<{ profile: DbProfile; enrollment: DbEnrollment; onChanged: () => void }> = ({ profile, enrollment, onChanged }) => {
  const [status, setStatus] = useState<PaymentStatus>(enrollment.payment_status);
  const [amount, setAmount] = useState(String(enrollment.amount_paid || 0));
  const [trackId, setTrackId] = useState(enrollment.track_id);
  const [cohort, setCohort] = useState(enrollment.cohort);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!supabase) return;
    setBusy(true);
    await supabase.from('enrollments').update({
      payment_status: status, amount_paid: Number(amount) || 0, track_id: trackId, cohort
    }).eq('id', enrollment.id);
    setBusy(false);
    onChanged();
  };

  const promoteToAdmin = async () => {
    if (!supabase || !profile.email) return;
    if (!window.confirm(`Grant Administrator privileges to ${profile.full_name || profile.email}?\n\nThey will gain access to the Admin Console, student directory, and payment verification.`)) return;
    setBusy(true);
    try {
      await supabase.rpc('promote_user_to_admin', { target_email: profile.email.toLowerCase().trim() });
    } catch {
      await supabase.from('admins').upsert({ email: profile.email.toLowerCase().trim(), role: 'admin' });
      await supabase.from('profiles').update({ role: 'admin' }).eq('id', profile.id);
    }
    setBusy(false);
    onChanged();
  };

  return (
    <div className="bg-brand-gray-50 border-t border-brand-gray-200 px-4 py-5 space-y-4">
      <div className="text-xs text-brand-gray-600 flex flex-wrap gap-x-6 gap-y-1">
        <span>Phone: <strong className="text-brand-navy">{profile.phone || '—'}</strong></span>
        <span>Country: <strong className="text-brand-navy">{profile.country || '—'}</strong></span>
        <span>Plan: <strong className="text-brand-navy">{enrollment.payment_plan === 'upfront' ? 'Full tuition' : 'Instalments'}</strong></span>
        <span>Telegram: <strong className="text-brand-navy">{enrollment.telegram_joined ? 'Joined' : 'Not yet'}</strong></span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Field label="Payment status">
          <select value={status} onChange={(e) => setStatus(e.target.value as PaymentStatus)} className={inputCls}>
            <option value="pending">Pending</option>
            <option value="awaiting_confirmation">Awaiting confirmation</option>
            <option value="partial">Part-paid</option>
            <option value="paid">Paid</option>
          </select>
        </Field>
        <Field label="Amount received (₦)">
          <input type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Programme">
          <select value={trackId} onChange={(e) => setTrackId(e.target.value)} className={inputCls}>
            {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </Field>
        <Field label="Cohort">
          <input value={cohort} onChange={(e) => setCohort(e.target.value)} className={inputCls} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-gray-200/60">
        <button disabled={busy} onClick={save} className={btnPrimary}>{busy ? 'Saving…' : 'Save changes'}</button>
        {profile.email && !profile.email.includes('Auto-syncing') && (
          <button
            type="button"
            disabled={busy}
            onClick={promoteToAdmin}
            className="text-xs font-semibold text-brand-navy hover:text-brand-blue bg-white border border-brand-gray-300 hover:border-brand-blue px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-brand-blue" />
            <span>Make Administrator</span>
          </button>
        )}
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-[11px] uppercase text-brand-gray-600 mb-1.5 font-bold">{label}</label>
    {children}
  </div>
);

/* ------------------------------ Payments ------------------------------ */

const Payments: React.FC<{
  awaiting: DbEnrollment[]; byId: Map<string, DbProfile>; settings: DbPaymentSettings | null; onChanged: () => void;
}> = ({ awaiting, byId, settings, onChanged }) => {
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [bank, setBank] = useState(settings?.bank_name || '');
  const [acctName, setAcctName] = useState(settings?.account_name || '');
  const [acctNo, setAcctNo] = useState(settings?.account_number || '');
  const [instr, setInstr] = useState(settings?.instructions || '');
  const [saved, setSaved] = useState(false);

  const confirm = async (e: DbEnrollment, status: 'paid' | 'partial') => {
    if (!supabase) return;
    const amt = Number(amounts[e.id]);
    await supabase.from('enrollments').update({
      payment_status: status, amount_paid: Number.isFinite(amt) && amt > 0 ? amt : e.amount_paid
    }).eq('id', e.id);
    onChanged();
  };

  const saveSettings = async () => {
    if (!supabase) return;
    await supabase.from('payment_settings').upsert({
      id: 1, bank_name: bank, account_name: acctName, account_number: acctNo, instructions: instr, updated_at: new Date().toISOString()
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onChanged();
  };

  return (
    <>
      <Card subtitle="Verification" title={`Awaiting confirmation (${awaiting.length})`}>
        {awaiting.length === 0 ? (
          <EmptyState icon={Wallet} title="All caught up" text="When a student clicks “I have paid”, they'll appear here." />
        ) : (
          <ul className="space-y-3">
            {awaiting.map((e) => (
              <li key={e.id} className="p-4 rounded-xl border border-brand-gray-200 bg-brand-gray-50/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-brand-navy">{byId.get(e.user_id)?.full_name || 'Student'}</div>
                  <div className="text-xs text-brand-gray-500">{trackName(e.track_id)} · {e.payment_plan === 'upfront' ? 'Full tuition' : 'Instalments'}</div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input type="number" min={0} placeholder="Amount ₦" value={amounts[e.id] || ''} onChange={(ev) => setAmounts({ ...amounts, [e.id]: ev.target.value })} className={`${inputCls} w-36 h-9`} />
                  <button onClick={() => confirm(e, 'partial')} className={btnGhost}>Part-paid</button>
                  <button onClick={() => confirm(e, 'paid')} className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 h-9 rounded-lg transition-colors">Confirm paid</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card subtitle="Student-facing" title="Account details" action={<Landmark className="w-5 h-5 text-brand-blue" />}>
        <p className="text-xs text-brand-gray-500 mb-4">These details are shown to students on their Tuition &amp; Payment tab.</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <Field label="Bank name"><input value={bank} onChange={(e) => setBank(e.target.value)} className={inputCls} /></Field>
          <Field label="Account name"><input value={acctName} onChange={(e) => setAcctName(e.target.value)} className={inputCls} /></Field>
          <Field label="Account number"><input value={acctNo} onChange={(e) => setAcctNo(e.target.value)} className={inputCls} /></Field>
        </div>
        <Field label="Instructions">
          <textarea rows={3} value={instr} onChange={(e) => setInstr(e.target.value)} className={`${inputCls} h-auto py-2.5`} />
        </Field>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={saveSettings} className={btnPrimary}>Save details</button>
          {saved && <span className="text-xs font-bold text-emerald-600">Saved ✓</span>}
        </div>
      </Card>
    </>
  );
};

/* ------------------------------ Sessions ------------------------------ */

const Sessions: React.FC<{ sessions: DbSession[]; onChanged: () => void }> = ({ sessions, onChanged }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [when, setWhen] = useState('');
  const [link, setLink] = useState('');
  const [trackId, setTrackId] = useState('');
  const [busy, setBusy] = useState(false);

  const create = async () => {
    if (!supabase || !title || !when) return;
    setBusy(true);
    await supabase.from('sessions').insert({
      title, description: desc, starts_at: new Date(when).toISOString(),
      meet_url: link || 'https://meet.google.com', track_id: trackId || null
    });
    setTitle(''); setDesc(''); setWhen(''); setLink(''); setTrackId('');
    setBusy(false);
    onChanged();
  };

  const remove = async (id: string) => {
    if (!supabase || !window.confirm('Delete this session?')) return;
    await supabase.from('sessions').delete().eq('id', id);
    onChanged();
  };

  return (
    <>
      <Card subtitle="Schedule" title="New live session">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sprint 01 Orientation" className={inputCls} /></Field>
          <Field label="Date & time"><input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className={inputCls} /></Field>
          <Field label="Google Meet link"><input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://meet.google.com/abc-defg-hij" className={inputCls} /></Field>
          <Field label="Audience">
            <select value={trackId} onChange={(e) => setTrackId(e.target.value)} className={inputCls}>
              <option value="">All programmes</option>
              {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </Field>
        </div>
        <div className="mt-3"><Field label="Description"><textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className={`${inputCls} h-auto py-2.5`} /></Field></div>
        <button disabled={busy || !title || !when} onClick={create} className={`${btnPrimary} mt-4`}>{busy ? 'Scheduling…' : 'Schedule session'}</button>
      </Card>

      <Card subtitle="All sessions" title={`Scheduled (${sessions.length})`}>
        {sessions.length === 0 ? <EmptyState icon={Video} title="No sessions yet" /> : (
          <ul className="space-y-3">
            {[...sessions].reverse().map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-brand-gray-200 bg-brand-gray-50/60">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-brand-navy truncate">{s.title}</div>
                  <div className="text-xs text-brand-gray-500">{fmtDateTime(s.starts_at)} · {trackName(s.track_id)}</div>
                </div>
                <button onClick={() => remove(s.id)} aria-label="Delete session" className="p-2 text-brand-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
};

/* ----------------------------- Submissions ---------------------------- */

const Submissions: React.FC<{ submissions: DbSubmission[]; byId: Map<string, DbProfile>; onChanged: () => void }> = ({ submissions, byId, onChanged }) => {
  const [filter, setFilter] = useState<'submitted' | 'all'>('submitted');
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const list = submissions.filter((s) => filter === 'all' || s.status === 'submitted');

  const review = async (id: string, status: 'approved' | 'changes_requested') => {
    if (!supabase) return;
    await supabase.from('submissions').update({ status, feedback: feedback[id] || '' }).eq('id', id);
    onChanged();
  };

  return (
    <Card subtitle="Mentor queue" title="Project submissions"
      action={
        <div className="flex gap-1 bg-brand-gray-100 rounded-lg p-1 text-xs font-bold">
          {(['submitted', 'all'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md transition-colors ${filter === f ? 'bg-white text-brand-navy shadow-sm' : 'text-brand-gray-500'}`}>
              {f === 'submitted' ? 'To review' : 'All'}
            </button>
          ))}
        </div>
      }>
      {list.length === 0 ? <EmptyState icon={FileCheck2} title="Nothing to review" /> : (
        <ul className="space-y-4">
          {list.map((s) => {
            const sprint = PROGRAMS.find((p) => p.id === s.track_id)?.syllabus[s.sprint_index];
            return (
              <li key={s.id} className="p-4 sm:p-5 rounded-xl border border-brand-gray-200 bg-brand-gray-50/60">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-brand-navy">{byId.get(s.user_id)?.full_name || 'Student'}</div>
                    <div className="text-xs text-brand-gray-500">{trackName(s.track_id)} · Sprint 0{s.sprint_index + 1} · {fmtDate(s.created_at)}</div>
                  </div>
                  <SubmissionBadge status={s.status} />
                </div>
                {sprint && <div className="text-xs text-brand-gray-600 mb-2">{sprint.title}</div>}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1 break-all">{s.url} <ExternalLink className="w-3 h-3 shrink-0" /></a>
                {s.note && <p className="text-xs text-brand-gray-600 mt-2 italic">“{s.note}”</p>}
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <input value={feedback[s.id] ?? s.feedback ?? ''} onChange={(e) => setFeedback({ ...feedback, [s.id]: e.target.value })} placeholder="Feedback for the student…" className={`${inputCls} h-9 flex-1`} />
                  <button onClick={() => review(s.id, 'changes_requested')} className={btnGhost}>Request changes</button>
                  <button onClick={() => review(s.id, 'approved')} className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 h-9 rounded-lg transition-colors">Approve</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

/* ---------------------------- Announcements --------------------------- */

const Announcements: React.FC<{ items: DbAnnouncement[]; onChanged: () => void }> = ({ items, onChanged }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [trackId, setTrackId] = useState('');

  const post = async () => {
    if (!supabase || !title || !body) return;
    await supabase.from('announcements').insert({ title, body, track_id: trackId || null });
    setTitle(''); setBody(''); setTrackId('');
    onChanged();
  };
  const remove = async (id: string) => {
    if (!supabase || !window.confirm('Delete this announcement?')) return;
    await supabase.from('announcements').delete().eq('id', id);
    onChanged();
  };

  return (
    <>
      <Card subtitle="Broadcast" title="New announcement">
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <Field label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} /></Field>
          <Field label="Audience">
            <select value={trackId} onChange={(e) => setTrackId(e.target.value)} className={inputCls}>
              <option value="">Everyone</option>
              {PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Message"><textarea rows={3} value={body} onChange={(e) => setBody(e.target.value)} className={`${inputCls} h-auto py-2.5`} /></Field>
        <button disabled={!title || !body} onClick={post} className={`${btnPrimary} mt-4`}>Publish</button>
      </Card>

      <Card subtitle="History" title={`Published (${items.length})`}>
        {items.length === 0 ? <EmptyState icon={Megaphone} title="No announcements yet" /> : (
          <ul className="divide-y divide-brand-gray-100">
            {items.map((a) => (
              <li key={a.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-brand-navy">{a.title}</div>
                  <div className="text-[11px] text-brand-gray-400 mb-1">{fmtDate(a.created_at)} · {a.track_id ? trackName(a.track_id) : 'Everyone'}</div>
                  <p className="text-sm text-brand-gray-600">{a.body}</p>
                </div>
                <button onClick={() => remove(a.id)} aria-label="Delete announcement" className="p-2 text-brand-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
};

/* ---------------------------- Admins & Team --------------------------- */

const AdminsManager: React.FC<{
  admins: DbAdmin[];
  profiles: DbProfile[];
  onChanged: () => void;
}> = ({ admins, profiles, onChanged }) => {
  const [newEmail, setNewEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Consolidate admin accounts
  const adminMap = useMemo(() => {
    const map = new Map<string, { email: string; name?: string; role: string; isRoot: boolean }>();

    // Root admin guarantee
    map.set('okikeenterprises@gmail.com', {
      email: 'okikeenterprises@gmail.com',
      role: 'Superadmin',
      isRoot: true
    });

    admins.forEach((a) => {
      const em = a.email.toLowerCase().trim();
      const isRoot = em === 'okikeenterprises@gmail.com';
      map.set(em, {
        email: em,
        role: isRoot ? 'Superadmin' : 'Administrator',
        isRoot
      });
    });

    profiles.filter((p) => p.role === 'admin').forEach((p) => {
      const em = p.email.toLowerCase().trim();
      const existing = map.get(em);
      map.set(em, {
        email: em,
        name: p.full_name,
        role: existing?.isRoot ? 'Superadmin' : 'Administrator',
        isRoot: Boolean(existing?.isRoot)
      });
    });

    return Array.from(map.values());
  }, [admins, profiles]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !newEmail.trim()) return;
    const target = newEmail.toLowerCase().trim();
    setBusy(true);
    setStatusMsg(null);

    try {
      const { error: rpcErr } = await supabase.rpc('promote_user_to_admin', { target_email: target });
      if (rpcErr) {
        // Fallback direct table modifications
        await supabase.from('admins').upsert({ email: target, role: 'admin' });
        await supabase.from('profiles').update({ role: 'admin' }).eq('email', target);
      }
      setNewEmail('');
      setStatusMsg({ type: 'ok', text: `Successfully granted Administrator privileges to ${target}.` });
      onChanged();
    } catch (err: any) {
      setStatusMsg({ type: 'err', text: err?.message || 'Failed to add administrator.' });
    } finally {
      setBusy(false);
    }
  };

  const handleRevokeAdmin = async (targetEmail: string) => {
    if (!supabase) return;
    if (targetEmail === 'okikeenterprises@gmail.com') return;
    if (!window.confirm(`Revoke Administrator privileges from ${targetEmail}?\n\nThey will be reverted to a standard Student role.`)) return;

    setBusy(true);
    setStatusMsg(null);

    try {
      const { error: rpcErr } = await supabase.rpc('demote_user_to_student', { target_email: targetEmail });
      if (rpcErr) {
        await supabase.from('admins').delete().eq('email', targetEmail);
        await supabase.from('profiles').update({ role: 'student' }).eq('email', targetEmail);
      }
      setStatusMsg({ type: 'ok', text: `Administrator access revoked from ${targetEmail}.` });
      onChanged();
    } catch (err: any) {
      setStatusMsg({ type: 'err', text: err?.message || 'Failed to revoke administrator.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Card subtitle="Privileges & Roles" title="Add New Administrator">
        <p className="text-xs text-brand-gray-600 mb-4 leading-relaxed">
          Administrators can access this Admin Console, view and search all registered students, verify tuition payments, host live sessions, and review sprint submissions.
        </p>
        <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              required
              placeholder="e.g. colleague@brandorax.africa"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            disabled={busy || !newEmail.trim()}
            className={`${btnPrimary} whitespace-nowrap inline-flex items-center justify-center gap-2`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{busy ? 'Adding…' : 'Grant Admin Privileges'}</span>
          </button>
        </form>

        {statusMsg && (
          <div className={`mt-4 text-xs font-semibold p-3 rounded-xl border ${
            statusMsg.type === 'ok' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {statusMsg.text}
          </div>
        )}
      </Card>

      <Card subtitle="Access Control" title={`Active Administrators (${adminMap.length})`}>
        <div className="border border-brand-gray-200 rounded-xl overflow-hidden divide-y divide-brand-gray-100">
          <div className="hidden sm:grid grid-cols-[2fr_1.5fr_1fr] gap-4 px-4 py-2.5 bg-brand-gray-50 text-[11px] uppercase tracking-wider font-bold text-brand-gray-500">
            <div>Administrator</div>
            <div>Access Level</div>
            <div className="text-right">Action</div>
          </div>
          {adminMap.map((a) => (
            <div key={a.email} className="px-4 py-3.5 flex flex-col sm:grid sm:grid-cols-[2fr_1.5fr_1fr] gap-2 sm:gap-4 sm:items-center">
              <div className="min-w-0">
                <div className="text-sm font-bold text-brand-navy truncate">
                  {a.name || a.email.split('@')[0]}
                </div>
                <div className="text-xs text-brand-gray-500 truncate">{a.email}</div>
              </div>
              <div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  a.isRoot ? 'bg-brand-navy text-brand-amber border border-brand-amber/30' : 'bg-blue-50 text-brand-blue border border-brand-blue/20'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{a.role}</span>
                </span>
              </div>
              <div className="sm:text-right">
                {a.isRoot ? (
                  <span className="text-[11px] font-semibold text-brand-gray-400 italic">Protected Root</span>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => handleRevokeAdmin(a.email)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    <UserMinus className="w-3.5 h-3.5" />
                    <span>Revoke</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
