import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ExploreProgramsSection: React.FC = () => {
  const programs = [
    {
      title: 'UI/UX & Product Design',
      slug: 'ui-ux-product-design',
      description: 'Learn how to research, structure and design digital experiences that solve real user problems.',
      focus: 'User Research • UX Strategy • Wireframing • Prototyping • Interface Design • Product Thinking'
    },
    {
      title: 'Graphic & Brand Design',
      slug: 'graphic-brand-design',
      description: 'Develop the creative and strategic skills required to communicate ideas, build visual identities and create professional digital and print experiences.',
      focus: 'Brand Identity • Graphic Design • Visual Communication • Social Design • Packaging • Creative Direction'
    },
    {
      title: 'Web Development',
      slug: 'web-development',
      description: 'Learn how to turn designs and ideas into functional, responsive web experiences.',
      focus: 'HTML • CSS • JavaScript • Responsive Development • Git • Web Deployment'
    },
    {
      title: 'Software Engineering',
      slug: 'software-systems-engineering',
      description: 'Develop the engineering skills required to build, test and deploy real-world software applications.',
      focus: 'Programming • Backend Development • APIs • Databases • Software Architecture • Deployment'
    },
    {
      title: 'Data Analysis',
      slug: 'data-analysis-bi',
      description: 'Learn how to turn raw data into useful insights that support better decisions.',
      focus: 'Data Cleaning • Analysis • Visualization • Spreadsheets • SQL • Data Storytelling'
    },
    {
      title: 'Cybersecurity',
      slug: 'cybersecurity-defense',
      description: 'Develop practical knowledge of security principles, threats, risk management and defensive practices.',
      focus: 'Cybersecurity Fundamentals • Threat Awareness • Network Security • Security Operations • Risk • Defensive Practices'
    }
  ];

  return (
    <section id="programs" className="py-24 px-4 sm:px-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching exact Brief */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-4">
            Explore Our Programs
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0040E9] mb-3">
            Learn skills that move with the real world.
          </h3>
          <p className="text-base sm:text-lg text-[#000F38]/75 leading-relaxed font-normal">
            Our programs focus on practical, in-demand digital disciplines designed to help you develop capabilities that can be applied in professional environments.
          </p>
        </div>

        {/* 6 Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#0040E9]/50 transition-all duration-300 group"
            >
              <div>
                <h3 className="text-2xl font-bold text-[#000F38] group-hover:text-[#0040E9] transition-colors mb-4">
                  {prog.title}
                </h3>

                <p className="text-sm text-[#000F38]/80 leading-relaxed mb-6">
                  {prog.description}
                </p>

                <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0040E9] mb-2 font-mono">
                    Focus:
                  </div>
                  <div className="text-xs text-gray-700 leading-relaxed">
                    {prog.focus}
                  </div>
                </div>
              </div>

              <div>
                <Link
                  to={`/academy/${prog.slug}`}
                  className="w-full bg-[#000F38] group-hover:bg-[#0040E9] text-white py-3.5 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  Explore Program
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
