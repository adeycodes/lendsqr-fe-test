// User Types
export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  personalInfo: PersonalInfo;
  education: EducationInfo;
  socials: SocialInfo;
  guarantor: GuarantorInfo;
  accountBalance: string;
  accountNumber: string;
  bank: string;
}

export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface PersonalInfo {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

export interface EducationInfo {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string[];
  loanRepayment: string;
}

export interface SocialInfo {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface GuarantorInfo {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

// Filter Types
export interface FilterParams {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: UserStatus | '';
}

// Login Types
export interface LoginFormData {
  email: string;
  password: string;
}

// Pagination Types
export interface PaginationState {
  currentPage: number;
  perPage: number;
  totalItems: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  icon: string;
  path?: string;
  active?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// Statistics Types
export interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  colorClass: 'purple' | 'blue' | 'orange' | 'pink';
}
