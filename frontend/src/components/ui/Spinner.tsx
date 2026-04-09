import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', text = "Analyzing..." }) => {
  const sizeMap: Record<string, string> = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className={`${dim} rounded-full border-b-2 border-l-2 border-blue-500 animate-spin`}></div>
        <div className={`absolute inset-0 ${dim} rounded-full border-t-2 border-r-2 border-indigo-400 animate-spin bg-none`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      {text && (
        <div className="text-slate-300 font-medium animate-pulse tracking-wide">
          {text}
        </div>
      )}
    </div>
  );
};

export default Spinner;
