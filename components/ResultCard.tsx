import React from 'react';
import { SearchResult } from '../types';
import { ExternalLink, Sparkles, Building2, Calendar, BrainCircuit } from 'lucide-react';

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
            <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-600 flex items-center gap-1">
              <Building2 size={12} />
              {result.source}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {result.date}
            </span>
          </div>
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            title="Read Article"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors mb-2">
          {result.title}
        </h3>
        
        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
          "{result.snippet}"
        </p>
      </div>

      {/* AI Analysis Section */}
      <div className="mt-auto bg-slate-50/50 border-t border-slate-100 p-5">
        {!result.isAnalyzed ? (
          <div className="flex items-center gap-3 text-slate-400 animate-pulse">
            <BrainCircuit size={18} />
            <span className="text-sm font-medium">Gemini is analyzing relevance...</span>
          </div>
        ) : (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg">
                  <Sparkles size={16} />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">
                  Summary
                </h4>
                <p className="text-slate-700 text-sm font-medium">
                  {result.summary}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg">
                  <BrainCircuit size={16} />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">
                  Why it matters (B2B)
                </h4>
                <p className="text-slate-600 text-sm">
                  {result.relevance}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <a
        href={result.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-slate-50 hover:bg-slate-100 border-t border-slate-200 py-3 text-center text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        Read Full Article
      </a>
    </div>
  );
};

export default ResultCard;
