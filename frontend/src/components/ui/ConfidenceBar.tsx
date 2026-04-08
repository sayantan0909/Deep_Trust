import React from 'react';

interface ConfidenceBarProps {
  confidence: number;
  isFake: boolean;
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ confidence, isFake }) => {
  const getColor = () => {
    if (isFake) {
      if (confidence > 80) return 'bg-[#e11d48]';
      if (confidence > 60) return 'bg-[#f97316]';
      return 'bg-[#eab308]';
    } else {
      if (confidence > 80) return 'bg-[#16a34a]';
      if (confidence > 60) return 'bg-[#22c55e]';
      return 'bg-[#84cc16]';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Confidence Score</span>
        <span className="text-2xl font-black text-[#0a0a0a]">{confidence.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-[#F5F0E8] rounded-full h-5 border-[3px] border-[#0a0a0a] overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.max(5, confidence)}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default ConfidenceBar;
