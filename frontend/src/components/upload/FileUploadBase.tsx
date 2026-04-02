import React, { useCallback, useState, ReactNode } from 'react';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

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
        className={`relative group rounded-2xl border-2 border-dashed transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
          {!file ? (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                {iconSvg}
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">{title}</h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">{subtitle}</p>
              
              <label 
                htmlFor="file-upload" 
                className="relative cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-6 rounded-xl transition-colors disabled:opacity-50 inline-flex items-center"
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
              <p className="mt-4 text-xs text-slate-500">Max size: {maxSizeMB}MB. Drag and drop supported.</p>
            </>
          ) : (
            <div className="w-full max-w-md mx-auto bg-slate-800/80 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-center mb-4 text-emerald-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="text-white font-medium truncate mb-1">{file.name}</h4>
              <p className="text-slate-400 text-xs mb-6">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              
              <div className="flex gap-4 justify-center">
                <Button variant="secondary" onClick={clearFile} disabled={loading} className="px-4 py-2">
                  Change
                </Button>
                <Button onClick={handleSubmit} disabled={loading} className="px-4 py-2">
                  {loading ? (
                    <><Spinner size="sm" text="" /> Scanning...</>
                  ) : 'Analyze Now'}
                </Button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-lg text-sm flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadBase;
