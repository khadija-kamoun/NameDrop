
import { GoogleGenAI } from "@google/genai";
import { SearchResult } from '../types';

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey });

export const searchCompanyMentions = async (companyUrl: string): Promise<SearchResult[]> => {
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is required for real-time search.");
  }

  const prompt = `
    Perform a Google Search to find 6 recent news articles, blog posts, or press releases regarding the company associated with this URL: "${companyUrl}".
    Focus on the latest business developments, product launches, partnerships, or controversies.
    
    For each distinct search result, structure the output strictly as follows:

    [[[
    Title: [Article Title]
    Source: [Source Domain or Publication Name]
    Date: [Relative date, e.g., 2 hours ago, 1 day ago]
    Link: [Direct URL to the article]
    Snippet: [A brief excerpt or quote from the source]
    Summary: [A 1-sentence summary of the event]
    Relevance: [Why this matters to a B2B founder or sales team]
    ]]]

    If you find fewer than 6, list as many as you found.
    Ensure the "Link" is the actual URL found in the search grounding.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType: "application/json" // Not allowed with Search tool
        temperature: 0.2,
      },
    });

    // Log grounding metadata as required by guidelines
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      console.log("Grounding Chunks:", response.candidates[0].groundingMetadata.groundingChunks);
    }

    const text = response.text || "";
    return parseSearchResults(text);

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

const parseSearchResults = (text: string): SearchResult[] => {
  const results: SearchResult[] = [];
  // Regex to capture blocks between [[[ and ]]]
  const blockRegex = /\[\[\[([\s\S]*?)\]\]\]/g;
  let match;

  while ((match = blockRegex.exec(text)) !== null) {
    const block = match[1];
    
    // Helper to extract field values
    const getField = (fieldName: string): string => {
      const fieldRegex = new RegExp(`${fieldName}:\\s*(.*)`);
      const fieldMatch = block.match(fieldRegex);
      return fieldMatch ? fieldMatch[1].trim() : "N/A";
    };

    const link = getField("Link");
    const title = getField("Title");

    // Simple validation to skip malformed empty blocks
    if (title && title !== "N/A") {
      results.push({
        id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        source: getField("Source"),
        date: getField("Date"),
        link: link,
        snippet: getField("Snippet"),
        summary: getField("Summary"),
        relevance: getField("Relevance"),
        isAnalyzed: true // Since Gemini generated it, it's already analyzed
      });
    }
  }
  
  return results;
};

// Deprecated: Kept for compatibility if imported elsewhere, but unused in main flow.
export const analyzeSnippet = async (company: string, snippet: string) => {
  return { summary: "", relevance: "" };
};
