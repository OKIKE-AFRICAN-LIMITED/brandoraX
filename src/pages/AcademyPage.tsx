import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles, CheckCircle2, Shield, Layers, Award, Terminal } from 'lucide-react';
import { PROGRAMS } from '../data/programsData';
import { ProgramCategory } from '../types';

interface AcademyPageProps {
  onOpenQuiz: () => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({ onOpenQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProgramCategory>('All');

  const filteredPrograms = selectedCategory === 'All'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-brand-gray-50 min-h-screen">
      {/* Academy Hero Header */}
      <section className="pt-16 pb-20 px-4 sm:px-6 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-amber font-bold mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
            Outcome-Based Learning Disciplines
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-6">
            Learn practical skills.<br />
            <span className="text-brand-blue">Build verified proof.</span><br />
            Prepare for the real world.
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
            Turn what you learn into production codebases, published design systems, and client-grade dashboards that prove your capability to employers.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/apply"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
            >
              Apply for Admission
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onOpenQuiz}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-amber" />
              Take 60s Track Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Main Discipline Directory */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              Available Programs & Syllabi
            </h2>
            <p className="text-sm text-brand-gray-600 mt-1">
              Select a discipline to view full week-by-week curriculum, tools, and deliverables.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Engineering', 'Design', 'Analytics', 'Security'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-brand-gray-600 hover:text-brand-navy border border-brand-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Disciplines Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white border border-brand-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-brand-blue hover:shadow-brand transition-all group"
            >
              <div>
                <div className="p-6 pb-4 border-b border-brand-gray-200/60 bg-gradient-to-r from-brand-gray-50 to-white flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded">
                    {program.category}
                  </span>
                  <span className="text-xs font-mono text-brand-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {program.duration}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-sm text-brand-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {program.description}
                  </p>

                  <div className="bg-brand-gray-50 border border-brand-gray-200 rounded-lg p-4 mb-6 text-xs font-mono">
                    <div className="text-[10px] uppercase text-brand-gray-500 font-semibold mb-1">
                      Capstone Deliverable You Ship:
                    </div>
                    <div className="text-brand-navy font-sans font-bold text-xs leading-snug">
                      {program.capstoneProject.title}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono uppercase text-brand-gray-500 mb-2 font-semibold">
                      Tools & Stack:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {program.tools.slice(0, 5).map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-mono bg-brand-gray-100 text-brand-navy px-2 py-0.5 rounded border border-brand-gray-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-brand-gray-200 bg-brand-gray-50/50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-brand-gray-500 font-semibold">
                    Tuition
                  </div>
                  <div className="text-sm font-bold text-brand-navy">
                    {program.tuition.upfront}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/academy/${program.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-blue-hover px-3 py-2 hover:bg-brand-blue-light rounded transition-colors inline-flex items-center gap-1"
                  >
                    View Syllabus
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/apply?track=${program.id}`}
                    className="bg-brand-navy hover:bg-black text-white px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear & Transparent Tuition Section */}
        <div className="bg-white border border-brand-gray-200 rounded-2xl p-8 sm:p-12 mb-20 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold mb-2">
              Predictable Investment
            </div>
            <h3 className="text-3xl font-extrabold text-brand-navy">
              Transparent Tuition. Zero Hidden Charges.
            </h3>
            <p className="text-brand-gray-600 mt-2 text-sm sm:text-base">
              Predictable pricing designed to keep elite tech education accessible to ambitious African talent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tier 1: 3-Month Intensive */}
            <div className="border border-brand-gray-200 rounded-xl p-8 bg-brand-gray-50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded">
                  Tier 1 Track
                </span>
                <h4 className="text-2xl font-bold text-brand-navy mt-3 mb-1">
                  3-Month Intensive
                </h4>
                <div className="text-3xl font-extrabold text-brand-navy my-4">
                  ₦80,000 <span className="text-xs font-normal text-brand-gray-500 font-mono">/ one-time</span>
                </div>
                <p className="text-xs text-brand-gray-600 leading-relaxed mb-6">
                  Ideal for foundational acceleration: UI/UX, Graphic Design, or Core Web Development with weekly mentor reviews.
                </p>

                <ul className="space-y-3 text-xs font-mono text-brand-gray-700 border-t border-brand-gray-200 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>2–3 Live Google Meet sessions / week</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Weekly 1-on-1 Pull Request reviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>2 Verified client-grade portfolio projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Telegram alumni community access</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/apply"
                  className="w-full text-center block bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Apply For 3-Month Track
                </Link>
              </div>
            </div>

            {/* Tier 2: 6-Month Professional */}
            <div className="border-2 border-brand-blue rounded-xl p-8 bg-white flex flex-col justify-between relative shadow-brand">
              <div className="absolute top-4 right-4 bg-brand-blue text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded">
                Most Comprehensive
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded">
                  Tier 2 Track
                </span>
                <h4 className="text-2xl font-bold text-brand-navy mt-3 mb-1">
                  6-Month Professional
                </h4>
                <div className="text-3xl font-extrabold text-brand-navy my-4">
                  ₦150,000 <span className="text-xs font-normal text-brand-gray-500 font-mono">/ one-time</span>
                </div>
                <p className="text-xs text-brand-gray-600 leading-relaxed mb-6">
                  Deep technical immersion: Software Engineering, Data Analysis & BI, or Cybersecurity Defense with talent pipeline evaluation.
                </p>

                <ul className="space-y-3 text-xs font-mono text-brand-gray-700 border-t border-brand-gray-200 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Everything in 3-Month Intensive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>4 Advanced client case studies & live apps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Cross-functional sprint team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Priority BrandoraX Talent Pipeline vetting</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/apply"
                  className="w-full text-center block bg-brand-navy hover:bg-black text-white py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Apply For 6-Month Track
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
