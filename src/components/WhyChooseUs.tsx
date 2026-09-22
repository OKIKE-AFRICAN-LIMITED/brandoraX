import React from 'react';
import { ASSETS } from '../data/assets';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Practical skills',
      desc: 'Learn in-demand digital skills through structured, hands-on training designed around real-world application.',
      image: ASSETS.whyChoose.practicalSkills,
      alt: 'Practical skills hands-on training at BrandoraX'
    },
    {
      title: 'Expert mentorship',
      desc: 'Get guidance, feedback, and direction from experienced professionals as you learn and grow.',
      image: ASSETS.whyChoose.expertMentorship,
      alt: 'Expert mentorship and coaching at BrandoraX'
    },
    {
      title: 'Proof of Work',
      desc: 'Our experienced professionals will guide in building real projects and a portfolio that gives you tangible evidence of what you can do.',
      image: ASSETS.whyChoose.proofOfWork,
      alt: 'Proof of work and student project showcase at BrandoraX'
    },
    {
      title: 'Real Opportunities',
      desc: 'You go beyond training with access to internships, projects, jobs, and other opportunities through our talent pipeline.',
      image: ASSETS.whyChoose.realOpportunities,
      alt: 'Real job opportunities and career placement at BrandoraX'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#F8FAFC] border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching exact Brief */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-4">
            Why Choose BrandoraX?
          </h2>
          <p className="text-lg sm:text-xl text-[#000F38]/80 leading-relaxed font-normal">
            More than learning a skill—we prepare you for what comes next. Everything is designed to move you from learning to deployment.
          </p>
        </div>

        {/* 4 Cards Grid with Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={p.image}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content matching exact Brief */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#000F38] mb-3 group-hover:text-[#0040E9] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#000F38]/75 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
