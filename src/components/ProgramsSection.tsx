import React, { useState } from 'react';
import { ArrowRight, Sparkles, Clock, Layers, Award, Terminal, Check } from 'lucide-react';
import { Program, ProgramCategory } from '../types';
import { PROGRAMS } from '../data/programsData';

interface ProgramsSectionProps {
  onSelectTrack: (trackId: string) => void;
  onOpenEnroll: (trackId: string) => void;
  onOpenQuiz: () => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectTrack,
  onOpenEnroll,
  onOpenQuiz
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProgramCategory>('All');

  const filteredPrograms = selectedCategory === 'All'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === selectedCategory);

  return (
    <section id="programs" className="py-24 px-4 sm:px-6 bg-brand-gray-100 border-b border-brand-gray-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold mb-3">
              Academic Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight">
              Six career-aligned disciplines.
            </h2>
            <p className="text-brand-gray-600 mt-3 text-base sm:text-lg">
              Curricula engineered backwards from real job descriptions, production toolchains, and modern industry standards.
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

        {/* 6 Program Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white border border-brand-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-brand-blue hover:shadow-brand transition-all group"
            >
              <div>
                {/* Header Strip */}
                <div className="p-6 pb-4 border-b border-brand-gray-200/60 bg-gradient-to-r from-brand-gray-50 to-white flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-2.5 py-1 rounded">
                    {program.category}
                  </span>
                  <span className="text-xs font-mono text-brand-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {program.duration}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-sm text-brand-gray-600 leading-relaxed mb-5 line-clamp-3">
                    {program.tagline}
                  </p>

                  {/* Project Deliverable Box */}
                  <div className="bg-brand-gray-50 border border-brand-gray-200 rounded-lg p-3.5 mb-5 text-xs font-mono">
                    <div className="text-[10px] uppercase text-brand-gray-500 font-semibold mb-1">
                      Milestone Deliverable You Ship:
                    </div>
                    <div className="text-brand-navy font-sans font-bold text-xs leading-snug line-clamp-2">
                      {program.capstoneProject.title}
                    </div>
                  </div>

                  {/* Tools Mastered */}
                  <div>
                    <div className="text-[11px] font-mono uppercase text-brand-gray-500 mb-2 font-semibold">
                      Core Tools:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {program.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-mono bg-brand-gray-100 text-brand-navy px-2 py-0.5 rounded border border-brand-gray-200"
                        >
                          {tool}
                        </span>
                      ))}
                      {program.tools.length > 4 && (
                        <span className="text-[11px] font-mono text-brand-gray-500 px-1.5 py-0.5">
                          +{program.tools.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer with Tuition & Action */}
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
                  <button
                    onClick={() => onSelectTrack(program.id)}
                    className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-blue-hover px-2.5 py-1.5 hover:bg-brand-blue-light rounded transition-colors inline-flex items-center gap-1"
                  >
                    Syllabus
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenEnroll(program.id)}
                    className="bg-brand-navy hover:bg-black text-white px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Not Sure Which Track? Take 60s Quiz */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-amber font-bold mb-2 bg-white/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
              Interactive Track Diagnostic
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Unsure which track matches your natural strengths?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Take our 60-second aptitude assessment. We will analyze your analytical vs. visual problem-solving preferences and recommend your highest-potential discipline.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="relative z-10 bg-brand-amber hover:bg-brand-amber-hover text-brand-navy px-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            Start 60s Diagnostic Quiz
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
