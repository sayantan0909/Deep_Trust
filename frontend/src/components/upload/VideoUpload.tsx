import React from 'react';
import FileUploadBase from './FileUploadBase';

interface UploadProps {
  onAnalyze: (file: File) => void;
  loading: boolean;
}

const VideoUpload: React.FC<UploadProps> = ({ onAnalyze, loading }) => {
  const iconSvg = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
  );

  return (
    <FileUploadBase
      onAnalyze={onAnalyze}
      loading={loading}
      accept="video/mp4,video/quicktime,video/webm"
      title="Upload Video (Max 100MB)"
      subtitle="Detect video deepfakes and face swaps. The engine will sample frames sequentially."
      maxSizeMB={100}
      iconSvg={iconSvg}
    />
  );
};

export default VideoUpload;
