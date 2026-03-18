import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './ui/LanguageSelector';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; external?: boolean }[];
}

const navItems: NavItem[] = [
  {
    label: 'About',
    children: [
      { label: 'Manifesto', href: '/manifesto' },
      { label: "What's Conceal?", href: '/about' },
      { label: 'Messaging', href: '/messaging' },
      { label: 'Earn', href: '/earn' },
      { label: 'Wiki', href: 'https://conceal.network/wiki/doku.php?id=start', external: true },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Team', href: '/team' },
    ],
  },
  {
    label: 'Community',
    children: [
      { label: 'Channels', href: '/community' },
      { label: 'Medium', href: 'https://concealnetwork.medium.com/', external: true },
      { label: 'Mining', href: '/#mining' },
      { label: 'Videos', href: '/in-the-media' },
      { label: 'Partners', href: '/#partners' },
      { label: 'Donate', href: '/donate' },
    ],
  },
  {
    label: 'Developers',
    children: [
      { label: 'Branding', href: '/branding', external: false },
      { label: 'Conceal-Labs', href: '/labs', external: false },
      {
        label: 'Documentation',
        href: 'https://github.com/ConcealNetwork/conceal-core/wiki',
        external: true,
      },
      { label: 'GitHub', href: 'https://github.com/ConcealNetwork', external: true },
    ],
  },
  {
    label: 'Tools',
    children: [
      { label: 'Bridge', href: 'https://bridge.conceal.network', external: true },
      { label: 'Explorer', href: 'https://explorer.conceal.network', external: true },
      { label: 'Web Wallet', href: 'https://wallet.conceal.network', external: true },
      { label: 'Paper Wallet', href: 'https://conceal.network/paperwallet', external: true },
      { label: 'Marketplace', href: 'https://conceal.network/marketplace', external: true },
      { label: 'Authenticator', href: '/labs#authenticator', external: false },
    ],
  },
];

interface HeaderProps {
  isScrolledPastHero?: boolean;
  forceBackground?: 'black' | 'transparent' | null;
}

type LinkClickHandler = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;

const MOBILE_LINK_CLASS =
  'block px-4 py-2 text-white hover:text-[var(--color1)] rounded transition-colors duration-200';
const MOBILE_LINK_STYLE = { '--hover-bg': 'var(--color1-bg-glow)' } as React.CSSProperties;
const onHoverEnter = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.backgroundColor = 'var(--color1-bg-glow)';
};
const onHoverLeave = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.backgroundColor = 'transparent';
};

