import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProofOfWorkLab } from '../components/ProofOfWorkLab';
import { LearningJourney } from '../components/LearningJourney';
import { ArrowRight, Sparkles, Clock, ArrowUpRight, Quote } from 'lucide-react';
import { PROGRAMS, TESTIMONIALS } from '../data/programsData';
import { ProgramCategory } from '../types';

interface HomePageProps {
  onOpenQuiz: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuiz }) => {
  const [filter, setFilter] = useState<'All' | ProgramCategory>('All');

  const filteredPrograms = filter === 'All'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === filter);

  return (
    <div>
      {/* High-Impact Institutional Hero */}
      <Hero onOpenQuiz={onOpenQuiz} />

      {/* Why Choose BrandoraX (Clean Swiss Editorial Layout) */}
      <WhyChooseUs />

      {/* Disciplines Directory Section */}
      <section className="py-24 px-6 bg-white hairline-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E8] mb-2">
                Academic Disciplines
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight">
                Six career-aligned tracks.
              </h2>
              <p className="text-[#000F38]/70 mt-3 text-base sm:text-lg max-w-xl">
                Curricula engineered backwards from real job descriptions, modern toolchains, and client delivery standards.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {(['All', 'Engineering', 'Design', 'Analytics', 'Security'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors ${
                    filter === cat
                      ? 'bg-[#000F38] text-white'
                      : 'bg-gray-100 text-[#000F38]/70 hover:text-[#000F38]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Disciplines Directory Rows (Architectural & Mature) */}
          <div className="divide-y divide-[#000F38]/10 border-y border-[#000F38]/10 mb-16">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className="py-10 group hover:bg-[#F8FAFC] transition-colors -mx-6 px-6"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Category & Title (4 cols) */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3 text-xs font-mono mb-2">
                      <span className="text-[#0040E8] font-bold uppercase">
                        {prog.category}
                      </span>
                      <span className="text-[#000F38]/30">·</span>
                      <span className="text-[#000F38]/60 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {prog.duration}
                      </span>
                    </div>

                    <Link
                      to={`/academy/${prog.slug}`}
                      className="text-2xl font-bold text-[#000F38] group-hover:text-[#0040E8] transition-colors"
                    >
                      {prog.title}
                    </Link>

                    <p className="text-xs text-[#000F38]/70 mt-2 leading-relaxed max-w-md line-clamp-2">
                      {prog.tagline}
                    </p>
                  </div>

                  {/* Milestone Deliverable (4 cols) */}
                  <div className="lg:col-span-4">
                    <div className="text-[11px] font-mono uppercase text-[#000F38]/50 font-semibold mb-1">
                      Capstone Deliverable You Ship:
                    </div>
                    <div className="text-sm font-semibold text-[#000F38] leading-snug">
                      {prog.capstoneProject.title}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {prog.tools.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono bg-white border border-[#000F38]/10 px-2 py-0.5 rounded text-[#000F38]/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tuition & Actions (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4">
                    <div className="text-left lg:text-right">
                      <div className="text-[11px] font-mono uppercase text-[#000F38]/50">
                        Tuition
                      </div>
                      <div className="text-base font-bold text-[#000F38]">
                        {prog.tuition.upfront}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/academy/${prog.slug}`}
                        className="text-xs font-bold uppercase tracking-wider text-[#0040E8] hover:text-[#0035C2] inline-flex items-center gap-1"
                      >
                        Syllabus
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        to={`/apply?track=${prog.id}`}
                        className="bg-[#000F38] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-colors shadow-sm"
                      >
                        Enroll
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Diagnostic Quiz Banner */}
          <div className="bg-[#000F38] text-white rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FEC959] font-bold mb-2">
                Aptitude Diagnostic
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Unsure which track fits your natural problem-solving strengths?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Take our 60-second diagnostic assessment to evaluate whether your analytical vs. visual strengths align with Engineering, Design, or Data.
              </p>
            </div>

            <button
              onClick={onOpenQuiz}
              className="bg-[#0040E8] hover:bg-[#0035C2] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded transition-colors whitespace-nowrap inline-flex items-center gap-2 shadow-sm"
            >
              Start 60s Track Quiz
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Proof of Work Lab */}
      <ProofOfWorkLab />

      {/* Learning Journey Pipeline */}
      <LearningJourney />

      {/* Social Proof (Clean Editorial Quotes) */}
      <section className="py-24 px-6 bg-[#F8FAFC] hairline-b">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E8] mb-2">
              Graduate Proof
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000F38] tracking-tight">
              Tested by ambitious African builders.
            </h2>
            <p className="text-[#000F38]/70 mt-2 text-sm sm:text-base">
              Real feedback from learners who went from tutorial confusion to shipping verified, production codebases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#000F38]/10 rounded-lg p-8 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#0040E8] mb-4" />
                  <p className="text-sm text-[#000F38]/80 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 hairline-t">
                  <div className="text-sm font-bold text-[#000F38]">{t.name}</div>
                  <div className="text-xs text-[#0040E8] font-semibold">{t.role}</div>
                  <div className="text-[11px] font-mono text-[#000F38]/50 mt-1">
                    {t.deliverable} · {t.cohort}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers Gateway */}
      <section className="py-20 px-6 bg-white hairline-b">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-[#0040E8] font-bold mb-2">
              For Employers & Hiring Partners
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#000F38] mb-2">
              Need assessed, job-ready digital talent?
            </h3>
            <p className="text-[#000F38]/70 text-sm sm:text-base leading-relaxed">
              BrandoraX connects startups and companies with pre-vetted engineers, designers, and analysts whose work you can inspect on live GitHub repos and Figma design systems before making an offer.
            </p>
          </div>

          <Link
            to="/talent-pipeline"
            className="border-2 border-[#000F38] hover:bg-[#000F38] hover:text-white text-[#000F38] px-8 py-4 rounded text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap inline-flex items-center gap-2"
          >
            Access Talent Pipeline
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Final Admission Banner */}
      <section className="py-24 px-6 bg-[#0040E8] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold mb-3">
            Admissions Rolling Window Open
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Build the skills that speak for themselves.
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Select your discipline, complete orientation, and start building your verified portfolio with lead practitioners.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/apply"
              className="bg-white text-[#000F38] hover:bg-gray-100 px-8 py-4 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
            >
              Apply for Admission
              <ArrowRight className="w-4 h-4 text-[#0040E8]" />
            </Link>
            <Link
              to="/academy"
              className="border border-white/40 hover:bg-white/10 px-8 py-4 rounded font-bold text-xs uppercase tracking-wider transition-colors text-white"
            >
              Explore 6 Disciplines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
