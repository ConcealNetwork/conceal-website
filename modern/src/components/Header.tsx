import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageSelector } from './ui/LanguageSelector';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; external?: boolean }[];
}

const navItems: NavItem[] = [
  {
    label: 'About',
    children: [
      { label: "What's Conceal?", href: '/about' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Team', href: '/team' },
      { label: 'Wiki', href: 'https://conceal.network/wiki/doku.php?id=start', external: true },
    ],
  },
  {
    label: 'Community',
    children: [
      { label: 'Channels', href: '/community' },
      { label: 'Mining', href: '/#mining' },
      { label: 'Partners', href: '/#partners' },
      { label: 'Donate', href: '/donate' },
    ],
  },
  {
    label: 'Developers',
    children: [
      { label: 'Branding', href: '/branding' },
      { label: 'Conceal-Labs', href: '/labs' },
      {
        label: 'Documentation',
        href: 'https://github.com/ConcealNetwork/conceal-core/wiki',
        external: true,
      },
      { label: 'GitHub', href: 'https://github.com/ConcealNetwork', external: true },
    ],
  },
  {
    label: 'News',
    children: [
      { label: 'Official Medium', href: 'https://concealnetwork.medium.com/', external: true },
      { label: 'Other Media', href: '/in-the-media' },
    ],
  },
  {
    label: 'Tools',
    children: [
      { label: 'Bridge', href: 'https://bridge.conceal.network', external: true },
      { label: 'Explorer', href: 'https://explorer.conceal.network', external: true },
      { label: 'Web Wallet', href: 'https://wallet.conceal.network', external: true },
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
      
      // If we're not on the main page, navigate to root with hash
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation and DOM update, then scroll
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
      } else {
        // Already on main page, just scroll
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
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
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-[501]">
        <a href="/" className="block mt-[9px] w-[50px] transition-all duration-300">
          <img src="/images/logo.svg" alt="Conceal Network" className="h-[84px] w-[84px]" />
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
            <a
              href="/#wallets"
              onClick={(e) => handleLinkClick(e, '/#wallets')}
              className="px-4 py-2 uppercase tracking-[0.1em] text-[orange] rounded-[0.75em] transition-all duration-500 hover:text-white"
            >
              Wallets
            </a>
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

      {/* Mobile Menu Toggle */}
      <a
        href="#mainMenuModal"
        onClick={(e) => {
          e.preventDefault();
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}
        className="md:hidden fixed top-4 right-3 w-8 h-8 z-50 p-2 border-2 border-white rounded-full transition-all duration-300 hover:text-[orange] hover:bg-[#750] hover:border-[orange] hover:scale-125 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <span className="block w-5 h-0.5 border-t-2 border-b-2 border-white"></span>
      </a>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[999] bg-[rgba(32,32,32,0.9)] flex items-center justify-center overflow-auto pb-4"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="min-h-0 py-16 px-4 mx-auto max-w-[31em] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-t-0 border-r-[1em] border-l-[1em] border-b-[1.5em] border-t-transparent border-r-transparent border-l-transparent border-b-[orange]"
              aria-label="Close menu"
            />
            <ul className="flex flex-col flex-wrap items-start justify-center relative w-full">
              {navItems.map((item) => (
                <li key={item.label} className="flex-1-0-auto pb-2 text-center w-full">
                  <a
                    href={item.href || '#'}
                    className="block px-3 py-3 bg-[rgba(0,0,0,0.5)] rounded-lg text-white hover:bg-black transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <ul className="mt-2 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            onClick={(e) => !child.external && handleLinkClick(e, child.href)}
                            target={child.external ? '_blank' : undefined}
                            rel={child.external ? 'noopener noreferrer' : undefined}
                            className="block px-3 py-3 bg-[rgba(0,0,0,0.5)] rounded-lg text-white hover:bg-black transition-colors duration-200"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="flex-1-0-auto pb-2 text-center w-full">
                <a
                  href="/#wallets"
                  onClick={(e) => handleLinkClick(e, '/#wallets')}
                  className="block px-3 py-3 bg-[rgba(0,0,0,0.5)] rounded-lg text-white hover:bg-black transition-colors duration-200"
                >
                  Wallets
                </a>
              </li>
              <li className="flex-1-0-auto pb-2 text-center w-full">
                <a
                  href="https://conceal.network/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-3 bg-[rgba(0,0,0,0.5)] rounded-lg text-white hover:bg-black transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Language Selector - Far Right */}
      <div className="absolute top-[45px] right-9 -translate-y-1/2">
        <LanguageSelector />
      </div>
    </header>
  );
}
