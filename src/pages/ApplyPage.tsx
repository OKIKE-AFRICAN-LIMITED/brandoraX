import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, User, Mail, Phone, Globe, CreditCard, Send, Lock, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROGRAMS } from '../data/programsData';
import { useAuth } from '../context/AuthContext';
import { Landmark } from 'lucide-react';

export const ApplyPage: React.FC = () => {
  const { signUp, configured } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTrack = searchParams.get('track') || 'web-dev';

  const [step, setStep] = useState<number>(1);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(initialTrack);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    country: 'Nigeria',
    paymentPlan: 'upfront' as 'upfront' | 'installment'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  useEffect(() => {
    if (searchParams.get('track')) {
      setSelectedTrackId(searchParams.get('track')!);
    }
  }, [searchParams]);

  const currentTrack = PROGRAMS.find((p) => p.id === selectedTrackId) || PROGRAMS[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCompleteEnrollment = async () => {
    setIsProcessing(true);
    setFormError(null);

    const result = await signUp({
      email: formData.email.trim(),
      password: formData.password,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      country: formData.country,
      trackId: selectedTrackId,
      paymentPlan: formData.paymentPlan
    });

    setIsProcessing(false);

    if (result.error) {
      setFormError(result.error);
      return;
    }

    setNeedsConfirmation(Boolean(result.needsConfirmation));

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Safe fallback
    }

    setStep(4);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 sm:py-16 px-3 sm:px-6 flex items-center justify-center w-full overflow-hidden">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl">
        {/* Stepper Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-bold uppercase tracking-wider">
            <span className="text-[#0040E9]">
              Step {step} of 4: {
                step === 1 ? 'Select Programme' :
                step === 2 ? 'Personal Details' :
                step === 3 ? 'Tuition & Payment' : 'Admission Confirmed'
              }
            </span>
            <span>{step === 4 ? '100%' : `${Math.round((step / 4) * 100)}%`}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0040E9] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: Select Track */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000F38] mb-2">
              Select Your Learning Programme
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Choose the program you want to master. All tracks include weekly 1-on-1 code critiques and verified portfolio builds.
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 mb-8">
              {PROGRAMS.map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => setSelectedTrackId(prog.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedTrackId === prog.id
                      ? 'border-[#0040E9] bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase text-[#0040E9]">
                        {prog.category}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">· {prog.duration}</span>
                    </div>
                    <div className="text-base font-bold text-[#000F38] mt-0.5">
                      {prog.title}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-[#000F38]">
                      {prog.tuition.upfront}
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">
                      Cohort 1
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#0040E9] hover:bg-[#0035C2] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Continue to Personal Information</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Personal Contact Information */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000F38] mb-2">
              Student Registration
            </h1>
            <p className="text-sm text-gray-600 mb-6 flex flex-col gap-0.5">
              <span>Enrolling in:</span>
              <strong className="text-[#0040E9] leading-snug">{currentTrack.title}</strong>
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs uppercase text-gray-600 mb-1.5 font-bold">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Oluwaseun Adeleke"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg text-sm text-[#000F38] focus:outline-none focus:border-[#0040E9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-600 mb-1.5 font-bold">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. seun@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg text-sm text-[#000F38] focus:outline-none focus:border-[#0040E9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-600 mb-1.5 font-bold">
                  Create Password * <span className="normal-case font-medium text-gray-400">(min. 8 characters)</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Used to sign in to your student portal"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full h-11 pl-10 pr-11 bg-gray-50 border border-gray-300 rounded-lg text-sm text-[#000F38] focus:outline-none focus:border-[#0040E9]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#000F38] p-1 transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-600 mb-1.5 font-bold">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-11 pl-9 pr-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-[#000F38] focus:outline-none focus:border-[#0040E9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-gray-600 mb-1.5 font-bold">
                    Country of Residence
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full h-11 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-[#000F38] focus:outline-none focus:border-[#0040E9]"
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

            <div className="flex flex-col-reverse sm:flex-row sm:items-stretch gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3.5 text-center border border-gray-300 hover:bg-gray-100 rounded-xl text-xs font-bold uppercase text-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!formData.fullName || !formData.email || !formData.phone) {
                    setFormError('Please enter your name, email and WhatsApp number.');
                    return;
                  }
                  if (formData.password.length < 8) {
                    setFormError('Your password must be at least 8 characters.');
                    return;
                  }
                  setFormError(null);
                  setStep(3);
                }}
                className="flex-1 bg-[#0040E9] hover:bg-[#0035C2] text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md text-center"
              >
                <span>Continue to Tuition Plan</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
            {formError && step === 2 && (
              <div className="mt-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</div>
            )}
          </div>
        )}

        {/* STEP 3: Tuition Plan & Checkout Simulation */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000F38] mb-2">
              Tuition & Payment Method
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Track: <strong>{currentTrack.title}</strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              <div
                onClick={() => setFormData({ ...formData, paymentPlan: 'upfront' })}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentPlan === 'upfront'
                    ? 'border-[#0040E9] bg-blue-50/50 shadow-sm'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-xs font-bold uppercase text-[#0040E9] mb-1">
                  Full Tuition
                </div>
                <div className="text-xl font-bold text-[#000F38]">
                  {currentTrack.tuition.upfront}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                  Save 10% · Full access
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, paymentPlan: 'installment' })}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentPlan === 'installment'
                    ? 'border-[#0040E9] bg-blue-50/50 shadow-sm'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-xs font-bold uppercase text-gray-600 mb-1">
                  Monthly Installments
                </div>
                <div className="text-base font-bold text-[#000F38]">
                  {currentTrack.tuition.installments}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Pay as you learn
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-xs mb-2 font-bold text-[#000F38]">
                <Landmark className="w-4 h-4 text-[#0040E9]" />
                Pay by bank transfer
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                After you confirm, our admissions team's account details will appear on your student dashboard. Transfer your tuition, tap <strong>“I have made the payment”</strong>, and we'll verify it within 24 hours.
              </p>
            </div>

            {!configured && (
              <div className="mb-6 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                Backend not connected yet — add your Supabase keys to <code>.env</code> to enable enrolment.
              </div>
            )}
            {formError && (
              <div className="mb-6 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:items-stretch gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3.5 text-center border border-gray-300 hover:bg-gray-100 rounded-xl text-xs font-bold uppercase text-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                disabled={isProcessing || !configured}
                onClick={handleCompleteEnrollment}
                className="flex-1 bg-[#000F38] hover:bg-black text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 text-center"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"></span>
                    <span>Creating account...</span>
                  </span>
                ) : (
                  <>
                    <span>Confirm &amp; Complete Enrollment</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Confirmation */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000F38] mb-2">
              Welcome to BrandoraX!
            </h2>

            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              Congratulations <strong>{formData.fullName || 'Learner'}</strong>, your place in <strong>{currentTrack.title}</strong> (Cohort 1) is reserved.
              {needsConfirmation
                ? ' Please check your email and verify your address, then sign in to open your portal.'
                : ' Open your dashboard to see payment details and your first sprint.'}
            </p>

            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 mb-8 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#0040E9] text-white flex items-center justify-center flex-shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#0040E9] font-bold">
                    Important Next Action
                  </div>
                  <div className="text-sm font-bold text-[#000F38]">
                    Join Official Telegram Cohort Channel
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Google Meet induction links, weekly briefs, mentor code reviews, and peer channels are hosted on our Telegram community.
              </p>
              <a
                href="https://t.me/brandorax_community"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0040E9] hover:bg-[#0035C2] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <span>Join Telegram Community</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <button
              onClick={() => navigate(needsConfirmation ? '/login' : '/dashboard')}
              className="w-full bg-[#000F38] hover:bg-black text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2"
            >
              <span>{needsConfirmation ? 'Go to Sign In' : 'Go to Student Dashboard Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
