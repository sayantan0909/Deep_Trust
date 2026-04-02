import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-20">
      <div className="text-center max-w-3xl mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white mb-6 tracking-tight relative z-10">
          Unmasking AI Manipulation
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed mb-8 relative z-10">
          Verify the authenticity of any digital media instantly. DeepTrust uses state-of-the-art multimodal AI models to detect fake news, synthetic voices, deepfake images, and manipulated video.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <Link to="/text" className="group rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden h-full flex flex-col">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-white transition-all mb-6">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Text Detection</h2>
          <p className="text-slate-400">Analyze articles, tweets, or transcripts using RoBERTa to detect AI-generated fake news.</p>
        </Link>
        <Link to="/image" className="group rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-pink-500/50 p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] relative overflow-hidden h-full flex flex-col">
          <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:text-white transition-all mb-6">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">Image Deepfakes</h2>
          <p className="text-slate-400">Scan photos using Vision Transformers (ViT) to spot GAN artifacts and diffusion boundaries.</p>
        </Link>
        <Link to="/audio" className="group rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-amber-500/50 p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden h-full flex flex-col">
          <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:text-white transition-all mb-6">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Voice Cloning</h2>
          <p className="text-slate-400">Process audio through Wav2Vec2 architectures to uncover synthetic speech impersonations.</p>
        </Link>
        <Link to="/video" className="group rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-emerald-500/50 p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden h-full flex flex-col">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:text-white transition-all mb-6">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Video Forensics</h2>
          <p className="text-slate-400">Extract frames automatically to detect advanced face-swapping and spatial inconsistencies.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
