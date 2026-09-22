import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Briefcase, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[88vh] flex items-center bg-[#000F38] text-white overflow-hidden py-12 sm:py-20 lg:py-24 border-b border-white/10">
      {/* Cinematic Background Image with Directional Overlay (Mobile-Optimized & Desktop-Optimized) */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hero}
          alt="BrandoraX Learners collaborating and building practical digital skills"
          className="w-full h-full object-cover object-[60%_center] sm:object-center lg:object-center transition-all duration-700"
        />
        {/* On mobile: Soft vertical vignette allowing the authentic photography and students to be vividly seen.
            On desktop (md+): Directional horizontal fade from solid navy on left to clear photo on right. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000F38]/80 via-[#000F38]/50 to-[#000F38]/95 md:bg-gradient-to-r md:from-[#000F38] md:via-[#000F38]/90 md:via-55% md:to-[#000F38]/30"></div>
        {/* Soft vertical gradient for desktop to blend header and section base seamlessly */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#000F38]/70 via-transparent to-[#000F38]/85"></div>
      </div>

      {/* Hero Content: Strictly Left-Aligned, Clean & Highly Professional */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl text-left flex flex-col items-start">
          {/* Live Status Pill */}
          <ScrollReveal direction="down" delay={50}>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#FEC958] mb-4 sm:mb-6 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>TRAIN. MENTOR. DEPLOY.</span>
              <span className="text-white/70 font-sans normal-case text-xs font-normal ml-1 hidden sm:inline">
                • Applications Open for 2026 Cohorts
              </span>
            </div>
          </ScrollReveal>

          {/* Bold, Authoritative Left-Aligned Headline */}
          <ScrollReveal direction="up" delay={150}>
            <h1 className="text-3xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 drop-shadow-sm">
              Build the Skill.<br />
              Prove your Ability.<br />
              <span className="text-[#FEC958]">Get Deployed.</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={250}>
            <p className="text-sm sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal drop-shadow-sm">
              Africa’s employment driven digital talent pipeline. Turn digital skills into real career opportunities.
            </p>
          </ScrollReveal>

          {/* Action CTAs: Responsive Button Group */}
          <ScrollReveal direction="up" delay={350} className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <Link
                to="/academy"
                className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group text-center"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA */}
              <Link
                to="/apply"
                className="bg-white hover:bg-gray-100 text-[#000F38] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-center"
              >
                <span>Join Talent Pipeline</span>
                <ArrowUpRight className="w-4 h-4 text-[#0040E9] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Company CTA */}
              <a
                href="#companies"
                className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 backdrop-blur-sm text-center"
              >
                <Briefcase className="w-4 h-4 text-[#FEC958]" />
                <span>Hire Talent</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Trust Checkpoints: Clean Responsive Layout */}
          <ScrollReveal direction="up" delay={450} className="w-full max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6 pt-5 sm:pt-6 text-xs text-white/85 border-t border-white/10 mt-6 sm:mt-8 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>6 Job-Ready Tracks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Up to 90% Scholarships</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Verified Proof of Work</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
