export interface SearchResult {
  id: string;
  title: string;
  link: string;
  source: string;
  snippet: string;
  date: string;
  summary?: string;
  relevance?: string;
  isAnalyzed: boolean;
}

export interface AnalysisResult {
  summary: string;
  relevance: string;
}
