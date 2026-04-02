import React, { useState, useEffect } from 'react';
import AudioUpload from '../components/upload/AudioUpload';
import ResultCard from '../components/results/ResultCard';
import { useAnalyze } from '../hooks/useAnalyze';
import { analyzeAudio } from '../utils/api';

const AudioAnalysis: React.FC = () => {
  const { result, loading, error, analyze } = useAnalyze(analyzeAudio);
  const [showWakingMessage, setShowWakingMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setTimeout(() => {
        setShowWakingMessage(true);
      }, 2000);
    } else {
      setShowWakingMessage(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="max-w-4xl mx-auto w-full fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">Audio & Voice Cloning Scan</h1>
        <p className="text-slate-400">
          Upload an audio file. The engine resamples the audio and analyzes voice patterns via Wav2Vec2 to detect synthetic voices.
        </p>
      </div>

      <AudioUpload onAnalyze={analyze} loading={loading} />
      
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
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            <span>First request? Waking up server... (can take up to 30 seconds to load model weights)</span>
        </div>
      )}

      {loading && !result && (
        <div className="mt-8 w-full h-64 bg-slate-800/20 border border-slate-700/50 rounded-2xl animate-pulse"></div>
      )}

      <ResultCard result={result} />
    </div>
  );
};

export default AudioAnalysis;
