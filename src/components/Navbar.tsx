import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, ChevronDown, 
  Layout, Palette, Globe, Terminal, BarChart3, Shield,
  LogIn, HelpCircle
} from 'lucide-react';
import { StudentProfile } from '../types';
import { SocialLinks } from './SocialLinks';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenFAQ?: () => void;
  student: StudentProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  onOpenFAQ,
  student
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open to prevent background interactions
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const programs = [
    {
      title: 'UI/UX & Product Design',
      slug: 'ui-ux-product-design',
      category: 'Design',
      icon: Layout,
      desc: 'Research, structure and design digital experiences.'
    },
    {
      title: 'Graphic & Brand Design',
      slug: 'graphic-brand-design',
      category: 'Design',
      icon: Palette,
      desc: 'Visual identities, typography, and brand systems.'
    },
    {
      title: 'Web Development',
      slug: 'web-development',
      category: 'Engineering',
      icon: Globe,
      desc: 'Functional, responsive web applications.'
    },
    {
      title: 'Software Engineering',
      slug: 'software-systems-engineering',
      category: 'Engineering',
      icon: Terminal,
      desc: 'Backend systems, databases, APIs, and architecture.'
    },
    {
      title: 'Data Analysis',
      slug: 'data-analysis-bi',
      category: 'Analytics',
      icon: BarChart3,
      desc: 'Turn raw data into actionable insights.'
    },
    {
      title: 'Cybersecurity',
      slug: 'cybersecurity-defense',
      category: 'Security',
      icon: Shield,
      desc: 'Security principles, network defense, and operations.'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 transition-all w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center group">
            <img
              src="/PNG/Full logo_colored_Black_BrandoraX.png"
              alt="BrandoraX"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#000F38]">
            {/* Programmes with Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`py-2 inline-flex items-center gap-1.5 transition-colors ${
                  dropdownOpen || location.pathname.startsWith('/academy')
                    ? 'text-[#0040E9] font-bold'
                    : 'text-[#000F38]/80 hover:text-[#0040E9]'
                }`}
              >
                <span>Programmes</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#0040E9]' : 'text-gray-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full -left-4 pt-3 w-[560px] z-50 animate-fadeIn">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0040E9]">
                        All Programmes
                      </span>
                      <Link
                        to="/academy"
                        onClick={() => setDropdownOpen(false)}
                        className="text-xs font-bold text-gray-500 hover:text-[#0040E9] flex items-center gap-1"
                      >
                        View All Syllabi
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {programs.map((prog) => {
                        const Icon = prog.icon;
                        return (
                          <Link
                            key={prog.slug}
                            to={`/academy/${prog.slug}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0040E9] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0040E9] group-hover:text-white transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#000F38] group-hover:text-[#0040E9] transition-colors leading-tight">
                                {prog.title}
                              </div>
                              <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 leading-snug">
                                {prog.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span>Up to 90% scholarships available on all tracks</span>
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenQuiz();
                        }}
                        className="text-[#0040E9] font-bold hover:underline"
                      >
                        Take Track Quiz →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/community"
              className={({ isActive }) =>
                `py-2 transition-colors ${isActive ? 'text-[#0040E9] font-bold' : 'text-[#000F38]/80 hover:text-[#0040E9]'}`
              }
            >
              Community
            </NavLink>

            <NavLink
              to="/talent-pipeline"
              className={({ isActive }) =>
                `py-2 transition-colors ${isActive ? 'text-[#0040E9] font-bold' : 'text-[#000F38]/80 hover:text-[#0040E9]'}`
              }
            >
              Partner with Us
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `py-2 transition-colors ${isActive ? 'text-[#0040E9] font-bold' : 'text-[#000F38]/80 hover:text-[#0040E9]'}`
              }
            >
              About Us
            </NavLink>

            {onOpenFAQ && (
              <button
                type="button"
                onClick={onOpenFAQ}
                className="py-2 text-[#000F38]/80 hover:text-[#0040E9] transition-colors flex items-center gap-1 font-semibold"
              >
                <span>FAQs</span>
                <HelpCircle className="w-3.5 h-3.5 text-[#0040E9]" />
              </button>
            )}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/apply"
            className="text-xs font-bold text-gray-600 hover:text-[#0040E9] transition-colors"
          >
            Scholarships
          </Link>

          {student?.isEnrolled ? (
            <Link
              to="/dashboard"
              className="text-xs font-bold text-[#0040E9] hover:underline"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/apply"
              className="text-xs font-bold text-gray-600 hover:text-[#000F38] transition-colors flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          )}

          <Link
            to="/apply"
            className="bg-[#0040E9] hover:bg-[#0035C2] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-3">
          {onOpenFAQ && (
            <button
              type="button"
              onClick={onOpenFAQ}
              className="p-1.5 text-[#000F38] hover:bg-gray-100 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
              aria-label="FAQs"
            >
              <HelpCircle className="w-4 h-4 text-[#0040E9]" />
              <span>FAQs</span>
            </button>
          )}
          <Link
            to="/apply"
            className="bg-[#0040E9] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg"
          >
            Apply
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#000F38] hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Full-Screen Backdrop Overlay (Locks background interactions) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 bg-[#000F38]/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer (Fixed overlay sheet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-50 lg:hidden bg-white px-6 py-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-fadeIn">
          <div className="space-y-4 text-sm font-bold text-[#000F38]">
            {/* Programmes - Single Direct Link (No tracks shown as requested) */}
            <Link
              to="/academy"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 border-b border-gray-100 hover:text-[#0040E9] text-base"
            >
              Programmes
            </Link>

            <Link
              to="/community"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 border-b border-gray-100 hover:text-[#0040E9] text-base"
            >
              Community
            </Link>

            <Link
              to="/talent-pipeline"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 border-b border-gray-100 hover:text-[#0040E9] text-base"
            >
              Partner with Us
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 border-b border-gray-100 hover:text-[#0040E9] text-base"
            >
              About Us
            </Link>

            <Link
              to="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 border-b border-gray-100 hover:text-[#0040E9] text-base text-[#0040E9]"
            >
              Scholarships (Up to 90%)
            </Link>

            {onOpenFAQ && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFAQ();
                }}
                className="w-full text-left py-2.5 border-b border-gray-100 hover:text-[#0040E9] text-base flex items-center justify-between"
              >
                <span>FAQs</span>
                <HelpCircle className="w-4 h-4 text-[#0040E9]" />
              </button>
            )}

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 hover:text-[#0040E9] text-sm text-gray-600"
            >
              Student Portal / Login
            </Link>
          </div>

          {/* Bottom Actions & Micro Buttons (Image 1 reference) */}
          <div className="pt-6 border-t border-gray-200 mt-6 space-y-4">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full py-3 bg-gray-100 text-[#000F38] rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Take 60s Track Quiz
              </button>

              <Link
                to="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[#0040E9] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center shadow-md"
              >
                Apply for Scholarship
              </Link>
            </div>

            {/* Micro buttons row at bottom of mobile drawer */}
            <div className="pt-3 flex flex-col items-center justify-center gap-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Official Channels & Support
              </span>
              <SocialLinks 
                variant="circle" 
                onOpenSupport={() => {
                  setMobileMenuOpen(false);
                  if (onOpenFAQ) onOpenFAQ();
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
