import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appConfig, secondsToMs } from '@/config/app.config';

interface MajorLink {
  name: string;
  url: string;
  icon: string;
  external?: boolean;
}

const majorLinks: MajorLink[] = [
  {
    name: 'Buy',
    url: '/#markets',
    icon: 'fa fa-cart-shopping',
  },
  {
    name: 'Earn',
    url: '/#features',
    icon: 'fa fa-money-bill-trend-up',
  },
  {
    name: 'Hodl',
    url: '/#wallets',
    icon: 'fa fa-wallet',
  },
  {
    name: 'Build',
    url: '/labs',
    icon: 'fa fa-trowel-bricks',
  },
];

export function MajorLinks() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < appConfig.breakpoints.mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const fadeOutDelay = secondsToMs(appConfig.mobile.menuFadeOutTime);

    // Auto-hide after configured time on mobile
    if (isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, fadeOutDelay);
    }

    // Show on scroll
    const handleScroll = () => {
      if (isMobile) {
        setIsVisible(true);
        // Clear existing timeout and set new one
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, fadeOutDelay);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMobile]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: MajorLink) => {
    if (link.external) {
      return; // Let default behavior handle external links
    }

    e.preventDefault();

    // If hash link (starts with /#)
    if (link.url.startsWith('/#')) {
      const hash = link.url.substring(1); // Get #markets, #features, etc.

      // If we're not on the main page, navigate to root first, then scroll
      if (location.pathname !== '/') {
        // Navigate to root with hash in state
        navigate('/', {
          state: { scrollToHash: hash },
          replace: false,
        });
      } else {
        // Already on main page, just scroll
        const element = document.querySelector(hash);
        if (element) {
          requestAnimationFrame(() => {
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            const offset = 100; // Offset for header
            window.scrollTo({
              top: elementTop - offset,
              behavior: 'smooth',
            });
          });
        }
      }
    } else {
      // Regular navigation
      navigate(link.url);
    }
  };

  return (
    <ul
      className={`fixed top-1/2 left-[1.5rem] z-10 -translate-y-1/2 list-none pt-2 transition-opacity duration-500 ease-in-out ${
        isMobile && !isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {majorLinks.map((link, index) => {
        // Alternate between primary (color1) and secondary (color2) for visual variety
        const usePrimary = index % 2 === 0;
        const colorVar = usePrimary ? 'var(--color1)' : 'var(--color2)';
        const glowVar = usePrimary ? 'var(--color1-glow-rgba)' : 'var(--color2-glow-rgba)';

        return (
          <li key={link.name} className="pb-3">
            <a
              href={link.url}
              onClick={(e) => handleLinkClick(e, link)}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group relative flex items-center justify-center w-[2.3em] h-[2.3em] text-center rounded-full transition-all duration-300 ease-in-out"
              style={{
                color: colorVar,
                backgroundColor: 'rgba(15, 15, 26, 0.8)',
                border: `2px solid ${colorVar}`,
                boxShadow: `0 0 10px ${glowVar}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.boxShadow = `0 0 20px ${glowVar}, 0 0 30px ${glowVar}`;
                e.currentTarget.style.backgroundColor = colorVar;
                e.currentTarget.style.color = 'var(--color-bg-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 0 10px ${glowVar}`;
                e.currentTarget.style.backgroundColor = 'rgba(15, 15, 26, 0.8)';
                e.currentTarget.style.color = colorVar;
              }}
            >
              <i className={`${link.icon} text-[1.1em] z-10`} />
              <span
                className="absolute top-[0.25em] left-[3em] whitespace-nowrap opacity-0 invisible transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:visible z-20"
                style={{
                  color: colorVar,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)',
                }}
              >
                {link.name}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
