import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, X, Send } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ScrollReveal } from './ScrollReveal';

export const ForPartnersSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    partnershipType: 'Sponsorship',
    message: ''
  });

  const opportunities = [
    'Sponsorship',
    'Corporate training',
    'Talent development',
    'Deployment partnerships',
    'Community initiatives',
    'Youth development',
    'Industry collaboration'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section id="partners" className="py-24 px-4 sm:px-6 bg-white border-b border-gray-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Column */}
            <ScrollReveal direction="left" className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 aspect-[4/3] sm:aspect-[5/4] group">
                <img
                  src={ASSETS.partners}
                  alt="Help build the next generation of digital talent - Partner with BrandoraX"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </ScrollReveal>

            {/* Right Content Column */}
            <ScrollReveal direction="right" delay={150} className="lg:col-span-7 order-1 lg:order-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0040E9] mb-3">
                For Partners
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000F38] tracking-tight leading-tight mb-4">
                Help build the next generation of digital talent.
              </h2>

              <h3 className="text-xl font-bold text-[#0040E9] mb-4">
                Talent development requires more than classrooms.
              </h3>

              <p className="text-base sm:text-lg text-[#000F38]/80 leading-relaxed mb-6">
                BrandoraX works with organizations, companies, institutions and individuals who want to contribute to digital skills development, talent growth and employment opportunities.
              </p>

              <div className="mb-6">
                <div className="text-sm font-bold text-[#000F38] mb-3">
                  Partnership opportunities can include:
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {opportunities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#000F38]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#0040E9] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Partner Modal */}
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
                  For Partners
                </div>
                <h3 className="text-2xl font-bold text-[#000F38] mb-2">
                  Become a Partner
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Collaborate with BrandoraX on sponsorship, training, talent deployment, or youth community initiatives.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-gray-700">
                  <div>
                    <label className="block mb-1 font-semibold text-[#000F38]">Organization or Institution Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Foundation / Enterprise Partner"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Contact Person</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="partner@org.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold text-[#000F38]">Partnership Opportunity</label>
                    <select
                      value={formData.partnershipType}
                      onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white"
                    >
                      <option>Sponsorship</option>
                      <option>Corporate training</option>
                      <option>Talent development</option>
                      <option>Deployment partnerships</option>
                      <option>Community initiatives</option>
                      <option>Youth development</option>
                      <option>Industry collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold text-[#000F38]">Message / Collaboration Goals</label>
                    <textarea
                      rows={3}
                      placeholder="Share your goals and vision for partnering..."
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
                    Submit Partnership Inquiry
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#000F38] mb-2">Inquiry Submitted</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto mb-6">
                  Thank you! Our partnerships team will review your inquiry and follow up at <span className="font-semibold">{formData.email}</span>.
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
