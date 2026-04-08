import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import TextAnalysis from './pages/TextAnalysis'
import ImageAnalysis from './pages/ImageAnalysis'
import AudioAnalysis from './pages/AudioAnalysis'
import VideoAnalysis from './pages/VideoAnalysis'
import AboutPage from './pages/About'
import SplashScreen from './components/ui/SplashScreen'

function App() {
  const [splashFinished, setSplashFinished] = useState(false);
  const location = useLocation();
  const hideFooterRoutes = ['/text', '/image', '/audio', '/video'];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      <div className={`flex flex-col min-h-screen ${!splashFinished ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text" element={<TextAnalysis />} />
            <Route path="/image" element={<ImageAnalysis />} />
            <Route path="/audio" element={<AudioAnalysis />} />
            <Route path="/video" element={<VideoAnalysis />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        {showFooter && <Footer />}
      </div>
    </>
  )
}

export default App
