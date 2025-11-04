import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AboutPage } from './pages/AboutPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { SplashScreen } from './components/SplashScreen';

function Root() {
  const [showApp, setShowApp] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const location = useLocation();
  
  // Only show splash screen on main landing page (/)
  const isMainPage = location.pathname === '/';

  return (
    <>
      {/* Show splash screen only on main page until app is ready */}
      {isMainPage && !showApp && (
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
                  showApp
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
