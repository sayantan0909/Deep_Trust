import React, { useState, useEffect } from 'react';
import AudioUpload from '../components/upload/AudioUpload';
import ResultCard from '../components/results/ResultCard';
import { useAnalyze } from '../hooks/useAnalyze';
import { analyzeAudio } from '../utils/api';
import GeometricBackground from '../components/ui/GeometricBackground';

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
    <div className="relative w-full min-h-screen bg-[#F5F0E8] pt-8 pb-20">
      <GeometricBackground variant="audio" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mb-4 leading-tight">
            Audio & Voice Cloning Scan
          </h1>
          <p className="text-lg font-medium text-gray-600 max-w-2xl">
            Upload an audio file. The engine resamples the audio and analyzes voice patterns via Wav2Vec2 to detect synthetic voices.
          </p>
        </div>

        {/* Upload Area */}
        <AudioUpload onAnalyze={analyze} loading={loading} />

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-[#FFFDF7] border-[3px] border-[#e11d48] rounded-lg shadow-[4px_4px_0_#e11d48]" role="alert">
            <div className="flex items-center font-black text-[#e11d48]">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              {error}
            </div>
          </div>
        )}

        {/* Waking Server Message */}
        {loading && showWakingMessage && (
          <div className="mt-6 p-4 bg-[#FFFDF7] border-[3px] border-[#eab308] rounded-lg shadow-[4px_4px_0_#eab308] text-center flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-[3px] border-[#eab308]/30 border-t-[#eab308] rounded-full animate-spin"></div>
            <span className="font-bold text-[#0a0a0a]">First request? Waking up server... (can take up to 30 seconds to load model weights)</span>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && !result && (
          <div className="mt-8">
            <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[4px_4px_0_#0a0a0a] p-8 animate-pulse min-h-[200px] flex items-center justify-center">
              <div className="w-10 h-10 border-[3px] border-[#0a0a0a]/20 border-t-[#0a0a0a] rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Result */}
        <ResultCard result={result} />
      </div>
    </div>
  );
};

export default AudioAnalysis;
