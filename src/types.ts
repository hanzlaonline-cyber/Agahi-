export interface NewsSource {
  name: string;
  url: string;
  category: string;
  country: string;
}

export interface VerificationResult {
  id?: string;
  input: string;
  timestamp: string;
  score: number;
  verdict: string;
  confidence: string;
  summary: string;
  breakdown: Array<{ claim: string; status: string; evidence: string }>;
  bias: string;
  emotionalTone: string;
  fallacies: string[];
  claims?: string[];
  sources: string[];
  relevantLinks?: string[];
  trendData?: Array<{ stage: string; score: number }>;
}

export interface NewsItem {
  id?: string;
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  source: string;
  country: string;
  imageUrl?: string;
  trustScore?: number;
  verdict?: string;
}
