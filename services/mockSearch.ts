
import { SearchResult } from '../types';

// This file is deprecated. The app now uses real Google Search results via Gemini.
// Kept temporarily to prevent build errors if referenced elsewhere, but should not be used.

export const searchMentions = async (query: string): Promise<SearchResult[]> => {
  console.warn("Mock search is deprecated. Please use searchCompanyMentions from geminiService.ts");
  return [];
};
