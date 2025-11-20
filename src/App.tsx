import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { appConfig } from '@/config/app.config';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CryptoWidgetSection } from './components/sections/CryptoWidgetSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { HelpdeskSection } from './components/sections/HelpdeskSection';
import { HeroSection } from './components/sections/HeroSection';
import { MarketsSection } from './components/sections/MarketsSection';
import { MiningSection } from './components/sections/MiningSection';
import { PartnersSection } from './components/sections/PartnersSection';
import { WalletsSection } from './components/sections/WalletsSection';
import { BackToTop } from './components/ui/BackToTop';
import { MajorLinks } from './components/ui/MajorLinks';
import { SocialMenu } from './components/ui/SocialMenu';

interface AppProps {
  onReady?: () => void;
}

function App({ onReady }: AppProps) {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const heroBottom = heroSectionRef.current.offsetTop + heroSectionRef.current.offsetHeight;
        const scrollY = window.scrollY;
        setIsScrolledPastHero(scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle hash scrolling from navigation state and URL hash
  useEffect(() => {
    // Only handle on main page
    if (location.pathname !== '/') return;

    // Check both navigation state and URL hash
    const state = location.state as { scrollToHash?: string } | null;
    const hashFromState = state?.scrollToHash;
    const hashFromUrl = location.hash;

    // Also check window.location.hash as fallback (for direct navigation)
    const hashFromWindow = window.location.hash;

    const hash = hashFromState || hashFromUrl || hashFromWindow;
    if (!hash) return;

    // Remove # if present and ensure it starts with #
    const cleanHash = hash.startsWith('#') ? hash : `#${hash}`;

    // Helper function to scroll to element with offset
    const scrollToElement = (element: Element) => {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offset = 100; // Offset for header
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth',
      });
    };

    // Helper function to execute after double RAF (ensures DOM is painted)
    const executeAfterDoubleRAF = (callback: () => void) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback);
      });
    };

    // Robust scrolling: retry until element exists or timeout
    const maxAttempts = 50; // Increased attempts for slower renders
    let attempts = 0;

    const tryScroll = () => {
      attempts++;
      const element = document.querySelector(cleanHash);

      if (element) {
        // Element found, scroll to it with slight offset for header
        executeAfterDoubleRAF(() => scrollToElement(element));
        return;
      }

      // Element not found yet, retry after a short delay
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, appConfig.animations.scrollRetryDelayCrossPage);
      }
    };

    // Start trying after a delay to allow DOM to render (longer delay for cross-page navigation)
    setTimeout(tryScroll, appConfig.animations.scrollInitialDelayCrossPage);
  }, [location.state, location.hash, location.pathname]);

  // Signal that App is ready (after initial render)
  useEffect(() => {
    if (!onReady) return;

    // Helper function to execute after double RAF (ensures DOM is painted)
    const executeAfterDoubleRAF = (callback: () => void) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback);
      });
    };

    // Use requestAnimationFrame to ensure DOM is painted
    executeAfterDoubleRAF(onReady);
  }, [onReady]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#757575] font-['Poppins',Arial,Helvetica,sans-serif] text-[1.7rem] leading-[1.765]">
      {/* Header Component */}
      <Header isScrolledPastHero={isScrolledPastHero} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection
          onMount={(el) => {
            heroSectionRef.current = el;
          }}
        />
        <FeaturesSection />
        <WalletsSection />
        <MiningSection />
        <MarketsSection />
        <PartnersSection />
        <HelpdeskSection />
        <CryptoWidgetSection />
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Major Links - Fixed on left side */}
      <MajorLinks />

      {/* Social Menu - Fixed on right side */}
      <SocialMenu />

      {/* Back to Top Button - Shows when scrolled */}
      <BackToTop />
    </div>
  );
}

export default App;
