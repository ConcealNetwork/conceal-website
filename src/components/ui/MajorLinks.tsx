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
  { name: 'Buy', url: '/#markets', icon: 'fa fa-cart-shopping' },
  { name: 'Earn', url: '/#features', icon: 'fa fa-money-bill-trend-up' },
  { name: 'Hodl', url: '/#wallets', icon: 'fa fa-wallet' },
  { name: 'Build', url: '/labs', icon: 'fa fa-trowel-bricks' },
];

function useMobileVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < appConfig.breakpoints.mobile);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const fadeOutDelay = secondsToMs(appConfig.mobile.menuFadeOutTime);
    if (isMobile) timeoutRef.current = setTimeout(() => setIsVisible(false), fadeOutDelay);

    const handleScroll = () => {
      if (!isMobile) return;
      setIsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(false), fadeOutDelay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMobile]);

  return { isVisible, isMobile };
}

function scrollToHash(hash: string) {
  const element = document.querySelector(hash);
  if (!element) return;
  requestAnimationFrame(() => {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.pageYOffset - 100,
      behavior: 'smooth',
    });
  });
}

function MajorLinkItem({
  link,
  index,
  onClick,
}: Readonly<{
  link: MajorLink;
  index: number;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, link: MajorLink) => void;
}>) {
  const colorVar = index % 2 === 0 ? 'var(--color1)' : 'var(--color2)';
  const glowVar = index % 2 === 0 ? 'var(--color1-glow-rgba)' : 'var(--color2-glow-rgba)';
  return (
    <li className="pb-3">
      <a
        href={link.url}
        onClick={(e) => onClick(e, link)}
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
}

export function MajorLinks() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isVisible, isMobile } = useMobileVisibility();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: MajorLink) => {
    if (link.external) return;
    e.preventDefault();
    if (link.url.startsWith('/#')) {
      const hash = link.url.substring(1);
      if (location.pathname === '/') scrollToHash(hash);
      else navigate('/', { state: { scrollToHash: hash }, replace: false });
    } else {
      navigate(link.url);
    }
  };

  return (
    <ul
      className={`fixed top-1/2 left-[1.5rem] z-10 -translate-y-1/2 list-none pt-2 transition-opacity duration-500 ease-in-out ${
        isMobile && !isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {majorLinks.map((link, index) => (
        <MajorLinkItem key={link.name} link={link} index={index} onClick={handleLinkClick} />
      ))}
    </ul>
  );
}
