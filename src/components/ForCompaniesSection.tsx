import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, X, Send } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface ForCompaniesProps {
  onOpenPartnerModal?: () => void;
}

export const ForCompaniesSection: React.FC<ForCompaniesProps> = ({ onOpenPartnerModal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    roleNeeded: 'UI/UX & Product Design',
    talentCount: '1-3',
    message: ''
  });

  const benefits = [
    'Access emerging digital talent',
    'Source interns',
    'Find project-based professionals',
    'Identify potential hires',
    'Support talent development',
    'Build longer-term talent pipelines',
    'Partner on corporate training'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section id="companies" className="py-24 px-4 sm:px-6 bg-[#F8FAFC] border-b border-gray-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E9] mb-3">
                For Companies
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-4">
                Need digital talent?
              </h2>

              <p className="text-base sm:text-lg text-[#000F38]/80 leading-relaxed mb-4">
                Finding the right digital talent shouldn't mean sorting through endless applications without knowing who can actually deliver.
              </p>

              <p className="text-base sm:text-lg text-[#000F38]/80 leading-relaxed mb-6">
                BrandoraX helps companies access a growing pool of trained, assessed and developing digital professionals across key areas of the digital workforce.
              </p>

              <div className="mb-6">
                <div className="text-sm font-bold text-[#000F38] mb-3">
                  Through BrandoraX, you will:
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {benefits.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#000F38]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#0040E9] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#000F38]/75 leading-relaxed mb-8 font-medium">
                We work to understand what companies need and connect them with talent whose skills and experience align with those needs.<br />
                <strong className="text-[#000F38] font-bold">Build your next team from talent that has been trained to do the work.</strong>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-[#000F38] hover:bg-black text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                >
                  Hire Talent
                  <ArrowRight className="w-4 h-4 text-[#FEC958]" />
                </button>

                {onOpenPartnerModal ? (
                  <button
                    onClick={onOpenPartnerModal}
                    className="border-2 border-[#000F38]/30 hover:bg-[#000F38]/5 text-[#000F38] px-6 py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                  >
                    Partner with Us
                  </button>
                ) : (
                  <a
                    href="#partners"
                    className="border-2 border-[#000F38]/30 hover:bg-[#000F38]/5 text-[#000F38] px-6 py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                  >
                    Partner with Us
                  </a>
                )}
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 aspect-[4/3] sm:aspect-[5/4] group">
                <img
                  src={ASSETS.companies}
                  alt="Need digital talent? BrandoraX workforce solutions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Talent Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 sm:p-8 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setModalOpen(false); setSubmitted(false); }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#0040E9] font-bold mb-2">
                  For Companies
                </div>
                <h3 className="text-2xl font-bold text-[#000F38] mb-2">
                  Hire Assessed Digital Talent
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Tell us what digital disciplines you need. We connect you directly with candidates who have been trained to do the work.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-gray-700">
                  <div>
                    <label className="block mb-1 font-semibold text-[#000F38]">Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Africa Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold text-[#000F38]">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="talent@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Role Needed</label>
                      <select
                        value={formData.roleNeeded}
                        onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white"
                      >
                        <option>UI/UX & Product Design</option>
                        <option>Graphic & Brand Design</option>
                        <option>Web Development</option>
                        <option>Software Engineering</option>
                        <option>Data Analysis</option>
                        <option>Cybersecurity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Talent Count</label>
                      <select
                        value={formData.talentCount}
                        onChange={(e) => setFormData({ ...formData, talentCount: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white"
                      >
                        <option>1-2 Candidates</option>
                        <option>3-5 Candidates</option>
                        <option>6-10 Candidates</option>
                        <option>10+ (Cohort Hiring)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold text-[#000F38]">Message / Specific Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the skills and timeline you require..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0040E9] hover:bg-[#0035C2] text-white py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#000F38] mb-2">Request Received</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto mb-6">
                  Thank you! Our talent team will reach out to <span className="font-semibold">{formData.workEmail}</span> with suitable candidate profiles.
                </p>
                <button
                  onClick={() => { setModalOpen(false); setSubmitted(false); }}
                  className="bg-[#000F38] text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
