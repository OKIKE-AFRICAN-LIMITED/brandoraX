import React from 'react';
import { Target, Compass, Globe2, BookOpen, Users, Handshake, TrendingUp } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pathways = [
    {
      icon: BookOpen,
      title: 'Academy',
      description: 'Structured, outcome-driven training designed to build practical digital skills, production codebases, and client-grade experience.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'A 2,000+ member ecosystem where learners, creators, and active professionals connect, critique, collaborate, and grow together.'
    },
    {
      icon: Handshake,
      title: 'Partnerships',
      description: 'Collaborating with high-growth startups, corporate institutions, and funding partners to create reliable channels for talent absorption.'
    },
    {
      icon: TrendingUp,
      title: 'Talent Development',
      description: 'Continuous assessment, workplace discipline training, and career deployment connecting vetted graduates with real opportunities.'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-white border-b border-brand-gray-200 scroll-mt-20 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="text-xs text-brand-blue uppercase tracking-widest font-bold mb-3">
            About BrandoraX
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Turning digital potential into real career opportunity.
          </h2>
          <p className="text-brand-gray-700 text-base sm:text-lg leading-relaxed">
            Africa has no shortage of ambitious people hungry to learn digital skills. But learning syntax is only the beginning. The real challenge is becoming workplace-ready, building indisputable proof of competence, and securing access to employment.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-10 border border-brand-navy-light shadow-brand flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-brand-amber flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase tracking-widest text-brand-amber font-bold mb-2">
                Our Vision
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Africa's most practical and employment-driven digital talent pipeline.
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We envision a future where talented Africans can access the practical skills, mentorship, and employer bridges they need to build meaningful digital careers—regardless of where they are starting from.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 mt-6 text-xs text-gray-400 font-medium">
              Outcome-Based · Pan-African · High-Accountability
            </div>
          </div>

          <div className="bg-brand-blue-surface rounded-2xl p-8 sm:p-10 border border-brand-blue/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-2">
                Our Mission
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-4">
                Equip with in-demand skills. Connect to real-world opportunities.
              </h3>
              <p className="text-brand-gray-700 text-sm sm:text-base leading-relaxed">
                To eliminate the traditional disconnect between certification and employment by aligning tech education directly with employer expectations, verified project portfolios, and workplace discipline.
              </p>
            </div>

            <div className="pt-8 border-t border-brand-gray-200 mt-6 text-xs text-brand-blue font-semibold">
              Practical Impact · Excellence · Integrity · Community
            </div>
          </div>
        </div>

        {/* The 4 Pathways of the Ecosystem */}
        <div>
          <div className="text-xs uppercase tracking-wider text-brand-blue font-bold mb-3">
            The BrandoraX Ecosystem
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-8">
            One vision. Four interconnected pathways.
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-gray-50 border border-brand-gray-200 rounded-xl p-6 hover:border-brand-blue hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-brand-gray-200 flex items-center justify-center text-brand-blue mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy mb-2">{p.title}</h4>
                  <p className="text-xs text-brand-gray-600 leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
