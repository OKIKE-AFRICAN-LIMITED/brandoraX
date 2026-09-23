import React from 'react';
import { ArrowRight, Compass, BookOpen, UserCheck, FolderCheck, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearningJourney: React.FC = () => {
  const phases = [
    {
      step: '01',
      title: 'Discover & Align',
      subtitle: 'Strengths Alignment',
      icon: Compass,
      description: 'Align your natural creative, analytical, or problem-solving strengths with Design, Data, or Technology through our diagnostic orientation.'
    },
    {
      step: '02',
      title: 'Learn by Doing',
      subtitle: 'Structured Sprints',
      icon: BookOpen,
      description: 'Master in-demand tools and workflows through hands-on briefs that mirror real workplace projects rather than passive lectures.'
    },
    {
      step: '03',
      title: 'Expert Mentorship',
      subtitle: 'Constructive Feedback',
      icon: UserCheck,
      description: 'Receive personalized feedback and direction from experienced professionals actively working in the African and global digital economy.'
    },
    {
      step: '04',
      title: 'Build Proof of Work',
      subtitle: 'Portfolio Readiness',
      icon: FolderCheck,
      description: 'Graduate with tangible, client-grade deliverables: interactive prototypes, complete brand books, live applications, and analytics dashboards.'
    },
    {
      step: '05',
      title: 'Get Deployed',
      subtitle: 'Career Opportunities',
      icon: Rocket,
      description: 'Gain access to internships, freelance projects, and employment opportunities through our structured corporate talent pipeline.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white border-b border-gray-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0040E9] mb-3">
            The Student Learning Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-4">
            How you grow from beginner to deployed professional.
          </h2>
          <p className="text-[#000F38]/70 text-base sm:text-lg leading-relaxed">
            A structured, 5-stage progression pathway engineered to turn motivation into competence, proof of work, and tangible career outcomes.
          </p>
        </div>

        {/* 5-Step Journey Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {phases.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.step}
                className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#0040E9] bg-blue-50 px-2.5 py-1 rounded">
                      PHASE {p.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white text-[#0040E9] flex items-center justify-center shadow-sm border border-gray-100">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#000F38] mb-1">
                    {p.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#0040E9] mb-3">
                    {p.subtitle}
                  </div>

                  <p className="text-xs text-[#000F38]/70 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/60 text-[11px] text-gray-400 font-medium">
                  Step {idx + 1} of 5
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-[#000F38]/80 font-medium">Curricula continuously updated to meet active employer demand across Africa</span>
          <Link
            to="/apply"
            className="text-[#0040E9] font-bold hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
          >
            Start Your Learning Journey →
          </Link>
        </div>
      </div>
    </section>
  );
};
