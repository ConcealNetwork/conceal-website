import { useEffect, useState } from 'react';
import { appConfig, hoursToMinutes } from '@/config/app.config';
import { hasCookie, setCookie } from '../utils/cookies';

interface SplashScreenProps {
  readonly onComplete: () => void;
  readonly showOnlyOnce?: boolean;
  readonly waitForAppReady?: boolean;
}

function useSplashVisibility({ onComplete, showOnlyOnce, waitForAppReady }: SplashScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (showOnlyOnce && hasCookie('splash-shown')) {
      onComplete();
      return;
    }
    const minTime = appConfig.splash.minDisplayTime;
    const startTime = Date.now();
    const finish = () => {
      if (showOnlyOnce)
        setCookie('splash-shown', 'true', hoursToMinutes(appConfig.cookies.splashScreenExpiration));
      onComplete();
    };
    const fadeOut = () => {
      setIsVisible(false);
      setTimeout(finish, appConfig.splash.fadeOutDuration);
    };
    const check = () => {
      if (
        document.readyState === 'complete' &&
        Date.now() - startTime >= minTime &&
        waitForAppReady
      ) {
        setIsLoaded(true);
        setTimeout(fadeOut, appConfig.splash.checkInterval);
      } else {
        setTimeout(check, appConfig.splash.checkInterval);
      }
    };
    setTimeout(check, appConfig.splash.checkInterval);
    if (document.readyState === 'complete') {
      check();
      return;
    }
    window.addEventListener('load', check);
    return () => window.removeEventListener('load', check);
  }, [onComplete, showOnlyOnce, waitForAppReady]);

  return { isLoaded, isVisible };
}

function SpinnerRings() {
  return (
    <div id="loader" className="relative w-[150px] h-[150px]">
      <div
        className="absolute inset-0 rounded-full border-[3px] border-transparent"
        style={{
          borderTopColor: 'var(--color1)',
          animation: 'spin 2s linear infinite, glowPulse1 2s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full border-[3px] border-transparent"
        style={{
          top: '5px',
          left: '5px',
          right: '5px',
          bottom: '5px',
          borderTopColor: 'var(--color2)',
          animation: 'spin 3s linear infinite, glowPulse2 2.5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full border-[3px] border-transparent"
        style={{
          top: '15px',
          left: '15px',
          right: '15px',
          bottom: '15px',
          borderTopColor: 'var(--color1)',
          animation: 'spin 1.5s linear infinite, glowPulse3 1.8s ease-in-out infinite',
        }}
      />
    </div>
  );
}

const SPLASH_STYLES = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes glowPulse1 {
    0%, 100% { filter: drop-shadow(0 0 8px var(--color1)) drop-shadow(0 0 12px var(--color1)); opacity: 1; }
    50% { filter: drop-shadow(0 0 16px var(--color1)) drop-shadow(0 0 24px var(--color1)) drop-shadow(0 0 32px var(--color1)); opacity: 0.9; }
  }
  @keyframes glowPulse2 {
    0%, 100% { filter: drop-shadow(0 0 8px var(--color2)) drop-shadow(0 0 12px var(--color2)); opacity: 1; }
    50% { filter: drop-shadow(0 0 16px var(--color2)) drop-shadow(0 0 24px var(--color2)) drop-shadow(0 0 32px var(--color2)); opacity: 0.9; }
  }
  @keyframes glowPulse3 {
    0%, 100% { filter: drop-shadow(0 0 8px var(--color1)) drop-shadow(0 0 12px var(--color1)); opacity: 1; }
    50% { filter: drop-shadow(0 0 16px var(--color1)) drop-shadow(0 0 24px var(--color1)) drop-shadow(0 0 32px var(--color1)); opacity: 0.9; }
  }
`;

export function SplashScreen(props: Readonly<SplashScreenProps>) {
  const { isLoaded, isVisible } = useSplashVisibility(props);
  if (!isVisible) return null;
  return (
    <div
      id="loader-wrapper"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-1000 ${isLoaded ? 'scale-[2] opacity-0' : ''}`}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'url("/images/CNGraySolidOptimized.svg")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
        }}
      />
      <div className="absolute inset-0 bg-black/50" style={{ backfaceVisibility: 'hidden' }} />
      <SpinnerRings />
      <style>{SPLASH_STYLES}</style>
    </div>
  );
}
