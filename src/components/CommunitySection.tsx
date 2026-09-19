import React from 'react';
import { Users, Send, MessageSquare, Video, Trophy, Sparkles, ArrowRight } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const events = [
    {
      icon: Video,
      title: 'Bi-Weekly Industry Masterclasses',
      description: 'Practical conversations and live architectural teardowns with senior engineers, designers, and hiring managers from top African and global tech startups.'
    },
    {
      icon: Users,
      title: 'Peer Sprints & Accountability Circles',
      description: 'Never get stuck in isolation. Work alongside other determined learners, exchange code reviews, and stay accountable to weekend deadlines.'
    },
    {
      icon: Trophy,
      title: 'Weekend Hackathons & Project Challenges',
      description: 'Fast-paced weekend sprints designed to test real problem-solving speed, team collaboration, and git branching workflows under pressure.'
    }
  ];

  return (
    <section id="community" className="py-24 px-4 sm:px-6 bg-brand-gray-100 border-b border-brand-gray-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-blue font-bold mb-3 bg-brand-blue-light px-3 py-1 rounded-full border border-brand-blue/20">
              <Users className="w-3.5 h-3.5 text-brand-blue" />
              Pan-African Learner Network
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
              More than a classroom.<br />
              <span className="text-brand-blue">A community for digital growth.</span>
            </h2>

            <p className="text-brand-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              Don't learn in isolation. Join <strong>2,000+</strong> aspiring digital professionals, creators, and experienced practitioners learning, sharing, connecting, and growing together.
            </p>

            <div className="space-y-4 mb-8">
              {events.map((ev, i) => {
                const Icon = ev.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-brand-gray-200">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy mb-1">{ev.title}</h4>
                      <p className="text-xs text-brand-gray-600 leading-relaxed">{ev.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="https://t.me/brandorax_community"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Join BrandoraX Telegram Community
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-10 border border-brand-navy-light shadow-brand-lg relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-300">
                    Active Telegram Hub
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-amber font-bold">2,000+ Members</span>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1">
                    <span className="font-bold text-white">@kofi_dev</span>
                    <span>10m ago</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    "Just merged the final PR for our full-stack e-commerce sprint! Huge thanks to the mentors for the feedback on database indices."
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1">
                    <span className="font-bold text-brand-amber">Mentor (Tunde E.)</span>
                    <span>32m ago</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    "Saturday review room opens at 11:00 AM WAT. Make sure your GitHub repos have updated READMEs with live deployed Vercel URLs."
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1">
                    <span className="font-bold text-white">@amara_design</span>
                    <span>1h ago</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    "Shared our Fintech design system tokens in Figma Community. Would love any feedback on the accessibility contrast!"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Free & open to all aspiring tech talent</span>
                <span className="text-brand-amber font-semibold">Join Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
