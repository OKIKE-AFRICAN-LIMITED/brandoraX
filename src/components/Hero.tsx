import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Shield, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz }) => {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 px-6 bg-white overflow-hidden hairline-b">
      <div className="max-w-7xl mx-auto">
        {/* Subtle Top Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 hairline-b text-xs font-mono text-[#000F38]/60">
          <div className="flex items-center gap-2 text-[#0040E8] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#0040E8]"></span>
            Cohort 1 Admissions Open · Online-First Pan-African Academy
          </div>
          <div className="flex items-center gap-4">
            <span>Rolling Weekend Induction</span>
            <span className="text-[#000F38]/30">|</span>
            <button
              onClick={onOpenQuiz}
              className="text-[#000F38] hover:text-[#0040E8] font-medium transition-colors"
            >
              Take 60s Track Aptitude Quiz →
            </button>
          </div>
        </div>

        {/* Main Headline & Statement */}
        <div className="max-w-4xl mb-12">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E8] mb-4">
            TRAIN. MENTOR. DEPLOY.
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-display leading-[0.98] text-[#000F38] mb-8">
            Build the skill.<br />
            Prove your ability.<br />
            <span className="text-[#0040E8]">Get deployed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#000F38]/75 leading-relaxed max-w-2xl">
            Africa’s outcome-driven digital workforce development platform. We bridge the gap between learning and employment through client-grade engineering sprints, weekly 1-on-1 practitioner critiques, and verified portfolios.
          </p>
        </div>

        {/* Action Gateways */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            to="/academy"
            className="bg-[#0040E8] hover:bg-[#0035C2] text-white px-8 py-4 rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            Explore 6 Disciplines
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/talent-pipeline"
            className="border border-[#000F38]/20 hover:border-[#000F38] bg-white text-[#000F38] px-8 py-4 rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            For Employers & Hiring Leads
            <ArrowUpRight className="w-4 h-4 text-[#0040E8]" />
          </Link>

          <Link
            to="/apply"
            className="text-xs font-bold uppercase tracking-wider text-[#000F38]/70 hover:text-[#000F38] px-4 py-4 transition-colors"
          >
            Direct Application →
          </Link>
        </div>

        {/* Institutional Pillars Ribbon (Clean Swiss Grid, No Cheap Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 hairline-t">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#000F38]/50 mb-1">
              01 / Method
            </div>
            <div className="text-lg font-bold text-[#000F38]">
              100% Project-Based
            </div>
            <div className="text-xs text-[#000F38]/70 mt-1 leading-relaxed">
              Real workplace briefs, zero passive multiple-choice exams.
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#000F38]/50 mb-1">
              02 / Mentorship
            </div>
            <div className="text-lg font-bold text-[#000F38]">
              Practitioner Code Reviews
            </div>
            <div className="text-xs text-[#000F38]/70 mt-1 leading-relaxed">
              Weekly pull-request teardowns by active senior industry leads.
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#000F38]/50 mb-1">
              03 / Credential
            </div>
            <div className="text-lg font-bold text-[#000F38]">
              Verified Proof of Work
            </div>
            <div className="text-xs text-[#000F38]/70 mt-1 leading-relaxed">
              Live URLs, public GitHub repos, and Figma design tokens.
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#000F38]/50 mb-1">
              04 / Outcome
            </div>
            <div className="text-lg font-bold text-[#000F38]">
              Talent Pipeline Access
            </div>
            <div className="text-xs text-[#000F38]/70 mt-1 leading-relaxed">
              Evaluation for hiring partners across Africa and remote teams.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
