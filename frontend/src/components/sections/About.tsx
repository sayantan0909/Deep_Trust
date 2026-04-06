import React, { useRef, useState, useEffect } from 'react';
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
  const [quoteImage, setQuoteImage] = useState<string | null>(null);

  useEffect(() => {
    // Generate a high-res image of the quote to use as a texture for WaterRippleEffect
    const canvas = document.createElement("canvas");
    canvas.width = 1004;
    canvas.height = 564;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#D6EEFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0a0a0a";
      ctx.font = "italic bold 38px 'Inter', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText('"In a world driven by AI,', canvas.width / 2, canvas.height / 2 - 28);
      ctx.fillText('trust should not be optional."', canvas.width / 2, canvas.height / 2 + 28);
      
      setQuoteImage(canvas.toDataURL("image/png"));
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F5F0E8] text-[#374151] overflow-hidden pt-8 pb-20">

      <GeometricBackground />

      {/* ─── INTRO ─── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealBox>
            <h1 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mb-12 tracking-tight">
              About Us
            </h1>
          </RevealBox>

          {/* Quote and Image */}
          <RevealBox index={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Quote */}
              <div className="w-full bg-[#D6EEFF] border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] flex items-center justify-center relative overflow-hidden">
                {quoteImage ? (
                  <WaterRippleEffect 
                    imageSrc={quoteImage} 
                    width={1004}
                    height={564}
                  />
                ) : (
                  <p className="text-2xl font-bold italic text-[#0a0a0a] text-center leading-relaxed relative z-10 px-8 py-8 pointer-events-none">
                    "In a world driven by AI, trust should not be optional."
                  </p>
                )}
              </div>
              
              {/* Image box */}
              <div className="w-full bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg shadow-[4px_4px_0_#0a0a0a] p-2 flex items-center justify-center hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0_#0a0a0a] transition-all relative overflow-hidden">
                <div className="w-full h-full rounded border-[2px] border-[#0a0a0a] overflow-hidden relative">
                  <WaterRippleEffect 
                    imageSrc="https://i0.wp.com/swisscognitive.ch/wp-content/uploads/2022/01/forbes_article.jpg?w=1004&ssl=1" 
                    width={1004}
                    height={564}
                  />
                </div>
              </div>
            </div>
          </RevealBox>

          {/* Our Story */}
          <RevealBox index={3}>
            <h2 className="text-3xl font-black text-[#0a0a0a] mb-5">Our Story</h2>
            <div className="space-y-4 text-[16px] leading-relaxed text-gray-600 mb-16 px-4 bg-white/50 backdrop-blur-sm border-[2px] border-[#0a0a0a] rounded-lg py-6 shadow-[4px_4px_0_#0a0a0a]">
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
          </RevealBox>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="relative z-10 py-20 px-4 border-y-[3px] border-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <RevealBox>
            <h2 className="text-3xl font-black text-[#0a0a0a] mb-8">What We Built?</h2>
          </RevealBox>

          <RevealBox index={1}>
            <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg p-8 shadow-[4px_4px_0_#0a0a0a]">
              <p className="text-gray-600 mb-8 font-medium">
                An AI-powered tool that detects deepfakes across multiple media types and explains why something looks fake.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#D6EEFF]/50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#D6EEFF] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-lg">⚡</div>
                  <div>
                    <h4 className="font-black text-[#0a0a0a] text-sm mb-1">Fast Analysis</h4>
                    <p className="text-sm text-gray-500">Results in seconds</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#E8E4F8]/50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#E8E4F8] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-lg">📊</div>
                  <div>
                    <h4 className="font-black text-[#0a0a0a] text-sm mb-1">Clear Reports</h4>
                    <p className="text-sm text-gray-500">Easy to understand scores</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#D4F3F7]/50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#D4F3F7] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-lg">🧠</div>
                  <div>
                    <h4 className="font-black text-[#0a0a0a] text-sm mb-1">AI Models</h4>
                    <p className="text-sm text-gray-500">Trained on real datasets</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#FAE8F0]/50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FAE8F0] border-[2px] border-[#0a0a0a] rounded flex items-center justify-center text-lg">🆓</div>
                  <div>
                    <h4 className="font-black text-[#0a0a0a] text-sm mb-1">Free to Use</h4>
                    <p className="text-sm text-gray-500">Open for everyone</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBox>
        </div>
      </section>

      {/* ─── WHY WE CARE ─── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealBox>
            <h2 className="text-3xl font-black text-[#0a0a0a] mb-8">Why This Matters?</h2>
          </RevealBox>

          <RevealBox index={1}>
            <div className="bg-[#FFFDF7] border-[3px] border-[#0a0a0a] rounded-lg p-8 shadow-[4px_4px_0_#0a0a0a] mb-14">
              <p className="text-gray-600 font-medium">
                <span className="text-[#1D4ED8] font-bold">Misinformation is everywhere.</span>{' '}
                Deepfakes can be used to spread fake news, scam people, and damage reputations. We wanted to give everyone a simple way to verify what they see online.
              </p>
            </div>
          </RevealBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealBox index={0}>
              <div className="bg-[#FFFDF7] hover:bg-[#D6EEFF] border-[3px] border-[#0a0a0a] rounded-lg p-6 shadow-[4px_4px_0_#0a0a0a] text-center hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white border-[2px] border-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🛡️</div>
                <h3 className="text-lg font-black text-[#0a0a0a] mb-2">Protect</h3>
                <p className="text-sm text-gray-600">Shield people from scams and misinformation</p>
              </div>
            </RevealBox>

            <RevealBox index={1}>
              <div className="bg-[#FFFDF7] hover:bg-[#E8E4F8] border-[3px] border-[#0a0a0a] rounded-lg p-6 shadow-[4px_4px_0_#0a0a0a] text-center hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white border-[2px] border-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📚</div>
                <h3 className="text-lg font-black text-[#0a0a0a] mb-2">Educate</h3>
                <p className="text-sm text-gray-600">Help users understand deepfake technology</p>
              </div>
            </RevealBox>

            <RevealBox index={2}>
              <div className="bg-[#FFFDF7] hover:bg-[#FAE8F0] border-[3px] border-[#0a0a0a] rounded-lg p-6 shadow-[4px_4px_0_#0a0a0a] text-center hover:-translate-y-[3px] hover:-translate-x-[3px] hover:shadow-[7px_7px_0_#0a0a0a] transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white border-[2px] border-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">💪</div>
                <h3 className="text-lg font-black text-[#0a0a0a] mb-2">Empower</h3>
                <p className="text-sm text-gray-600">Give everyone free access to detection tools</p>
              </div>
            </RevealBox>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
