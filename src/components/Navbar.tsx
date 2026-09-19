import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  onOpenQuiz: () => void;
  student: StudentProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  student
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] font-semibold tracking-wider uppercase transition-colors py-1.5 ${
      isActive ? 'text-[#0040E8] font-bold' : 'text-[#000F38]/70 hover:text-[#000F38]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md hairline-b transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center">
            <img
              src="/PNG/Full logo_colored_Black_BrandoraX.png"
              alt="BrandoraX"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/academy" className={navLinkClass}>
              Academy
            </NavLink>
            <NavLink to="/talent-pipeline" className={navLinkClass}>
              Talent Pipeline
            </NavLink>
            <NavLink to="/community" className={navLinkClass}>
              Community
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </nav>
        </div>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-6">
          <button
            onClick={onOpenQuiz}
            className="text-xs font-mono font-medium text-[#000F38]/60 hover:text-[#0040E8] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FEC959]" />
            Find Your Track
          </button>

          <Link
            to="/talent-pipeline"
            className="text-xs font-bold uppercase tracking-wider text-[#000F38]/70 hover:text-[#000F38] transition-colors"
          >
            Hire Talent
          </Link>

          {student?.isEnrolled && (
            <Link
              to="/dashboard"
              className="text-xs font-bold uppercase tracking-wider text-[#0040E8] hover:underline"
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/apply"
            className="bg-[#0040E8] hover:bg-[#0035C2] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            Apply Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-3">
          <Link
            to="/apply"
            className="bg-[#0040E8] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded"
          >
            Apply
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#000F38] hover:bg-gray-100 rounded"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white hairline-b px-6 py-8 space-y-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4 text-sm font-bold uppercase tracking-wider text-[#000F38]">
            <Link
              to="/academy"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#0040E8]"
            >
              Academy (6 Disciplines)
            </Link>
            <Link
              to="/talent-pipeline"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#0040E8]"
            >
              Talent Pipeline (Hire Talent)
            </Link>
            <Link
              to="/community"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#0040E8]"
            >
              Community (2,000+ Members)
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#0040E8]"
            >
              About BrandoraX
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#0040E8]"
            >
              Student Portal
            </Link>
          </div>

          <div className="pt-6 hairline-t flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full text-center py-3 bg-gray-100 text-[#000F38] rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FEC959]" />
              Find Your Track (60s Quiz)
            </button>

            <Link
              to="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 bg-[#0040E8] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Apply for Admission
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
