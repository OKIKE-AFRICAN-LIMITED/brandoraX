import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearningJourney: React.FC = () => {
  const phases = [
    {
      step: '01',
      title: 'Aptitude Diagnostic',
      subtitle: 'Strengths Alignment',
      description: 'Undergo a structured assessment to align your problem-solving strengths with Engineering, Product Design, or Data Analytics before writing a single line of code.'
    },
    {
      step: '02',
      title: 'Live Applied Sprints',
      subtitle: 'Production Workflows',
      description: 'Execute industry briefs that mirror real workplace tickets. Work with modern toolchains (Git, Figma tokens, SQL, Supabase) from day one.'
    },
    {
      step: '03',
      title: 'Practitioner PR Reviews',
      subtitle: 'Direct Mentorship',
      description: 'Receive weekly line-by-line critiques on your code architecture, typography scales, and database schemas from active industry practitioners.'
    },
    {
      step: '04',
      title: 'Verified Proof of Work',
      subtitle: 'Portfolio Defense',
      description: 'Graduate with an indisputable portfolio: live deployed applications, public GitHub repos, and Figma files ready for technical recruiter scrutiny.'
    },
    {
      step: '05',
      title: 'Talent Pipeline Bridge',
      subtitle: 'Career Deployment',
      description: 'High-performing graduates are presented directly to hiring partners across Nigeria, Africa, and global remote distributed teams.'
    }
  ];

  return (
    <section className="py-24 px-6 bg-white hairline-b">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E8] mb-3">
            Pedagogical Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-4">
            How you grow from learner to practitioner.
          </h2>
          <p className="text-[#000F38]/70 text-base sm:text-lg leading-relaxed">
            A linear, high-accountability progression model designed to eliminate tutorial stagnation and build verified professional readiness.
          </p>
        </div>

        {/* 5-Step Linear Architecture Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {phases.map((p, idx) => (
            <div key={p.step} className="border-t-2 border-[#000F38] pt-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#0040E8]">
                    PHASE {p.step}
                  </span>
                  <span className="text-[11px] font-mono text-[#000F38]/40">
                    Step {idx + 1}/5
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#000F38] mb-1">
                  {p.title}
                </h3>
                <div className="text-xs font-mono font-medium text-[#0040E8] mb-3">
                  {p.subtitle}
                </div>

                <p className="text-xs text-[#000F38]/70 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#000F38]/60">
          <span>Curricula updated continuously with African hiring partners</span>
          <Link to="/apply" className="text-[#0040E8] font-bold hover:underline inline-flex items-center gap-1">
            Begin Cohort Application →
          </Link>
        </div>
      </div>
    </section>
  );
};
