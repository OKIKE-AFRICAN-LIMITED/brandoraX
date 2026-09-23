import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, PROGRAMS } from '../data/programsData';
import { ProgramCategory, Program } from '../types';

interface TrackMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (trackId: string) => void;
  onOpenEnroll: (trackId: string) => void;
}

export const TrackMatcherModal: React.FC<TrackMatcherModalProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
  onOpenEnroll
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<ProgramCategory, number>>({
    Engineering: 0,
    Design: 0,
    Analytics: 0,
    Security: 0
  });
  const [completed, setCompleted] = useState(false);
  const [recommendedTrack, setRecommendedTrack] = useState<Program | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (categoryWeight: Record<ProgramCategory, number>) => {
    const updatedScores = { ...scores };
    (Object.keys(categoryWeight) as ProgramCategory[]).forEach((cat) => {
      updatedScores[cat] += categoryWeight[cat];
    });
    setScores(updatedScores);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished all questions! Calculate winning category
      let highestCategory: ProgramCategory = 'Engineering';
      let maxScore = -1;

      (Object.keys(updatedScores) as ProgramCategory[]).forEach((cat) => {
        if (updatedScores[cat] > maxScore) {
          maxScore = updatedScores[cat];
          highestCategory = cat;
        }
      });

      // Find the best program matching that category
      const match = PROGRAMS.find((p) => p.category === highestCategory) || PROGRAMS[0];
      setRecommendedTrack(match);
      setCompleted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({ Engineering: 0, Design: 0, Analytics: 0, Security: 0 });
    setCompleted(false);
    setRecommendedTrack(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-brand-gray-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-gray-100 text-brand-gray-500 hover:text-brand-navy transition-colors"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-brand-gray-500 mb-2 font-semibold">
                <span className="flex items-center gap-1.5 text-brand-blue">
                  <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                  Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-brand-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-blue transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mb-2">
                {currentQ.question}
              </h3>
              <p className="text-sm text-brand-gray-600">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.categoryWeight)}
                  className="w-full text-left p-4 rounded-xl border border-brand-gray-200 hover:border-brand-blue hover:bg-brand-blue-surface transition-all group flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="text-sm font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-xs text-brand-gray-500 mt-1">
                      {opt.description}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-gray-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results Card */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-blue/20">
              <Award className="w-8 h-8 text-brand-blue" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3 py-1 rounded-full">
              Your Recommended Match
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-3 mb-2">
              {recommendedTrack?.title}
            </h3>

            <p className="text-sm text-brand-gray-600 max-w-md mx-auto mb-6">
              {recommendedTrack?.tagline}
            </p>

            {/* Program Highlights Mini Box */}
            <div className="bg-brand-gray-50 border border-brand-gray-200 rounded-xl p-5 text-left mb-8 max-w-lg mx-auto">
              <div className="flex items-center justify-between text-xs text-brand-gray-500 mb-2">
                <span>Programme Category: <strong className="text-brand-navy">{recommendedTrack?.category}</strong></span>
                <span>Duration: <strong className="text-brand-navy">{recommendedTrack?.duration}</strong></span>
              </div>
              <div className="text-xs text-brand-blue font-semibold mb-3">
                Tuition: {recommendedTrack?.tuition.upfront}
              </div>
              <div className="text-[11px] uppercase text-brand-gray-500 mb-1 font-semibold">
                Capstone Deliverable:
              </div>
              <div className="text-xs font-bold text-brand-navy">
                {recommendedTrack?.capstoneProject.title}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  onClose();
                  if (recommendedTrack) onOpenEnroll(recommendedTrack.id);
                }}
                className="bg-brand-blue text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider hover:bg-brand-blue-hover transition-all inline-flex items-center gap-2 shadow-md"
              >
                Apply for {recommendedTrack?.title}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (recommendedTrack) onSelectTrack(recommendedTrack.id);
                }}
                className="bg-white border border-brand-gray-300 hover:border-brand-navy text-brand-navy px-5 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all"
              >
                View Full Syllabus
              </button>

              <button
                onClick={handleReset}
                className="text-xs text-brand-gray-500 hover:text-brand-navy inline-flex items-center gap-1 py-2 px-3 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
