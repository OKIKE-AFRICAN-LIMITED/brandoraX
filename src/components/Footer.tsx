import React from 'react';
import { Link } from 'react-router-dom';
import { Send, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onOpenFAQ?: () => void;
  onOpenQuiz?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFAQ, onOpenQuiz }) => {
  return (
    <footer className="bg-[#00081E] text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-6 border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/PNG/Full logo_colored_White_BrandoraX.png"
                alt="BrandoraX"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              An outcome-driven digital workforce development platform: train on live briefs, build verified proof-of-work portfolios, and connect to top employer opportunities across Africa.
            </p>

            <div className="inline-flex items-center gap-2.5 text-xs text-gray-300 bg-white/5 px-3.5 py-2 rounded-full border border-white/10 mb-6 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Next Cohort Application Window Open</span>
            </div>
          </div>

          {/* Programmes (3 cols) - Tracks hidden as instructed */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FEC958] mb-5">
              Programmes
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li>
                <Link to="/academy" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <span>Explore Programmes</span>
                  <ArrowRight className="w-3 h-3 text-[#FEC958]" />
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-white transition-colors">
                  Scholarships (Up to 90%)
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-white transition-colors">
                  All Syllabi & Curriculum
                </Link>
              </li>
              {onOpenQuiz && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenQuiz}
                    className="hover:text-[#FEC958] transition-colors text-left flex items-center gap-1 text-gray-300"
                  >
                    <span>Take 60s Track Quiz</span>
                    <Sparkles className="w-3 h-3 text-[#FEC958]" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Ecosystem (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FEC958] mb-5">
              Ecosystem
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li>
                <Link to="/talent-pipeline" className="hover:text-white transition-colors font-medium">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About BrandoraX
                </Link>
              </li>
              {onOpenFAQ && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenFAQ}
                    className="hover:text-white transition-colors text-left flex items-center gap-1 text-gray-300 font-medium"
                  >
                    <span>FAQs</span>
                    <HelpCircle className="w-3 h-3 text-[#0040E9]" />
                  </button>
                </li>
              )}
              <li>
                <a
                  href="https://t.me/brandorax_community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Telegram Group
                  <Send className="w-3 h-3 text-[#0040E9]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact (2 cols) - Partnerships placed last */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FEC958] mb-5">
              Contact
            </h4>
            <div className="space-y-4 text-xs text-gray-300">
              <div>
                <span className="block text-[11px] text-gray-500 uppercase font-semibold mb-0.5">Admission</span>
                <a href="mailto:academy@brandorax.africa" className="text-[#FEC958] hover:underline break-all font-medium">
                  academy@brandorax.africa
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500 uppercase font-semibold mb-0.5">Partnership</span>
                <a href="mailto:partnerships@brandorax.africa" className="text-[#FEC958] hover:underline break-all font-medium">
                  partnerships@brandorax.africa
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ALX-Style Bottom Bar with Micro Buttons (as shown in Image 1) */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-5 text-xs text-gray-400 text-center">
          {/* Logo in bottom bar */}
          <Link to="/" className="inline-block opacity-90 hover:opacity-100 transition-opacity">
            <img
              src="/PNG/Full logo_colored_White_BrandoraX.png"
              alt="BrandoraX"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Legal / Policy / Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400">
            <span>Legal</span>
            <span>|</span>
            <span>Cookie Policy</span>
            <span>|</span>
            <span>© {new Date().getFullYear()} BrandoraX</span>
          </div>

          {/* Micro Buttons Row */}
          <div className="pt-1">
            <SocialLinks variant="circle" onOpenSupport={onOpenFAQ} />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 pt-2">
            <Link to="/academy" className="hover:text-white transition-colors">
              Programmes
            </Link>
            <Link to="/community" className="hover:text-white transition-colors">
              Community
            </Link>
            <Link to="/talent-pipeline" className="hover:text-white transition-colors">
              Partner with Us
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            {onOpenFAQ && (
              <button
                type="button"
                onClick={onOpenFAQ}
                className="hover:text-white transition-colors font-medium text-gray-400"
              >
                FAQs
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
