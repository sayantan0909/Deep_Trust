import React from 'react';
import TextUpload from '../components/upload/TextUpload';
import ResultCard from '../components/results/ResultCard';
import { useAnalyze } from '../hooks/useAnalyze';
import { analyzeText } from '../utils/api';

const TextAnalysis: React.FC = () => {
  const { result, loading, error, analyze } = useAnalyze(analyzeText);

  return (
    <div className="max-w-4xl mx-auto w-full fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">Text Authenticity Check</h1>
        <p className="text-slate-400">
          Paste content below to scan for AI generation. Our RoBERTa-based model detects synthetic patterns characteristic of Large Language Models.
        </p>
      </div>

      <TextUpload onAnalyze={analyze} loading={loading} />
      
      {error && (
        <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl" role="alert">
          <div className="flex items-center font-medium">
             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
             {error}
          </div>
        </div>
      )}

      {loading && !result && (
        <div className="mt-8">
           <div className="w-full h-64 bg-slate-800/20 border border-slate-700/50 rounded-2xl animate-pulse">
             <div className="h-12 border-b border-white/5 mx-8 flex items-center mt-6">
                <div className="h-4 w-48 bg-slate-700/50 rounded"></div>
             </div>
             <div className="p-8 space-y-6">
                <div className="h-4 w-full bg-slate-700/50 rounded"></div>
                <div className="h-24 w-full bg-slate-700/50 rounded"></div>
             </div>
           </div>
        </div>
      )}

      <ResultCard result={result} />
    </div>
  );
};

export default TextAnalysis;
