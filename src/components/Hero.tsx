import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Briefcase, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center bg-[#000F38] text-white overflow-hidden py-20 lg:py-24 border-b border-white/10">
      {/* Cinematic Background Image with Directional Left-to-Right Fade */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hero}
          alt="BrandoraX Learners collaborating and building practical digital skills"
          className="w-full h-full object-cover object-right lg:object-center"
        />
        {/* Strong horizontal gradient: solid navy on left for crisp readability, fading into the authentic photography on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000F38] via-[#000F38]/95 via-50% to-[#000F38]/40"></div>
        {/* Soft vertical gradient to blend header and section base seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000F38]/80 via-transparent to-[#000F38]/90"></div>
      </div>

      {/* Hero Content: Strictly Left-Aligned, Clean & Highly Professional */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl text-left flex flex-col items-start">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold tracking-wider text-[#FEC958] mb-6 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>TRAIN. MENTOR. DEPLOY.</span>
            <span className="text-white/60 font-sans normal-case text-xs font-normal ml-1 hidden sm:inline">
              • Applications Open for 2026 Cohorts
            </span>
          </div>

          {/* Bold, Authoritative Left-Aligned Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Build the Skill.<br />
            Prove your Ability.<br />
            <span className="text-[#FEC958]">Get Deployed.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl mb-8 font-normal">
            Africa’s employment driven digital talent pipeline. Turn digital skills into real career opportunities.
          </p>

          {/* Action CTAs: Left-Aligned Group */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <Link
              to="/academy"
              className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/apply"
              className="bg-white hover:bg-gray-100 text-[#000F38] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Join the Talent Pipeline</span>
              <ArrowUpRight className="w-4 h-4 text-[#0040E9]" />
            </Link>

            {/* Company CTA */}
            <a
              href="#companies"
              className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 backdrop-blur-sm"
            >
              <Briefcase className="w-4 h-4 text-[#FEC958]" />
              <span>Hire Talent</span>
            </a>
          </div>

          {/* Trust Checkpoints: Clean Horizontal Row */}
          <div className="flex flex-wrap items-center gap-6 pt-6 text-xs text-white/75 border-t border-white/10 mt-8 w-full max-w-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>6 Job-Ready Disciplines</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>Up to 90% Scholarships</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>Tangible Proof of Work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
