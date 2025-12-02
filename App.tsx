import React, { useState, useCallback } from 'react';
import { Sparkles, AlertCircle, Radio } from 'lucide-react';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';
import { searchCompanyMentions } from './services/geminiService';
import { SearchResult } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedUrl, setSearchedUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (url: string) => {
    setIsLoading(true);
    setSearchedUrl(url);
    setResults([]); 
    setError(null);

    try {
      // Use Gemini with Google Search Grounding to get real results
      const searchHits = await searchCompanyMentions(url);
      
      if (searchHits.length === 0) {
        setError("No recent mentions found or the search timed out. Please try again.");
      } else {
        setResults(searchHits);
      }
    } catch (err) {
      console.error("Error fetching mentions:", err);
      setError("An error occurred while searching. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* User Logo */}
            <img 
              src="https://khadijakamoun.com/wp-content/uploads/2025/07/LOGO.png" 
              alt="NameDrop Logo" 
              className="h-12 w-auto object-contain"
            />
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-slate-900 leading-none tracking-tight">
                NameDrop
              </h1>
              <span className="text-xs text-slate-500 font-medium mt-1">
                by Khadija Kamoun
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 hidden sm:flex">
            <Sparkles size={16} className="text-indigo-500" />
            <span>Powered by Gemini 2.5 & Google Search</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InputSection onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && results.length === 0 && !error && searchedUrl === '' && (
          <div className="text-center mt-12 text-slate-400">
            <p>Enter a URL above to start monitoring real-time mentions.</p>
          </div>
        )}
        
        {!isLoading && results.length === 0 && !error && searchedUrl !== '' && (
            <div className="text-center mt-12 text-slate-500">
                <p>No results found for "{searchedUrl}". Try a different domain or check the URL.</p>
            </div>
        )}
      </main>
      
      {/* Footer for mobile/extra credit */}
      <footer className="mt-auto py-6 text-center text-slate-400 text-sm sm:hidden">
        <p>Built by Khadija Kamoun</p>
      </footer>
    </div>
  );
};

export default App;