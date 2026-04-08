import React, { useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import GeometricBackground from '../ui/GeometricBackground';
import WaterRippleEffect from '../ui/WaterRippleEffect';

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

const About: React.FC = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#F5F0E8] text-[#374151] overflow-hidden pt-8 pb-20">
      <GeometricBackground />

      {/* ─── INTRO ─── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <RevealBox>
            <h1 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-12 tracking-tight text-center md:text-left">
              About Us
            </h1>
          </RevealBox>

          <RevealBox index={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-stretch">
              
              {/* Our Story */}
              <div className="h-full flex flex-col justify-center space-y-5 text-lg md:text-xl leading-relaxed text-gray-700 bg-white/60 backdrop-blur-sm border-[3px] border-[#0a0a0a] rounded-xl py-8 px-8 md:p-12 shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0_#0a0a0a] transition-all">
                <h2 className="text-4xl font-black text-[#0a0a0a] mb-2">Our Story</h2>
                <p>
                  In today’s digital world, the line between real and fake is rapidly disappearing. With the rise of deepfakes, AI-generated voices, and synthetic media, misinformation is becoming more convincing and harder to detect.
                </p>
                <p>
                  We built <span className="text-[#1D4ED8] font-bold">DeepTrust</span> to tackle this challenge — a unified platform that uses advanced AI models to analyze text, images, audio, and video for authenticity.
                </p>
                <p>
                  Our goal is to make powerful detection technology accessible to everyone, enabling users to verify content instantly and confidently.
                </p>
                <p>
                  At its core, DeepTrust is about one thing: bringing back trust in a world shaped by artificial intelligence.
                </p>
              </div>

              {/* Image box */}
              <div className="w-full h-full min-h-[400px] md:min-h-full bg-[#0a0a0a] border-[3px] border-[#0a0a0a] rounded-xl shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0_#0a0a0a] transition-all overflow-hidden relative flex items-center justify-center [&>div]:absolute [&>div]:inset-0 [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover pointer-events-auto">
                <WaterRippleEffect 
                  imageSrc="https://i0.wp.com/swisscognitive.ch/wp-content/uploads/2022/01/forbes_article.jpg?w=1004&ssl=1" 
                  width={1004}
                  height={564}
                />
              </div>

            </div>
          </RevealBox>

          <RevealBox index={2}>
            <div className="bg-white/60 backdrop-blur-sm border-[3px] border-[#0a0a0a] rounded-xl py-8 px-8 md:p-12 shadow-[4px_4px_0_#0a0a0a] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0_#0a0a0a] transition-all text-lg md:text-xl leading-relaxed text-gray-700">
              <h2 className="text-3xl font-black text-[#0a0a0a] mb-6">Our Technology & Vision</h2>
              <div className="space-y-5">
                <p>
                  We recognize that while generative AI holds immense potential for creativity and innovation, it also presents unprecedented challenges to digital trust and security.
                </p>
                <p>
                  By integrating cutting-edge models like <span className="text-[#1D4ED8] font-bold">RoBERTa</span> for text analysis, <span className="text-[#1D4ED8] font-bold">Vision Transformers</span> for image and video forensics, and <span className="text-[#1D4ED8] font-bold">Wav2Vec2</span> for speech synthesis detection, our system delivers a robust, multi-modal defense mechanism.
                </p>
                <p>
                  Whether you're a journalist verifying a source, a business protecting its brand, or an individual navigating the web, you deserve the tools to critically evaluate what you see and hear. We envision a future where technology empowers truth rather than obscures it.
                </p>
              </div>
            </div>
          </RevealBox>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="relative z-10 py-20 px-4 border-y-[3px] border-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <RevealBox>
            <h2 className="text-4xl font-black text-[#0a0a0a] mb-10 text-center md:text-left">What We Built?</h2>
          </RevealBox>

          <RevealBox index={1}>
            <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl p-10 shadow-[6px_6px_0_#0a0a0a]">
              <p className="text-xl text-gray-700 mb-10 font-medium">
                An AI-powered tool that detects deepfakes across multiple media types and explains why something looks fake.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl hover:bg-[#D6EEFF]/50 transition-colors border-[2px] border-transparent hover:border-[#0a0a0a]">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#D6EEFF] border-[2px] border-[#0a0a0a] rounded-lg flex items-center justify-center text-3xl shadow-[3px_3px_0_#0a0a0a]">⚡</div>
                  <div className="text-center md:text-left">
                    <h4 className="font-black text-[#0a0a0a] text-xl mb-2">Fast Analysis</h4>
                    <p className="text-base text-gray-600">Results in seconds</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl hover:bg-[#E8E4F8]/50 transition-colors border-[2px] border-transparent hover:border-[#0a0a0a]">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#E8E4F8] border-[2px] border-[#0a0a0a] rounded-lg flex items-center justify-center text-3xl shadow-[3px_3px_0_#0a0a0a]">📊</div>
                  <div className="text-center md:text-left">
                    <h4 className="font-black text-[#0a0a0a] text-xl mb-2">Clear Reports</h4>
                    <p className="text-base text-gray-600">Easy to understand scores</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl hover:bg-[#D4F3F7]/50 transition-colors border-[2px] border-transparent hover:border-[#0a0a0a]">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#D4F3F7] border-[2px] border-[#0a0a0a] rounded-lg flex items-center justify-center text-3xl shadow-[3px_3px_0_#0a0a0a]">🧠</div>
                  <div className="text-center md:text-left">
                    <h4 className="font-black text-[#0a0a0a] text-xl mb-2">AI Models</h4>
                    <p className="text-base text-gray-600">Trained on real datasets</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBox>
        </div>
      </section>

      {/* ─── WHY WE CARE ─── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <RevealBox>
            <h2 className="text-4xl font-black text-[#0a0a0a] mb-10 text-center md:text-left">Why This Matters?</h2>
          </RevealBox>

          <RevealBox index={1}>
            <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-xl p-8 shadow-[6px_6px_0_#0a0a0a] mb-14 text-center md:text-left">
              <p className="text-xl text-gray-700 font-medium leading-relaxed">
                <span className="text-[#1D4ED8] font-bold text-2xl">Misinformation is everywhere.</span><br className="block md:hidden"/> Deepfakes can be used to spread fake news, scam people, and damage reputations. We wanted to give everyone a simple way to verify what they see online.
              </p>
            </div>
          </RevealBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealBox index={0}>
              <div 
                onClick={() => setActivePopup('protect')} 
                className="bg-[#FFFDF7] hover:bg-[#D6EEFF] border-[3px] border-[#0a0a0a] rounded-xl p-10 shadow-[4px_4px_0_#0a0a0a] text-center hover:-translate-y-[4px] hover:-translate-x-[4px] hover:shadow-[8px_8px_0_#0a0a0a] transition-all cursor-pointer flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-white border-[3px] border-[#0a0a0a] rounded-full flex items-center justify-center mb-6 text-4xl group-hover:scale-110 transition-transform">🛡️</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">Protect</h3>
                <p className="text-base text-gray-600 font-medium">Click to see how we protect users</p>
              </div>
            </RevealBox>

            <RevealBox index={1}>
              <div 
                onClick={() => setActivePopup('educate')} 
                className="bg-[#FFFDF7] hover:bg-[#E8E4F8] border-[3px] border-[#0a0a0a] rounded-xl p-10 shadow-[4px_4px_0_#0a0a0a] text-center hover:-translate-y-[4px] hover:-translate-x-[4px] hover:shadow-[8px_8px_0_#0a0a0a] transition-all cursor-pointer flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-white border-[3px] border-[#0a0a0a] rounded-full flex items-center justify-center mb-6 text-4xl group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">Educate</h3>
                <p className="text-base text-gray-600 font-medium">Click to see how we educate</p>
              </div>
            </RevealBox>

            <RevealBox index={2}>
              <div 
                onClick={() => setActivePopup('empower')} 
                className="bg-[#FFFDF7] hover:bg-[#FAE8F0] border-[3px] border-[#0a0a0a] rounded-xl p-10 shadow-[4px_4px_0_#0a0a0a] text-center hover:-translate-y-[4px] hover:-translate-x-[4px] hover:shadow-[8px_8px_0_#0a0a0a] transition-all cursor-pointer flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-white border-[3px] border-[#0a0a0a] rounded-full flex items-center justify-center mb-6 text-4xl group-hover:scale-110 transition-transform">💪</div>
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">Empower</h3>
                <p className="text-base text-gray-600 font-medium">Click to see how we empower</p>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

      {/* Popups */}
      {activePopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" 
          onClick={() => setActivePopup(null)}
        >
          <div 
            className="bg-[#FFFDF7] border-[4px] border-[#0a0a0a] rounded-2xl shadow-[12px_12px_0_#0a0a0a] p-10 max-w-lg w-full relative animate-in fade-in zoom-in duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-[2px] border-[#0a0a0a] bg-white rounded-full hover:bg-gray-100 font-black text-xl hover:-translate-y-1 hover:shadow-[2px_2px_0_#0a0a0a] transition-all" 
              onClick={() => setActivePopup(null)}
            >
              ✕
            </button>
            
            {activePopup === 'protect' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-[#D6EEFF] border-[3px] border-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🛡️</div>
                <h3 className="text-3xl font-black mb-6 text-[#0a0a0a]">How to Protect</h3>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  DeepTrust shields users from sophisticated deepfake scams by analyzing media in real-time, preventing financial fraud and reputational damage before it happens.
                </p>
              </div>
            )}
            
            {activePopup === 'educate' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-[#E8E4F8] border-[3px] border-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">📚</div>
                <h3 className="text-3xl font-black mb-6 text-[#0a0a0a]">How to Educate</h3>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  By providing clear, explainable AI reports, we help the average internet user understand how synthetic media works and what signs to look out for in the wild.
                </p>
              </div>
            )}
            
            {activePopup === 'empower' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-[#FAE8F0] border-[3px] border-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">💪</div>
                <h3 className="text-3xl font-black mb-6 text-[#0a0a0a]">How to Empower</h3>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  We put enterprise-grade detection technologies directly in the hands of individuals, leveling the playing field against bad actors equipped with powerful generative AI tools.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
