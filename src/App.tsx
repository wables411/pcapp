import { useState } from 'react'
import { Toaster } from 'sonner'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
import MobileNav from './components/MobileNav'
import Hero from './components/Hero'
import BiddingTab from './pages/BiddingTab'
import GalleryTab from './pages/GalleryTab'
import ShowcasingTab from './pages/ShowcasingTab'
import GovernanceTab from './pages/GovernanceTab'
import Footer from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState<'bidding' | 'gallery' | 'showcasing' | 'governance'>('bidding')

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-cyber-black text-neon-green relative">
        <div className="liquid-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="relative z-10">
          <Hero />
          
          <div className="container mx-auto px-4 py-8 pb-24">
            {activeTab === 'bidding' && <BiddingTab />}
            {activeTab === 'gallery' && <GalleryTab />}
            {activeTab === 'showcasing' && <ShowcasingTab />}
            {activeTab === 'governance' && <GovernanceTab />}
          </div>

          <Footer />
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <Toaster 
          position="top-center"
          theme="dark"
          toastOptions={{
            style: {
              background: '#000',
              border: '1px solid #00ff41',
              color: '#00ff41',
            },
          }}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App

