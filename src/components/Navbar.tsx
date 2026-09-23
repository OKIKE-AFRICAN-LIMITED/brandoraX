import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, ChevronDown, 
  Layout, Palette, Globe, Terminal, BarChart3, Shield,
  LogIn, HelpCircle, Sparkles
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
  const [isClosing, setIsClosing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMobileMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 260);
  };

  const openMobileMenu = () => {
    setIsClosing(false);
    setMobileMenuOpen(true);
  };

  const toggleMobileMenu = () => {
    if (isClosing) return;
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsClosing(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Lock body and html scroll when mobile menu is open to prevent background interactions
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen && !isClosing) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, isClosing]);

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
    <header className={`sticky top-0 z-[10000] w-full transition-colors duration-300 ${
      mobileMenuOpen && !isClosing
        ? 'bg-transparent border-transparent pointer-events-none'
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 pointer-events-auto'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-10">
          <Link 
            to="/" 
            className={`flex items-center group transition-opacity duration-200 ${
              mobileMenuOpen && !isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
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

        {/* Mobile Header Actions (Clean, balanced, never wraps) */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3 pointer-events-auto">
          {onOpenFAQ && (
            <button
              type="button"
              onClick={onOpenFAQ}
              className={`hidden sm:flex p-1.5 text-[#000F38] hover:bg-gray-100 rounded-lg transition-all text-xs font-bold items-center gap-1 ${
                mobileMenuOpen && !isClosing ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
              }`}
              aria-label="FAQs"
            >
              <HelpCircle className="w-4 h-4 text-[#0040E9]" />
              <span>FAQs</span>
            </button>
          )}

          <Link
            to="/apply"
            className={`bg-[#0040E9] hover:bg-[#0035C2] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all shadow-sm ${
              mobileMenuOpen && !isClosing ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
            }`}
          >
            Apply
          </Link>

          {/* Morphing Hamburger-to-X Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="p-2 text-[#000F38] hover:bg-gray-100/80 rounded-xl transition-colors flex items-center justify-center active:scale-95 focus:outline-none pointer-events-auto relative z-50"
            aria-label={mobileMenuOpen && !isClosing ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen && !isClosing}
          >
            <div className="relative w-6 h-4 flex flex-col justify-between items-center pointer-events-none">
              {/* Top Bar */}
              <span
                className={`block h-0.5 w-5 bg-[#000F38] rounded-full transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  mobileMenuOpen && !isClosing
                    ? 'translate-y-[7px] rotate-45'
                    : 'translate-y-0 rotate-0'
                }`}
              />
              {/* Middle Bar */}
              <span
                className={`block h-0.5 w-5 bg-[#000F38] rounded-full transition-all duration-200 ease-out ${
                  mobileMenuOpen && !isClosing
                    ? 'opacity-0 scale-x-0'
                    : 'opacity-100 scale-100'
                }`}
              />
              {/* Bottom Bar */}
              <span
                className={`block h-0.5 w-5 bg-[#000F38] rounded-full transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  mobileMenuOpen && !isClosing
                    ? '-translate-y-[7px] -rotate-45'
                    : 'translate-y-0 rotate-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Portal - Slides in smoothly from the right, completely isolating mobile view */}
      {mobileMenuOpen && mounted && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] lg:hidden flex justify-end">
          {/* Full-Screen Dark Backdrop Overlay (visible on sm+ screens, completely blocks touches and clicks) */}
          <div
            className={`fixed inset-0 bg-[#000F38]/70 backdrop-blur-md ${
              isClosing ? 'animate-overlay-out' : 'animate-overlay-in'
            }`}
            onClick={closeMobileMenu}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />

          {/* Full-Width Mobile Drawer on Mobile / Slide in from Right */}
          <div
            className={`relative z-10 w-full sm:w-[420px] max-w-full h-full bg-white flex flex-col shadow-2xl overflow-hidden border-l border-gray-100 ${
              isClosing ? 'animate-drawer-right-out' : 'animate-drawer-right-in'
            }`}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Brand Logo and Spacer matching the Morphing Button */}
            <div className="h-20 px-4 sm:px-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-white">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center">
                <img
                  src="/PNG/Full logo_colored_Black_BrandoraX.png"
                  alt="BrandoraX"
                  className="h-8 w-auto object-contain"
                />
              </Link>

              {/* Invisible spacer matching the position of the header's morphing button sitting at z-[1000] */}
              <div className="w-10 h-10 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col justify-between">
              <div className="space-y-1 text-base font-bold text-[#000F38]">
                {/* Programmes */}
                <Link
                  to="/academy"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-3 border-b border-gray-100 hover:text-[#0040E9] transition-colors"
                >
                  <span>Programmes</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>

                {/* Community */}
                <Link
                  to="/community"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-3 border-b border-gray-100 hover:text-[#0040E9] transition-colors"
                >
                  <span>Community</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>

                {/* Partner with Us */}
                <Link
                  to="/talent-pipeline"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-3 border-b border-gray-100 hover:text-[#0040E9] transition-colors"
                >
                  <span>Partner with Us</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>

                {/* About Us */}
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-3 border-b border-gray-100 hover:text-[#0040E9] transition-colors"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>

                {/* Scholarships */}
                <Link
                  to="/apply"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-3 border-b border-gray-100 text-[#0040E9] hover:underline transition-colors"
                >
                  <span>Scholarships (Up to 90%)</span>
                  <span className="text-[10px] bg-blue-50 text-[#0040E9] px-2 py-0.5 rounded font-bold uppercase">
                    Available
                  </span>
                </Link>

                {/* FAQs */}
                {onOpenFAQ && (
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      onOpenFAQ();
                    }}
                    className="w-full flex items-center justify-between py-3 border-b border-gray-100 text-left hover:text-[#0040E9] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0040E9]" />
                      <span>Frequently Asked Questions</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                )}

                {/* Dashboard / Login */}
                <Link
                  to={student?.isEnrolled ? "/dashboard" : "/apply"}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-3 text-gray-600 hover:text-[#000F38] text-sm font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4 text-gray-500" />
                    <span>{student?.isEnrolled ? "Student Dashboard" : "Student Portal / Login"}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              </div>

              {/* Bottom Actions & Micro Buttons (Image 1 style) */}
              <div className="pt-6 border-t border-gray-100 mt-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      onOpenQuiz();
                    }}
                    className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-[#000F38] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FEC958]" />
                    <span>Take 60s Track Quiz</span>
                  </button>

                  <Link
                    to="/apply"
                    onClick={closeMobileMenu}
                    className="w-full py-4 bg-[#0040E9] hover:bg-[#0035C2] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors shadow-md block active:scale-95"
                  >
                    Apply for Scholarship
                  </Link>
                </div>

                {/* Micro buttons row at bottom of mobile drawer */}
                <div className="pt-2 flex flex-col items-center justify-center gap-2">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Official Channels & Support
                  </span>
                  <SocialLinks 
                    variant="circle" 
                    onOpenSupport={() => {
                      closeMobileMenu();
                      if (onOpenFAQ) onOpenFAQ();
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
