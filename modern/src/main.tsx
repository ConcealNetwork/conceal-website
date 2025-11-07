import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { SplashScreen } from './components/SplashScreen';
import { AboutPage } from './pages/AboutPage';
import { BrandingPage } from './pages/BrandingPage';
import { CommunityPage } from './pages/CommunityPage';
import { DonatePage } from './pages/DonatePage';
import { EarnPage } from './pages/EarnPage';
import { Error502Page } from './pages/Error502Page';
import { Error504Page } from './pages/Error504Page';
import { Error508Page } from './pages/Error508Page';
import { InTheMediaPage } from './pages/InTheMediaPage';
import { LabsPage } from './pages/LabsPage';
import { ManifestoPage } from './pages/ManifestoPage';
import { MessagingPage } from './pages/MessagingPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { TeamPage } from './pages/TeamPage';
import { TermsPage } from './pages/TermsPage';
import { hasCookie } from './utils/cookies';

function Root() {
  const [showApp, setShowApp] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const location = useLocation();

  // Only show splash screen on main landing page (/)
  const isMainPage = location.pathname === '/';

  // Check if splash screen should be shown (only if cookie doesn't exist)
  const shouldShowSplash = isMainPage && !showApp && !hasCookie('splash-shown');

  return (
    <>
      {/* Show splash screen only on main page until app is ready */}
      {shouldShowSplash && (
        <SplashScreen
          onComplete={() => setShowApp(true)}
          showOnlyOnce={true}
          waitForAppReady={appReady}
        />
      )}

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            isMainPage ? (
              <div
                className={
                  showApp || hasCookie('splash-shown')
                    ? 'opacity-100 transition-opacity duration-1000'
                    : 'opacity-0 pointer-events-none fixed inset-0 z-0'
                }
              >
                <App onReady={() => setAppReady(true)} />
              </div>
            ) : null
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/branding" element={<BrandingPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/in-the-media" element={<InTheMediaPage />} />
        <Route path="/earn" element={<EarnPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/tc" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/502" element={<Error502Page />} />
        <Route path="/504" element={<Error504Page />} />
        <Route path="/508" element={<Error508Page />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<AppWrapper />);
