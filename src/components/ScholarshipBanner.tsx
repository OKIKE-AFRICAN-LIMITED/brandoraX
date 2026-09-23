import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ScrollReveal } from './ScrollReveal';

export const ScholarshipBanner: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#F8FAFC] border-b border-gray-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" className="w-full">
          <div className="bg-gradient-to-br from-[#000F38] via-[#0A1B4B] to-[#0040E9] rounded-3xl p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Exact Brief Copy */}
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                  Scholarships Available
                </h2>

                <p className="text-lg sm:text-2xl text-white/90 font-medium mb-8 leading-relaxed">
                  Apply for the BrandoraX scholarships and get <span className="text-[#FEC958] font-bold">up to 90% discount</span> on your tuition fee
                </p>

                <div>
                  <Link
                    to="/apply"
                    className="bg-[#FEC958] hover:bg-[#E5B147] text-[#000F38] px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                  >
                    Apply for Scholarship
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Scholarship Image from Assets */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-white/5 group">
                  <img
                    src={ASSETS.scholarship}
                    alt="Apply for BrandoraX scholarships and get up to 90% discount"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
