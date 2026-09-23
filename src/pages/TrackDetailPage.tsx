import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, CheckCircle2, ArrowRight, Layers, Award, Terminal, DollarSign, BookOpen, ChevronRight, Check } from 'lucide-react';
import { PROGRAMS } from '../data/programsData';

export const TrackDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const program = PROGRAMS.find((p) => p.slug === slug || p.id === slug);

  if (!program) {
    return <Navigate to="/academy" replace />;
  }

  return (
    <div className="bg-brand-gray-50 min-h-screen pb-24 w-full max-w-full overflow-hidden">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-brand-gray-200 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-brand-gray-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/academy" className="hover:text-brand-blue">Academy</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-navy font-bold">{program.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3 py-1 rounded">
              {program.category}
            </span>
            <span className="text-xs font-medium text-gray-300 bg-white/10 px-2.5 py-1 rounded flex items-center gap-1.5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-brand-amber" />
              {program.duration}
            </span>
            <span className="text-xs font-medium text-gray-300 bg-white/10 px-2.5 py-1 rounded flex items-center gap-1.5 border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-brand-amber" />
              {program.nextCohortDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl">
            {program.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-xl leading-relaxed max-w-2xl mb-8">
            {program.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/apply?track=${program.id}`}
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
            >
              Enroll in {program.title}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-xs font-medium text-gray-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tuition: <strong className="text-white">{program.tuition.upfront}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column (8 cols): Syllabus & Curriculum */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description */}
            <div className="bg-white border border-brand-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xs uppercase tracking-wider text-brand-blue font-bold mb-3">
                Programme Overview
              </h2>
              <p className="text-brand-gray-700 text-base leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* Week-by-Week Syllabus */}
            <div className="bg-white border border-brand-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xs uppercase tracking-wider text-brand-blue font-bold mb-1">
                    Academic Roadmap
                  </h2>
                  <h3 className="text-2xl font-extrabold text-brand-navy">
                    Week-by-Week Learning Sprints
                  </h3>
                </div>
                <span className="text-xs font-medium text-brand-gray-500 bg-brand-gray-100 px-3 py-1 rounded">
                  {program.commitment}
                </span>
              </div>

              <div className="space-y-6">
                {program.syllabus.map((sprint, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-gray-50 border border-brand-gray-200 rounded-xl p-6 hover:border-brand-blue/60 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-brand-blue font-bold uppercase">{sprint.week}</span>
                      <span className="bg-white border border-brand-gray-200 px-2 py-0.5 rounded text-brand-gray-500 font-medium">
                        Sprint 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-brand-navy mb-2">
                      {sprint.title}
                    </h4>

                    <p className="text-sm text-brand-gray-600 leading-relaxed mb-4">
                      {sprint.description}
                    </p>

                    <div className="bg-white border border-brand-gray-200 rounded-lg p-3 text-xs flex items-center justify-between">
                      <span className="text-brand-gray-500">Deliverable Shipped:</span>
                      <strong className="text-brand-blue font-bold">{sprint.deliverable}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capstone Project */}
            <div className="bg-brand-navy text-white rounded-2xl p-8 border border-brand-navy-light shadow-brand">
              <div className="text-xs uppercase tracking-wider text-brand-amber font-bold mb-2">
                Production Capstone Project
              </div>
              <h3 className="text-2xl font-extrabold mb-3">
                {program.capstoneProject.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {program.capstoneProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {program.capstoneProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-white/10 text-white px-2.5 py-1 rounded border border-white/10 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Quick Facts & Tuition Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-brand-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm sticky top-28">
              <div className="text-xs uppercase tracking-wider text-brand-gray-500 font-semibold mb-1">
                Programme Tuition
              </div>
              <div className="text-3xl font-extrabold text-brand-navy mb-1">
                {program.tuition.upfront}
              </div>
              <div className="text-xs text-brand-blue font-semibold mb-6">
                Installment: {program.tuition.installments}
              </div>

              <Link
                to={`/apply?track=${program.id}`}
                className="w-full text-center block bg-brand-blue hover:bg-brand-blue-hover text-white py-3.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md mb-6"
              >
                Enroll Now
              </Link>

              {/* Quick Details Checklist */}
              <div className="space-y-4 pt-6 border-t border-brand-gray-200 text-xs text-brand-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray-500">Duration:</span>
                  <strong className="text-brand-navy">{program.duration}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray-500">Weekly Commitment:</span>
                  <strong className="text-brand-navy">{program.commitment.split('·')[0]}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray-500">Learning Mode:</span>
                  <strong className="text-brand-navy">100% Online + Live Google Meet</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray-500">Next Cohort:</span>
                  <strong className="text-brand-blue">{program.nextCohortDate}</strong>
                </div>
              </div>

              {/* Tools list */}
              <div className="pt-6 border-t border-brand-gray-200 mt-6">
                <div className="text-[11px] uppercase text-brand-gray-500 font-semibold mb-2">
                  Tools You Will Master:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {program.tools.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-brand-gray-100 text-brand-navy px-2 py-0.5 rounded border border-brand-gray-200 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career outcomes */}
              <div className="pt-6 border-t border-brand-gray-200 mt-6">
                <div className="text-[11px] uppercase text-brand-gray-500 font-semibold mb-2">
                  Target Roles:
                </div>
                <ul className="space-y-1.5 text-xs text-brand-navy font-sans">
                  {program.careerOutcomes.map((role) => (
                    <li key={role} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
