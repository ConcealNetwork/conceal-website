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

const doubleRAF = (cb: () => void) => requestAnimationFrame(() => requestAnimationFrame(cb));

function scrollToWithOffset(element: Element) {
  const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
  window.scrollTo({ top, behavior: 'smooth' });
}

function useHeroScroll(heroRef: React.RefObject<HTMLElement | null>) {
  const [isPast, setIsPast] = useState(false);
  useEffect(() => {
    const check = () => {
      if (!heroRef.current) return;
      setIsPast(window.scrollY > heroRef.current.offsetTop + heroRef.current.offsetHeight);
    };
    window.addEventListener('scroll', check);
    check();
    return () => window.removeEventListener('scroll', check);
  }, [heroRef]);
  return isPast;
}

function useHashScroll(location: ReturnType<typeof useLocation>) {
  useEffect(() => {
    if (location.pathname !== '/') return;
    const state = location.state as { scrollToHash?: string } | null;
    const hash = state?.scrollToHash || location.hash || window.location.hash;
    if (!hash) return;
    const cleanHash = hash.startsWith('#') ? hash : `#${hash}`;
    let attempts = 0;
    const tryScroll = () => {
      attempts++;
      const el = document.querySelector(cleanHash);
      if (el) {
        doubleRAF(() => scrollToWithOffset(el));
        return;
      }
      if (attempts < 50) setTimeout(tryScroll, appConfig.animations.scrollRetryDelayCrossPage);
    };
    setTimeout(tryScroll, appConfig.animations.scrollInitialDelayCrossPage);
  }, [location.state, location.hash, location.pathname]);
}

function useAppReady(onReady?: () => void) {
  useEffect(() => {
    if (!onReady) return;
    doubleRAF(onReady);
  }, [onReady]);
}

function App({ onReady }: AppProps) {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const isScrolledPastHero = useHeroScroll(heroSectionRef);
  useHashScroll(location);
  useAppReady(onReady);

  return (
    <div
      className="min-h-screen flex flex-col text-[#B0B0B0] text-[1.7rem] leading-[1.8]"
      style={{ fontFamily: 'var(--font-family)', backgroundColor: 'var(--color-bg-primary)' }}
    >
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
