import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Briefcase, Mail } from 'lucide-react';
import { SocialLinks, SOCIAL_LINKS } from './SocialLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy-dark text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-6 border-t border-white/10">
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

            <div className="inline-flex items-center gap-2.5 text-xs font-mono text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Next Cohort Application Window Open</span>
            </div>

            {/* Official Social Media Channels */}
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                Official Channels
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Academy Tracks (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-amber mb-5">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link to="/academy/web-development" className="hover:text-white transition-colors">
                  Full-Stack Web Development
                </Link>
              </li>
              <li>
                <Link to="/academy/ui-ux-product-design" className="hover:text-white transition-colors">
                  UI/UX & Product Design
                </Link>
              </li>
              <li>
                <Link to="/academy/data-analysis-bi" className="hover:text-white transition-colors">
                  Data Analysis & BI
                </Link>
              </li>
              <li>
                <Link to="/academy/software-systems-engineering" className="hover:text-white transition-colors">
                  Software Systems Engineering
                </Link>
              </li>
              <li>
                <Link to="/academy/cybersecurity-defense" className="hover:text-white transition-colors">
                  Cybersecurity Defense
                </Link>
              </li>
              <li>
                <Link to="/academy/graphic-brand-design" className="hover:text-white transition-colors">
                  Graphic & Brand Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-amber mb-5">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link to="/talent-pipeline" className="hover:text-white transition-colors">
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-white transition-colors">
                  All Disciplines
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/brandorax_community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Telegram Group
                  <Send className="w-3 h-3 text-brand-blue" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About BrandoraX
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-amber mb-5">
              Contact
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div>
                <span className="block text-[11px] font-mono text-gray-500 uppercase">Admissions</span>
                <a href="mailto:hello@brandorax.com" className="text-brand-blue hover:underline font-mono">
                  hello@brandorax.com
                </a>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-gray-500 uppercase">Partnerships</span>
                <a href="mailto:partnerships@brandorax.com" className="text-brand-blue hover:underline font-mono">
                  partnerships@brandorax.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4 text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} BrandoraX Digital. Developing Africa's Tech Workforce.</p>
          <div className="flex gap-6 text-gray-400">
            <Link to="/academy" className="hover:text-white transition-colors">
              Disciplines
            </Link>
            <Link to="/community" className="hover:text-white transition-colors">
              Community
            </Link>
            <Link to="/talent-pipeline" className="hover:text-white transition-colors">
              Talent Pipeline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
