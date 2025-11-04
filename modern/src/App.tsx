import { useState, useEffect, useRef } from 'react';
import { Footer } from './components/Footer';
import { BackToTop } from './components/ui/BackToTop';
import { SocialMenu } from './components/ui/SocialMenu';
import { MajorLinks } from './components/ui/MajorLinks';
import { Header } from './components/Header';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { WalletsSection } from './components/sections/WalletsSection';
import { MiningSection } from './components/sections/MiningSection';
import { MarketsSection } from './components/sections/MarketsSection';
import { PartnersSection } from './components/sections/PartnersSection';
import { HelpdeskSection } from './components/sections/HelpdeskSection';
import { CryptoWidgetSection } from './components/sections/CryptoWidgetSection';

interface AppProps {
  onReady?: () => void;
}

function App({ onReady }: AppProps) {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);

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

  // Signal that App is ready (after initial render)
  useEffect(() => {
    if (onReady) {
      // Use requestAnimationFrame to ensure DOM is painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          onReady();
        });
      });
    }
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
