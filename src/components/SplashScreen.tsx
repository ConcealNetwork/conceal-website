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
    if (showOnlyOnce) {
      if (hasCookie('splash-shown')) {
        onComplete();
        return;
      }
    }

    // Minimum display time from config
    const minTime = appConfig.splash.minDisplayTime;
    const startTime = Date.now();

    // Wait for window load AND minimum time AND app ready
    const checkComplete = () => {
      const elapsed = Date.now() - startTime;
      const windowLoaded = document.readyState === 'complete';

      if (windowLoaded && elapsed >= minTime && waitForAppReady) {
        setIsLoaded(true);

        // Trigger fade out animation
        setTimeout(() => {
          setIsVisible(false);

          // Remove from DOM after animation
          setTimeout(() => {
            if (showOnlyOnce) {
              setCookie(
                'splash-shown',
                'true',
                hoursToMinutes(appConfig.cookies.splashScreenExpiration)
              );
            }
            onComplete();
          }, appConfig.splash.fadeOutDuration); // Match CSS transition duration
        }, appConfig.splash.checkInterval);
      } else {
        // Check again at configured interval
        setTimeout(checkComplete, appConfig.splash.checkInterval);
      }
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
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[orange]"
          style={{
            animation: 'spin 2s linear infinite',
          }}
        />

        {/* Middle circle */}
        <div
          className="absolute rounded-full border-[3px] border-transparent border-t-[orange]"
          style={{
            top: '5px',
            left: '5px',
            right: '5px',
            bottom: '5px',
            animation: 'spin 3s linear infinite',
          }}
        />

        {/* Inner circle */}
        <div
          className="absolute rounded-full border-[3px] border-transparent border-t-[orange]"
          style={{
            top: '15px',
            left: '15px',
            right: '15px',
            bottom: '15px',
            animation: 'spin 1.5s linear infinite',
          }}
        />
      </div>

      {/* Spin animation keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
