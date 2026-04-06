import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import TextAnalysis from './pages/TextAnalysis'
import ImageAnalysis from './pages/ImageAnalysis'
import AudioAnalysis from './pages/AudioAnalysis'
import VideoAnalysis from './pages/VideoAnalysis'
import SplashScreen from './components/ui/SplashScreen'

function App() {
  const [splashFinished, setSplashFinished] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      <div className={`flex flex-col min-h-screen ${!splashFinished ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <main className={`flex-1 w-full flex flex-col ${!isHome ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text" element={<TextAnalysis />} />
            <Route path="/image" element={<ImageAnalysis />} />
            <Route path="/audio" element={<AudioAnalysis />} />
            <Route path="/video" element={<VideoAnalysis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
