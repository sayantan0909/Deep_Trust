import React from 'react';

interface AnalysisReasonProps {
  reason: string;
}

const AnalysisReason: React.FC<AnalysisReasonProps> = ({ reason }) => {
  return (
    <p className="text-slate-300 leading-relaxed text-base italic border-l-2 border-indigo-500/50 pl-4 py-1 relative">
      <span className="absolute -left-3 -top-2 text-4xl text-slate-700/50 font-serif leading-none">"</span>
      {reason}
    </p>
  );
};

export default AnalysisReason;
