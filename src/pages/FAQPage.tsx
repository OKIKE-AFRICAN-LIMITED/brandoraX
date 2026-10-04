import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { FAQS } from '../components/FAQModal';

interface FAQPageProps {
  onOpenQuiz?: () => void;
}

const CATEGORIES = ['All', 'General', 'Programmes', 'Scholarships', 'Hiring & Partnerships'];

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenQuiz }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const filtered = selectedCat === 'All' ? FAQS : FAQS.filter((f) => f.category === selectedCat);

  return (
    <div className="w-full">
      <section className="bg-[#000F38] text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#FEC958] mb-4 border border-white/15">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>BrandoraX Help &amp; Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm sm:text-base text-white/80 mt-2">
            Everything you need to know about our programmes, scholarships, and pathways.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCat(cat); setOpenIndex(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCat === cat ? 'bg-[#FEC958] text-[#000F38]' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 divide-y divide-gray-100">
          {filtered.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
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
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-5 sm:p-6 bg-[#F4F7FF] border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#000F38] self-start sm:self-auto">
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
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="text-center border border-[#0040E9] text-[#0040E9] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                Find My Track
              </button>
            )}
            <a
              href="mailto:academy@brandorax.africa"
              className="text-center bg-[#0040E9] hover:bg-[#0035C2] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
