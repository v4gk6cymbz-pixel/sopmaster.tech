export type CompanySize = "1-10" | "10-50" | "50+";
export type FirmTier = "solo" | "small" | "medium" | "large";
export type UserRole = "director" | "member";
export type CompanySizeCategory = "solo" | "1-20" | "21-200" | "201+";
export type FocusType = "sops" | "checklists";

export type Jurisdiction =
  | "UK"
  | "Scotland"
  | "Wales"
  | "England"
  | "US-Federal"
  | "US-NewYork"
  | "US-California"
  | "US-Texas"
  | "US-Florida"
  | "US-Delaware"
  | "EU-GDPR"
  | "EU-PayTransparency"
  | "Canada"
  | "Canada-Ontario"
  | "Australia"
  | "Dubai-Global";

export interface SOP {
  id: string;
  title: string;
  company: string;
  systems: string;
  headcount: string;
  jurisdiction: Jurisdiction;
  complexity: CompanySize;
  hash: string;
  verificationHash: string;
  dateCreated: string;
  dateCategorized: string;
  lastModified: string;
  version: number;
  status: "active" | "archived";
  companyId: string;
  createdBy: string;
  industry?: Industry;
  department?: string;
  favorite?: boolean;
  sopType?: string;
}

export interface Notification {
  id: string;
  type: "welcome" | "credits_added" | "sop_generated" | "credits_low" | "subscription_renewed" | "subscription_cancelled" | "info";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface CompanyProfile {
  industry?: Industry;
  jurisdiction?: Jurisdiction;
  companySize?: string;
  departments?: Department[];
  softwareStack?: string[];
  businessGoals?: string;
  operationalChallenges?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  email?: string;
  joinedAt: string;
}

export interface CompanyNode {
  id: string;
  name: string;
  email: string;
  pin: string;
  tier: FirmTier;
  subscriptionActive: string;
  credits: number;
  lifetimeCredits: number;
  createdAt: string;
  jurisdiction: Jurisdiction;
  team: TeamMember[];
  sopCount?: number;
  focus?: FocusType;
}

export interface UserSession {
  companyId: string;
  companyName: string;
  name: string;
  role: UserRole;
  email?: string;
  isDirector: boolean;
}

export interface SOPView {
  sop: SOP;
  document: string;
  viewedAt: string;
}

export type Industry =
  | "SaaS"
  | "Construction"
  | "Accountancy"
  | "E-Commerce"
  | "Healthcare"
  | "ProfessionalServices"
  | "Manufacturing"
  | "Logistics"
  | "Finance"
  | "Education"
  | "Hospitality"
  | "RealEstate";

export type BusinessModel =
  | "SaaS"
  | "E-Commerce"
  | "ProfessionalServices"
  | "Construction"
  | "Manufacturing"
  | "Retail"
  | "Healthcare"
  | "Education";

export type Department =
  | "Executive Management"
  | "Operations"
  | "Sales"
  | "Marketing"
  | "Customer Support"
  | "Finance"
  | "Human Resources"
  | "Information Technology"
  | "Procurement"
  | "Compliance"
  | "Logistics"
  | "Administration"
  | "Training & Development"
  | "E-Commerce"
  | "Management / Governance";

export interface BatchInput {
  companyName: string;
  industry: Industry;
  jurisdiction?: Jurisdiction;
  companySize: string;
  businessModel: BusinessModel;
  softwareStack: string[];
  businessGoals: string;
  operationalChallenges: string;
  departments: Department[];
}

export interface BatchSOP {
  id: string;
  title: string;
  department: Department;
  content: BatchSOPSection[];
  industry: Industry;
}

export interface BatchSOPSection {
  heading: string;
  content: string[];
}

export interface BatchResult {
  companyName: string;
  industry: Industry;
  timestamp: string;
  sops: BatchSOP[];
}
