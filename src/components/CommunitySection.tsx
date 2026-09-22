import React from 'react';
import { Users, Send, Video, MessageSquare, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets';

export const CommunitySection: React.FC = () => {
  const activities = [
    {
      title: 'Industry Conversations',
      desc: 'Hear directly from practitioners and professionals who are actively working in the African and global digital space.',
      image: ASSETS.community.industryConversations,
      icon: Video
    },
    {
      title: 'Community Events',
      desc: 'Participate in interactive activities designed to connect learners, share knowledge, and build lasting professional relationships.',
      image: ASSETS.community.events,
      icon: Users
    },
    {
      title: 'Outreach & Empowerment',
      desc: 'Expanding access to digital skills and career opportunities, especially among ambitious young people and career switchers.',
      image: ASSETS.community.outreach,
      icon: HeartHandshake
    },
    {
      title: 'Collaboration & Peer Circles',
      desc: 'Connect with peers who are learning, designing, analyzing, and building across different areas of the digital ecosystem.',
      image: ASSETS.community.collaboration,
      icon: MessageSquare
    }
  ];

  return (
    <section id="community" className="py-24 px-4 sm:px-6 bg-[#F8FAFC] border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Community Hero Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#000F38] text-white mb-20">
          {/* Background Photo with Dark Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src={ASSETS.community.hero}
              alt="BrandoraX 2000+ member learning community"
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000F38] via-[#000F38]/90 to-[#000F38]/60"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#0040E9] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
              <Users className="w-3.5 h-3.5 text-[#FEC958]" />
              2,000+ Community Members
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              More than a classroom.<br />
              <span className="text-[#FEC958]">A community for digital growth.</span>
            </h2>

            <p className="text-base sm:text-xl text-white/85 leading-relaxed mb-8">
              Don’t learn alone. Join a growing community of aspiring digital professionals, creators, and experienced practitioners who are learning, sharing, connecting, and growing together.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://t.me/brandorax_community"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Join the BrandoraX Community
                <ArrowRight className="w-4 h-4" />
              </a>

              <span className="text-xs text-white/70 font-medium">
                Free to join · Active Telegram Hub & Weekly Sessions
              </span>
            </div>
          </div>
        </div>

        {/* Sub-Section: What Happens in the Community? */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#0040E9] font-bold mb-2">
            Network & Ecosystem
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#000F38]">
            What Happens in the Community?
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Engage in regular activities designed to accelerate your growth and keep you accountable.
          </p>
        </div>

        {/* 4 Activities Visual Grid with Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-[#0040E9] flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-[#000F38] mb-2 group-hover:text-[#0040E9] transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-xs text-[#000F38]/70 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
