import React from 'react';
import { Target, Compass, BookOpen, Users, Handshake, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../data/assets';
import { SOCIAL_LINKS } from '../components/SocialLinks';
import { ScrollReveal } from '../components/ScrollReveal';

export const AboutPage: React.FC = () => {
  const approaches = [
    {
      step: '01',
      title: 'TRAIN',
      desc: 'Build practical, in-demand digital skills through structured, hands-on learning.'
    },
    {
      step: '02',
      title: 'MENTOR',
      desc: 'Learn from experienced practitioners who provide guidance, code reviews, and direction.'
    },
    {
      step: '03',
      title: 'BUILD',
      desc: 'Work on production-grade projects that turn theoretical knowledge into tangible proof of work.'
    },
    {
      step: '04',
      title: 'DEPLOY',
      desc: 'Connect graduates with real career opportunities, live briefs, and employer pipelines.'
    }
  ];

  // Partnerships ordered LAST as instructed
  const ecosystem = [
    {
      icon: BookOpen,
      title: 'Academy',
      desc: 'Structured, outcome-driven training designed to build verified digital capabilities and portfolio projects.'
    },
    {
      icon: Users,
      title: 'Community',
      desc: 'A growing network where learners, creators, and professionals connect, share knowledge, and learn together.'
    },
    {
      icon: TrendingUp,
      title: 'Talent Development',
      desc: 'Identifying, assessing, and nurturing promising talent as they advance toward professional employment.'
    },
    {
      icon: Handshake,
      title: 'Partnerships',
      desc: 'Collaborating with companies, startups, and institutions to create reliable pathways for talent absorption and youth empowerment.'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-[#000F38] w-full overflow-hidden">
      {/* 1. Hero: ABOUT BRANDORAX */}
      <section className="relative min-h-[75vh] lg:min-h-[78vh] flex items-center bg-[#000F38] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10 w-full">
        {/* Background Image with Directional Fade */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.community.outreach}
            alt="BrandoraX Empowering Young African Professionals"
            className="w-full h-full object-cover object-[60%_center] sm:object-center lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000F38]/85 via-[#000F38]/60 to-[#000F38]/95 md:bg-gradient-to-r md:from-[#000F38] md:via-[#000F38]/90 md:via-55% md:to-[#000F38]/30"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#000F38]/70 via-transparent to-[#000F38]/85"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl text-left flex flex-col items-start">
            <ScrollReveal direction="down" delay={50}>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FEC958] mb-6 bg-white/10 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md shadow-sm">
                About BrandoraX
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm">
                Turning Digital Potential<br />
                <span className="text-[#FEC958]">Into Real Opportunity.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed mb-8 font-normal drop-shadow-sm">
                Africa has no shortage of ambitious talent. We are closing the gap between potential, real capability, and career opportunity.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/academy"
                  className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group text-center"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Partner with Us replacing Join the Talent Pipeline */}
                <Link
                  to="/talent-pipeline"
                  className="bg-white hover:bg-gray-100 text-[#000F38] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2 text-center"
                >
                  <span>Partner with Us</span>
                  <ArrowRight className="w-4 h-4 text-[#0040E9]" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Manifesto: Why We Exist (Enriched with Brand Colors & Updated Font Style from Image 5) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F4F7FF] border-b border-blue-100 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {/* Updated font style on Purpose eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0040E9] text-xs font-bold uppercase tracking-wider mb-3">
              01 · Our Purpose
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000F38] tracking-tight">
              Why We Exist
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Reality Card with updated font tag */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#000F38] text-[#FEC958] text-xs font-bold uppercase tracking-wider mb-3">
                01 · The Reality
              </div>
              <p className="text-sm sm:text-base text-[#000F38]/85 leading-relaxed">
                Africa has no shortage of ambitious people willing to learn digital skills. But learning is only the beginning. The real challenge is becoming prepared for work and gaining access to opportunity.
              </p>
            </div>

            {/* The Gap Card with updated font tag */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0040E9] text-white text-xs font-bold uppercase tracking-wider mb-3">
                02 · The Gap
              </div>
              <p className="text-sm sm:text-base text-[#000F38]/85 leading-relaxed">
                At the same time, businesses need capable digital talent they can trust. The problem isn't a lack of potential. It's the gap between potential and opportunity.
              </p>
            </div>

            {/* The Solution Card with updated font tag */}
            <div className="bg-white border-2 border-[#0040E9]/30 rounded-2xl p-6 sm:p-8 md:col-span-2 shadow-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FEC958] text-[#000F38] text-xs font-bold uppercase tracking-wider mb-3">
                03 · The Solution
              </div>
              <p className="text-base sm:text-lg text-[#000F38] font-medium leading-relaxed">
                We exist to close that gap. BrandoraX is an employment-driven digital talent ecosystem built to help aspiring digital professionals develop practical skills, gain experience, build proof of work, and prepare for real-world opportunities.
              </p>
              <p className="text-sm text-gray-500 italic mt-3 pt-3 border-t border-gray-100">
                We are building a pathway where learning doesn't end in a certificate — it moves toward capability, confidence and opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO (Rich Deep Navy Background to Eliminate Stark Whitespace) */}
      <section className="py-20 px-4 sm:px-6 bg-[#000F38] text-white w-full border-b border-white/10">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#FEC958] mb-4 border border-white/15">
            What We Do
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            We build people, not just skills.
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-white/85 leading-relaxed">
            <p>
              Through the BrandoraX Academy, learners develop practical, in-demand digital skills through structured training, hands-on projects, and mentorship.
            </p>
            <p className="font-bold text-[#FEC958]">
              But our work goes beyond the classroom.
            </p>
            <p>
              We are building an ecosystem where people can learn, grow, connect, demonstrate their abilities and, over time, access pathways into the world of work.
            </p>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION (High Contrast Brand Dual Cards) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0040E9] flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0040E9] mb-2">
                Our Vision
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#000F38] mb-4">
                Africa's most practical and employment-driven digital talent pipeline.
              </h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                We envision a future where talented people can access the skills, experience, guidance and opportunities they need to build meaningful careers — regardless of where they are starting from.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-[#000F38] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col justify-between border border-white/10">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FEC958] flex items-center justify-center mb-6 shadow-sm border border-white/15">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FEC958] mb-2">
                Our Mission
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Empowering Capability and Opportunity
              </h3>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed">
                To equip aspiring digital professionals with in-demand skills, practical experience, mentorship and access to real-world opportunities through structured systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR APPROACH */}
      <section className="py-20 px-4 sm:px-6 bg-[#F8FAFC] border-y border-gray-200 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#0040E9] mb-2">
              Our Approach
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight">
              From learning to deployment.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {approaches.map((app) => (
              <div
                key={app.title}
                className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <span className="text-xs font-bold text-[#0040E9] bg-blue-50 px-3 py-1 rounded-md mb-4 inline-block">
                    STEP {app.step}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#000F38] mb-3">
                    {app.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE BRANDORAX ECOSYSTEM (Partnerships comes LAST) */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0040E9] mb-2">
            The BrandoraX Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-2">
            One vision. Four pathways.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {ecosystem.map((eco) => {
            const Icon = eco.icon;
            return (
              <div
                key={eco.title}
                className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-[#0040E9] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0040E9] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#000F38] mb-2">
                  {eco.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {eco.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 7. Closing Call to Action (Official Channels box removed as requested) */}
        <div className="bg-[#000F38] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Join our growing community of 2,000+ community members.
          </h3>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Connect with learners, creators, and mentors building their digital careers together across Africa.
          </p>
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Join Our Community</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};
