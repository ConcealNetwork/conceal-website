import { useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MajorLinks } from '../components/ui/MajorLinks';
import { SocialMenu } from '../components/ui/SocialMenu';
import { BackToTop } from '../components/ui/BackToTop';
import { CommunitySection } from '../components/sections/CommunitySection';

export function CommunityPage() {
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
        <CommunitySection />
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

