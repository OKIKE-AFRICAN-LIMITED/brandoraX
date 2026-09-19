import React, { useState } from 'react';
import { Briefcase, Building2, CheckCircle2, ArrowRight, X, Send, Users, ShieldCheck } from 'lucide-react';

interface ForCompaniesProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const ForCompaniesSection: React.FC<ForCompaniesProps> = ({
  isOpenModal,
  onCloseModal
}) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    roleNeeded: 'Full-Stack Developers',
    talentCount: '1-3',
    message: ''
  });

  const showModal = isOpenModal !== undefined ? isOpenModal : internalModalOpen;
  const handleClose = () => {
    if (onCloseModal) onCloseModal();
    setInternalModalOpen(false);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section id="companies" className="py-24 px-4 sm:px-6 bg-white border-b border-brand-gray-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            {/* Ambient blur lights */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-amber font-bold mb-4 bg-white/10 px-3 py-1.5 rounded-full">
                  <Briefcase className="w-3.5 h-3.5 text-brand-amber" />
                  For Employers & Enterprise Partners
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                  Need assessed, job-ready digital talent?
                </h2>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                  Finding dependable junior and intermediate talent shouldn't mean sifting through hundreds of identical CVs without knowing who can actually write code, design systems, or query production databases.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Pre-Assessed Portfolios</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Every graduate is vetted on verified Git commits, Figma systems, and live cloud URLs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Zero Hiring Guesswork</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Direct interviews with candidates who have solved real client briefs under pressure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setInternalModalOpen(true)}
                    className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                  >
                    Request Assessed Talent
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="mailto:partnerships@brandorax.com"
                    className="border border-white/20 hover:bg-white/10 text-white px-6 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                  >
                    Sponsor or Partner With Us
                  </a>
                </div>
              </div>

              {/* Right Column: Pipeline Architecture Card */}
              <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <div className="text-xs font-mono uppercase text-brand-amber font-bold mb-2">
                  Talent Pipeline Pathways
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Customized Workforce Solutions
                </h3>

                <div className="space-y-3 font-mono text-xs text-gray-300">
                  <div className="p-3.5 bg-black/40 rounded-lg border border-white/10 flex items-center justify-between">
                    <span>Direct Junior & Mid Placement</span>
                    <span className="text-emerald-400">Available</span>
                  </div>
                  <div className="p-3.5 bg-black/40 rounded-lg border border-white/10 flex items-center justify-between">
                    <span>Corporate Tech Upskilling</span>
                    <span className="text-brand-amber">Customized</span>
                  </div>
                  <div className="p-3.5 bg-black/40 rounded-lg border border-white/10 flex items-center justify-between">
                    <span>Youth Tech Sponsorship</span>
                    <span className="text-brand-blue font-bold">CSR Impact</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400">
                  Join 50+ prospective hiring partners across Nigeria, Africa, and global remote distributed teams.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Inquiry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-brand-gray-200 relative">
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-gray-100 text-brand-gray-500 hover:text-brand-navy"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="w-12 h-12 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
                  Hire From BrandoraX
                </h3>
                <p className="text-sm text-brand-gray-600 mb-6">
                  Tell us what roles your engineering or design team needs. We match you with assessed candidates and their live proof of work.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Technologies Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. talent@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1 font-semibold">
                        Discipline Needed
                      </label>
                      <select
                        value={formData.roleNeeded}
                        onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                        className="w-full px-2.5 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
                      >
                        <option value="Full-Stack Developers">Full-Stack Web Dev</option>
                        <option value="UI/UX Designers">UI/UX Product Design</option>
                        <option value="Data Analysts">Data & BI Analysts</option>
                        <option value="Cybersecurity">Cybersecurity Ops</option>
                        <option value="Brand Designers">Graphic & Brand Design</option>
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
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
                  Request Received!
                </h3>
                <p className="text-sm text-brand-gray-600 mb-6">
                  Our Partnerships Lead will review your headcount request and reach out to <strong>{formData.workEmail}</strong> within 24 hours with vetted candidate portfolios.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-brand-navy text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
