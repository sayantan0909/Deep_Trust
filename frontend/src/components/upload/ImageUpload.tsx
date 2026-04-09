import React from 'react';
import FileUploadBase from './FileUploadBase';

interface UploadProps {
  onAnalyze: (file: File) => void;
  loading: boolean;
}

const ImageUpload: React.FC<UploadProps> = ({ onAnalyze, loading }) => {
  const iconSvg = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
  );

  return (
    <FileUploadBase
      onAnalyze={onAnalyze}
      loading={loading}
      accept="image/jpeg,image/png,image/webp"
      title="Upload an Image"
      subtitle="Detect AI-generated faces, deepfakes, and synthetic images using Vision Transformers."
      maxSizeMB={10}
      iconSvg={iconSvg}
    />
  );
};

export default ImageUpload;
