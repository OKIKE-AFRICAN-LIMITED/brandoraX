import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck, Lock, CreditCard, Send, Sparkles, User, Mail, Phone, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROGRAMS } from '../data/programsData';
import { StudentProfile } from '../types';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: string;
  onEnrollSuccess: (student: StudentProfile) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialTrackId,
  onEnrollSuccess
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(initialTrackId || 'web-dev');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    paymentPlan: 'upfront' as 'upfront' | 'installment'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentTrack = PROGRAMS.find((p) => p.id === selectedTrackId) || PROGRAMS[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCompleteEnrollment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const studentRecord: StudentProfile = {
        fullName: formData.fullName || 'Student Learner',
        email: formData.email || 'learner@brandorax.com',
        phone: formData.phone || '+234 800 000 0000',
        country: formData.country,
        trackId: selectedTrackId,
        cohort: 'Cohort 1 (Alpha)',
        paymentPlan: formData.paymentPlan,
        isEnrolled: true,
        enrollmentDate: new Date().toISOString()
      };

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }

      onEnrollSuccess(studentRecord);
      setStep(4); // Success step
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-brand-gray-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-gray-100 text-brand-gray-500 hover:text-brand-navy transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Stepper Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-brand-gray-500 mb-2 font-semibold">
            <span className="text-brand-blue uppercase">
              Step {step} of 4: {
                step === 1 ? 'Select Discipline' :
                step === 2 ? 'Personal Details' :
                step === 3 ? 'Tuition & Payment' : 'Enrollment Confirmed'
              }
            </span>
            <span>{step === 4 ? '100%' : `${Math.round((step / 4) * 100)}%`}</span>
          </div>
          <div className="w-full h-1.5 bg-brand-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-blue transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: Select Track */}
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
              Select Your Learning Discipline
            </h3>
            <p className="text-sm text-brand-gray-600 mb-6">
              Choose the career track you want to master. All tracks include weekly 1-on-1 practitioner pull-request reviews.
            </p>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-6">
              {PROGRAMS.map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => setSelectedTrackId(prog.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedTrackId === prog.id
                      ? 'border-brand-blue bg-brand-blue-surface shadow-sm'
                      : 'border-brand-gray-200 hover:border-brand-gray-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-brand-blue">
                        {prog.category}
                      </span>
                      <span className="text-xs font-mono text-brand-gray-400">· {prog.duration}</span>
                    </div>
                    <div className="text-sm font-bold text-brand-navy mt-0.5">
                      {prog.title}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-brand-navy">
                      {prog.tuition.upfront}
                    </div>
                    <span className="text-[10px] font-mono text-brand-gray-500">
                      Cohort 1
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Continue to Student Info
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Student Contact Details */}
        {step === 2 && (
          <div>
            <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
              Student Registration
            </h3>
            <p className="text-sm text-brand-gray-600 mb-6">
              Enrolling in: <strong className="text-brand-blue">{currentTrack.title}</strong>
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1.5 font-semibold">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Oluwaseun Adeleke"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1.5 font-semibold">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1.5 font-semibold">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-brand-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-gray-600 mb-1.5 font-semibold">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-brand-gray-50 border border-brand-gray-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Nigeria">Nigeria (₦ NGN)</option>
                    <option value="Ghana">Ghana (GH₵ GHS)</option>
                    <option value="Kenya">Kenya (KSh KES)</option>
                    <option value="South Africa">South Africa (ZAR)</option>
                    <option value="Rwanda">Rwanda (RWF)</option>
                    <option value="United Kingdom">United Kingdom (GBP)</option>
                    <option value="United States">United States (USD)</option>
                    <option value="Other">Other Diaspora</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 border border-brand-gray-300 hover:bg-brand-gray-100 rounded-md text-xs font-mono uppercase text-brand-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!formData.fullName || !formData.email) {
                    alert('Please enter your full name and email to proceed.');
                    return;
                  }
                  setStep(3);
                }}
                className="flex-1 bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Tuition Plan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment & Tuition Plan */}
        {step === 3 && (
          <div>
            <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
              Tuition & Payment Method
            </h3>
            <p className="text-sm text-brand-gray-600 mb-6">
              Track: <strong>{currentTrack.title}</strong>
            </p>

            {/* Plan selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                onClick={() => setFormData({ ...formData, paymentPlan: 'upfront' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentPlan === 'upfront'
                    ? 'border-brand-blue bg-brand-blue-surface shadow-sm'
                    : 'border-brand-gray-200 bg-brand-gray-50'
                }`}
              >
                <div className="text-xs font-mono font-bold uppercase text-brand-blue mb-1">
                  Full Tuition
                </div>
                <div className="text-lg font-bold text-brand-navy">
                  {currentTrack.tuition.upfront}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Save 10% · Immediate access
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, paymentPlan: 'installment' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentPlan === 'installment'
                    ? 'border-brand-blue bg-brand-blue-surface shadow-sm'
                    : 'border-brand-gray-200 bg-brand-gray-50'
                }`}
              >
                <div className="text-xs font-mono font-bold uppercase text-brand-gray-600 mb-1">
                  Installments
                </div>
                <div className="text-base font-bold text-brand-navy">
                  {currentTrack.tuition.installments}
                </div>
                <div className="text-[11px] text-brand-gray-500 mt-1">
                  Pay monthly as you learn
                </div>
              </div>
            </div>

            {/* Simulated Payment Providers */}
            <div className="bg-brand-gray-50 border border-brand-gray-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-brand-gray-600 mb-3">
                <span className="flex items-center gap-1.5 font-bold text-brand-navy">
                  <CreditCard className="w-4 h-4 text-brand-blue" />
                  Supported Checkout Channels
                </span>
                <span className="text-emerald-600 font-bold">256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-gray-500 font-mono">
                <span className="bg-white px-2 py-1 rounded border border-brand-gray-200 font-bold text-brand-navy">
                  Paystack (Debit / Transfer)
                </span>
                <span className="bg-white px-2 py-1 rounded border border-brand-gray-200 font-bold text-brand-navy">
                  Flutterwave
                </span>
                <span className="bg-white px-2 py-1 rounded border border-brand-gray-200 font-bold text-brand-navy">
                  USD Stripe
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-3 border border-brand-gray-300 hover:bg-brand-gray-100 rounded-md text-xs font-mono uppercase text-brand-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                disabled={isProcessing}
                onClick={handleCompleteEnrollment}
                className="flex-1 bg-brand-navy hover:bg-black text-white py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Securing Admission Seat...
                  </span>
                ) : (
                  <>
                    Confirm & Complete Enrollment
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Confirmation & Telegram Community Link */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-2">
              Welcome to BrandoraX!
            </h3>

            <p className="text-sm text-brand-gray-600 max-w-md mx-auto mb-6">
              Congratulations <strong>{formData.fullName || 'Learner'}</strong>, you are officially registered for <strong>{currentTrack.title}</strong> (Cohort 1).
            </p>

            {/* Telegram Community Induction Callout */}
            <div className="bg-brand-blue-surface border border-brand-blue/30 rounded-xl p-5 mb-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold">
                    Crucial Next Step
                  </div>
                  <div className="text-sm font-bold text-brand-navy">
                    Join Official Telegram Cohort Channel
                  </div>
                </div>
              </div>
              <p className="text-xs text-brand-gray-600 leading-relaxed mb-3">
                All live Google Meet links, class reminders, mentor announcements, and sprint repos are shared directly in the Telegram channel.
              </p>
              <a
                href="https://t.me/brandorax_community"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded inline-flex items-center gap-2 transition-colors"
              >
                Join Telegram Community
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-brand-navy hover:bg-black text-white py-3.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all"
            >
              Open My Student Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