function HamburgerButton({
  isOpen,
  onToggle,
}: Readonly<{ isOpen: boolean; onToggle: () => void }>) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle menu"
      className="md:hidden fixed top-4 right-4 w-10 h-10 z-[999] flex flex-col justify-center items-center gap-1.5 p-2 bg-[rgba(0,0,0,0.7)] border border-[var(--color1)] rounded-lg transition-all duration-300"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color1-bg-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
      }}
    >
      <span
        className={`block w-6 h-0.5 bg-[var(--color1)] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-[var(--color1)] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-[var(--color1)] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
      ></span>
    </button>
  );
}

const BORDER_B = 'border-b border-[rgba(255,255,255,0.1)] pb-2';

function MobileNavList({
  handleLinkClick,
  onClose,
}: Readonly<{
  handleLinkClick: LinkClickHandler;
  onClose: () => void;
}>) {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <div key={item.label} className={BORDER_B}>
          <div className="text-[var(--color1)] uppercase tracking-wider text-sm font-semibold mb-2 px-2">
            {item.label}
          </div>
          {item.children && (
            <ul className="space-y-1">
              {item.children.map((child) => (
                <li key={child.label}>
                  <a
                    href={child.href}
                    onClick={(e) => {
                      if (!child.external) handleLinkClick(e, child.href);
                      onClose();
                    }}
                    target={child.external ? '_blank' : undefined}
                    rel={child.external ? 'noopener noreferrer' : undefined}
                    className={MOBILE_LINK_CLASS}
                    style={MOBILE_LINK_STYLE}
                    onMouseEnter={onHoverEnter}
                    onMouseLeave={onHoverLeave}
                  >
                    {child.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div className={BORDER_B}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '/#wallets');
            onClose();
          }}
          className={`${MOBILE_LINK_CLASS} w-full text-left`}
          style={MOBILE_LINK_STYLE}
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
        >
          Wallets
        </button>
      </div>
      <div className={BORDER_B}>
        <a
          href="https://conceal.network/support"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={MOBILE_LINK_CLASS}
          style={MOBILE_LINK_STYLE}
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  handleLinkClick,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  handleLinkClick: LinkClickHandler;
}>) {
  return (
    <>
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[998] bg-[var(--color-bg-primary)] border-l transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ borderLeftColor: 'var(--color1-border)' }}
      >
        <div className="p-4 pt-16">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[var(--color1)] hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <div className="mb-6 pb-4 border-b border-[rgba(255,255,255,0.1)]">
            <img src="/images/logo.svg" alt="Conceal Network" className="h-12 w-12 mx-auto" />
          </div>
          <MobileNavList handleLinkClick={handleLinkClick} onClose={onClose} />
          <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
            <LanguageSelector />
          </div>
        </div>
      </div>
      {isOpen && (
        <button
          type="button"
          className="md:hidden fixed inset-0 bg-black/70 z-[997] border-0 p-0 cursor-pointer"
          onClick={onClose}
          aria-label="Close menu"
        ></button>
      )}
    </>
  );
}

const NAV_LINK_CLASS =
  'px-4 py-2 uppercase tracking-[0.1em] text-[var(--color1)] rounded-[0.75em] transition-all duration-500 hover:text-white';

interface DesktopNavProps {
  readonly openDropdown: string | null;
  readonly dropdownWider: Record<string, boolean>;
  readonly buttonRefs: React.RefObject<Record<string, HTMLButtonElement | null>>;
  readonly dropdownRefs: React.RefObject<Record<string, HTMLUListElement | null>>;
  readonly handleNavItemClick: (label: string) => void;
  readonly handleLinkClick: LinkClickHandler;
}

function DesktopNav({
  openDropdown,
  dropdownWider,
  buttonRefs,
  dropdownRefs,
  handleNavItemClick,
  handleLinkClick,
}: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center h-24">
      <ul className="flex items-center gap-0 text-[0.941em] py-[0.54em] ml-[64px]">
        {navItems.map((item) => (
          <li key={item.label} className="relative group">
            {item.children ? (
              <>
                <button
                  type="button"
                  ref={(el) => {
                    buttonRefs.current[item.label] = el;
                  }}
                  onClick={() => handleNavItemClick(item.label)}
                  className={cn(
                    'px-4 py-2 uppercase tracking-[0.1em] text-[var(--color1)] transition-all duration-500 rounded-t-[0.75em]',
                    openDropdown === item.label ? 'text-white bg-[#333]' : 'hover:text-white'
                  )}
                >
                  {item.label}
                </button>
                <ul
                  ref={(el) => {
                    dropdownRefs.current[item.label] = el;
                  }}
                  className={cn(
                    'absolute left-0 z-50 py-1 px-1 bg-[#333] rounded-br-[0.5em] rounded-bl-[0.5em] opacity-0 invisible transition-all duration-500 min-w-full',
                    openDropdown === item.label && 'opacity-100 visible',
                    dropdownWider[item.label] && 'rounded-tr-[0.8em]'
                  )}
                >
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a
                        href={child.href}
                        onClick={(e) => !child.external && handleLinkClick(e, child.href)}
                        target={child.external ? '_blank' : undefined}
                        rel={child.external ? 'noopener noreferrer' : undefined}
                        className="block px-3 py-1 whitespace-nowrap rounded-[0.25em] text-[var(--color1)] hover:text-white hover:bg-black transition-colors duration-200"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a href={item.href} className={NAV_LINK_CLASS}>
                {item.label}
              </a>
            )}
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '/#wallets');
            }}
            className={NAV_LINK_CLASS}
          >
            Wallets
          </button>
        </li>
        <li>
          <a
            href="https://conceal.network/support"
            target="_blank"
            rel="noopener noreferrer"
            className={NAV_LINK_CLASS}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

function useHeaderState(
  navigate: ReturnType<typeof useNavigate>,
  location: ReturnType<typeof useLocation>
) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownWider, setDropdownWider] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dropdownRefs = useRef<Record<string, HTMLUListElement | null>>({});

  const handleLinkClick: LinkClickHandler = (e, href) => {
    if (!href.startsWith('/#')) return;
    e.preventDefault();
    const hash = href.substring(1);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToHash: hash }, replace: false });
      return;
    }
    const el = document.querySelector(hash);
    if (el)
      requestAnimationFrame(() =>
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.pageYOffset - 100,
          behavior: 'smooth',
        })
      );
  };

  const handleNavItemClick = (label: string) => {
    const next = openDropdown === label ? null : label;
    setOpenDropdown(next);
    if (next)
      setTimeout(() => {
        const btn = buttonRefs.current[label];
        const dd = dropdownRefs.current[label];
        if (btn && dd)
          setDropdownWider((p) => ({ ...p, [label]: dd.scrollWidth > btn.offsetWidth }));
      }, 10);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    if (openDropdown) {
      document.addEventListener('mousedown', onClick);
      return () => document.removeEventListener('mousedown', onClick);
    }
  }, [openDropdown]);

  return {
    openDropdown,
    dropdownWider,
    navRef,
    buttonRefs,
    dropdownRefs,
    handleLinkClick,
    handleNavItemClick,
  };
}

export function Header({ isScrolledPastHero = false, forceBackground = null }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    openDropdown,
    dropdownWider,
    navRef,
    buttonRefs,
    dropdownRefs,
    handleLinkClick,
    handleNavItemClick,
  } = useHeaderState(navigate, location);

  const bgClass =
    forceBackground === 'black'
      ? 'bg-black'
      : forceBackground === 'transparent'
        ? 'bg-transparent'
        : isScrolledPastHero
          ? 'bg-[rgba(0,0,0,0.6)]'
          : 'bg-transparent';

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-12 py-4 transition-all duration-300',
        bgClass
      )}
    >
      <div className="absolute left-4 md:left-10 top-[0.2rem] md:top-1/2 md:-translate-y-1/2 z-[501]">
        <a href="/" className="block mt-[9px] w-[50px] md:w-[50px] transition-all duration-300">
          <img
            src="/images/logo.svg"
            alt="Conceal Network"
            className="h-24 w-24 md:h-[84px] md:w-[84px]"
          />
        </a>
      </div>
      <DesktopNav
        openDropdown={openDropdown}
        dropdownWider={dropdownWider}
        buttonRefs={buttonRefs}
        dropdownRefs={dropdownRefs}
        handleNavItemClick={handleNavItemClick}
        handleLinkClick={handleLinkClick}
      />
      <HamburgerButton
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        handleLinkClick={handleLinkClick}
      />
      <div className="hidden md:block absolute top-[45px] right-9 -translate-y-1/2">
        <LanguageSelector />
      </div>
    </header>
  );
}
