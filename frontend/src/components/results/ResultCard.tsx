import React from 'react';
import Badge from '../ui/Badge';
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
    <div className={`mt-8 transform transition-all duration-500 ease-in-out opacity-100 translate-y-0 relative overflow-hidden rounded-2xl border ${isFake ? 'border-rose-500/30 bg-rose-950/20' : 'border-emerald-500/30 bg-emerald-950/20'} backdrop-blur-md shadow-2xl p-6 sm:p-8`}>
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${isFake ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Analysis Complete</h3>
            <p className="text-slate-400 text-sm">DeepTrust multimodal detection engine</p>
          </div>
          <Badge verdict={verdict} />
        </div>

        <div className="space-y-8">
          <ConfidenceBar confidence={confidence} isFake={isFake} />
          
          <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
            <h4 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Assessment Reasoning
            </h4>
            <AnalysisReason reason={reason} />
          </div>

          {(all_scores || frames_analyzed !== undefined) && (
             <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-700/50">
               {all_scores && Object.entries(all_scores).map(([label, score]) => (
                 <div key={label} className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30">
                   <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">{label}</div>
                   <div className="font-mono text-lg text-slate-200">{score}%</div>
                 </div>
               ))}
               {frames_analyzed !== undefined && (
                 <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30 col-span-2">
                   <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Frames Extracted</div>
                   <div className="font-mono text-lg text-slate-200">{frames_analyzed}</div>
                 </div>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
