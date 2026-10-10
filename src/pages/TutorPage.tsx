import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, Video, FileCheck2, Megaphone, Search,
  GraduationCap, Clock, ExternalLink, RefreshCw, CheckCircle2,
  AlertCircle, MessageSquare, Plus, Calendar, BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { PROGRAMS } from '../data/programsData';
import { DashboardShell, NavItem } from '../components/dashboard/DashboardShell';
import {
  Card, StatCard, SubmissionBadge, EmptyState, Spinner,
  inputCls, btnPrimary, btnGhost, fmtDateTime
} from '../components/dashboard/ui';
import type {
  DbAnnouncement, DbEnrollment, DbProfile, DbSession, DbSubmission, SubmissionStatus
} from '../types/db';

type Tab = 'overview' | 'submissions' | 'sessions' | 'students' | 'announcements';

const trackName = (id: string | null) => (id ? PROGRAMS.find((p) => p.id === id)?.title || id : 'All tracks');

export const TutorPage: React.FC = () => {
  const { profile, signOut, refresh, updateProfile } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  
  const [profiles, setProfiles] = useState<DbProfile[]>([]);
  const [enrollments, setEnrollments] = useState<DbEnrollment[]>([]);
  const [submissions, setSubmissions] = useState<DbSubmission[]>([]);
  const [sessions, setSessions] = useState<DbSession[]>([]);
  const [announcements, setAnnouncements] = useState<DbAnnouncement[]>([]);

  // Grading Modal State
  const [gradingSub, setGradingSub] = useState<DbSubmission | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [gradeStatus, setGradeStatus] = useState<SubmissionStatus>('approved');
  const [savingGrade, setSavingGrade] = useState(false);

  // New Session State
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDesc, setSessionDesc] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionMeetUrl, setSessionMeetUrl] = useState('https://meet.google.com/');
  const [sessionTrackId, setSessionTrackId] = useState<string>('web-dev');
  const [savingSession, setSavingSession] = useState(false);

  // New Announcement State
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceBody, setAnnounceBody] = useState('');
  const [announceTrackId, setAnnounceTrackId] = useState<string>('all');
  const [savingAnnounce, setSavingAnnounce] = useState(false);

  const [studentSearch, setStudentSearch] = useState('');

  const load = useCallback(async () => {
    if (!supabase) return;
    setRefreshing(true);
    const [p, e, s, se, a] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('enrollments').select('*').order('created_at', { ascending: false }),
      supabase.from('submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('sessions').select('*').order('starts_at', { ascending: true }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false })
    ]);

    setProfiles((p.data as DbProfile[]) || []);
    setEnrollments((e.data as DbEnrollment[]) || []);
    setSubmissions((s.data as DbSubmission[]) || []);
    setSessions((se.data as DbSession[]) || []);
    setAnnouncements((a.data as DbAnnouncement[]) || []);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);

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
        alert('Failed to upload image.');
        return;
      }

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: urlData.publicUrl });
      await refresh();
    } catch (err) {
      console.error('Failed to upload avatar:', err);
      alert('Failed to upload profile picture.');
    }
  };

  // Filtered dataset by track
  const filteredSubmissions = useMemo(() => {
    if (selectedTrack === 'all') return submissions;
    return submissions.filter((s) => s.track_id === selectedTrack);
  }, [submissions, selectedTrack]);

  const pendingSubmissions = useMemo(() => {
    return filteredSubmissions.filter((s) => s.status === 'submitted');
  }, [filteredSubmissions]);

  const filteredEnrollments = useMemo(() => {
    let list = enrollments;
    if (selectedTrack !== 'all') {
      list = list.filter((e) => e.track_id === selectedTrack);
    }
    if (studentSearch.trim()) {
      const q = studentSearch.toLowerCase();
      list = list.filter((e) => {
        const student = profiles.find((p) => p.id === e.user_id);
        return (
          student?.full_name?.toLowerCase().includes(q) ||
          student?.email?.toLowerCase().includes(q) ||
          e.cohort.toLowerCase().includes(q)
        );
      });
    }
    return list;
  }, [enrollments, selectedTrack, studentSearch, profiles]);

  const upcomingSessions = useMemo(() => {
    const now = Date.now();
    return sessions.filter((s) => new Date(s.starts_at).getTime() >= now - 2 * 3600 * 1000);
  }, [sessions]);

  // Submission review action
  const openGradeModal = (sub: DbSubmission) => {
    setGradingSub(sub);
    setFeedbackText(sub.feedback || '');
    setGradeStatus(sub.status === 'submitted' ? 'approved' : sub.status);
  };

  const saveGrade = async () => {
    if (!supabase || !gradingSub) return;
    setSavingGrade(true);
    try {
      await supabase.from('submissions').update({
        status: gradeStatus,
        feedback: feedbackText
      }).eq('id', gradingSub.id);

      setSubmissions((prev) =>
        prev.map((s) => s.id === gradingSub.id ? { ...s, status: gradeStatus, feedback: feedbackText } : s)
      );
      setGradingSub(null);
    } finally {
      setSavingGrade(false);
    }
  };

  // Create session action
  const createSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSavingSession(true);
    try {
      const dt = new Date(`${sessionDate}T${sessionTime || '18:00'}`);
      const { data, error } = await supabase.from('sessions').insert({
        title: sessionTitle.trim(),
        description: sessionDesc.trim(),
        starts_at: dt.toISOString(),
        meet_url: sessionMeetUrl.trim() || 'https://meet.google.com/',
        track_id: sessionTrackId === 'all' ? null : sessionTrackId
      }).select().single();

      if (!error && data) {
        setSessions((prev) => [...prev, data as DbSession].sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()));
        setShowSessionModal(false);
        setSessionTitle('');
        setSessionDesc('');
        setSessionDate('');
        setSessionTime('');
      }
    } finally {
      setSavingSession(false);
    }
  };

  // Create announcement action
  const createAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSavingAnnounce(true);
    try {
      const { data, error } = await supabase.from('announcements').insert({
        title: announceTitle.trim(),
        body: announceBody.trim(),
        track_id: announceTrackId === 'all' ? null : announceTrackId
      }).select().single();

      if (!error && data) {
        setAnnouncements((prev) => [data as DbAnnouncement, ...prev]);
        setShowAnnounceModal(false);
        setAnnounceTitle('');
        setAnnounceBody('');
      }
    } finally {
      setSavingAnnounce(false);
    }
  };

  const NAV: NavItem[] = [
    { id: 'overview', label: 'Tutor Overview', icon: LayoutDashboard },
    { id: 'submissions', label: 'Review Submissions', icon: FileCheck2, badge: pendingSubmissions.length },
    { id: 'sessions', label: 'Live Mentoring', icon: Video },
    { id: 'students', label: 'My Students', icon: Users, badge: filteredEnrollments.length },
    { id: 'announcements', label: 'Announcements', icon: Megaphone }
  ];

  return (
    <DashboardShell
      portalLabel="Tutor Portal"
      userName={profile?.full_name || 'Tutor'}
      userSub="Instructor & Mentor"
      avatarUrl={profile?.avatar_url}
      onUploadAvatar={handleUploadAvatar}
      nav={NAV}
      active={tab}
      onChange={(id) => setTab(id as Tab)}
      onSignOut={signOut}
    >
      {/* Top Track Filter Banner */}
      <div className="bg-white border border-brand-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-brand-navy">Instructor Workstation</h2>
            <p className="text-xs text-brand-gray-500">Mentoring, grading sprints, and leading live workshops.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-brand-gray-500 uppercase tracking-wider shrink-0">Track:</label>
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="flex-1 sm:flex-initial h-10 px-3 bg-brand-gray-50 border border-brand-gray-300 rounded-xl text-xs font-bold text-brand-navy focus:outline-none focus:border-brand-blue min-w-[150px]"
          >
            <option value="all">All Tracks Overview</option>
            {PROGRAMS.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          <button
            onClick={load}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-brand-gray-200 text-brand-gray-500 hover:text-brand-navy hover:bg-brand-gray-100 transition-colors shrink-0"
            title="Refresh portal data"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-brand-blue' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? <Spinner label="Loading tutor workspace…" /> : (
        <>
          {/* TAB 1: OVERVIEW */}
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                  icon={Users}
                  label="Enrolled Learners"
                  value={filteredEnrollments.length}
                  hint="Students currently assigned"
                />
                <StatCard
                  icon={FileCheck2}
                  label="Pending Reviews"
                  value={pendingSubmissions.length}
                  hint="Sprints awaiting grading"
                />
                <StatCard
                  icon={Video}
                  label="Upcoming Classes"
                  value={upcomingSessions.length}
                  hint="Scheduled Google Meet sessions"
                />
                <StatCard
                  icon={CheckCircle2}
                  label="Reviewed Projects"
                  value={filteredSubmissions.filter((s) => s.status === 'approved').length}
                  hint="Approved student deliverables"
                />
              </div>

              {/* Action Rows */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Pending Submissions Fast Queue */}
                <Card
                  title="Needs Grading"
                  subtitle="Sprint Submissions"
                  action={
                    <button onClick={() => setTab('submissions')} className="text-xs font-bold text-brand-blue hover:underline">
                      View all ({filteredSubmissions.length}) →
                    </button>
                  }
                >
                  {pendingSubmissions.length === 0 ? (
                    <EmptyState
                      icon={CheckCircle2}
                      title="All caught up!"
                      text="No pending student submissions waiting for your feedback right now."
                    />
                  ) : (
                    <div className="divide-y divide-brand-gray-100">
                      {pendingSubmissions.slice(0, 5).map((sub) => {
                        const student = profiles.find((p) => p.id === sub.user_id);
                        return (
                          <div key={sub.id} className="py-3.5 flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-brand-navy truncate">
                                  {student?.full_name || 'Student'}
                                </span>
                                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-semibold border border-blue-100">
                                  Sprint {sub.sprint_index + 1}
                                </span>
                              </div>
                              <p className="text-xs text-brand-gray-500 truncate">{sub.title}</p>
                            </div>
                            <button
                              onClick={() => openGradeModal(sub)}
                              className="px-3.5 py-1.5 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-blue-hover shrink-0 transition-colors"
                            >
                              Grade
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>

                {/* Next Live Mentoring Sessions */}
                <Card
                  title="Next Mentoring Sessions"
                  subtitle="Live Interactive Workshops"
                  action={
                    <button
                      onClick={() => setShowSessionModal(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Schedule</span>
                    </button>
                  }
                >
                  {upcomingSessions.length === 0 ? (
                    <EmptyState
                      icon={Video}
                      title="No upcoming live classes"
                      text="Schedule your next live Google Meet workshop for your learners."
                    />
                  ) : (
                    <div className="space-y-3">
                      {upcomingSessions.slice(0, 4).map((s) => (
                        <div key={s.id} className="p-3.5 rounded-xl bg-brand-gray-50 border border-brand-gray-200 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-brand-navy truncate">{s.title}</h4>
                            <div className="text-[11px] text-brand-gray-500 flex items-center gap-2 mt-0.5">
                              <span>{fmtDateTime(s.starts_at)}</span>
                              <span>•</span>
                              <span className="text-brand-blue font-semibold">{trackName(s.track_id)}</span>
                            </div>
                          </div>
                          {s.meet_url && (
                            <a
                              href={s.meet_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shrink-0"
                            >
                              <span>Join Meet</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* TAB 2: SUBMISSIONS & GRADING QUEUE */}
          {tab === 'submissions' && (
            <Card
              title="Student Submissions & Sprint Reviews"
              subtitle={`Showing ${filteredSubmissions.length} deliverables across tracks`}
            >
              {filteredSubmissions.length === 0 ? (
                <EmptyState
                  icon={FileCheck2}
                  title="No submissions found"
                  text="Students will submit their project sprint deliverables here."
                />
              ) : (
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-gray-50 border-y border-brand-gray-200 text-brand-gray-500 font-bold uppercase">
                      <tr>
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Track &amp; Sprint</th>
                        <th className="py-3 px-4">Project Deliverable</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gray-100">
                      {filteredSubmissions.map((sub) => {
                        const student = profiles.find((p) => p.id === sub.user_id);
                        return (
                          <tr key={sub.id} className="hover:bg-brand-gray-50/60 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-brand-navy">
                              <div>{student?.full_name || 'Student'}</div>
                              <div className="text-[11px] text-brand-gray-400 font-normal">{student?.email}</div>
                            </td>
                            <td className="py-3.5 px-4 text-brand-gray-600">
                              <div className="font-semibold text-brand-navy">{trackName(sub.track_id)}</div>
                              <div className="text-[11px] text-brand-gray-500">Sprint {sub.sprint_index + 1}</div>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <div className="font-bold text-brand-navy truncate">{sub.title}</div>
                              <a
                                href={sub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-brand-blue hover:underline inline-flex items-center gap-1 font-semibold mt-0.5"
                              >
                                <span>Inspect Project Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              {sub.note && (
                                <p className="text-[11px] text-brand-gray-500 italic mt-1 line-clamp-1">"{sub.note}"</p>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <SubmissionBadge status={sub.status} />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => openGradeModal(sub)}
                                className="px-3.5 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-bold hover:bg-brand-blue transition-colors"
                              >
                                Review &amp; Grade
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}

          {/* TAB 3: LIVE SESSIONS SCHEDULER */}
          {tab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-brand-navy">Live Mentoring Classes</h3>
                  <p className="text-xs text-brand-gray-500">Host interactive live Google Meet reviews and Q&amp;A sessions.</p>
                </div>
                <button
                  onClick={() => setShowSessionModal(true)}
                  className={`${btnPrimary} text-xs`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Live Class</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sessions.map((s) => (
                  <div key={s.id} className="bg-white border border-brand-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100">
                          {trackName(s.track_id)}
                        </span>
                        <span className="text-xs text-brand-gray-400 font-semibold">
                          {fmtDateTime(s.starts_at)}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-brand-navy mb-1.5">{s.title}</h4>
                      {s.description && (
                        <p className="text-xs text-brand-gray-500 mb-4 line-clamp-2">{s.description}</p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-brand-gray-100 flex items-center justify-between">
                      <a
                        href={s.meet_url || 'https://meet.google.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-lg transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Google Meet</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MY STUDENTS ROSTER */}
          {tab === 'students' && (
            <Card
              title="Track Learners"
              subtitle={`Showing ${filteredEnrollments.length} students enrolled in your tracks`}
              action={
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-brand-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search learner name or email…"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 bg-brand-gray-50 border border-brand-gray-200 rounded-lg text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
                  />
                </div>
              }
            >
              {filteredEnrollments.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No learners matched"
                  text="Try adjusting your search query or track filter."
                />
              ) : (
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-gray-50 border-y border-brand-gray-200 text-brand-gray-500 font-bold uppercase">
                      <tr>
                        <th className="py-3 px-4">Learner</th>
                        <th className="py-3 px-4">Track</th>
                        <th className="py-3 px-4">Cohort</th>
                        <th className="py-3 px-4">Completed Sprints</th>
                        <th className="py-3 px-4">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gray-100">
                      {filteredEnrollments.map((enr) => {
                        const student = profiles.find((p) => p.id === enr.user_id);
                        const studentSubs = submissions.filter((s) => s.user_id === enr.user_id && s.status === 'approved');
                        return (
                          <tr key={enr.id} className="hover:bg-brand-gray-50/60 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-brand-navy">
                              <div className="flex items-center gap-2.5">
                                {student?.avatar_url ? (
                                  <img src={student.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover" />
                                ) : (
                                  <div className="w-7 h-7 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center text-xs">
                                    {student?.full_name?.charAt(0) || 'S'}
                                  </div>
                                )}
                                <div>
                                  <div>{student?.full_name || 'Enrolled Student'}</div>
                                  <div className="text-[11px] text-brand-gray-400 font-normal">{student?.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-brand-navy">
                              {trackName(enr.track_id)}
                            </td>
                            <td className="py-3.5 px-4 text-brand-gray-600">
                              <span className="px-2 py-0.5 rounded bg-brand-gray-100 font-semibold text-brand-navy">
                                {enr.cohort}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-brand-navy font-semibold">
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold">{studentSubs.length} approved</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-brand-gray-500">
                              <div>{student?.phone || 'No phone'}</div>
                              <div className="text-[11px] text-brand-gray-400">{student?.country || 'Nigeria'}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}

          {/* TAB 5: ANNOUNCEMENTS */}
          {tab === 'announcements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-brand-navy">Track Announcements</h3>
                  <p className="text-xs text-brand-gray-500">Post announcements and learning resources for your learners.</p>
                </div>
                <button
                  onClick={() => setShowAnnounceModal(true)}
                  className={`${btnPrimary} text-xs`}
                >
                  <Plus className="w-4 h-4" />
                  <span>New Announcement</span>
                </button>
              </div>

              <div className="space-y-4">
                {announcements.map((a) => (
                  <div key={a.id} className="bg-white border border-brand-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        {trackName(a.track_id)}
                      </span>
                      <span className="text-xs text-brand-gray-400">
                        {fmtDateTime(a.created_at)}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-brand-navy mb-2">{a.title}</h4>
                    <p className="text-xs text-brand-gray-600 leading-relaxed whitespace-pre-wrap">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* MODAL 1: REVIEW & GRADE SUBMISSION */}
      {gradingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-brand-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-extrabold text-brand-navy mb-1">Grade Sprint Deliverable</h3>
            <p className="text-xs text-brand-gray-500 mb-4">Review the student's project and provide actionable mentor feedback.</p>

            <div className="p-4 bg-brand-gray-50 rounded-xl mb-4 text-xs space-y-1.5 border border-brand-gray-200">
              <div><strong className="text-brand-navy">Project:</strong> {gradingSub.title}</div>
              <div><strong className="text-brand-navy">Deliverable URL:</strong> <a href={gradingSub.url} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline break-all font-semibold">{gradingSub.url}</a></div>
              {gradingSub.note && <div><strong className="text-brand-navy">Student note:</strong> "{gradingSub.note}"</div>}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1.5">Decision</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGradeStatus('approved')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      gradeStatus === 'approved'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                        : 'border-brand-gray-200 text-brand-gray-600 hover:bg-brand-gray-50'
                    }`}
                  >
                    ✓ Approve Deliverable
                  </button>
                  <button
                    type="button"
                    onClick={() => setGradeStatus('changes_requested')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      gradeStatus === 'changes_requested'
                        ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-sm'
                        : 'border-brand-gray-200 text-brand-gray-600 hover:bg-brand-gray-50'
                    }`}
                  >
                    ⚠ Request Changes
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1.5">Mentor Feedback</label>
                <textarea
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Give specific praise, code review suggestions, or instructions for changes…"
                  className="w-full p-3 bg-brand-gray-50 border border-brand-gray-300 rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setGradingSub(null)}
                  className={btnGhost}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveGrade}
                  disabled={savingGrade}
                  className={btnPrimary}
                >
                  {savingGrade ? 'Saving Grade…' : 'Submit Review'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SCHEDULE LIVE CLASS */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-brand-gray-200">
            <h3 className="text-lg font-extrabold text-brand-navy mb-1">Schedule Live Class</h3>
            <p className="text-xs text-brand-gray-500 mb-4">Set up an upcoming mentoring workshop or live Q&amp;A session.</p>

            <form onSubmit={createSession} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Session Title</label>
                <input
                  type="text" required placeholder="e.g. Sprint 2 Live Code Review & Debugging"
                  value={sessionTitle} onChange={(e) => setSessionTitle(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Date</label>
                  <input
                    type="date" required
                    value={sessionDate} onChange={(e) => setSessionDate(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Time</label>
                  <input
                    type="time" required
                    value={sessionTime} onChange={(e) => setSessionTime(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Google Meet Link</label>
                <input
                  type="url" required placeholder="https://meet.google.com/xyz-abc-def"
                  value={sessionMeetUrl} onChange={(e) => setSessionMeetUrl(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Audience Track</label>
                <select
                  value={sessionTrackId} onChange={(e) => setSessionTrackId(e.target.value)}
                  className={inputCls}
                >
                  <option value="all">All Tracks</option>
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Session Description</label>
                <textarea
                  rows={2} placeholder="Optional agenda or preparation checklist for students…"
                  value={sessionDesc} onChange={(e) => setSessionDesc(e.target.value)}
                  className="w-full p-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowSessionModal(false)} className={btnGhost}>Cancel</button>
                <button type="submit" disabled={savingSession} className={btnPrimary}>
                  {savingSession ? 'Scheduling…' : 'Schedule Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: NEW ANNOUNCEMENT */}
      {showAnnounceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-brand-gray-200">
            <h3 className="text-lg font-extrabold text-brand-navy mb-1">Post Announcement</h3>
            <p className="text-xs text-brand-gray-500 mb-4">Send a notice or milestone announcement to your students.</p>

            <form onSubmit={createAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Announcement Title</label>
                <input
                  type="text" required placeholder="e.g. Mid-term Sprint Feedback is Live!"
                  value={announceTitle} onChange={(e) => setAnnounceTitle(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Target Track</label>
                <select
                  value={announceTrackId} onChange={(e) => setAnnounceTrackId(e.target.value)}
                  className={inputCls}
                >
                  <option value="all">Broadcast to All Tracks</option>
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-gray-600 mb-1">Body Text</label>
                <textarea
                  rows={4} required placeholder="Write your announcement details…"
                  value={announceBody} onChange={(e) => setAnnounceBody(e.target.value)}
                  className="w-full p-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAnnounceModal(false)} className={btnGhost}>Cancel</button>
                <button type="submit" disabled={savingAnnounce} className={btnPrimary}>
                  {savingAnnounce ? 'Publishing…' : 'Publish Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default TutorPage;
