import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Compass, CheckCircle2 } from 'lucide-react';
import { ScholarshipBanner } from '../components/ScholarshipBanner';
import { SubscribeSection } from '../components/SubscribeSection';
import { ProgramCategory } from '../types';
import { ASSETS } from '../data/assets';
import { ScrollReveal } from '../components/ScrollReveal';

interface AcademyPageProps {
  onOpenQuiz?: () => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({ onOpenQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProgramCategory>('All');

  const programs = [
    {
      id: 'uiux-design',
      title: 'UI/UX & Product Design',
      slug: 'ui-ux-product-design',
      category: 'Design' as ProgramCategory,
      duration: '3 – 6 Months',
      tuition: '₦80,000 – ₦150,000',
      description: 'Learn how to research, structure and design digital experiences that solve real user problems.',
      focus: 'User Research • UX Strategy • Wireframing • Prototyping • Interface Design • Product Thinking'
    },
    {
      id: 'brand-design',
      title: 'Graphic & Brand Design',
      slug: 'graphic-brand-design',
      category: 'Design' as ProgramCategory,
      duration: '3 Months',
      tuition: '₦80,000',
      description: 'Develop the creative and strategic skills required to communicate ideas, build visual identities and create professional digital and print experiences.',
      focus: 'Brand Identity • Graphic Design • Visual Communication • Social Design • Packaging • Creative Direction'
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      slug: 'web-development',
      category: 'Engineering' as ProgramCategory,
      duration: '3 – 6 Months',
      tuition: '₦80,000 – ₦150,000',
      description: 'Learn how to turn designs and ideas into functional, responsive web experiences.',
      focus: 'HTML • CSS • JavaScript • Responsive Development • Git • Web Deployment'
    },
    {
      id: 'software-eng',
      title: 'Software Engineering',
      slug: 'software-systems-engineering',
      category: 'Engineering' as ProgramCategory,
      duration: '6 – 12 Months',
      tuition: '₦150,000 – ₦250,000',
      description: 'Develop the engineering skills required to build, test and deploy real-world software applications.',
      focus: 'Programming • Backend Development • APIs • Databases • Software Architecture • Deployment'
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      slug: 'data-analysis-bi',
      category: 'Analytics' as ProgramCategory,
      duration: '6 – 12 Months',
      tuition: '₦150,000 – ₦250,000',
      description: 'Learn how to turn raw data into useful insights that support better decisions.',
      focus: 'Data Cleaning • Analysis • Visualization • Spreadsheets • SQL • Data Storytelling'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      slug: 'cybersecurity-defense',
      category: 'Engineering' as ProgramCategory,
      duration: '6 – 12 Months',
      tuition: '₦150,000 – ₦250,000',
      description: 'Learn how to protect networks, systems and digital infrastructure from threats.',
      focus: 'Network Security • Threat Analysis • System Defense • Security Best Practices'
    }
  ];

  const categories: ('All' | ProgramCategory)[] = ['All', 'Design', 'Engineering', 'Analytics'];

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen text-[#000F38]">
      {/* 1. Hero Header from 02. ACADEMY */}
      <section className="relative min-h-[75vh] lg:min-h-[78vh] flex items-center bg-[#000F38] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10">
        {/* Background Image with Directional Fade */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.whyChoose.practicalSkills}
            alt="BrandoraX Academy Practical Learning"
            className="w-full h-full object-cover object-[60%_center] sm:object-center lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000F38]/80 via-[#000F38]/50 to-[#000F38]/95 md:bg-gradient-to-r md:from-[#000F38] md:via-[#000F38]/90 md:via-55% md:to-[#000F38]/30"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#000F38]/70 via-transparent to-[#000F38]/85"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl text-left flex flex-col items-start">
            <ScrollReveal direction="down" delay={50}>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FEC958] font-bold mb-6 bg-white/10 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                BrandoraX Academy
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm">
                Learn Skills. Build Experience.<br />
                <span className="text-[#FEC958]">Prepare for the Real World.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed mb-8 font-normal drop-shadow-sm">
                Turn what you learn into skills you can use, experience you can prove, and opportunities you can pursue.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <a
                  href="#available-programmes"
                  className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group text-center"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                {onOpenQuiz && (
                  <button
                    onClick={onOpenQuiz}
                    className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 backdrop-blur-sm text-center"
                  >
                    <Compass className="w-4 h-4 text-[#FEC958]" />
                    <span>Take 60s Track Quiz</span>
                  </button>
                )}
              </div>
            </ScrollReveal>

            {/* Clean Proof Checkpoints */}
            <ScrollReveal direction="up" delay={450} className="w-full max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 text-xs text-white/85 border-t border-white/10 mt-8 w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>6 Job-Ready Tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Tangible Proof of Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Employment Pipeline</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Available Programmes matching 02. ACADEMY */}
      <section id="available-programmes" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E9] mb-2">
              Curriculum & Tracks
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight">
              Available Programmes
            </h2>
            <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-2xl">
              Practical, demand-driven digital tracks engineered to build verified capability, mentor guidance, and real-world career readiness.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Design', 'Engineering', 'Analytics', 'Security'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors ${selectedCategory === cat
                    ? 'bg-[#000F38] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Programmes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#0040E9]/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="font-bold text-[#0040E9] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                    {prog.category}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {prog.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#000F38] group-hover:text-[#0040E9] transition-colors mb-3">
                  {prog.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {prog.description}
                </p>

                <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 mb-8">
                  <div className="text-xs font-mono uppercase text-[#0040E9] font-bold mb-2">
                    Focus:
                  </div>
                  <div className="text-xs text-gray-700 leading-relaxed font-medium">
                    {prog.focus}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-mono text-gray-400 font-medium">Tuition</div>
                  <div className="text-sm font-bold text-[#000F38]">{prog.tuition}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/academy/${prog.slug}`}
                    className="bg-[#000F38] group-hover:bg-[#0040E9] text-white py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    Explore Program
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Scholarships Available (from 02. ACADEMY brief) */}
      <ScholarshipBanner />

      {/* 4. Subscribe Section (from 02. ACADEMY brief) */}
      <SubscribeSection />
    </div>
  );
};

