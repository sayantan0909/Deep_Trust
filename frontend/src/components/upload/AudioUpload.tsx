import React from 'react';
import FileUploadBase from './FileUploadBase';

interface UploadProps {
  onAnalyze: (file: File) => void;
  loading: boolean;
}

const AudioUpload: React.FC<UploadProps> = ({ onAnalyze, loading }) => {
  const iconSvg = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
    </svg>
  );

  return (
    <FileUploadBase
      onAnalyze={onAnalyze}
      loading={loading}
      accept="audio/mpeg,audio/wav,audio/flac,audio/x-wav"
      title="Upload Audio"
      subtitle="Verify voice recordings and detect synthetic speech cloning using Wav2Vec2."
      maxSizeMB={25}
      iconSvg={iconSvg}
    />
  );
};

export default AudioUpload;
