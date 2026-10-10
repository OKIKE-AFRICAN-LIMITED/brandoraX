import React from 'react';
import { ASSETS } from '../data/assets';
import { ScrollReveal } from './ScrollReveal';
import { Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Practical skills',
      tag: 'Hands-on Training',
      desc: 'Learn in-demand digital skills through structured, hands-on training designed around real-world application.',
      image: ASSETS.whyChoose.practicalSkills,
      alt: 'Practical skills hands-on training at BrandoraX',
      borderColor: 'border-blue-200/90 hover:border-[#0040E9]',
      cardBg: 'bg-gradient-to-b from-blue-50/40 via-white to-white',
      badgeBg: 'bg-blue-50 text-[#0040E9] border-blue-200',
      accentBar: 'bg-[#0040E9]',
      dotColor: 'bg-[#0040E9]',
      titleHover: 'group-hover:text-[#0040E9]',
      shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(0,64,233,0.18)]',
    },
    {
      title: 'Expert mentorship',
      tag: '1-on-1 Guidance',
      desc: 'Get guidance, feedback, and direction from experienced professionals as you learn and grow.',
      image: ASSETS.whyChoose.expertMentorship,
      alt: 'Expert mentorship and coaching at BrandoraX',
      borderColor: 'border-amber-200/90 hover:border-[#FEC958]',
      cardBg: 'bg-gradient-to-b from-amber-50/40 via-white to-white',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
      accentBar: 'bg-[#FEC958]',
      dotColor: 'bg-[#FEC958]',
      titleHover: 'group-hover:text-amber-600',
      shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(254,201,88,0.25)]',
    },
    {
      title: 'Proof of Work',
      tag: 'Client-Grade Portfolio',
      desc: 'Our experienced professionals will guide in building real projects and a portfolio that gives you tangible evidence of what you can do.',
      image: ASSETS.whyChoose.proofOfWork,
      alt: 'Proof of work and student project showcase at BrandoraX',
      borderColor: 'border-slate-200/90 hover:border-[#000F38]',
      cardBg: 'bg-gradient-to-b from-slate-100/50 via-white to-white',
      badgeBg: 'bg-slate-100 text-[#000F38] border-slate-300',
      accentBar: 'bg-[#000F38]',
      dotColor: 'bg-[#000F38]',
      titleHover: 'group-hover:text-[#000F38]',
      shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(0,15,56,0.18)]',
    },
    {
      title: 'Real Opportunities',
      tag: 'Career Placement Hub',
      desc: 'You go beyond training with access to internships, projects, jobs, and other opportunities through our partner network.',
      image: ASSETS.whyChoose.realOpportunities,
      alt: 'Real job opportunities and career placement at BrandoraX',
      borderColor: 'border-emerald-200/90 hover:border-emerald-500',
      cardBg: 'bg-gradient-to-b from-emerald-50/40 via-white to-white',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      accentBar: 'bg-emerald-500',
      dotColor: 'bg-emerald-500',
      titleHover: 'group-hover:text-emerald-700',
      shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)]',
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F8FAFC] border-b border-gray-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0040E9] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Brandorax Difference</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-3 sm:mb-4">
            Why Choose BrandoraX?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#000F38]/80 leading-relaxed font-normal">
            More than learning a skill—we prepare you for what comes next. Everything is designed to move you from learning to deployment.
          </p>
        </ScrollReveal>

        {/* 4 Cards Grid with Rich Brand Colours */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((p, idx) => (
            <ScrollReveal key={idx} delay={idx * 120}>
              <div className={`${p.cardBg} rounded-2xl overflow-hidden border ${p.borderColor} shadow-sm ${p.shadow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full relative`}>
                {/* Top Brand Color Trim Bar */}
                <div className={`h-1.5 w-full ${p.accentBar}`} />

                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Pill Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm ${p.badgeBg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.dotColor}`} />
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content with colored indicators */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-xl font-bold text-[#000F38] ${p.titleHover} transition-colors`}>
                        {p.title}
                      </h3>
                      {/* Decorative Brand Accent Pill as requested */}
                      <span className={`h-1.5 w-5 rounded-full ${p.accentBar} shrink-0 opacity-80 group-hover:w-7 transition-all`} />
                    </div>
                    <p className="text-sm text-[#000F38]/75 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
