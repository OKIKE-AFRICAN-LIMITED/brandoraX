import React from 'react';
import { Users, Send, Video, MessageSquare, HeartHandshake, Calendar, ArrowRight } from 'lucide-react';
import { SubscribeSection } from '../components/SubscribeSection';
import { ASSETS } from '../data/assets';

export const CommunityPage: React.FC = () => {
  const activities = [
    {
      title: 'Webinars & Learning Sessions',
      description: 'Join Practical conversations and educational sessions designed around relevant digital skills, careers and professional growth.',
      image: ASSETS.community.hero,
      icon: Video
    },
    {
      title: 'Industry Conversations',
      description: 'You get to Hear from practitioners and professionals who are actively working in the digital space.',
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
    <div className="bg-white min-h-screen text-[#000F38]">
      {/* 1. Hero Header matching 03. COMMUNITY */}
      <section className="relative min-h-[75vh] lg:min-h-[78vh] flex items-center bg-[#000F38] text-white overflow-hidden py-20 lg:py-24 border-b border-white/10">
        {/* Background Image with Directional Fade */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.community.hero}
            alt="BrandoraX Community of African Tech Learners"
            className="w-full h-full object-cover object-right lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000F38] via-[#000F38]/95 via-50% to-[#000F38]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000F38]/80 via-transparent to-[#000F38]/90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FEC958] font-bold mb-6 bg-white/10 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-sm">
              <Users className="w-3.5 h-3.5" />
              2,000+ Community Members
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              More Than a Classroom.<br />
              <span className="text-[#FEC958]">A Community for Digital Growth.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed mb-8 font-normal">
              Don’t learn alone. Connect with aspiring professionals, creators, and experienced practitioners building together across Africa.
            </p>

            <div>
              <a
                href="https://t.me/brandorax_community"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                <Send className="w-4 h-4" />
                <span>Join the BrandoraX Community</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Proof Checkpoints */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-xs text-white/75 border-t border-white/10 mt-8 w-full max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                <span>Weekly Expert Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                <span>Collaborative Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                <span>100% Free to Join</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Happens in the Community? */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E9] mb-2">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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

      {/* 3. Subscribe Section matching brief */}
      <SubscribeSection />
    </div>
  );
};

