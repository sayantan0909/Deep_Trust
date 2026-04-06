import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const RevealBox: React.FC<{ children: React.ReactNode; index?: number; className?: string }> = ({ children, index = 0, className = '' }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms,
                     transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`
      }}
    >
      {children}
    </div>
  );
};

const NeuButton: React.FC<{ onClick?: () => void; children: React.ReactNode; primary?: boolean; className?: string }> = ({ onClick, children, primary = true, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 font-black border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all flex items-center justify-center gap-2 ${primary ? 'bg-[#1D4ED8] text-white' : 'bg-[#0a0a0a] text-white'
        } ${className}`}
    >
      {children}
    </button>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F5F0E8] text-[#374151] overflow-x-hidden pt-8">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center py-20 px-4">
        {/* Geometric Background Shapes (Neubrutalism) */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#FBBF24] border-[2px] border-[#0a0a0a] rounded-lg rotate-15 opacity-30"></div>
          <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-[#60A5FA] border-[2px] border-[#0a0a0a] rounded-full -rotate-6 opacity-40"></div>
          <div className="absolute top-[35%] right-[15%] w-24 h-24 bg-[#A78BFA] border-[2px] border-[#0a0a0a] rotate-45 opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          <RevealBox index={0}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0a0a0a] tracking-tight mb-7 leading-tight">
              Detect Fake Content in Seconds!
            </h1>
          </RevealBox>
          <RevealBox index={1.5}>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-bold border-b-[3px] border-transparent">
              An enterprise-grade AI defense platform. Ensure authenticity across text, images, audio, and video formats instantly.
            </p>
          </RevealBox>
          <RevealBox index={3} className="flex flex-col sm:flex-row gap-7">
            <NeuButton onClick={() => navigate('/image')} primary={true}>
              Start Analyzing
            </NeuButton>
            <NeuButton primary={false}>
              Learn More
            </NeuButton>
          </RevealBox>
        </div>
      </section>

      {/* 2. FEATURE CARDS */}
      <section className="relative w-full py-20 px-4 border-y-[3px] border-[#0a0a0a] bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto">
          <RevealBox>
            <h2 className="text-4xl font-black text-[#0a0a0a] text-center mb-16">Core Capabilities</h2>
          </RevealBox>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RevealBox index={0}>
              <div onClick={() => navigate('/text')} className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] rounded-lg p-6 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all cursor-pointer flex flex-col h-full group">
                <div className="w-14 h-14 bg-[#D6EEFF] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-3xl mb-4 group-hover:-translate-y-1 transition-transform">✍️</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-2">Text Detection</h3>
                <p className="text-sm font-medium text-gray-600 flex-1">Analyze articles and social posts using advanced NLP models to spot semantic manipulation.</p>
              </div>
            </RevealBox>
            <RevealBox index={1}>
              <div onClick={() => navigate('/image')} className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] rounded-lg p-6 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all cursor-pointer flex flex-col h-full group">
                <div className="w-14 h-14 bg-[#E8E4F8] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-3xl mb-4 group-hover:-translate-y-1 transition-transform">🖼️</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-2">Image Deepfakes</h3>
                <p className="text-sm font-medium text-gray-600 flex-1">Expose structural anomalies and artifacts in GAN or Diffusion generated imagery.</p>
              </div>
            </RevealBox>
            <RevealBox index={2}>
              <div onClick={() => navigate('/audio')} className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] rounded-lg p-6 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all cursor-pointer flex flex-col h-full group">
                <div className="w-14 h-14 bg-[#D4F3F7] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-3xl mb-4 group-hover:-translate-y-1 transition-transform">🎙️</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-2">Audio Analysis</h3>
                <p className="text-sm font-medium text-gray-600 flex-1">Detect synthetic voice profiles and harmonic distortions in cloned speech.</p>
              </div>
            </RevealBox>
            <RevealBox index={3}>
              <div onClick={() => navigate('/video')} className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#0a0a0a] rounded-lg p-6 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all cursor-pointer flex flex-col h-full group">
                <div className="w-14 h-14 bg-[#FAE8F0] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-3xl mb-4 group-hover:-translate-y-1 transition-transform">🎥</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-2">Video Scanning</h3>
                <p className="text-sm font-medium text-gray-600 flex-1">Break down temporal inconsistencies and face-swapping frame by frame.</p>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

      {/* 3. ZIGZAG SCROLL SECTIONS */}

      {/* Section 1 */}
      <section className="w-full bg-[#D6EEFF] py-24 px-4 border-b-[3px] border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <RevealBox>
              <span className="font-black text-[#0a0a0a] uppercase tracking-widest border-2 border-[#0a0a0a] bg-[#FFFDF7] px-3 py-1 rounded shadow-[2px_2px_0_#0a0a0a] text-xs">Modality 01</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mt-6 mb-6">Text Detection</h2>
              <p className="text-lg font-medium text-gray-700 mb-8 max-w-lg">
                Language models possess distinct mathematical predictability. We isolate text bursts to easily flag artificially written essays or automated news.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">NLP Scanning</span>
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">Perplexity</span>
              </div>
            </RevealBox>
          </div>
          <div className="w-full md:w-1/2">
            <RevealBox index={1}>
              <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[6px_6px_0_#0a0a0a] p-6">
                <div className="flex justify-between items-center bg-[#F5F0E8] p-4 border-[3px] border-[#0a0a0a] rounded-lg mb-4">
                  <div className="font-black text-[#0a0a0a]">Token Analysis</div>
                  <div className="font-bold text-sm bg-black text-white px-3 py-1 rounded">Processing</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span>Burstiness Variance</span>
                      <span>85% Match</span>
                    </div>
                    <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] h-6 rounded-full overflow-hidden">
                      <div className="bg-[#1D4ED8] h-full w-[85%] border-r-[3px] border-[#0a0a0a]"></div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center p-4 bg-[#FAE8F0] border-[3px] border-[#0a0a0a] rounded-lg shadow-[2px_2px_0_#0a0a0a]">
                    <span className="font-bold text-[#0a0a0a]">Verdict:</span>
                    <span className="font-black text-red-600 uppercase">AI Generated</span>
                  </div>
                </div>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full bg-[#E8E4F8] py-24 px-4 border-b-[3px] border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2">
            <RevealBox>
              <span className="font-black text-[#0a0a0a] uppercase tracking-widest border-2 border-[#0a0a0a] bg-[#FFFDF7] px-3 py-1 rounded shadow-[2px_2px_0_#0a0a0a] text-xs">Modality 02</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mt-6 mb-6">Image Deepfakes</h2>
              <p className="text-lg font-medium text-gray-700 mb-8 max-w-lg">
                Generative models often fail at pixel-perfect spatial frequencies. We scan images to instantly highlight GAN-generated artifacts.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">ViT Scanning</span>
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">Micro-artifacts</span>
              </div>
            </RevealBox>
          </div>
          <div className="w-full md:w-1/2">
            <RevealBox index={1}>
              <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[6px_6px_0_#0a0a0a] p-6 relative">
                <div className="w-full aspect-video bg-[#F5F0E8] border-[3px] border-[#0a0a0a] rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-dashed border-[#0a0a0a] flex items-center justify-center font-black animate-pulse opacity-50">SCANNING</div>
                  <div className="absolute top-0 bottom-0 left-1/2 border-r-[3px] border-red-500 w-1 bg-gradient-to-r from-transparent to-red-500/20 shadow-[0_0_15px_red]"></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg shadow-[2px_2px_0_#0a0a0a]">
                  <span className="font-black uppercase text-sm">Facial Inconsistency</span>
                  <span className="font-black text-[#0a0a0a] text-lg">98% FAKE</span>
                </div>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-full bg-[#D4F3F7] py-24 px-4 border-b-[3px] border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <RevealBox>
              <span className="font-black text-[#0a0a0a] uppercase tracking-widest border-2 border-[#0a0a0a] bg-[#FFFDF7] px-3 py-1 rounded shadow-[2px_2px_0_#0a0a0a] text-xs">Modality 03</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mt-6 mb-6">Audio Authentication</h2>
              <p className="text-lg font-medium text-gray-700 mb-8 max-w-lg">
                Cloned voices lack proper harmonic structures. By mapping the frequency domains through Wav2Vec, we expose artificial speech patterns.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">Spectrogram</span>
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">Voice ID</span>
              </div>
            </RevealBox>
          </div>
          <div className="w-full md:w-1/2">
            <RevealBox index={1}>
              <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[6px_6px_0_#0a0a0a] p-6">
                <div className="flex gap-2 items-end justify-center h-32 mb-6 border-b-[3px] border-[#0a0a0a] pb-2">
                  {[20, 60, 40, 80, 50, 90, 40, 70, 30, 80, 50, 40].map((h, i) => (
                    <div key={i} className="w-4 bg-[#0a0a0a] rounded-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between items-center p-4 bg-[#EAF4FB] border-[3px] border-[#0a0a0a] rounded-lg shadow-[2px_2px_0_#0a0a0a]">
                  <span className="font-bold text-[#0a0a0a]">Harmonics Status:</span>
                  <span className="font-black text-green-700 uppercase">Authentic</span>
                </div>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="w-full bg-[#FAE8F0] py-24 px-4 border-b-[3px] border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2">
            <RevealBox>
              <span className="font-black text-[#0a0a0a] uppercase tracking-widest border-2 border-[#0a0a0a] bg-[#FFFDF7] px-3 py-1 rounded shadow-[2px_2px_0_#0a0a0a] text-xs">Modality 04</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mt-6 mb-6">Video Forensics</h2>
              <p className="text-lg font-medium text-gray-700 mb-8 max-w-lg">
                Deepfakes rely heavily on temporal face-swaps. DeepTrust isolates macro-pixel warping frame-by-frame to invalidate fake content.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">Frame Extraction</span>
                <span className="px-4 py-2 border-[3px] border-[#0a0a0a] bg-[#FFFDF7] rounded-md font-bold text-sm shadow-[2px_2px_0_#0a0a0a]">Temporal Sync</span>
              </div>
            </RevealBox>
          </div>
          <div className="w-full md:w-1/2">
            <RevealBox index={1}>
              <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[6px_6px_0_#0a0a0a] p-6 flex flex-col items-center">
                <div className="flex gap-4 mb-6">
                  <div className="w-16 h-24 bg-[#F5F0E8] border-[3px] border-[#0a0a0a] rounded shadow-[2px_2px_0_#0a0a0a] flex items-center justify-center font-black text-xs text-gray-400">#1</div>
                  <div className="w-20 h-32 bg-[#FFFDF7] border-[3px] border-[#e11d48] rounded shadow-[4px_4px_0_#e11d48] scale-110 flex items-center justify-center font-black text-sm text-[#e11d48] rotate-3">#2 FAKE</div>
                  <div className="w-16 h-24 bg-[#F5F0E8] border-[3px] border-[#0a0a0a] rounded shadow-[2px_2px_0_#0a0a0a] flex items-center justify-center font-black text-xs text-gray-400">#3</div>
                </div>
                <div className="w-full flex justify-between items-center p-4 bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg shadow-[2px_2px_0_#0a0a0a]">
                  <span className="font-bold text-[#0a0a0a]">Temporal Integrity:</span>
                  <span className="font-black text-[#e11d48] uppercase">Broken</span>
                </div>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 px-4 bg-[#EAF4FB] border-b-[3px] border-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <RevealBox>
            <h2 className="text-4xl font-black text-center text-[#0a0a0a] mb-16">How It Works</h2>
          </RevealBox>
          <RevealBox index={1}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
              {/* Dashed connector line for desktop */}
              <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] border-t-[3px] border-dashed border-[#0a0a0a] z-0"></div>

              {/* Step 1 */}
              <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[4px_4px_0_#0a0a0a] p-6 flex flex-col items-center text-center relative z-10 w-full md:w-1/3 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all">
                <div className="w-16 h-16 bg-[#0a0a0a] text-white font-black text-2xl flex items-center justify-center rounded-full border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#D6EEFF] mb-6">01</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">Upload</h3>
                <p className="font-medium text-gray-600">Provide any questionable text, image, audio, or video securely through our portal.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[4px_4px_0_#0a0a0a] p-6 flex flex-col items-center text-center relative z-10 w-full md:w-1/3 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all">
                <div className="w-16 h-16 bg-[#0a0a0a] text-white font-black text-2xl flex items-center justify-center rounded-full border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#E8E4F8] mb-6">02</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">Analyze</h3>
                <p className="font-medium text-gray-600">Our enterprise ML pipeline scrutinizes artifacts using multiple neural networks.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl shadow-[4px_4px_0_#0a0a0a] p-6 flex flex-col items-center text-center relative z-10 w-full md:w-1/3 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all">
                <div className="w-16 h-16 bg-[#0a0a0a] text-white font-black text-2xl flex items-center justify-center rounded-full border-[3px] border-[#0a0a0a] shadow-[4px_4px_0_#FAE8F0] mb-6">03</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">Result</h3>
                <p className="font-medium text-gray-600">Access a definitive forensic report declaring exactly where manipulation occurred.</p>
              </div>
            </div>
          </RevealBox>
        </div>
      </section>

      {/* 5. INFO / ARTICLE CARDS */}
      <section className="py-24 px-4 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto">
          <RevealBox>
            <h2 className="text-4xl font-black text-[#0a0a0a] text-center mb-16">Intelligence Center</h2>
          </RevealBox>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealBox index={0}>
              <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] p-6 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all flex flex-col h-full">
                <span className="font-black text-xs uppercase px-2 py-1 bg-[#D6EEFF] border-[2px] border-[#0a0a0a] self-start rounded shadow-[2px_2px_0_#0a0a0a] mb-4">Awareness</span>
                <h3 className="text-xl font-black text-[#0a0a0a] mb-3">The Rise of Deepfakes</h3>
                <p className="text-sm font-medium text-gray-600 flex-1">Synthetic media creation is cheaper than ever, empowering scammers and disinformation agents. Learn why detecting fakes instantly is vital for public trust.</p>
              </div>
            </RevealBox>
            <RevealBox index={1}>
              <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] p-6 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all flex flex-col h-full">
                <span className="font-black text-xs uppercase px-2 py-1 bg-[#E8E4F8] border-[2px] border-[#0a0a0a] self-start rounded shadow-[2px_2px_0_#0a0a0a] mb-4">Technology</span>
                <h3 className="text-xl font-black text-[#0a0a0a] mb-3">How AI Detects Fakes</h3>
                <p className="text-sm font-medium text-gray-600 flex-1">By battling fire with fire, defensive ML models spot anomalies imperceptible to human eyes—from mismatched noise floors to spatial blending errors.</p>
              </div>
            </RevealBox>
            <RevealBox index={2}>
              <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] p-6 hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all flex flex-col h-full">
                <span className="font-black text-xs uppercase px-2 py-1 bg-[#FAE8F0] border-[2px] border-[#0a0a0a] self-start rounded shadow-[2px_2px_0_#0a0a0a] mb-4">Tips</span>
                <h3 className="text-xl font-black text-[#0a0a0a] mb-3">Protect Yourself Online</h3>
                <p className="text-sm font-medium text-gray-600 flex-1">Always verify content sources. Look for unnatural blinking, mismatched lip-syncs, and uncharacteristic speech patterns before sharing or sending funds.</p>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;