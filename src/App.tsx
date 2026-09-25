import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ResultsCard from './components/ResultsCard';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import ComplianceNotice from './components/ComplianceNotice';
import Footer from './components/Footer';
import DownloadProgressModal from './components/DownloadProgressModal';
import InfoModal from './components/InfoModal';
import { DownloadOption, ModalType, VideoMetadata } from './types';
import { fetchVideoInfo, QUICK_SAMPLES } from './services/youtubeApi';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);

  // Active informative modal (About, Privacy, Terms, DMCA, Contact)
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Active download progress session modal
  const [downloadSession, setDownloadSession] = useState<{
    isOpen: boolean;
    video: VideoMetadata | null;
    option: DownloadOption | null;
  }>({
    isOpen: false,
    video: null,
    option: null,
  });

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (directUrl?: string) => {
    const targetUrl = (directUrl || url).trim();

    if (!targetUrl) {
      setErrorMessage('Please enter a YouTube video URL to continue.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchVideoInfo(targetUrl);
      setVideoData(data);
      // Automatically scroll to results section
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to retrieve video metadata. Please check the URL.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    handleSubmit(sampleUrl);
  };

  const handleReset = () => {
    setVideoData(null);
    setUrl('');
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDownload = (option: DownloadOption) => {
    if (!videoData) return;
    setDownloadSession({
      isOpen: true,
      video: videoData,
      option,
    });
  };

  const handleCloseDownload = () => {
    setDownloadSession({
      isOpen: false,
      video: null,
      option: null,
    });
  };

  // Keyboard shortcut: Escape to close open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (downloadSession.isOpen) handleCloseDownload();
        if (activeModal) setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [downloadSession.isOpen, activeModal]);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-neutral-100 selection:bg-red-600 selection:text-white font-sans antialiased">
      {/* Top Bar Header */}
      <Header
        onOpenModal={(type) => setActiveModal(type)}
        onTrySample={() => handleSelectSample(QUICK_SAMPLES[0].url)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          url={url}
          setUrl={(newUrl) => {
            setUrl(newUrl);
            if (errorMessage) setErrorMessage(null);
          }}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onSubmit={() => handleSubmit()}
          onSelectSample={handleSelectSample}
        />

        {/* Dynamic Video Results Card */}
        {videoData && (
          <div ref={resultsRef} className="scroll-mt-24">
            <ResultsCard
              video={videoData}
              onDownload={handleStartDownload}
              onReset={handleReset}
            />
          </div>
        )}

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Features Bento Section */}
        <FeaturesSection />

        {/* Compliance and Copyright Disclaimer */}
        <ComplianceNotice onOpenModal={(type) => setActiveModal(type)} />
      </main>

      {/* Footer */}
      <Footer onOpenModal={(type) => setActiveModal(type)} />

      {/* Interactive Download Progress Dialog */}
      {downloadSession.isOpen && downloadSession.video && downloadSession.option && (
        <DownloadProgressModal
          isOpen={downloadSession.isOpen}
          video={downloadSession.video}
          option={downloadSession.option}
          onClose={handleCloseDownload}
        />
      )}

      {/* Informative Modals (About, Privacy, Terms, DMCA, Contact) */}
      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
