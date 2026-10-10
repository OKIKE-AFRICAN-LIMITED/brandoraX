import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Layers, Video, Wallet, CheckCircle2, Circle, Send, BookOpen,
  Megaphone, CalendarClock, ExternalLink, Landmark, Target, FileCheck2, Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { PROGRAMS } from '../data/programsData';
import { DashboardShell, NavItem } from '../components/dashboard/DashboardShell';
import {
  Card, StatCard, PaymentBadge, SubmissionBadge, EmptyState, ProgressBar, Spinner,
  inputCls, btnPrimary, btnGhost, fmtDate, fmtDateTime, fmtMoney
} from '../components/dashboard/ui';
import type { DbAnnouncement, DbEnrollment, DbPaymentSettings, DbSession, DbSubmission } from '../types/db';

type Tab = 'overview' | 'sprints' | 'sessions' | 'payment';

const NAV: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'sprints', label: 'Sprints & Projects', icon: Layers },
  { id: 'sessions', label: 'Live Sessions', icon: Video },
  { id: 'payment', label: 'Tuition & Payment', icon: Wallet }
];

export const DashboardPage: React.FC = () => {
  const { profile, enrollment, signOut, refresh, updateProfile, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [adminTrackId, setAdminTrackId] = useState<string>('web-dev');
  const [sessions, setSessions] = useState<DbSession[]>([]);
  const [submissions, setSubmissions] = useState<DbSubmission[]>([]);
  const [announcements, setAnnouncements] = useState<DbAnnouncement[]>([]);
  const [settings, setSettings] = useState<DbPaymentSettings | null>(null);

  const effectiveTrack = PROGRAMS.find((p) => p.id === (enrollment?.track_id || adminTrackId)) || PROGRAMS[0];
  const effectiveEnrollment: DbEnrollment = enrollment || {
    id: 'admin-preview-enrollment',
    user_id: profile?.id || 'admin',
    track_id: effectiveTrack.id,
    cohort: 'Cohort 1 (Alpha) — Admin Preview',
    payment_plan: 'upfront',
    payment_status: 'paid',
    amount_paid: 150000,
    telegram_joined: true,
    status: 'active',
    created_at: new Date().toISOString()
  };

  const handleUploadAvatar = async (file: File) => {
    if (!supabase || !profile) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert('Image size exceeds 4MB. Please choose a smaller photo.');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop() || 'png';
      const filePath = `${profile.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Avatar upload error:', uploadError);
        alert('Failed to upload image. Please verify storage permissions or network connection.');
        return;
      }

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      await updateProfile({ avatar_url: publicUrl });
      await refresh();
    } catch (err) {
      console.error('Failed to upload avatar:', err);
      alert('Failed to upload profile picture.');
    }
  };

  const load = useCallback(async () => {
    if (!supabase || !profile) return;
    const trackId = enrollment?.track_id || (isAdmin ? adminTrackId : undefined);
    const [s, sub, a, ps] = await Promise.all([
      supabase.from('sessions').select('*').order('starts_at', { ascending: true }),
      supabase.from('submissions').select('*').eq('user_id', profile.id),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(20),
      supabase.from('payment_settings').select('*').eq('id', 1).maybeSingle()
    ]);
    const mine = (x: { track_id: string | null }) => !x.track_id || x.track_id === trackId;
    setSessions(((s.data as DbSession[]) || []).filter(mine));
    setSubmissions((sub.data as DbSubmission[]) || []);
    setAnnouncements(((a.data as DbAnnouncement[]) || []).filter(mine));
    setSettings((ps.data as DbPaymentSettings) || null);
    setLoading(false);
  }, [profile, enrollment?.track_id, isAdmin, adminTrackId]);

  useEffect(() => { load(); }, [load]);

  if (!profile) return null;

  if (!isAdmin && !enrollment) {
    return (
      <DashboardShell
        portalLabel="Student Portal"
        userName={profile.full_name || 'Student'}
        userSub="Enrolment Pending"
        avatarUrl={profile.avatar_url}
        onUploadAvatar={handleUploadAvatar}
        nav={NAV}
        active="overview"
        onChange={() => {}}
        onSignOut={signOut}
      >
        <div className="bg-white border border-brand-gray-200 rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto text-center shadow-sm my-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-navy mb-2">Welcome to BrandoraX Portal</h1>
          <p className="text-sm text-brand-gray-600 mb-6 max-w-md mx-auto">
            You don't have an active programme enrolment yet. Select your preferred digital skills track to activate your curriculum, live Google Meet sessions, and project sprints.
          </p>
          <Link to="/apply" className={btnPrimary}>
            Select Programme &amp; Enrol
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const track = effectiveTrack;
  const activeEnrollment = effectiveEnrollment;

  const now = Date.now();
  const upcoming = sessions.filter((s) => new Date(s.starts_at).getTime() >= now - 2 * 3600 * 1000);
  const past = sessions.filter((s) => !upcoming.includes(s)).reverse();
  const nextSession = upcoming[0];
  const approved = submissions.filter((s) => s.status === 'approved').length;
  const total = track.syllabus.length;
  const progress = Math.round((approved / total) * 100);

  const markTelegram = async () => {
    if (!supabase) return;
    await supabase.from('enrollments').update({ telegram_joined: true }).eq('id', activeEnrollment.id);
    await refresh();
  };

  const checklist = [
    { label: 'Account & profile created', done: true },
    { label: `Programme assigned: ${track.title}`, done: true },
    { label: 'Tuition confirmed by admin', done: activeEnrollment.payment_status === 'paid' || activeEnrollment.payment_status === 'partial' },
    { label: 'Joined the Telegram cohort channel', done: activeEnrollment.telegram_joined, action: activeEnrollment.telegram_joined ? undefined : 'telegram' },
    { label: 'First project submitted', done: submissions.length > 0 }
  ];

  return (
    <DashboardShell
      portalLabel={isAdmin ? "Student Portal (Admin Preview)" : "Student Portal"}
      userName={profile.full_name || (isAdmin ? 'Admin' : 'Student')}
      userSub={activeEnrollment.cohort}
      avatarUrl={profile.avatar_url}
      onUploadAvatar={handleUploadAvatar}
      nav={NAV}
      active={tab}
      onChange={(id) => setTab(id as Tab)}
      onSignOut={signOut}
    >
      {/* Admin Preview Mode Floating Banner */}
      {isAdmin && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 shadow-sm mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-200 font-extrabold uppercase tracking-wider text-amber-900">
              Admin Preview
            </span>
            <span className="font-semibold">
              Inspecting the student learner experience. You can switch tracks to preview any curriculum.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
            <span className="font-bold text-amber-900 text-xs">Track:</span>
            <select
              value={adminTrackId}
              onChange={(e) => setAdminTrackId(e.target.value)}
              className="flex-1 sm:flex-initial h-8 px-2.5 bg-white border border-amber-300 rounded-lg text-xs font-bold text-brand-navy focus:outline-none min-w-[140px]"
            >
              {PROGRAMS.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            <Link to="/admin" className="px-3 py-1 bg-amber-200 hover:bg-amber-300 rounded-lg font-bold text-amber-950 transition-colors">
              Console →
            </Link>
          </div>
        </div>
      )}
      {loading ? <Spinner /> : (
        <>
          {tab === 'overview' && (
            <>
              {/* Hero banner */}
              <div className="relative overflow-hidden rounded-2xl bg-brand-navy text-white p-6 sm:p-8 shadow-brand border border-brand-navy-light">
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-blue/30 blur-3xl pointer-events-none" />
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] uppercase tracking-wider text-brand-amber font-bold bg-white/10 px-2.5 py-0.5 rounded">{activeEnrollment.cohort}</span>
                      <PaymentBadge status={activeEnrollment.payment_status} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome, {profile.full_name.split(' ')[0] || 'Learner'}</h1>
                    <p className="text-sm text-white/70 mt-1">{track.title} · {track.duration}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/academy/${track.slug}`} className="inline-flex items-center gap-2 h-11 px-4 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 transition-colors">
                      <BookOpen className="w-4 h-4" /> Syllabus
                    </Link>
                    <a href="https://t.me/brandorax_community" target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      <Send className="w-4 h-4" /> Cohort chat
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard icon={Target} label="Programme progress" value={`${progress}%`} hint={`${approved} of ${total} sprints approved`} tone="blue" />
                <StatCard icon={FileCheck2} label="Submissions" value={submissions.length} hint={`${submissions.filter((s) => s.status === 'changes_requested').length} need changes`} tone="green" />
                <StatCard icon={CalendarClock} label="Next live session" value={nextSession ? fmtDate(nextSession.starts_at) : '—'} hint={nextSession?.title || 'Nothing scheduled yet'} tone="amber" />
                <StatCard icon={Wallet} label="Tuition paid" value={fmtMoney(activeEnrollment.amount_paid)} hint={activeEnrollment.payment_plan === 'upfront' ? 'Full tuition plan' : 'Instalment plan'} tone="navy" />
              </div>

              <div className="grid lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3" subtitle="Next up" title={nextSession ? nextSession.title : 'No upcoming session'}>
                  {nextSession ? (
                    <>
                      <p className="text-sm text-brand-gray-600 leading-relaxed mb-5">{nextSession.description || 'Join your lead practitioner for this live session.'}</p>
                      <div className="grid sm:grid-cols-2 gap-4 bg-brand-blue-surface border border-brand-blue/15 rounded-xl p-4 mb-5 text-xs">
                        <div><span className="block text-[10px] uppercase font-semibold text-brand-gray-400">When</span><strong className="text-sm text-brand-navy">{fmtDateTime(nextSession.starts_at)}</strong></div>
                        <div><span className="block text-[10px] uppercase font-semibold text-brand-gray-400">Where</span><strong className="text-sm text-brand-blue">Google Meet</strong></div>
                      </div>
                      <a href={nextSession.meet_url || 'https://meet.google.com'} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                        <Video className="w-4 h-4" /> Join session
                      </a>
                    </>
                  ) : (
                    <EmptyState icon={Video} title="Nothing scheduled yet" text="Your admin will post live sessions here. You'll also get reminders on Telegram." />
                  )}
                </Card>

                <Card className="lg:col-span-2" subtitle="Induction" title="Getting started"
                  action={<span className="text-xs font-bold text-brand-navy">{checklist.filter((c) => c.done).length}/{checklist.length}</span>}>
                  <ul className="space-y-2.5">
                    {checklist.map((c) => (
                      <li key={c.label} className={`flex items-center gap-3 p-3 rounded-xl text-xs border ${c.done ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-brand-gray-50 border-brand-gray-200 text-brand-gray-700'}`}>
                        {c.done ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Circle className="w-4 h-4 text-brand-gray-400 shrink-0" />}
                        <span className={`flex-1 ${c.done ? 'font-semibold' : ''}`}>{c.label}</span>
                        {c.action === 'telegram' && (
                          <button onClick={markTelegram} className="text-[10px] font-bold uppercase text-brand-blue border border-brand-blue/30 bg-white rounded px-2 py-0.5 hover:underline">Done</button>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Card subtitle="Updates" title="Announcements">
                {announcements.length === 0 ? (
                  <EmptyState icon={Megaphone} title="No announcements yet" text="Important updates from the BrandoraX team will show up here." />
                ) : (
                  <ul className="divide-y divide-brand-gray-100">
                    {announcements.slice(0, 5).map((a) => (
                      <li key={a.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <h3 className="text-sm font-bold text-brand-navy">{a.title}</h3>
                          <span className="text-[11px] text-brand-gray-400 whitespace-nowrap">{fmtDate(a.created_at)}</span>
                        </div>
                        <p className="text-sm text-brand-gray-600 leading-relaxed">{a.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </>
          )}

          {tab === 'sprints' && (
            <SprintsTab
              trackId={track.id}
              userId={profile.id}
              syllabus={track.syllabus}
              submissions={submissions}
              onChanged={load}
              progress={progress}
            />
          )}

          {tab === 'sessions' && (
            <Card subtitle="Schedule" title="Live sessions">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gray-500 mb-3">Upcoming</h3>
              {upcoming.length === 0 ? (
                <EmptyState icon={CalendarClock} title="No upcoming sessions" />
              ) : (
                <ul className="space-y-3 mb-8">
                  {upcoming.map((s) => <SessionRow key={s.id} s={s} live />)}
                </ul>
              )}
              {past.length > 0 && (
                <>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gray-500 mb-3 mt-6">Past</h3>
                  <ul className="space-y-3 opacity-80">{past.slice(0, 10).map((s) => <SessionRow key={s.id} s={s} />)}</ul>
                </>
              )}
            </Card>
          )}

          {tab === 'payment' && (
            <PaymentTab
              enrollmentId={activeEnrollment.id}
              status={activeEnrollment.payment_status}
              plan={activeEnrollment.payment_plan}
              paid={activeEnrollment.amount_paid}
              tuition={activeEnrollment.payment_plan === 'upfront' ? track.tuition.upfront : track.tuition.installments}
              settings={settings}
              onChanged={refresh}
            />
          )}
        </>
      )}
    </DashboardShell>
  );
};

/* ---------------------------------------------------------------- */

const SessionRow: React.FC<{ s: DbSession; live?: boolean }> = ({ s, live }) => (
  <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-brand-gray-200 bg-brand-gray-50/60">
    <div className="flex items-start gap-3 min-w-0">
      <div className="w-10 h-10 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0"><Video className="w-4 h-4" /></div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-brand-navy">{s.title}</div>
        <div className="text-xs text-brand-gray-500 flex items-center gap-1.5 mt-0.5"><Clock className="w-3 h-3" />{fmtDateTime(s.starts_at)}</div>
        {s.description && <p className="text-xs text-brand-gray-600 mt-1.5">{s.description}</p>}
      </div>
    </div>
    {live && (
      <a href={s.meet_url || 'https://meet.google.com'} target="_blank" rel="noopener noreferrer" className={`${btnGhost} shrink-0`}>
        Join <ExternalLink className="w-3.5 h-3.5" />
      </a>
    )}
  </li>
);

const SprintsTab: React.FC<{
  trackId: string; userId: string; progress: number;
  syllabus: { week: string; title: string; description: string; deliverable: string }[];
  submissions: DbSubmission[]; onChanged: () => void;
}> = ({ trackId, userId, syllabus, submissions, onChanged, progress }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const byIdx = useMemo(() => new Map(submissions.map((s) => [s.sprint_index, s])), [submissions]);

  const open = (idx: number) => {
    const ex = byIdx.get(idx);
    setOpenIdx(openIdx === idx ? null : idx);
    setUrl(ex?.url || '');
    setNote(ex?.note || '');
    setErr(null);
  };

  const submit = async (idx: number, title: string) => {
    if (!supabase) return;
    if (!/^https?:\/\//i.test(url.trim())) { setErr('Enter a full link starting with https://'); return; }
    setBusy(true);
    const { error } = await supabase.from('submissions').upsert(
      { user_id: userId, track_id: trackId, sprint_index: idx, title, url: url.trim(), note: note.trim(), status: 'submitted', feedback: '' },
      { onConflict: 'user_id,track_id,sprint_index' }
    );
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setOpenIdx(null);
    onChanged();
  };

  return (
    <>
      <Card subtitle="Your journey" title="Sprints & milestone projects">
        <div className="flex items-center gap-4">
          <div className="flex-1"><ProgressBar value={progress} /></div>
          <span className="text-sm font-extrabold text-brand-navy">{progress}%</span>
        </div>
        <p className="text-xs text-brand-gray-500 mt-2">A sprint counts as complete once a mentor approves your submission.</p>
      </Card>

      <div className="space-y-4">
        {syllabus.map((sp, idx) => {
          const sub = byIdx.get(idx);
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="bg-white border border-brand-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-brand-blue">{sp.week}</span>
                    <span className="bg-brand-gray-100 text-brand-gray-600 font-semibold px-2 py-0.5 rounded">Sprint 0{idx + 1}</span>
                  </div>
                  {sub ? <SubmissionBadge status={sub.status} /> : <span className="text-[11px] font-bold text-brand-gray-400">Not submitted</span>}
                </div>
                <h3 className="text-base font-extrabold text-brand-navy mb-1.5">{sp.title}</h3>
                <p className="text-sm text-brand-gray-600 leading-relaxed mb-4">{sp.description}</p>
                <div className="text-xs bg-brand-gray-50 border border-brand-gray-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-brand-gray-500 shrink-0">Deliverable:</span>
                  <strong className="text-brand-blue font-semibold">{sp.deliverable}</strong>
                </div>

                {sub?.feedback && (
                  <div className="mt-3 text-xs bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-900">
                    <strong>Mentor feedback:</strong> {sub.feedback}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {sub && <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1">View submission <ExternalLink className="w-3 h-3" /></a>}
                  {sub?.status !== 'approved' && (
                    <button onClick={() => open(idx)} className={btnGhost}>{sub ? 'Update submission' : 'Submit project'}</button>
                  )}
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-brand-gray-200 bg-brand-gray-50 p-5 sm:p-6 space-y-3">
                  <div>
                    <label className="block text-xs uppercase text-brand-gray-600 mb-1.5 font-bold">Project link (live URL or GitHub)</label>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://github.com/you/project" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-brand-gray-600 mb-1.5 font-bold">Note for your mentor (optional)</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className={`${inputCls} h-auto py-2.5`} />
                  </div>
                  {err && <div className="text-xs font-semibold text-red-600">{err}</div>}
                  <button disabled={busy} onClick={() => submit(idx, sp.deliverable)} className={btnPrimary}>{busy ? 'Submitting…' : 'Send for review'}</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

const PaymentTab: React.FC<{
  enrollmentId: string; status: string; plan: string; paid: number; tuition: string;
  settings: DbPaymentSettings | null; onChanged: () => void;
}> = ({ enrollmentId, status, plan, paid, tuition, settings, onChanged }) => {
  const [busy, setBusy] = useState(false);
  const hasBank = settings?.account_number;

  const iPaid = async () => {
    if (!supabase) return;
    setBusy(true);
    await supabase.from('enrollments').update({ payment_status: 'awaiting_confirmation' }).eq('id', enrollmentId);
    setBusy(false);
    onChanged();
  };

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Wallet} label="Plan" value={plan === 'upfront' ? 'Full tuition' : 'Instalments'} hint={tuition} tone="blue" />
        <StatCard icon={CheckCircle2} label="Amount confirmed" value={fmtMoney(paid)} tone="green" />
        <div className="bg-white border border-brand-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center gap-2">
          <div className="text-[11px] uppercase tracking-wider font-bold text-brand-gray-500">Status</div>
          <div><PaymentBadge status={status as never} /></div>
        </div>
      </div>

      <Card subtitle="Bank transfer" title="How to pay" action={<Landmark className="w-5 h-5 text-brand-blue" />}>
        {hasBank ? (
          <dl className="grid sm:grid-cols-3 gap-4 bg-brand-blue-surface border border-brand-blue/15 rounded-xl p-4 mb-4 text-sm">
            <div><dt className="text-[10px] uppercase font-semibold text-brand-gray-400">Bank</dt><dd className="font-bold text-brand-navy">{settings?.bank_name}</dd></div>
            <div><dt className="text-[10px] uppercase font-semibold text-brand-gray-400">Account name</dt><dd className="font-bold text-brand-navy">{settings?.account_name}</dd></div>
            <div><dt className="text-[10px] uppercase font-semibold text-brand-gray-400">Account number</dt><dd className="font-extrabold text-brand-blue tracking-wider">{settings?.account_number}</dd></div>
          </dl>
        ) : (
          <div className="text-sm text-brand-gray-500 bg-brand-gray-50 border border-brand-gray-200 rounded-xl p-4 mb-4">
            Account details haven't been added yet. The admin team will share them with you shortly.
          </div>
        )}
        <p className="text-sm text-brand-gray-600 leading-relaxed mb-5">{settings?.instructions}</p>

        {status === 'pending' && (
          <button disabled={busy} onClick={iPaid} className={btnPrimary}>{busy ? 'Saving…' : 'I have made the payment'}</button>
        )}
        {status === 'awaiting_confirmation' && (
          <div className="text-sm font-semibold text-brand-blue bg-blue-50 border border-blue-200 rounded-xl p-4">Thanks! Admin is verifying your transfer and will confirm shortly.</div>
        )}
        {status === 'paid' && (
          <div className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-4">Your tuition is fully confirmed. Enjoy the programme!</div>
        )}
        {status === 'partial' && (
          <button disabled={busy} onClick={iPaid} className={btnPrimary}>{busy ? 'Saving…' : 'I have paid another instalment'}</button>
        )}
      </Card>
    </>
  );
};
