import React, { useCallback, useState, ReactNode } from 'react';

interface FileUploadBaseProps {
  onAnalyze: (file: File) => void;
  loading: boolean;
  accept: string;
  title: string;
  subtitle: string;
  maxSizeMB: number;
  iconSvg: ReactNode;
}

const FileUploadBase: React.FC<FileUploadBaseProps> = ({ 
  onAnalyze, 
  loading, 
  accept, 
  title, 
  subtitle, 
  maxSizeMB, 
  iconSvg 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateAndSetFile = (selectedFile: File) => {
    setError('');
    
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }
    
    setFile(selectedFile);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [maxSizeMB]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file && !loading) {
      onAnalyze(file);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError('');
  };

  return (
    <div className="w-full">
      <div 
        className={`bg-[#FFFDF7] border-[3px] rounded-xl transition-all duration-300 ${
          dragActive 
            ? 'border-[#1D4ED8] shadow-[6px_6px_0_#1D4ED8] -translate-y-[2px] -translate-x-[2px]' 
            : 'border-[#0a0a0a] shadow-[6px_6px_0_#0a0a0a] hover:shadow-[8px_8px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px]'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
          {!file ? (
            <>
              {/* Icon */}
              <div className="w-16 h-16 mb-5 bg-[#F5F0E8] border-[3px] border-[#0a0a0a] rounded-lg flex items-center justify-center text-[#0a0a0a] shadow-[3px_3px_0_#0a0a0a] group-hover:scale-110 transition-all duration-300">
                {iconSvg}
              </div>
              <h3 className="text-xl font-black text-[#0a0a0a] mb-2">{title}</h3>
              <p className="font-medium text-gray-500 mb-6 max-w-md mx-auto">{subtitle}</p>
              
              {/* Browse Button */}
              <label 
                htmlFor="file-upload" 
                className="relative cursor-pointer px-8 py-3 font-black bg-[#1D4ED8] text-white border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all inline-flex items-center gap-2"
              >
                <span>Browse Files</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  accept={accept}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider">Drag and drop</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Max size: {maxSizeMB}MB</p>
              </div>

              {/* Dashed drop zone indicator */}
              {dragActive && (
                <div className="mt-4 px-6 py-3 border-[3px] border-dashed border-[#1D4ED8] rounded-lg bg-[#D6EEFF] text-[#1D4ED8] font-black text-sm">
                  Drop your file here!
                </div>
              )}
            </>
          ) : (
            <div className="w-full max-w-md mx-auto bg-[#F5F0E8] rounded-lg p-6 border-[3px] border-[#0a0a0a] shadow-[3px_3px_0_#0a0a0a]">
              {/* Success Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#D4F3F7] border-[3px] border-[#0a0a0a] rounded-full flex items-center justify-center shadow-[2px_2px_0_#0a0a0a]">
                  <svg className="w-6 h-6 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
              </div>
              <h4 className="font-black text-[#0a0a0a] truncate mb-1 text-lg">{file.name}</h4>
              <p className="text-gray-500 text-xs font-bold mb-6 uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              
              <div className="flex gap-4 justify-center">
                {/* Change Button */}
                <button 
                  onClick={clearFile} 
                  disabled={loading}
                  className="px-6 py-3 font-black bg-[#FFFDF7] text-[#0a0a0a] border-[3px] border-[#0a0a0a] rounded-lg shadow-[3px_3px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0_#0a0a0a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Change
                </button>
                {/* Analyze Button */}
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="px-6 py-3 font-black bg-[#1D4ED8] text-white border-[3px] border-[#0a0a0a] rounded-lg shadow-[3px_3px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0_#0a0a0a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                      Scanning...
                    </>
                  ) : 'Analyze Now'}
                </button>
              </div>
            </div>
          )}
          
          {/* Inline file error */}
          {error && (
            <div className="mt-4 p-3 bg-[#FFFDF7] border-[3px] border-[#e11d48] text-[#e11d48] rounded-lg text-sm font-bold flex items-center shadow-[2px_2px_0_#e11d48]">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadBase;
