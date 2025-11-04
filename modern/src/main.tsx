import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SplashScreen } from './components/SplashScreen'

function Root() {
  const [showApp, setShowApp] = useState(false);
  const [appReady, setAppReady] = useState(false);

  return (
    <StrictMode>
      {/* Always render App in background, but keep it hidden until ready */}
      <div className={showApp ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0 pointer-events-none fixed inset-0 z-0'}>
        <App onReady={() => setAppReady(true)} />
      </div>
      
      {/* Show splash screen until app is ready and minimum time has passed */}
      {!showApp && (
        <SplashScreen 
          onComplete={() => setShowApp(true)} 
          showOnlyOnce={true}
          waitForAppReady={appReady}
        />
      )}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />)
