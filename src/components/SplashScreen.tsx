import { useEffect, useState } from 'react';
import { appConfig, hoursToMinutes } from '@/config/app.config';
import { hasCookie, setCookie } from '../utils/cookies';

interface SplashScreenProps {
  onComplete: () => void;
  showOnlyOnce?: boolean;
  waitForAppReady?: boolean;
}

export function SplashScreen({
  onComplete,
  showOnlyOnce = false,
  waitForAppReady = false,
}: SplashScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if we should skip the splash screen
    if (showOnlyOnce && hasCookie('splash-shown')) {
      onComplete();
      return;
    }

    // Minimum display time from config
    const minTime = appConfig.splash.minDisplayTime;
    const startTime = Date.now();

    // Helper function to set cookie if needed
    const handleCookieSetting = () => {
      if (showOnlyOnce) {
        setCookie('splash-shown', 'true', hoursToMinutes(appConfig.cookies.splashScreenExpiration));
      }
    };

    // Helper function to complete splash screen (remove from DOM)
    const completeSplash = () => {
      handleCookieSetting();
      onComplete();
    };

    // Helper function to trigger fade out animation
    const triggerFadeOut = () => {
      setIsVisible(false);
      setTimeout(completeSplash, appConfig.splash.fadeOutDuration);
    };

    // Wait for window load AND minimum time AND app ready
    const checkComplete = () => {
      const elapsed = Date.now() - startTime;
      const windowLoaded = document.readyState === 'complete';
      const isReady = windowLoaded && elapsed >= minTime && waitForAppReady;

      if (!isReady) {
        // Check again at configured interval
        setTimeout(checkComplete, appConfig.splash.checkInterval);
        return;
      }

      // All conditions met, start fade out
      setIsLoaded(true);
      setTimeout(triggerFadeOut, appConfig.splash.checkInterval);
    };

    // Start checking
    setTimeout(checkComplete, appConfig.splash.checkInterval);

    // Also listen for window load event
    const handleLoad = () => {
      checkComplete();
    };

    if (document.readyState === 'complete') {
      checkComplete();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onComplete, showOnlyOnce, waitForAppReady]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="loader-wrapper"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-1000 ${
        isLoaded ? 'scale-[2] opacity-0' : ''
      }`}
    >
      {/* Background pattern layer (b element equivalent) */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("/images/CNGraySolidOptimized.svg")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
        }}
      />

      {/* Black transparent overlay layer */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Spinner loader */}
      <div id="loader" className="relative w-[150px] h-[150px]">
        {/* Outer circle */}
        <div
          className="absolute inset-0 rounded-full border-[3px] border-transparent"
          style={{
            borderTopColor: 'var(--color1)',
            animation: 'spin 2s linear infinite, glowPulse1 2s ease-in-out infinite',
          }}
        />

        {/* Middle circle */}
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

        {/* Inner circle */}
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

      {/* Spin and glow animation keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes glowPulse1 {
          0%, 100% { 
            filter: drop-shadow(0 0 8px var(--color1)) drop-shadow(0 0 12px var(--color1));
            opacity: 1;
          }
          50% { 
            filter: drop-shadow(0 0 16px var(--color1)) drop-shadow(0 0 24px var(--color1)) drop-shadow(0 0 32px var(--color1));
            opacity: 0.9;
          }
        }
        
        @keyframes glowPulse2 {
          0%, 100% { 
            filter: drop-shadow(0 0 8px var(--color2)) drop-shadow(0 0 12px var(--color2));
            opacity: 1;
          }
          50% { 
            filter: drop-shadow(0 0 16px var(--color2)) drop-shadow(0 0 24px var(--color2)) drop-shadow(0 0 32px var(--color2));
            opacity: 0.9;
          }
        }
        
        @keyframes glowPulse3 {
          0%, 100% { 
            filter: drop-shadow(0 0 8px var(--color1)) drop-shadow(0 0 12px var(--color1));
            opacity: 1;
          }
          50% { 
            filter: drop-shadow(0 0 16px var(--color1)) drop-shadow(0 0 24px var(--color1)) drop-shadow(0 0 32px var(--color1));
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
