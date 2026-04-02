import React from 'react';

interface ConfidenceBarProps {
  confidence: number;
  isFake: boolean;
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ confidence, isFake }) => {
  const getColor = () => {
    if (isFake) {
      if (confidence > 80) return 'from-rose-600 to-red-500';
      if (confidence > 60) return 'from-orange-500 to-rose-400';
      return 'from-amber-400 to-orange-400';
    } else {
      if (confidence > 80) return 'from-emerald-600 to-teal-400';
      if (confidence > 60) return 'from-green-500 to-emerald-400';
      return 'from-lime-400 to-green-400';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Confidence Score</span>
        <span className="text-2xl font-bold text-white">{confidence.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-3.5 backdrop-blur-sm shadow-inner overflow-hidden border border-slate-700/50">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${getColor()} transition-all duration-1000 ease-out relative`} 
          style={{ width: `${Math.max(5, confidence)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceBar;
