import React from 'react';
import { Users, Send, Video, MessageSquare, HeartHandshake, Calendar, ArrowRight } from 'lucide-react';
import { SubscribeSection } from '../components/SubscribeSection';
import { ASSETS } from '../data/assets';
import { SOCIAL_LINKS } from '../components/SocialLinks';
import { ScrollReveal } from '../components/ScrollReveal';

export const CommunityPage: React.FC = () => {
  const activities = [
    {
      title: 'Webinars & Learning Sessions',
      description: 'Join practical conversations and educational sessions designed around relevant digital skills, careers and professional growth.',
      image: ASSETS.community.hero,
      icon: Video
    },
    {
      title: 'Industry Conversations',
      description: 'Hear from practitioners and professionals who are actively working in the digital space across Africa.',
      image: ASSETS.community.industryConversations,
      icon: MessageSquare
    },
    {
      title: 'Community Events',
      description: 'Participate in activities designed to connect people, share knowledge and create meaningful relationships.',
      image: ASSETS.community.events,
      icon: Calendar
    },
    {
      title: 'Outreach & Empowerment',
      description: 'We work to expand access to digital knowledge and opportunities, especially among young people and aspiring professionals.',
      image: ASSETS.community.outreach,
      icon: HeartHandshake
    },
    {
      title: 'Collaboration',
      description: 'Connect with people who are learning, building and working across different areas of the digital ecosystem.',
      image: ASSETS.community.collaboration,
      icon: Users
    }
  ];

  return (
    <div className="bg-white min-h-screen text-[#000F38] w-full overflow-hidden">
      {/* 1. Hero Header */}
      <section className="relative min-h-[75vh] lg:min-h-[78vh] flex items-center bg-[#000F38] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10 w-full">
        {/* Background Image with Directional Fade */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.community.hero}
            alt="BrandoraX Community of African Tech Learners"
            className="w-full h-full object-cover object-[60%_center] sm:object-center lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000F38]/85 via-[#000F38]/60 to-[#000F38]/95 md:bg-gradient-to-r md:from-[#000F38] md:via-[#000F38]/90 md:via-55% md:to-[#000F38]/30"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#000F38]/70 via-transparent to-[#000F38]/85"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl text-left flex flex-col items-start">
            {/* Join 2000+ community members in official brand font */}
            <ScrollReveal direction="down" delay={50}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs sm:text-sm font-bold text-[#FEC958] mb-6 border border-white/15 backdrop-blur-md shadow-sm">
                <Users className="w-4 h-4" />
                <span>Join 2000+ community members</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm">
                More Than a Classroom.<br />
                <span className="text-[#FEC958]">A Community for Digital Growth.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed mb-8 font-normal drop-shadow-sm">
                Don’t learn alone. Connect with aspiring professionals, creators, and experienced practitioners building together across Africa.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Join the BrandoraX Community</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>

            {/* Proof Checkpoints */}
            <ScrollReveal direction="up" delay={450} className="w-full max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 text-sm text-white/90 font-medium border-t border-white/10 mt-8 w-full">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  <span>Weekly Expert Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  <span>Collaborative Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  <span>100% Free to Join</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. What Happens in the Community? */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0040E9] mb-2">
            Community Activities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight">
            What Happens in the Community?
          </h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Five core initiatives connecting talent, mentors, creators, and employment opportunities across Africa.
          </p>
        </div>

        {/* 5 Community Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[#000F38]/80 backdrop-blur-sm text-white flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 text-[#FEC958]" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#000F38] group-hover:text-[#0040E9] transition-colors mb-3">
                      {act.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Subscribe Section */}
      <SubscribeSection />
    </div>
  );
};
