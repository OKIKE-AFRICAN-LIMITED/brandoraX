import React, { useState } from 'react';
import { X, ChevronDown, HelpCircle, Mail, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuiz?: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Programmes' | 'Scholarships' | 'Hiring & Partnerships';
}

const FAQS: FAQItem[] = [
  {
    category: 'General',
    question: 'What is BrandoraX?',
    answer: 'BrandoraX is an employment-driven digital talent ecosystem built to help aspiring African professionals develop practical digital skills, build verified proof of work through client-grade projects, and access real-world career and deployment opportunities.'
  },
  {
    category: 'Scholarships',
    question: 'How do BrandoraX scholarships work?',
    answer: 'BrandoraX offers need-based and merit-based scholarships providing up to 90% discount on tuition fees across all programmes. Applicants can submit their scholarship application through our online portal, and awards are reviewed within 48 hours.'
  },
  {
    category: 'Programmes',
    question: 'Are the programmes full-time or part-time?',
    answer: 'All BrandoraX tracks are structured with flexible schedules (10–15 hours per week) featuring live weekend induction labs, weekday mentor feedback, and collaborative project sprints. This allows students and working professionals to learn without stepping away from current commitments.'
  },
  {
    category: 'Programmes',
    question: 'What does "Proof of Work" mean versus a certificate?',
    answer: 'While traditional academies only issue paper certificates, BrandoraX requires every graduate to ship live, production-grade milestone projects and a capstone deliverable reviewed by senior industry practitioners. Employers receive an audited portfolio with tangible code, live URLs, or design systems.'
  },
  {
    category: 'Hiring & Partnerships',
    question: 'How can companies partner with BrandoraX to hire talent?',
    answer: 'Companies can use our "Partner with Us" portal to request pre-assessed, project-tested digital professionals. We understand your team’s technical requirements and provide matched talent profiles for internships, contract roles, or full-time deployment within 48 hours.'
  },
  {
    category: 'General',
    question: 'How do I contact BrandoraX Support or Admissions?',
    answer: 'For admissions and general inquiries, reach our academy desk at academy@brandorax.africa. For corporate alliances and hiring partnerships, contact partnerships@brandorax.africa. You can also join our 2,000+ member Telegram community hub for real-time support.'
  }
];

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose, onOpenQuiz }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'General', 'Programmes', 'Scholarships', 'Hiring & Partnerships'];

  const filteredFaqs = selectedCat === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCat);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#000F38]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-200 overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-[#000F38] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close FAQs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#FEC958] mb-3 border border-white/15">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>BrandoraX Help & Knowledge Base</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/80 mt-1">
            Everything you need to know about our programmes, scholarships, and pathways.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCat === cat
                    ? 'bg-[#FEC958] text-[#000F38]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto divide-y divide-gray-100">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-base font-bold text-[#000F38] group-hover:text-[#0040E9] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isOpen ? 'bg-[#0040E9] text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-gray-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support Banner */}
        <div className="p-5 sm:p-6 bg-[#F4F7FF] border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#000F38]">
            <div className="w-9 h-9 rounded-xl bg-[#0040E9] text-white flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block">Still have a question?</span>
              <a href="mailto:academy@brandorax.africa" className="text-[#0040E9] hover:underline font-semibold">
                academy@brandorax.africa
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="mailto:academy@brandorax.africa"
              className="flex-1 sm:flex-none text-center bg-[#0040E9] hover:bg-[#0035C2] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
