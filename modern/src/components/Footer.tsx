import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

// Reusable CSS classes for easier maintenance
const linkClass =
  'text-[#fafafa] hover:text-[orange] hover:opacity-80 transition-all duration-300 border-none';
const linkClassWithIcon = `${linkClass} inline-flex items-center gap-2`;
const columnHeadingClass = 'text-[orange] text-4xl font-normal mb-4';
const listItemClass = 'mb-2';

// Data structures for footer links
interface LinkItem {
  label: string;
  url: string;
  icon?: string;
  svgIcon?: ReactNode;
  external?: boolean; // If true, add target="_blank" and rel="noopener noreferrer"
}

interface ColumnData {
  title: string;
  items: LinkItem[];
}

const generalData: ColumnData = {
  title: 'General',
  items: [
    { label: 'About', url: '/about' },
    { label: 'Documentation', url: 'https://conceal.network/wiki/doku.php', external: true },
    { label: 'Exchanges', url: '/community#exchanges', external: false },
    { label: 'FAQ', url: 'https://conceal.network/wiki/doku.php?id=FAQ', external: true },
    { label: 'Labs', url: '/labs', external: false },
    {
      label: 'wCCX',
      url: 'https://conceal.network/wiki/doku.php?id=wrapped-conceal',
      external: true,
    },
    { label: 'Support', url: 'https://conceal.network/support/', external: true },
  ],
};

const productsData: ColumnData = {
  title: 'Tools',
  items: [
    { label: 'Wallets', url: '#wallets' },
    { label: 'Bridge', url: 'https://bridge.conceal.network/', external: true },
    { label: 'Explorer', url: 'https://explorer.conceal.network/', external: true },
    { label: 'Web Wallet', url: 'https://wallet.conceal.network/', external: true },
    { label: 'Paper Wallet', url: 'https://conceal.network/paperwallet', external: true },
    { label: 'Marketplace', url: 'https://conceal.network/marketplace', external: true },
    { label: 'Authenticator', url: '/labs#authenticator', external: false },
    { label: 'Conceal-Earn', url: '/defi', external: false },
    { label: 'Conceal-Messaging', url: '/messaging', external: false },
  ],
};

const communityData: ColumnData = {
  title: 'Community',
  items: [
    {
      label: 'Discord',
      url: 'https://discord.conceal.network',
      icon: 'fab fa-discord',
      external: true,
    },
    {
      label: 'Telegram',
      url: 'https://t.me/concealcommunity',
      icon: 'fab fa-telegram',
      external: true,
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/ConcealNetwork',
      icon: 'fab fa-twitter',
      external: true,
    },
    {
      label: 'Youtube',
      url: 'https://www.youtube.com/channel/UC_YtRUcy0FR0yIc3H6DDxuw',
      icon: 'fab fa-youtube',
      external: true,
    },
    {
      label: 'Medium',
      url: 'https://medium.com/@ConcealNetwork',
      icon: 'fab fa-medium',
      external: true,
    },
    {
      label: 'Substack',
      url: 'https://substack.com/@concealnetwork',
      icon: '',
      external: true,
      svgIcon: (
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
      ),
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/concealnetwork/',
      icon: 'fab fa-facebook',
      external: true,
    },
    {
      label: 'Github',
      url: 'https://github.com/ConcealNetwork',
      icon: 'fab fa-github',
      external: true,
    },
    {
      label: 'BitcoinTalk',
      url: 'https://bitcointalk.org/index.php?topic=5086106',
      icon: 'fab fa-bitcoin',
      external: true,
    },
  ],
};

// Helper component to render a footer column
function FooterColumn({ data }: { data: ColumnData }) {
  return (
    <div className="w-full lg:w-1/3 text-center">
      <ul className="list-none m-0 p-0">
        <h2 className={columnHeadingClass}>{data.title}</h2>
        {data.items.map((item) => {
          const hasIcon = item.icon || item.svgIcon;
          const linkClassName = hasIcon ? linkClassWithIcon : linkClass;
          const linkProps = item.external
            ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
            : {};

          return (
            <li key={item.url} className={listItemClass}>
              <a href={item.url} className={linkClassName} {...linkProps}>
                {item.svgIcon ? (
                  <span className="flex items-center justify-center">{item.svgIcon}</span>
                ) : (
                  item.icon && <i className={`${item.icon} text-lg`}></i>
                )}
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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
          <FooterColumn data={generalData} />
          <FooterColumn data={productsData} />
          <FooterColumn data={communityData} />
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
