import React, { useState } from 'react';
import { Search, Loader2, Globe, CheckCircle2, Zap } from 'lucide-react';

interface InputSectionProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSearch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-16">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Track Company Mentions</h2>
          <p className="text-indigo-600 font-medium text-lg">
            Type a company. Spot the buzz. Reach out smarter.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="relative flex items-center mb-4">
          <div className="absolute left-4 text-slate-400">
            <Globe size={20} />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter company URL (e.g. stripe.com)"
            className="w-full pl-12 pr-40 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Scanning...
              </>
            ) : (
              <>
                <Search size={18} />
                Find Mentions
              </>
            )}
          </button>
        </form>
        
        <div className="flex gap-3 text-sm text-slate-500 justify-center">
          <span>Popular:</span>
          <button onClick={() => setUrl('stripe.com')} className="hover:text-indigo-600 underline decoration-dotted">stripe.com</button>
          <button onClick={() => setUrl('openai.com')} className="hover:text-indigo-600 underline decoration-dotted">openai.com</button>
          <button onClick={() => setUrl('airbnb.com')} className="hover:text-indigo-600 underline decoration-dotted">airbnb.com</button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Zap size={16} />
          Prospect Smarter. Not Harder.
        </div>
        
        <h3 className="text-slate-500 text-lg mb-8">
          See who’s getting press, funding, or attention
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto text-left">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
            <span className="text-slate-700 font-medium">Reach out when interest is high..not cold !</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
            <span className="text-slate-700 font-medium">Use mentions to personalize your emails</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
            <span className="text-slate-700 font-medium">Spot warm leads, not dead ones</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
            <span className="text-slate-700 font-medium">Save time. Close faster. Simple.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;