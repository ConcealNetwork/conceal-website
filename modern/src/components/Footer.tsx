import { useEffect, useRef, useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const footerRef = useRef<HTMLElement>(null);
  const startYRef = useRef<number>(0);
  const lastScrollTopRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      // Auto-expand when scrolled to bottom
      if (isAtBottom && !isExpanded) {
        setIsExpanded(true);
      }
      // Auto-collapse when scrolling up (if not at bottom)
      else if (!isAtBottom && scrollTop < lastScrollTopRef.current && isExpanded) {
        setIsExpanded(false);
      }

      lastScrollTopRef.current = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleTouchStart = (e: TouchEvent) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

      if (isAtBottom) {
        startYRef.current = e.touches[0].clientY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;

      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startYRef.current);
      setPullDistance(Math.min(distance, 150)); // Max pull distance

      if (distance > 50 && !isExpanded) {
        setIsExpanded(true);
        setIsPulling(false);
        setPullDistance(0);
      }
    };

    const handleTouchEnd = () => {
      if (isPulling) {
        setIsPulling(false);
        setPullDistance(0);
      }
    };

    footer.addEventListener('touchstart', handleTouchStart);
    footer.addEventListener('touchmove', handleTouchMove);
    footer.addEventListener('touchend', handleTouchEnd);

    return () => {
      footer.removeEventListener('touchstart', handleTouchStart);
      footer.removeEventListener('touchmove', handleTouchMove);
      footer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, isExpanded]);

  return (
    <footer
      ref={footerRef}
      className={`bg-[#181A20] text-white transition-all duration-300 md:block ${
        isExpanded ? 'block' : 'hidden md:block'
      }`}
      style={{
        transform: isPulling ? `translateY(${-pullDistance}px)` : undefined,
      }}
    >
      {/* Pull Indicator - Mobile Only */}
      {!isExpanded && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#181A20] border-t border-[orange] py-2 text-center">
          <div className="text-[orange] text-sm animate-bounce">
            <i className="fas fa-chevron-up"></i> Pull up to see footer
            <i className="fas fa-chevron-up"></i>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <div className="pt-5 text-center mb-6">
        <a
          href="#top"
          className="text-[orange] hover:text-[#fafafa] transition-all duration-300 inline-flex items-center gap-2"
        >
          <i className="fas fa-chevron-up"></i>
          Back to Top
          <i className="fas fa-chevron-up"></i>
        </a>
      </div>

      {/* Footer Links Container */}
      <div className="min-w-full w-full px-[51px] py-[50px]">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-0">
          {/* General Column */}
          <div className="w-full lg:w-1/3 text-center">
            <ul className="list-none m-0 p-0">
              <h2 className="text-[orange] text-4xl font-normal mb-4">General</h2>
              <li className="mb-2">
                <a
                  href="/about"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  About
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://bridge.conceal.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Bridge
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://conceal.network/wiki/doku.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Documentation
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://explorer.conceal.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Explorer
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/community#exchanges"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Exchanges
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://conceal.network/wiki/doku.php?id=FAQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/labs"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Labs
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://conceal.network/wiki/doku.php?id=wrapped-conceal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  wCCX
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://conceal.network/support/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="w-full lg:w-1/3 text-center">
            <ul className="list-none m-0 p-0">
              <h2 className="text-[orange] text-4xl font-normal mb-4">Products</h2>
              <li className="mb-2">
                <a
                  href="#wallets"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Wallets
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://bridge.conceal.network/"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Conceal-Bridge
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/defi"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Conceal-Earn
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://wallet.conceal.network/"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Conceal-WebWallet
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/messaging"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none"
                >
                  Conceal-Messaging
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="w-full lg:w-1/3 text-center">
            <ul className="list-none m-0 p-0">
              <h2 className="text-[orange] text-4xl font-normal mb-4">Community</h2>
              <li className="mb-2">
                <a
                  href="https://discord.conceal.network"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Discord
                  <i className="fab fa-discord" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://t.me/concealcommunity"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Telegram
                  <i className="fab fa-telegram" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://twitter.com/ConcealNetwork"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Twitter
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.youtube.com/channel/UC_YtRUcy0FR0yIc3H6DDxuw"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Youtube
                  <i className="fab fa-youtube" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://medium.com/@ConcealNetwork"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Medium
                  <i className="fab fa-medium" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://substack.com/@concealnetwork"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Substack
                  <svg
                    role="img"
                    aria-label="Substack"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    strokeWidth="1.8"
                    stroke="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path d="M1.96484 0.624512H18.0354V2.70052H1.96484V0.624512Z" stroke="none" />
                      <path d="M1.96484 4.77655H18.0354V6.85254H1.96484V4.77655Z" stroke="none" />
                      <path
                        d="M1.96484 8.92857V19.9505L10.0001 14.6347L18.0354 19.9505V8.92857H1.96484V8.92857Z"
                        stroke="none"
                      />
                    </g>
                  </svg>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.facebook.com/concealnetwork/"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Facebook
                  <i className="fab fa-facebook" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/ConcealNetwork"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  Github
                  <i className="fab fa-github" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://bitcointalk.org/index.php?topic=5086106"
                  className="text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none inline-flex items-center gap-2"
                >
                  BitcoinTalk
                  <i className="fab fa-bitcoin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Terms & Privacy */}
      <div className="min-w-full text-center pb-2.5">
        <span className="url_terms">
          <a href="/tc" className="text-[orange] hover:text-[#fafafa] transition-all duration-300">
            T&amp;C
          </a>
        </span>
        <div className="inline-block w-px h-4 bg-white/20 mx-4 align-middle" />
        <span className="url_terms">
          <a
            href="/privacy"
            className="text-[orange] hover:text-[#fafafa] transition-all duration-300"
          >
            Privacy
          </a>
        </span>
      </div>

      {/* Copyright */}
      <div className="min-w-full text-center pb-2.5">
        &copy; 2017-{currentYear}{' '}
        <span>
          Conceal.Network, Conceal DAO, Conceal Team &amp; Conceal Developers - All rights reserved.
        </span>
      </div>
    </footer>
  );
}
