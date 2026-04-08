import React, { useState } from 'react';

interface TextUploadProps {
  onAnalyze: (text: string) => void;
  loading: boolean;
}

const TextUpload: React.FC<TextUploadProps> = ({ onAnalyze, loading }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      onAnalyze(text);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[6px_6px_0_#0a0a0a] p-2 hover:shadow-[8px_8px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px] transition-all">
          <textarea
            className="w-full h-48 bg-[#F5F0E8] text-[#0a0a0a] placeholder-gray-400 rounded-lg p-4 border-[3px] border-[#0a0a0a] focus:outline-none focus:border-[#1D4ED8] focus:shadow-[inset_0_0_0_1px_#1D4ED8] resize-none transition-all font-medium"
            placeholder="Paste text here to detect AI generation (e.g. news articles, tweets, essays)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-end items-center p-2 mt-2">
            <button
              type="submit"
              disabled={!text.trim() || loading}
              className={`px-8 py-3 font-black border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[4px_4px_0_#0a0a0a] ${
                loading
                  ? 'bg-[#0a0a0a] text-white'
                  : 'bg-[#1D4ED8] text-white'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                  Scanning...
                </>
              ) : (
                'Analyze Text'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextUpload;
