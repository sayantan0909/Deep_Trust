import React from 'react';
import TextUpload from '../components/upload/TextUpload';
import ResultCard from '../components/results/ResultCard';
import { useAnalyze } from '../hooks/useAnalyze';
import { analyzeText } from '../utils/api';
import GeometricBackground from '../components/ui/GeometricBackground';

const TextAnalysis: React.FC = () => {
  const { result, loading, error, analyze } = useAnalyze(analyzeText);

  return (
    <div className="relative w-full min-h-screen bg-[#F5F0E8] pt-8 pb-20">
      <GeometricBackground variant="text" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mb-4 leading-tight">
            Text Authenticity Check
          </h1>
          <p className="text-lg font-medium text-gray-600 max-w-2xl">
            Paste content below to scan for AI generation.
          </p>
        </div>

        {/* Upload Area */}
        <TextUpload onAnalyze={analyze} loading={loading} />

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-[#FFFDF7] border-[3px] border-[#e11d48] rounded-lg shadow-[4px_4px_0_#e11d48]" role="alert">
            <div className="flex items-center font-black text-[#e11d48]">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              {error}
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && !result && (
          <div className="mt-8">
            <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[4px_4px_0_#0a0a0a] p-6 animate-pulse">
              <div className="h-8 border-b-[3px] border-[#0a0a0a] mb-6 flex items-center">
                <div className="h-4 w-48 bg-[#F5F0E8] border-[2px] border-[#0a0a0a] rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 w-full bg-[#F5F0E8] border-[2px] border-[#0a0a0a] rounded"></div>
                <div className="h-20 w-full bg-[#F5F0E8] border-[2px] border-[#0a0a0a] rounded"></div>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        <ResultCard result={result} />
      </div>
    </div>
  );
};

export default TextAnalysis;
