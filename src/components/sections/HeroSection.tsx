import { useRef } from 'react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onMount?: (element: HTMLElement) => void;
}

export function HeroSection({ onMount }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={(el) => {
        if (el && onMount) {
          sectionRef.current = el;
          onMount(el);
        }
      }}
      className="relative min-h-[70vh] bg-[var(--color-bg-primary)] border-b border-[rgba(255,255,255,0.1)] overflow-hidden"
    >
      {/* Background image with improved overlay */}
      <div
        id="herobg"
        className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-bg-new.jpg')] bg-center bg-cover bg-no-repeat opacity-30"
      ></div>

      {/* Gradient overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--color-bg-primary)]/80 via-[#1A1A2E]/60 to-[var(--color-bg-primary)]/90"></div>

      {/* Subtle background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color1)]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color2)]/10 rounded-full blur-3xl"></div>

      {/* Content with improved spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Title - solid color for readability */}
          <h2 className="text-[4rem] md:text-[7rem] lg:text-[9rem] font-bold leading-tight mb-6 text-white">
            <span className="block md:inline">Conceal</span>
            <span className="block md:inline md:ml-4 text-[var(--color1)]">.Network</span>
          </h2>

          {/* Subtitle with better contrast */}
          <p className="text-[1.8rem] md:text-[2rem] text-[#E0E0E0] uppercase tracking-[0.3rem] mb-12 leading-relaxed [text-shadow:0_0_20px_rgba(0,0,0,0.8)] whitespace-normal md:whitespace-nowrap">
            Privacy-Protected De-Fi & Encrypted Communications
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap justify-center gap-12 mb-12">
            <Button variant="primary" asChild href="/#wallets" size="large">
              <a href="/#wallets">
                <i className="fas fa-wallet text-3xl mr-2"></i>
                <span className="text-2xl md:text-3xl">Get Started</span>
              </a>
            </Button>
            <Button variant="primary" targetId="features" asChild href="/#features" size="large">
              <a href="/#features">
                <i className="fas fa-info-circle text-3xl mr-2"></i>
                <span className="text-2xl md:text-3xl">Learn More</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll down link with neon accent */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color1)] opacity-80 hover:opacity-100 transition-all duration-300 z-10 hover:scale-110"
        style={{ textShadow: 'var(--color1-glow)' }}
        aria-label="Scroll to features"
      >
        <i className="fas fa-chevron-down text-3xl animate-bounce"></i>
      </a>
    </section>
  );
}
