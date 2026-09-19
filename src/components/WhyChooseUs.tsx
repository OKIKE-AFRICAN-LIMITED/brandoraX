import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Practical, in-demand skills',
      desc: 'Learn disciplines engineered backwards from active job descriptions across African tech ecosystems and global remote companies. Zero theoretical fluff.'
    },
    {
      num: '02',
      title: 'Practitioner-led pull request critiques',
      desc: 'Get feedback on your actual Git commits, Figma auto-layouts, and SQL queries from senior engineers and designers who build software for a living.'
    },
    {
      num: '03',
      title: 'Indisputable proof of work',
      desc: 'Paper certificates don’t get people hired in modern tech. You graduate with live production URLs, public GitHub repositories, and client-grade artifacts.'
    },
    {
      num: '04',
      title: 'Direct bridge to opportunity',
      desc: 'High-performing graduates don’t get abandoned at completion. We actively present verified student portfolios to our network of startups, SMEs, and corporate hiring partners.'
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#F8FAFC] hairline-b">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Editorial Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E8] mb-3">
              The Institutional Difference
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-6">
              More than training.<br />
              <span className="text-[#0040E8]">We build workforce capability.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#000F38]/70 leading-relaxed mb-8">
              Traditional bootcamps measure graduation by hours watched. BrandoraX measures achievement by production readiness, architecture quality, and employer trust.
            </p>
            <Link
              to="/academy"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0040E8] hover:text-[#0035C2]"
            >
              Explore Academic Structure
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Editorial Pillar Rows */}
          <div className="lg:col-span-7 divide-y divide-[#000F38]/10">
            {pillars.map((p) => (
              <div key={p.num} className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-6">
                  <span className="text-sm font-mono font-bold text-[#0040E8] flex-shrink-0">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[#000F38] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#000F38]/70 leading-relaxed max-w-xl">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
