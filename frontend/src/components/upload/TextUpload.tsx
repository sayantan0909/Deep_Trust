import React, { useState } from 'react';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

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
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative bg-slate-900 rounded-2xl p-2 h-full flex flex-col">
          <textarea
            className="w-full h-48 bg-slate-800/50 text-slate-100 placeholder-slate-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
            placeholder="Paste text here to detect AI generation (e.g. news articles, tweets, essays)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-between items-center p-2 mt-2">
            <span className="text-xs text-slate-500 font-medium tracking-wide ml-2">
              Supports up to 512 tokens
            </span>
            <Button type="submit" disabled={!text.trim() || loading} variant="primary">
              {loading ? (
                <>
                  <Spinner size="sm" text="" />
                  Scanning...
                </>
              ) : (
                'Analyze Text'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextUpload;
