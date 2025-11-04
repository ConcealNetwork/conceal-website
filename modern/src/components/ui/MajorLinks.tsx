import { useNavigate, useLocation } from 'react-router-dom';

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
    url: 'https://conceal.network/labs/',
    icon: 'fa fa-trowel-bricks',
    external: true,
  },
];

export function MajorLinks() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: MajorLink) => {
    if (link.external) {
      return; // Let default behavior handle external links
    }

    e.preventDefault();
    
    // If hash link (starts with /#)
    if (link.url.startsWith('/#')) {
      const hash = link.url.substring(1); // Get #markets, #features, etc.
      
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
    } else {
      // Regular navigation
      navigate(link.url);
    }
  };

  return (
    <ul className="fixed top-1/2 left-[1.5rem] z-10 -translate-y-1/2 list-none pt-2">
      {majorLinks.map((link) => (
        <li key={link.name} className="pb-3">
          <a
            href={link.url}
            onClick={(e) => handleLinkClick(e, link)}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group relative flex items-center justify-center w-[2em] h-[2em] text-center text-[orange] bg-black border-2 border-[orange] rounded-full transition-all duration-300 ease-in-out hover:text-[#111] hover:bg-[orange] hover:border-white hover:scale-[1.3]"
          >
            <i className={`${link.icon} text-[1em]`} />
            <span className="absolute top-[0.25em] left-[2.5em] whitespace-nowrap text-[orange] [text-shadow:0_-0.1em_0.2em_#000,0_0.1em_0.2em_#000,-0.1em_0_0.3em_#000,-0.1em_0_0.3em_#000,-0.2em_0_0.75em_#000,-0.2em_0_0.75em_#000] opacity-0 invisible transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:visible">
              {link.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
