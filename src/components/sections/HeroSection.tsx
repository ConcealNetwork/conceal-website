import { useRef } from 'react';

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
      className="relative h-[55vh] bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
    >
      {/* Background image */}
      <div
        id="herobg"
        className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-bg-new.jpg')] bg-center bg-cover bg-no-repeat"
      ></div>

      {/* Dark transparent overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Content */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full">
        <h2 className="text-[5rem] md:text-[8rem] text-white mb-4 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
          <span className="md:inline">
            <span className="block md:inline">Conceal</span>
            <span className="block md:inline md:ml-0 md:mt-0 mt-[-3rem] text-right md:text-center">
              .Network
            </span>
          </span>
        </h2>
        <p className="text-[1.6rem] text-[rgba(255,255,255,0.7)] uppercase tracking-[0.3rem] mb-8 [text-shadow:0_0_16px_rgba(0,0,0,0.9)]">
          Privacy-Protected De-Fi & Encrypted Communications
        </p>
      </div>

      {/* Scroll down link */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-70 hover:opacity-100 transition-opacity z-10"
        aria-label="Scroll to features"
      >
        <i className="fas fa-chevron-down text-2xl"></i>
      </a>
    </section>
  );
}
