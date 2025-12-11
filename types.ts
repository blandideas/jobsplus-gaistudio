export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  postedDate: string;
  isExpired: boolean;
  source: 'NATIVE' | 'THIRD_PARTY'; // LinkedIn Native vs External Board
  logoUrl: string;
  matchScore?: number; // AI Generated
  matchReason?: string; // AI Generated
  keywords: string[];
}

export interface UserProfile {
  name: string;
  headline: string;
  skills: string[];
  experienceLevel: string;
}

export interface ExtensionSettings {
  filterExpired: boolean;
  blockedKeywords: string[];
  showMatchScore: boolean;
  savedJobIds: string[];
}

export interface AIAnalysisResult {
  score: number;
  reason: string;
}