import React from 'react';
import ConfidenceBar from '../ui/ConfidenceBar';
import AnalysisReason from './AnalysisReason';
import { AnalysisResult } from '../../types';

interface ResultCardProps {
  result: AnalysisResult | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null;

  const { verdict, confidence, reason, all_scores, frames_analyzed } = result;
  const isFake = verdict === 'FAKE';

  return (
    <div className={`mt-8 transition-all duration-500 ease-in-out opacity-100 translate-y-0 bg-[#FFFDF7] border-[3px] rounded-xl p-6 sm:p-8 ${
      isFake
        ? 'border-[#e11d48] shadow-[6px_6px_0_#e11d48]'
        : 'border-[#16a34a] shadow-[6px_6px_0_#16a34a]'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-[3px] border-[#0a0a0a] pb-6">
        <div>
          <h3 className="text-2xl font-black text-[#0a0a0a] mb-1">Analysis Complete</h3>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">DeepTrust multimodal detection engine</p>
        </div>
        {/* Neubrutalism Badge */}
        <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-black uppercase tracking-wider border-[3px] border-[#0a0a0a] shadow-[3px_3px_0_#0a0a0a] ${
          isFake
            ? 'bg-[#FAE8F0] text-[#e11d48]'
            : 'bg-[#D4F3F7] text-[#16a34a]'
        }`}>
          {isFake ? (
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {verdict}
        </span>
      </div>

      <div className="space-y-6">
        <ConfidenceBar confidence={confidence} isFake={isFake} />

        {/* Reasoning */}
        <div className="bg-[#F5F0E8] rounded-lg p-5 border-[3px] border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a]">
          <h4 className="text-xs uppercase tracking-widest text-gray-500 font-black mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Assessment Reasoning
          </h4>
          <AnalysisReason reason={reason} />
        </div>

        {/* Scores Grid */}
        {(all_scores || frames_analyzed !== undefined) && (
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t-[3px] border-[#0a0a0a]">
            {all_scores && Object.entries(all_scores).map(([label, score]) => (
              <div key={label} className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg p-4 text-center shadow-[3px_3px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0_#0a0a0a] transition-all">
                <div className="text-xs text-gray-500 uppercase tracking-widest font-black mb-1">{label}</div>
                <div className="font-mono text-xl font-black text-[#0a0a0a]">{score}%</div>
              </div>
            ))}
            {frames_analyzed !== undefined && (
              <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg p-4 text-center shadow-[3px_3px_0_#0a0a0a] col-span-2">
                <div className="text-xs text-gray-500 uppercase tracking-widest font-black mb-1">Frames Extracted</div>
                <div className="font-mono text-xl font-black text-[#0a0a0a]">{frames_analyzed}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
