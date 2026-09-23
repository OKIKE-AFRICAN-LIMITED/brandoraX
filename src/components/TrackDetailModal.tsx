import React from 'react';
import { X, Clock, Calendar, CheckCircle2, ArrowRight, Layers, Award, Terminal, DollarSign, BookOpen } from 'lucide-react';
import { Program } from '../types';

interface TrackDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onEnroll: (trackId: string) => void;
}

export const TrackDetailModal: React.FC<TrackDetailModalProps> = ({
  program,
  onClose,
  onEnroll
}) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-navy/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-brand-gray-200 relative my-auto">
        {/* Sticky Modal Header */}
        <div className="p-6 sm:p-8 border-b border-brand-gray-200 flex items-start justify-between bg-brand-gray-50 rounded-t-2xl">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3 py-1 rounded">
                {program.category}
              </span>
              <span className="text-xs text-brand-gray-500 bg-white px-2.5 py-1 rounded border border-brand-gray-200 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {program.duration}
              </span>
              <span className="text-xs text-brand-gray-500 bg-white px-2.5 py-1 rounded border border-brand-gray-200 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {program.nextCohortDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              {program.title}
            </h2>
            <p className="text-sm text-brand-gray-600 mt-1">
              {program.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-brand-gray-200 text-brand-gray-500 hover:text-brand-navy transition-colors flex-shrink-0 ml-4"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Overview */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-brand-blue font-bold mb-2">
              Curriculum Overview
            </h3>
            <p className="text-brand-gray-700 text-sm sm:text-base leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Core Tools Mastered */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-brand-blue font-bold mb-3">
              Industry Toolchain Mastered
            </h3>
            <div className="flex flex-wrap gap-2">
              {program.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs bg-brand-gray-100 text-brand-navy font-semibold px-3 py-1.5 rounded-md border border-brand-gray-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Week-by-Week Syllabus Accordion / Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm uppercase tracking-wider text-brand-blue font-bold">
                Week-by-Week Learning Roadmap
              </h3>
              <span className="text-xs text-brand-gray-500 font-medium">
                {program.commitment}
              </span>
            </div>

            <div className="space-y-4">
              {program.syllabus.map((mod, idx) => (
                <div
                  key={idx}
                  className="bg-brand-gray-50 border border-brand-gray-200 rounded-xl p-5 hover:border-brand-blue/60 transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-brand-blue font-bold mb-1">
                    <span>{mod.week}</span>
                    <span className="text-brand-gray-400">Sprint 0{idx + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-brand-navy mb-2">
                    {mod.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-gray-600 leading-relaxed mb-3">
                    {mod.description}
                  </p>
                  <div className="bg-white border border-brand-gray-200 rounded p-2.5 text-xs text-brand-navy flex items-center gap-2">
                    <span className="text-brand-blue font-bold">Artifact Shipped:</span>
                    <span className="text-brand-gray-700">{mod.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capstone Project Showcase Box */}
          <div className="bg-brand-navy text-white rounded-xl p-6 border border-brand-navy-light shadow-md">
            <div className="text-xs uppercase tracking-wider text-brand-amber font-bold mb-2">
              Final Capstone Deliverable
            </div>
            <h4 className="text-xl font-bold mb-2">
              {program.capstoneProject.title}
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {program.capstoneProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {program.capstoneProject.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-white/10 text-white px-2.5 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Career Outcomes & Roles */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-brand-blue font-bold mb-3">
              Target Career Outcomes
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {program.careerOutcomes.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-navy bg-brand-gray-50 p-3 rounded-lg border border-brand-gray-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tuition & Pricing Details */}
          <div className="bg-brand-blue-surface border border-brand-blue/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-brand-blue font-bold mb-1">
                Transparent Tuition & Fees
              </div>
              <div className="text-2xl font-extrabold text-brand-navy">
                {program.tuition.upfront}
              </div>
              <div className="text-xs text-brand-gray-600 mt-1">
                Installment Option: {program.tuition.installments}
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onEnroll(program.id);
              }}
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-3.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              Enroll in this Programme
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
