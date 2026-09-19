import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Video, Send, BookOpen, Download, AlertCircle, Calendar, GraduationCap, ChevronRight, User } from 'lucide-react';
import { StudentProfile } from '../types';
import { PROGRAMS } from '../data/programsData';

interface StudentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  isOpen,
  onClose,
  student
}) => {
  const [telegramJoined, setTelegramJoined] = useState(false);

  if (!isOpen) return null;

  const currentTrack = PROGRAMS.find((p) => p.id === student?.trackId) || PROGRAMS[0];

  const checklistItems = [
    { label: 'Student Profile Created', done: true },
    { label: 'Discipline Track Assigned', done: true },
    { label: 'Tuition Arrangement Confirmed', done: true },
    { label: 'Joined Telegram Community', done: telegramJoined },
    { label: 'Orientation Live Stream (Google Meet)', done: false }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-navy/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-brand-gray-200 relative my-auto">
        {/* Top Portal Header */}
        <div className="p-6 sm:p-8 border-b border-brand-gray-200 bg-brand-navy text-white rounded-t-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-blue/30 border-2 border-brand-amber flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {student?.fullName ? student.fullName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-amber font-bold">
                  {student?.cohort || 'Cohort 1'}
                </span>
                <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">
                  Active Learner
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                {student?.fullName || 'Welcome, Learner'}
              </h2>
              <div className="text-xs font-mono text-gray-300">
                Track: <strong className="text-brand-amber">{currentTrack.title}</strong> · {student?.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Top Row: Enrollment Progress & Next Live Class Countdown */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Enrollment Status Checklist (5/12) */}
            <div className="md:col-span-5 bg-brand-gray-50 border border-brand-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold">
                  Enrollment Readiness
                </h3>
                <span className="text-xs font-mono font-bold text-brand-navy">
                  {checklistItems.filter((i) => i.done).length} of {checklistItems.length} Complete
                </span>
              </div>

              <div className="space-y-2.5">
                {checklistItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-mono ${
                      item.done
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-white text-brand-gray-600 border border-brand-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          item.done ? 'text-emerald-600' : 'text-brand-gray-300'
                        }`}
                      />
                      <span className={item.done ? 'font-semibold' : ''}>{item.label}</span>
                    </div>

                    {!item.done && item.label.includes('Telegram') && (
                      <button
                        onClick={() => setTelegramJoined(true)}
                        className="text-[10px] font-bold uppercase text-brand-blue hover:underline"
                      >
                        Confirm Joined
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Live Session / Google Meet Card (7/12) */}
            <div className="md:col-span-7 bg-brand-blue-surface border border-brand-blue/30 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-brand-blue font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-brand-blue" />
                    Upcoming Live Induction Session
                  </span>
                  <span className="bg-brand-blue text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                    Live Stream
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  Sprint 01 Orientation & GitHub Setup
                </h3>
                <p className="text-xs text-brand-gray-600 leading-relaxed mb-4">
                  Meet your lead practitioner tutor, walkthrough the project grading rubric, setup your environment, and receive your Week 1 brief.
                </p>

                <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded-lg border border-brand-gray-200 mb-4 text-xs font-mono">
                  <div>
                    <span className="text-brand-gray-400 block text-[10px] uppercase">Date & Time</span>
                    <strong className="text-brand-navy">Saturday, 11:00 AM WAT</strong>
                  </div>
                  <div>
                    <span className="text-brand-gray-400 block text-[10px] uppercase">Platform</span>
                    <strong className="text-brand-blue">Google Meet (Encrypted)</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded inline-flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Video className="w-4 h-4" />
                  Launch Google Meet Room
                </a>

                <a
                  href="https://t.me/brandorax_community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-brand-gray-300 hover:bg-brand-gray-50 text-brand-navy text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded inline-flex items-center gap-2 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-brand-blue" />
                  Telegram Chat
                </a>
              </div>
            </div>
          </div>

          {/* Scaffolded LMS Sections: Sprints, Syllabus & Deliverables */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-brand-blue font-bold">
                Active Learning Sprints ({currentTrack.title})
              </h3>
              <span className="text-xs font-mono text-brand-gray-500">
                Phase 1 Student Foundation
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {currentTrack.syllabus.map((sprint, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-brand-gray-200 bg-brand-gray-50/50 hover:border-brand-blue/50 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-brand-blue font-bold">{sprint.week}</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-brand-gray-200 text-brand-gray-500">
                      Sprint 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-brand-navy mb-1.5">
                    {sprint.title}
                  </h4>
                  <p className="text-xs text-brand-gray-600 leading-relaxed mb-3">
                    {sprint.description}
                  </p>

                  <div className="bg-white p-2.5 rounded border border-brand-gray-200 text-xs font-mono text-brand-navy flex items-center justify-between">
                    <span className="text-brand-gray-500">Deliverable:</span>
                    <strong className="text-brand-blue truncate ml-2">{sprint.deliverable}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
