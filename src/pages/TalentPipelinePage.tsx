import React, { useState } from 'react';
import { Briefcase, Building2, CheckCircle2, ArrowRight, ShieldCheck, Users, Mail, Phone, Terminal } from 'lucide-react';

export const TalentPipelinePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    roleNeeded: 'Full-Stack Developers',
    talentCount: '1-3',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-16 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-amber font-bold mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
            <Briefcase className="w-3.5 h-3.5 text-brand-amber" />
            Employer & Talent Pipeline Network
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-6">
            Hire assessed, job-ready digital talent.<br />
            <span className="text-brand-blue">Zero guesswork.</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
            Finding high-performing digital talent shouldn't mean sorting through endless unverified applications. BrandoraX connects fast-growing companies with assessed, project-tested engineers, designers, and data analysts.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (7 cols): Employer Value Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold mb-2">
                Why Hire From BrandoraX
              </div>
              <h2 className="text-3xl font-extrabold text-brand-navy mb-4">
                Trained on real briefs. Proven before hire.
              </h2>
              <p className="text-brand-gray-700 leading-relaxed text-base">
                Unlike generic coding academies that test on multiple-choice quizzes, BrandoraX candidates are graded on production pull requests, design systems, and client delivery discipline.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-brand-gray-200 rounded-xl p-6 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-brand-blue mb-3" />
                <h4 className="text-lg font-bold text-brand-navy mb-1">Pre-Assessed Repos</h4>
                <p className="text-xs text-brand-gray-600 leading-relaxed">
                  Inspect candidate pull requests, commit etiquette, and live deployed URLs before your first interview.
                </p>
              </div>

              <div className="bg-white border border-brand-gray-200 rounded-xl p-6 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-brand-blue mb-3" />
                <h4 className="text-lg font-bold text-brand-navy mb-1">Workplace Discipline</h4>
                <p className="text-xs text-brand-gray-600 leading-relaxed">
                  Candidates are coached in async communication, deadline accountability, and agile team workflows.
                </p>
              </div>

              <div className="bg-white border border-brand-gray-200 rounded-xl p-6 shadow-sm">
                <Users className="w-6 h-6 text-brand-blue mb-3" />
                <h4 className="text-lg font-bold text-brand-navy mb-1">Pan-African Pipeline</h4>
                <p className="text-xs text-brand-gray-600 leading-relaxed">
                  Access vetted junior to mid-level professionals across Nigeria, Ghana, Kenya, and remote diaspora hubs.
                </p>
              </div>

              <div className="bg-white border border-brand-gray-200 rounded-xl p-6 shadow-sm">
                <Building2 className="w-6 h-6 text-brand-blue mb-3" />
                <h4 className="text-lg font-bold text-brand-navy mb-1">Custom Cohort Training</h4>
                <p className="text-xs text-brand-gray-600 leading-relaxed">
                  Partner with us to train dedicated squads tailored specifically to your company’s internal tech stack.
                </p>
              </div>
            </div>

            {/* Disciplines Available */}
            <div className="bg-brand-navy text-white rounded-2xl p-8 border border-brand-navy-light shadow-brand">
              <h3 className="text-xl font-bold mb-4">Talent Specialties Available:</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-white/10 rounded-lg flex items-center justify-between">
                  <span>Full-Stack Web Developers</span>
                  <span className="text-brand-amber font-bold">React · Node · Supabase</span>
                </div>
                <div className="p-3 bg-white/10 rounded-lg flex items-center justify-between">
                  <span>UI/UX Product Designers</span>
                  <span className="text-brand-amber font-bold">Figma · Tokens · Wireframes</span>
                </div>
                <div className="p-3 bg-white/10 rounded-lg flex items-center justify-between">
                  <span>Data & BI Analysts</span>
                  <span className="text-brand-amber font-bold">SQL · Python · PowerBI</span>
                </div>
                <div className="p-3 bg-white/10 rounded-lg flex items-center justify-between">
                  <span>Cybersecurity Associates</span>
                  <span className="text-brand-amber font-bold">Wireshark · SOC · Nmap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Talent Inquiry Form */}
          <div className="lg:col-span-5 bg-white border border-brand-gray-200 rounded-2xl p-8 shadow-brand">
            {!submitted ? (
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-1">
                  Request Candidate Profiles
                </h3>
                <p className="text-xs text-brand-gray-600 mb-6">
                  Fill out your hiring requirements below. Our Partnerships Lead will share vetted candidate portfolios matching your criteria.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sterling Fintech Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. hiring@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                        Role Needed
                      </label>
                      <select
                        value={formData.roleNeeded}
                        onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                        className="w-full px-2.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
                      >
                        <option value="Full-Stack Developers">Full-Stack Devs</option>
                        <option value="UI/UX Designers">UI/UX Designers</option>
                        <option value="Data Analysts">Data Analysts</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Brand Designers">Brand Designers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                        Open Headcount
                      </label>
                      <select
                        value={formData.talentCount}
                        onChange={(e) => setFormData({ ...formData, talentCount: e.target.value })}
                        className="w-full px-2.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
                      >
                        <option value="1-3">1 – 3 Candidates</option>
                        <option value="4-10">4 – 10 Candidates</option>
                        <option value="10+">10+ Cohort Hire</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                      Role Details or Custom Stack (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. React/TypeScript frontend with experience building analytics dashboards."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-navy hover:bg-black text-white py-3.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    Submit Talent Request
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
                  Request Received!
                </h3>
                <p className="text-xs text-brand-gray-600 mb-6 leading-relaxed">
                  Thank you! Our Partnerships Director will review your headcount needs and send vetted candidate portfolios to <strong>{formData.workEmail}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-brand-navy text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
