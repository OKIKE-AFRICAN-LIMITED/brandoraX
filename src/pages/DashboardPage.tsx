import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Video, Send, BookOpen, Download, AlertCircle, Calendar, GraduationCap, ChevronRight, User, ArrowRight } from 'lucide-react';
import { StudentProfile } from '../types';
import { PROGRAMS } from '../data/programsData';

interface DashboardPageProps {
  student: StudentProfile | null;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ student }) => {
  const [telegramJoined, setTelegramJoined] = useState(false);

  // Fallback demo student if accessed without enrolling
  const activeStudent: StudentProfile = student || {
    fullName: 'Oluwaseun Adeleke',
    email: 'seun.adeleke@example.com',
    phone: '+234 812 345 6789',
    country: 'Nigeria',
    trackId: 'web-dev',
    cohort: 'Cohort 1 (Alpha)',
    paymentPlan: 'upfront',
    isEnrolled: true,
    enrollmentDate: new Date().toISOString()
  };

  const currentTrack = PROGRAMS.find((p) => p.id === activeStudent.trackId) || PROGRAMS[0];

  const checklistItems = [
    { label: 'Student Profile Created', done: true },
    { label: 'Discipline Track Assigned', done: true },
    { label: 'Tuition Arrangement Confirmed', done: true },
    { label: 'Joined Telegram Community', done: telegramJoined },
    { label: 'Orientation Live Stream (Google Meet)', done: false }
  ];

  return (
    <div className="bg-brand-gray-50 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Portal Header Banner */}
        <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-2xl shadow-brand flex flex-col md:flex-row md:items-center justify-between gap-6 border border-brand-navy-light">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-blue/30 border-2 border-brand-amber flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-inner">
              {activeStudent.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-amber font-bold bg-white/10 px-2.5 py-0.5 rounded">
                  {activeStudent.cohort}
                </span>
                <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Active Enrollment
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeStudent.fullName}
              </h1>
              <div className="text-xs font-mono text-gray-300">
                Track: <strong className="text-brand-amber">{currentTrack.title}</strong> · {activeStudent.email}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/academy/${currentTrack.slug}`}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              Syllabus
            </Link>

            <a
              href="https://t.me/brandorax_community"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-md inline-flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Cohort Chat
            </a>
          </div>
        </div>

        {/* Top Grid: Progress Checklist & Google Meet Live Session */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Enrollment Status Checklist (5 cols) */}
          <div className="md:col-span-5 bg-white border border-brand-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold">
                Induction Checklist
              </h2>
              <span className="text-xs font-mono font-bold text-brand-navy">
                {checklistItems.filter((i) => i.done).length} of {checklistItems.length} Complete
              </span>
            </div>

            <div className="space-y-3">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-mono transition-all ${
                    item.done
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-brand-gray-50 text-brand-gray-700 border border-brand-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        item.done ? 'text-emerald-600' : 'text-brand-gray-400'
                      }`}
                    />
                    <span className={item.done ? 'font-semibold' : ''}>{item.label}</span>
                  </div>

                  {!item.done && item.label.includes('Telegram') && (
                    <button
                      onClick={() => setTelegramJoined(true)}
                      className="text-[11px] font-bold uppercase text-brand-blue hover:underline bg-white px-2 py-0.5 rounded border border-brand-blue/30"
                    >
                      Confirm Joined
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Live Session on Google Meet (7 cols) */}
          <div className="md:col-span-7 bg-brand-blue-surface border border-brand-blue/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-brand-blue font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-brand-blue" />
                  Upcoming Live Google Meet Session
                </span>
                <span className="bg-brand-blue text-white font-bold px-2.5 py-0.5 rounded text-[10px] uppercase">
                  Weekend Live Stream
                </span>
              </div>

              <h3 className="text-2xl font-bold text-brand-navy mb-2">
                Sprint 01 Orientation & Environment Setup
              </h3>
              <p className="text-sm text-brand-gray-700 leading-relaxed mb-6">
                Meet your lead practitioner, walkthrough the project rubrics, set up your GitHub repository, and receive the Week 1 milestone brief.
              </p>

              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-brand-gray-200 mb-6 text-xs font-mono">
                <div>
                  <span className="text-brand-gray-400 block text-[10px] uppercase font-semibold">Date & Time</span>
                  <strong className="text-brand-navy text-sm">Saturday, 11:00 AM WAT</strong>
                </div>
                <div>
                  <span className="text-brand-gray-400 block text-[10px] uppercase font-semibold">Platform</span>
                  <strong className="text-brand-blue text-sm">Google Meet (Live Room)</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://meet.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-md inline-flex items-center gap-2 transition-colors shadow-md"
              >
                <Video className="w-4 h-4" />
                Launch Google Meet Room
              </a>

              <a
                href="https://t.me/brandorax_community"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-brand-gray-300 hover:bg-brand-gray-50 text-brand-navy text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-md inline-flex items-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-brand-blue" />
                Telegram Discussions
              </a>
            </div>
          </div>
        </div>

        {/* Learning Sprints & Milestone Deliverables */}
        <div className="bg-white border border-brand-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold mb-1">
                Active Sprints
              </h2>
              <h3 className="text-xl font-bold text-brand-navy">
                {currentTrack.title} Sprints
              </h3>
            </div>
            <span className="text-xs font-mono text-brand-gray-500 bg-brand-gray-100 px-3 py-1 rounded">
              Phase 1 LMS Foundation
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentTrack.syllabus.map((sprint, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-brand-gray-200 bg-brand-gray-50/70 hover:border-brand-blue/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-brand-blue font-bold">{sprint.week}</span>
                    <span className="bg-white px-2.5 py-0.5 rounded border border-brand-gray-200 text-brand-gray-600 font-semibold">
                      Sprint 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-brand-navy mb-2">
                    {sprint.title}
                  </h4>
                  <p className="text-xs text-brand-gray-600 leading-relaxed mb-4">
                    {sprint.description}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-brand-gray-200 text-xs font-mono flex items-center justify-between">
                  <span className="text-brand-gray-500">Milestone Artifact:</span>
                  <strong className="text-brand-blue truncate ml-2">{sprint.deliverable}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
