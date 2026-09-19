export type ProgramCategory = 'Engineering' | 'Design' | 'Analytics' | 'Security';

export interface ModuleItem {
  week: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: ProgramCategory;
  tagline: string;
  description: string;
  duration: string;
  commitment: string;
  tuition: {
    upfront: string;
    installments: string;
    currency: string;
  };
  tools: string[];
  skills: string[];
  capstoneProject: {
    title: string;
    description: string;
    technologies: string[];
    livePreviewUrl?: string;
  };
  syllabus: ModuleItem[];
  careerOutcomes: string[];
  nextCohortDate: string;
  featured?: boolean;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  trackId: string;
  cohort: string;
  paymentPlan: 'upfront' | 'installment';
  isEnrolled: boolean;
  enrollmentDate?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    categoryWeight: Record<ProgramCategory, number>;
  }[];
}
