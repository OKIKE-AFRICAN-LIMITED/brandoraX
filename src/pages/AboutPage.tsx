import React from 'react';
import { Target, Compass, BookOpen, Users, Handshake, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const pathways = [
    {
      icon: BookOpen,
      title: 'Academy',
      description: 'Structured, outcome-driven tech education designed to build practical digital skills and production-level portfolio projects.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'A vibrant ecosystem of 2,000+ aspiring digital professionals, creators, and practitioners connecting and learning together.'
    },
    {
      icon: Handshake,
      title: 'Partnerships',
      description: 'Collaborating with high-growth startups, corporate institutions, and funding partners to create reliable pathways for talent absorption.'
    },
    {
      icon: TrendingUp,
      title: 'Talent Development',
      description: 'Continuous assessment, workplace discipline coaching, and direct talent pipeline bridges connecting graduates to real work.'
    }
  ];

  const values = [
    { title: 'Practical Impact', desc: 'We prioritize real skills and tangible artifacts over theoretical memorization.' },
    { title: 'Excellence', desc: 'Every project deliverable is evaluated against strict production standards.' },
    { title: 'Integrity', desc: 'Honest assessments, transparent tuition, and authentic proof of competence.' },
    { title: 'Community Development', desc: 'Empowering African youth to compete and thrive in the global digital economy.' }
  ];

  return (
    <div className="bg-brand-gray-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-16 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-amber font-bold mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
            About BrandoraX
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-6">
            Turning digital potential into<br />
            <span className="text-brand-blue">real career opportunity.</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
            Africa has no shortage of ambitious people eager to build tech careers. But learning syntax is only step one. The true challenge is building genuine workplace readiness, establishing verified proof, and connecting to employers who trust your competence.
          </p>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white border border-brand-gray-200 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-amber flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-blue font-bold mb-2">
                Our Vision
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-4">
                Africa's most practical and employment-driven digital talent pipeline.
              </h3>
              <p className="text-brand-gray-700 text-sm sm:text-base leading-relaxed">
                We envision a future where talented individuals across Africa can access the skills, mentorship, and employer bridges they need to launch sustainable, world-class careers—regardless of where they start.
              </p>
            </div>
            <div className="pt-6 border-t border-brand-gray-200 mt-6 text-xs font-mono text-brand-gray-500">
              Pan-African Reach · Outcome Focused
            </div>
          </div>

          <div className="bg-brand-blue-surface border border-brand-blue/20 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-blue font-bold mb-2">
                Our Mission
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-4">
                Equip with in-demand skills. Connect to real-world opportunities.
              </h3>
              <p className="text-brand-gray-700 text-sm sm:text-base leading-relaxed">
                To bridge the critical gap between education and employment by integrating project-driven training, weekly 1-on-1 practitioner mentorship, and direct talent pipeline placement into a scalable ecosystem.
              </p>
            </div>
            <div className="pt-6 border-t border-brand-gray-200 mt-6 text-xs font-mono text-brand-blue font-semibold">
              Practical Impact · Real Placements
            </div>
          </div>
        </div>

        {/* The 4 Pathways of the Ecosystem */}
        <div className="mb-20">
          <div className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold mb-2">
            The BrandoraX Ecosystem
          </div>
          <h2 className="text-3xl font-extrabold text-brand-navy mb-8">
            One vision. Four interconnected pathways.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-brand-gray-200 rounded-xl p-6 shadow-sm hover:border-brand-blue transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy mb-2">{p.title}</h4>
                  <p className="text-xs text-brand-gray-600 leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Values */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-12 border border-brand-navy-light shadow-brand">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-amber font-bold mb-2">
              Our Core Values
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Principles that guide our academy & pipeline.
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/10">
                <h4 className="text-base font-bold text-brand-amber mb-2">{v.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs font-mono text-gray-300">
              Ready to begin your journey with Cohort 1?
            </div>
            <Link
              to="/apply"
              className="bg-brand-amber hover:bg-brand-amber-hover text-brand-navy px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              Apply for Admission
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
