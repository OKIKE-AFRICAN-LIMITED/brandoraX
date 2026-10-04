export type Role = 'student' | 'admin';
export type PaymentStatus = 'pending' | 'awaiting_confirmation' | 'partial' | 'paid';
export type PaymentPlan = 'upfront' | 'installment';
export type SubmissionStatus = 'submitted' | 'approved' | 'changes_requested';

export interface DbProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  role: Role;
  created_at: string;
}

export interface DbEnrollment {
  id: string;
  user_id: string;
  track_id: string;
  cohort: string;
  payment_plan: PaymentPlan;
  payment_status: PaymentStatus;
  amount_paid: number;
  telegram_joined: boolean;
  status: 'active' | 'paused' | 'completed';
  created_at: string;
}

export interface DbSession {
  id: string;
  track_id: string | null;
  title: string;
  description: string | null;
  starts_at: string;
  meet_url: string | null;
}

export interface DbSubmission {
  id: string;
  user_id: string;
  track_id: string;
  sprint_index: number;
  title: string;
  url: string;
  note: string | null;
  status: SubmissionStatus;
  feedback: string | null;
  created_at: string;
}

export interface DbAnnouncement {
  id: string;
  track_id: string | null;
  title: string;
  body: string;
  created_at: string;
}

export interface DbPaymentSettings {
  id: number;
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  instructions: string | null;
}

export interface DbAdmin {
  email: string;
  role: string;
  created_at: string;
}
