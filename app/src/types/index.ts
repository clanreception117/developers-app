export type UserRole = "developer" | "organization";

export interface DeveloperProfile {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  specialization: string;
  username: string;
  role: "developer";
  avatarUrl?: string;
  tier: "Gold" | "Silver" | "Bronze";
  bio?: string;
  skills?: string[];
  githubUrl?: string;
  portfolioUrl?: string;
  stats: {
    profileViews: number;
    projectViews: number;
    engagementRate: number;
    globalRank: string;
    totalEarnings: number;
    projectsCount: number;
  };
}

export interface OrganizationContact {
  officialEmail: string;
  phone: string;
  address: string;
  representativeName: string;
  representativeRole: string;
  website: string;
  supportChannel: string;
}

export interface OrganizationProfile {
  orgName: string;
  ceoName: string;
  establishedDate: string;
  officialEmail: string;
  orgType: "Product-based" | "Service-based" | "Other";
  username: string;
  role: "organization";
  avatarUrl?: string;
  bio?: string;
  website?: string;
  contact?: OrganizationContact;
  stats: {
    jobsPosted: number;
    developersHired: number;
    hackathonsSponsored: number;
    activeContracts: number;
  };
}

export type AuthUser = DeveloperProfile | OrganizationProfile;

export interface ProjectFile {
  name: string;
  path: string;
  content: string;
  language: string;
  sizeBytes?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  languages: string[];
  technologies: string[];
  category: "Web Applications" | "AI & Machine Learning" | "GPU Shaders & WebGL" | "Developer Tools" | "Distributed Systems" | "Smart Contracts";
  thumbnail?: string;
  repoUrl?: string;
  liveUrl?: string;
  visibility: "public" | "private";
  version: string;
  createdAt: string;
  updatedAt: string;
  ownerUsername: string;
  ownerName: string;
  ownerTier?: "Gold" | "Silver" | "Bronze";
  codeFiles?: ProjectFile[];
  status: "Active" | "Archived" | "Draft";
  stars?: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
  fileName?: string;
  fileDataUrl?: string;
  fileType?: "image" | "pdf";
  ownerUsername: string;
  verified: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  category: "Project" | "Hackathon" | "Competition" | "Community" | "Certification";
  description: string;
  dateEarned: string;
  ownerUsername: string;
  metric?: string;
  badgeLevel?: "Gold" | "Silver" | "Bronze";
  iconName?: string;
}

export interface MeritBadge {
  id: string;
  tier: "Gold" | "Silver" | "Bronze";
  title: string;
  description: string;
  reason: string;
  criteria: string[];
  awardDate: string;
  isEarned: boolean;
  verified: boolean;
  ownerUsername: string;
  scoreRequirement?: number;
}

export interface UploadedCodeItem {
  id: string;
  name: string;
  description: string;
  language: string;
  category: string;
  fileName: string;
  fileSize: string;
  fileContent: string;
  uploadedAt: string;
  ownerUsername: string;
}

export interface ExecutionRequest {
  language: "javascript" | "typescript" | "python" | "html";
  code: string;
  inputs?: string;
}

export interface ExecutionResponse {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
  memoryUsageMb?: number;
}

export interface HiringOpportunity {
  id: string;
  orgName: string;
  orgUsername: string;
  orgAvatar?: string;
  title: string;
  type: "Full-time" | "Contract" | "Internship" | "Bounty";
  skillsRequired: string[];
  description: string;
  location: string;
  remote: boolean;
  compensation: string;
  deadline: string;
  status: "Open" | "Closed";
  createdAt: string;
  applicantsCount: number;
}

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  orgUsername: string;
  developerUsername: string;
  developerName: string;
  developerAvatar?: string;
  developerTier: string;
  developerEmail: string;
  coverNote: string;
  sandboxProjectUrl?: string;
  sandboxCodeSnippet?: string;
  submittedAt: string;
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected";
}

export interface SavedCandidate {
  id: string;
  orgUsername: string;
  developerUsername: string;
  savedAt: string;
  notes?: string;
}

export interface SavedProject {
  id: string;
  orgUsername: string;
  projectId: string;
  savedAt: string;
}

export interface OrganizationPurchase {
  id: string;
  orgUsername: string;
  itemType: "Project License" | "Freelance Escrow" | "Hackathon Sponsorship";
  title: string;
  beneficiaryName: string;
  amountUsd: number;
  date: string;
  status: "Completed" | "In Escrow" | "Active";
  invoiceNumber: string;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface FeedPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorRole: string;
  authorType: UserRole;
  authorAvatar: string;
  category: "Hackathon" | "Recruitment" | "Project" | "Achievement" | "SME Opportunity" | "Platform Update";
  timestamp: string;
  content: string;
  codeSnippet?: string;
  image?: string;
  projectUrl?: string;
  likes: number;
  isLiked?: boolean;
  comments: PostComment[];
  shares: number;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  isMe: boolean;
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "idle";
  unreadCount: number;
  messages: ChatMessage[];
}
