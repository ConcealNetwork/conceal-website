import { useEffect, useRef, useState } from 'react';
import { appConfig, secondsToMs } from '@/config/app.config';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  svgIcon?: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Documentation',
    url: 'https://conceal.network/wiki/doku.php',
    icon: 'fab fa-wikipedia-w',
  },
  {
    name: 'Discord',
    url: 'http://discord.conceal.network',
    icon: 'fab fa-discord',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/concealcommunity',
    icon: 'fab fa-telegram',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/ConcealNetwork',
    icon: 'fab fa-twitter',
  },
  {
    name: 'Medium',
    url: 'https://concealnetwork.medium.com/',
    icon: 'fab fa-medium',
  },
  {
    name: 'Substack',
    url: 'https://substack.com/@concealnetwork',
    icon: '',
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
    name: 'Github',
    url: 'https://github.com/ConcealNetwork',
    icon: 'fab fa-github',
  },
];

export function SocialMenu() {
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

  return (
    <ul
      className={`fixed top-1/2 right-[1.5rem] z-10 -translate-y-1/2 list-none pt-2 transition-opacity duration-500 ease-in-out ${
        isMobile && !isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {socialLinks.map((link) => (
        <li key={link.name} className="pb-3">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-[2em] h-[2em] text-center text-[orange] bg-black border-2 border-[orange] rounded-full transition-all duration-300 ease-in-out hover:text-[#111] hover:bg-[orange] hover:border-white hover:scale-[1.3]"
          >
            {link.svgIcon ? (
              <span className="flex items-center justify-center">{link.svgIcon}</span>
            ) : (
              <i className={`${link.icon} text-[1em]`} />
            )}
            <span className="absolute top-[0.25em] right-[2.5em] whitespace-nowrap text-[orange] [text-shadow:0_-0.1em_0.2em_#000,0_0.1em_0.2em_#000,-0.1em_0_0.3em_#000,-0.1em_0_0.3em_#000,-0.2em_0_0.75em_#000,-0.2em_0_0.75em_#000] opacity-0 invisible transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:visible">
              {link.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
