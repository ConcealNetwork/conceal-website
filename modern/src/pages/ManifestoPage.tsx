import { useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ManifestoSection } from '../components/sections/ManifestoSection';
import { BackToTop } from '../components/ui/BackToTop';
import { SocialMenu } from '../components/ui/SocialMenu';

export function ManifestoPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#757575] font-['Poppins',Arial,Helvetica,sans-serif] text-[1.7rem] leading-[1.765]"
    >
      {/* Header Component */}
      <Header isScrolledPastHero={false} forceBackground="black" />

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <ManifestoSection />
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Social Menu - Fixed on right side */}
      <SocialMenu />

      {/* Back to Top Button - Shows when scrolled */}
      <BackToTop />
    </div>
  );
}
