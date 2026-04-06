import React from 'react';

interface AnalysisReasonProps {
  reason: string;
}

const AnalysisReason: React.FC<AnalysisReasonProps> = ({ reason }) => {
  return (
    <p className="text-[#0a0a0a] leading-relaxed text-base font-medium border-l-[4px] border-[#1D4ED8] pl-4 py-1">
      {reason}
    </p>
  );
};

export default AnalysisReason;
