import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ScrollReveal } from './ScrollReveal';

export const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" className="w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#000F38] text-white">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0">
            <img
              src={ASSETS.subscribe}
              alt="Subscribe to BrandoraX updates"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000F38] via-[#000F38]/95 to-[#0040E9]/75"></div>
          </div>

          {/* Content from Brief */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FEC958] font-bold mb-3">
              Subscribe to BrandoraX updates
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Stay connected to what’s next.
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8">
              Get updates on new programs, learning opportunities, events, talent opportunities, and everything happening at BrandoraX — straight to your inbox.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#FEC958]"
                />
                <button
                  type="submit"
                  className="bg-[#FEC958] hover:bg-[#E5B147] text-[#000F38] px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-xl max-w-md text-emerald-300 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>You're subscribed! We'll send updates straight to your inbox.</span>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
};
