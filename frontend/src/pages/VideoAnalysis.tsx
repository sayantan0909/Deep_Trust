import React, { useState, useEffect } from 'react';
import VideoUpload from '../components/upload/VideoUpload';
import ResultCard from '../components/results/ResultCard';
import { useAnalyze } from '../hooks/useAnalyze';
import { analyzeVideo } from '../utils/api';

const VideoAnalysis: React.FC = () => {
  const { result, loading, error, analyze } = useAnalyze(analyzeVideo);
  const [showWakingMessage, setShowWakingMessage] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setTimeout(() => {
        setShowWakingMessage(true);
      }, 5000);
    } else {
      setShowWakingMessage(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="max-w-4xl mx-auto w-full fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">Video Frame Analysis</h1>
        <p className="text-slate-400">
          Upload a video file to run deepfake detection. The engine extracts frames securely and assesses each one, aggregating the confidence score.
        </p>
      </div>

      <VideoUpload onAnalyze={analyze} loading={loading} />
      
      {error && (
        <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
           <div className="flex items-center font-medium">
             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
             {error}
          </div>
        </div>
      )}

      {loading && showWakingMessage && (
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl animate-fade-in text-center flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Analyzing frames... This can take up to 30 seconds for larger files...</span>
        </div>
      )}

      {loading && !result && (
        <div className="mt-8 w-full h-64 bg-slate-800/20 border border-slate-700/50 rounded-2xl animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-b-2 border-l-2 border-blue-500 animate-spin"></div>
        </div>
      )}

      <ResultCard result={result} />
    </div>
  );
};

export default VideoAnalysis;
