import React, { useState } from 'react';
import { Briefcase, Building2, CheckCircle2, ArrowRight, ShieldCheck, Users, Mail, Phone, Send, Handshake } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ScrollReveal } from '../components/ScrollReveal';

export const TalentPipelinePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    roleNeeded: 'UI/UX & Product Design',
    talentCount: '1-3',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    'Access emerging digital talent',
    'Source interns',
    'Find project-based professionals',
    'Identify potential hires',
    'Support talent development',
    'Build longer-term talent pipelines',
    'Partner on corporate training'
  ];

  const partnershipOpportunities = [
    'Sponsorship',
    'Corporate training',
    'Talent development',
    'Deployment partnerships',
    'Community initiatives',
    'Youth development',
    'Industry collaboration'
  ];

  return (
    <div className="bg-white min-h-screen text-[#000F38] w-full overflow-hidden">
      {/* Hero Header matching Brief */}
      <section className="relative min-h-[75vh] lg:min-h-[78vh] flex items-center bg-[#000F38] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10 w-full">
        {/* Background Image with Directional Fade */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.companies}
            alt="BrandoraX Verified Digital Talent for Employers"
            className="w-full h-full object-cover object-[60%_center] sm:object-center lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000F38]/85 via-[#000F38]/60 to-[#000F38]/95 md:bg-gradient-to-r md:from-[#000F38] md:via-[#000F38]/90 md:via-55% md:to-[#000F38]/30"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#000F38]/70 via-transparent to-[#000F38]/85"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl text-left flex flex-col items-start">
            <ScrollReveal direction="down" delay={50}>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FEC958] mb-6 bg-white/10 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md shadow-sm">
                <Briefcase className="w-3.5 h-3.5" />
                <span>For Companies & Employers</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm">
                Need Digital Talent?<br />
                <span className="text-[#FEC958]">Hire Talent Trained to Deliver.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed mb-8 font-normal drop-shadow-sm">
                Stop sifting through unverified applications. BrandoraX connects you directly with project-tested, mentor-assessed digital professionals.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href="#request-talent"
                  className="bg-[#0040E9] hover:bg-[#0035C2] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group text-center"
                >
                  <span>Request Digital Talent</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>

            {/* Clean Proof Checkpoints */}
            <ScrollReveal direction="up" delay={450} className="w-full max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 text-sm text-white/90 font-medium border-t border-white/10 mt-8 w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Verified Proof of Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Zero Guesswork</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Full-Time & Interns</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (7 cols): What Companies Gain */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#0040E9] font-bold mb-2">
                Workforce Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000F38] mb-4">
                Assessed candidates. Zero guesswork.
              </h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
                BrandoraX helps companies access a growing pool of trained, assessed and developing digital professionals across key areas of the digital workforce.
              </p>

              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 aspect-[16/9]">
                <img
                  src={ASSETS.companies}
                  alt="BrandoraX trained digital talent for companies"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-base font-bold text-[#000F38] mb-4">
                  Through BrandoraX, you will:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#000F38]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#0040E9] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium bg-[#F8FAFC] p-5 rounded-2xl border border-gray-200">
                We work to understand what companies need and connect them with talent whose skills and experience align with those needs.
              </p>
            </div>

            {/* Strategic Partnerships Card */}
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-8 sm:p-10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0040E9] font-bold mb-2">
                <Handshake className="w-4 h-4" />
                <span>For Partners</span>
              </div>
              <h3 className="text-2xl font-bold text-[#000F38] mb-3">
                Help build the next generation of digital talent.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                BrandoraX works with organizations, companies, institutions and individuals who want to contribute to digital skills development, talent growth and employment opportunities.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-700 mb-6 font-medium">
                {partnershipOpportunities.map((op, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0040E9]"></span>
                    <span>{op}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-[#000F38] uppercase tracking-wider">
                Let's build a stronger digital talent pipeline together.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Talent Request Form */}
          <div id="request-talent" className="lg:col-span-5 scroll-mt-24">
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg sticky top-28">
              {!submitted ? (
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#0040E9] font-bold mb-2">
                    Direct Inquiry
                  </div>
                  <h3 className="text-2xl font-bold text-[#000F38] mb-2">
                    Request Digital Talent
                  </h3>
                  <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                    Tell us what digital programmes your organization requires. We’ll review your needs and follow up with assessed profiles within 48 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-gray-700">
                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Company / Organization Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Tech Africa"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Official Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="talent@company.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Programme / Track Needed</label>
                      <select
                        value={formData.roleNeeded}
                        onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white text-xs"
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
                      <label className="block mb-1 font-semibold text-[#000F38]">Talent Volume</label>
                      <select
                        value={formData.talentCount}
                        onChange={(e) => setFormData({ ...formData, talentCount: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white text-xs"
                      >
                        <option>1-2 Candidates</option>
                        <option>3-5 Candidates</option>
                        <option>6-10 Candidates</option>
                        <option>10+ (Cohort Hiring)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold text-[#000F38]">Role Brief / Timeline</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about the project, skills, or start date..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0040E9] focus:outline-none bg-white text-xs"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0040E9] hover:bg-[#0035C2] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Talent Inquiry</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#000F38] mb-2">Request Received</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Thank you! Our workforce placement team will review your specifications and contact you at <span className="font-semibold">{formData.workEmail}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#000F38] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
