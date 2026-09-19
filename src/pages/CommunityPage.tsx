import React, { useState } from 'react';
import { Users, Send, Video, Trophy, MessageSquare, ArrowRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setNewsletterSubscribed(true);
  };

  const communityFeatures = [
    {
      icon: Video,
      title: 'Bi-Weekly Masterclasses',
      description: 'Join practical sessions and system teardowns hosted by working tech leads across Africa, the UK, and North America.'
    },
    {
      icon: Users,
      title: 'Peer Sprints & Code Reviews',
      description: 'Don’t build alone. Pair program with other motivated learners, critique Figma layouts, and resolve git merge conflicts together.'
    },
    {
      icon: Trophy,
      title: 'Weekend Hackathons',
      description: 'High-energy time-boxed challenges where cross-functional teams ship working prototypes under 48 hours for recognition.'
    },
    {
      icon: MessageSquare,
      title: 'Job & Internship Alerts',
      description: 'Exclusive first access to freelance projects, junior vacancies, and internship openings shared directly by our hiring partners.'
    }
  ];

  return (
    <div className="bg-brand-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-16 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-amber font-bold mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
            <Users className="w-3.5 h-3.5 text-brand-amber" />
            2,000+ Community Members
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-6">
            More than a classroom.<br />
            <span className="text-brand-blue">A community for digital growth.</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
            Don’t learn in isolation. Join a growing pan-African network of aspiring digital professionals, creators, and experienced practitioners who are learning, sharing, connecting, and growing together.
          </p>

          <a
            href="https://t.me/brandorax_community"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Join BrandoraX Telegram Hub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Community Pillars Grid */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold mb-2">
            Ecosystem Activities
          </div>
          <h2 className="text-3xl font-extrabold text-brand-navy">
            What Happens in the Community?
          </h2>
          <p className="text-brand-gray-600 mt-2 text-sm sm:text-base">
            From technical feedback to career guidance, our community is built to keep you accountable and engaged throughout your learning journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-brand-gray-200 rounded-xl p-6 shadow-sm hover:border-brand-blue transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{feat.title}</h3>
                <p className="text-xs text-brand-gray-600 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Telegram Live Preview & Newsletter */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Telegram Card */}
          <div className="lg:col-span-7 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 border border-brand-navy-light shadow-brand">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono text-gray-300">Live Telegram Discussions</span>
              </div>
              <span className="text-xs font-mono text-brand-amber font-bold">2,000+ Active</span>
            </div>

            <div className="space-y-3 font-sans text-xs mb-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-brand-amber font-bold block mb-1">Mentor Tunde · Full-Stack Lead</span>
                <p className="text-gray-300">"Great job to everyone who submitted the Supabase auth sprint yesterday. Check your individual repo PRs for benchmark critiques."</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-brand-blue font-bold block mb-1">Chioma D. · UI/UX Cohort</span>
                <p className="text-gray-300">"Just deployed our Fintech case study on Behance! Thanks to the Saturday critique room for the typography suggestions."</p>
              </div>
            </div>

            <a
              href="https://t.me/brandorax_community"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-md inline-flex items-center gap-2 transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
              Join The Channel Now
            </a>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 bg-white border border-brand-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center mb-4">
              <Mail className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-brand-navy mb-2">
              Stay in the Loop
            </h3>
            <p className="text-xs text-brand-gray-600 leading-relaxed mb-6">
              Get updates on new cohort admissions, masterclass announcements, free learning sprints, and talent opportunities delivered to your inbox.
            </p>

            {!newsletterSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-navy hover:bg-black text-white py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-xs">
                <strong>Subscribed!</strong> You will receive our next community digest and webinar invitations.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
