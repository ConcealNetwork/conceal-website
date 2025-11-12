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

export function Header({ isScrolledPastHero = false, forceBackground = null }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownWider, setDropdownWider] = useState<{ [key: string]: boolean }>({});
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle hash links (like /#mining, /#wallets)
    if (href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.substring(1); // Get #mining, #wallets, etc.

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
    }
    // For regular links, let default behavior handle it
  };

  const handleNavItemClick = (label: string) => {
    const newState = openDropdown === label ? null : label;
    setOpenDropdown(newState);

    // Check widths after state update
    if (newState) {
      setTimeout(() => {
        const button = buttonRefs.current[label];
        const dropdown = dropdownRefs.current[label];
        if (button && dropdown) {
          const buttonWidth = button.offsetWidth;
          const dropdownWidth = dropdown.scrollWidth;
          setDropdownWider((prev) => ({
            ...prev,
            [label]: dropdownWidth > buttonWidth,
          }));
        }
      }, 10);
    }
  };

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-12 py-4 transition-all duration-300',
        forceBackground === 'black'
          ? 'bg-black'
          : forceBackground === 'transparent'
            ? 'bg-transparent'
            : isScrolledPastHero
              ? 'bg-[rgba(0,0,0,0.6)]'
              : 'bg-transparent'
      )}
    >
      {/* Logo */}
      <div className="absolute left-4 md:left-10 top-[0.2rem] md:top-1/2 md:-translate-y-1/2 z-[501]">
        <a href="/" className="block mt-[9px] w-[50px] md:w-[50px] transition-all duration-300">
          <img
            src="/images/logo.svg"
            alt="Conceal Network"
            className="h-24 w-24 md:h-[84px] md:w-[84px]"
          />
        </a>
      </div>

      {/* Desktop Navigation */}
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
                      'px-4 py-2 uppercase tracking-[0.1em] text-[orange] transition-all duration-500 rounded-t-[0.75em]',
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
                          className="block px-3 py-1 whitespace-nowrap rounded-[0.25em] text-[orange] hover:text-white hover:bg-black transition-colors duration-200"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a
                  href={item.href}
                  className="px-4 py-2 uppercase tracking-[0.1em] text-[orange] rounded-[0.75em] transition-all duration-500 hover:text-white"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          {/* Standalone Links */}
          <li>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '/#wallets');
              }}
              className="px-4 py-2 uppercase tracking-[0.1em] text-[orange] rounded-[0.75em] transition-all duration-500 hover:text-white"
            >
              Wallets
            </button>
          </li>
          <li>
            <a
              href="https://conceal.network/support"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 uppercase tracking-[0.1em] text-[orange] rounded-[0.75em] transition-all duration-500 hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Toggle - Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 w-10 h-10 z-[999] flex flex-col justify-center items-center gap-1.5 p-2 bg-[rgba(0,0,0,0.7)] border border-[orange] rounded-lg transition-all duration-300 hover:bg-[rgba(255,165,0,0.2)]"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-[orange] transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[orange] transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[orange] transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></span>
      </button>

      {/* Mobile Menu - Slide-in Navigation */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[998] bg-[#0A0A0A] border-l border-[rgba(255,165,0,0.3)] transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 pt-16">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[orange] hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Logo in Mobile Menu */}
          <div className="mb-6 pb-4 border-b border-[rgba(255,255,255,0.1)]">
            <img src="/images/logo.svg" alt="Conceal Network" className="h-12 w-12 mx-auto" />
          </div>
          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-[rgba(255,255,255,0.1)] pb-2">
                <div className="text-[orange] uppercase tracking-wider text-sm font-semibold mb-2 px-2">
                  {item.label}
                </div>
                {item.children && (
                  <ul className="space-y-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          onClick={(e) => {
                            if (!child.external) {
                              handleLinkClick(e, child.href);
                            }
                            setIsMobileMenuOpen(false);
                          }}
                          target={child.external ? '_blank' : undefined}
                          rel={child.external ? 'noopener noreferrer' : undefined}
                          className="block px-4 py-2 text-white hover:text-[orange] hover:bg-[rgba(255,165,0,0.1)] rounded transition-colors duration-200"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="border-b border-[rgba(255,255,255,0.1)] pb-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '/#wallets');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-white hover:text-[orange] hover:bg-[rgba(255,165,0,0.1)] rounded transition-colors duration-200"
              >
                Wallets
              </button>
            </div>
            <div className="border-b border-[rgba(255,255,255,0.1)] pb-2">
              <a
                href="https://conceal.network/support"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-white hover:text-[orange] hover:bg-[rgba(255,165,0,0.1)] rounded transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Language Selector in Mobile Menu */}
          <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className="md:hidden fixed inset-0 bg-black/70 z-[997] border-0 p-0 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        ></button>
      )}

      {/* Language Selector - Far Right (Desktop Only) */}
      <div className="hidden md:block absolute top-[45px] right-9 -translate-y-1/2">
        <LanguageSelector />
      </div>
    </header>
  );
}
