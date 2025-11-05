import { AnimatedElement } from '../ui/AnimatedElement';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

interface DownloadLink {
  label: string;
  url: string;
  download: string;
}

const logoDownloads: DownloadLink[] = [
  { label: 'Logo svg file', url: '/images/branding/logo.svg', download: 'logo.svg' },
  {
    label: 'Logo dark 1600x1600',
    url: '/images/branding/community-bbg-center-s-1600x1600.png',
    download: 'logo_1600x1600.png',
  },
  {
    label: 'Logo white 1600x1600',
    url: '/images/branding/community-1600x1600.png',
    download: 'logo_1600x1600.png',
  },
  {
    label: 'Logo dark 256x256',
    url: '/images/branding/community-bbg-center-256x256.png',
    download: 'logo_256x256.png',
  },
  {
    label: 'Logo white 256x256',
    url: '/images/branding/community-256x256.png',
    download: 'logo_256x256.png',
  },
];

const fontLinks = [
  { label: 'Poppins', url: 'https://fonts.google.com/specimen/Poppins' },
  { label: 'Lora', url: 'https://fonts.google.com/specimen/Lora' },
  { label: 'Montserrat', url: 'https://fonts.google.com/specimen/Montserrat' },
];

const colors = [
  { name: 'Grey', hex: '#808080', className: 'bg-[#808080]' },
  { name: 'Orange', hex: '#FFA500', className: 'bg-[orange]' },
  { name: 'Black', hex: '#000000', className: 'bg-black' },
];

export function BrandingSection() {
  return (
    <section id="branding" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
      {/* Background image */}
      <div
        id="herobg"
        className="absolute top-0 left-0 w-full h-full bg-[url('/images/background_bw.jpg')] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundAttachment: 'fixed',
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
        {/* Hero Title Section */}
        <div className="mb-16">
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <span className="block mb-3 text-[1.4rem] text-[rgba(255,255,255,0.7)] uppercase tracking-[0.2rem]">
              CONCEAL BRANDING
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              The look of <em className="text-[orange]">privacy</em>
            </h1>
          </AnimatedElement>
          <div className="flex flex-wrap gap-4">
            <Button variant="slideToId" targetId="branding">
              <i className="fas fa-book text-xl mr-2"></i>
              <span>Click to learn more</span>
            </Button>
          </div>
        </div>

        {/* About Section */}
        <SectionHeading
          variant="withDescription"
          title="About"
          description="Conceal, to keep secret, or hidden from view. Not only is this an apt description of our Project, but is also the leading influence in our design. Backgrounds are often darkened, shrouded, or obscured in some way. Text is often a Grey or White that stands out on the blackened backgrounds. The deep Yellow is used sparingly, sometimes as important keywords or as borders around important information. The careful use of the rich Yellow along with ample shades of greys and blacks implies that though much is hidden, what lies underneath is truly special."
        />

        <div className="h-[5rem]"></div>

        {/* Logo Section */}
        <div className="mb-24 ml-[5rem] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <AnimatedElement types={['slideInLeft']} triggerImmediately={true} speed="normal">
              <div
                className="w-[250px] h-[250px] mb-2.5 rounded-full bg-black"
                style={{
                  backgroundImage: "url('/images/branding/logo.svg')",
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '80%',
                }}
              ></div>
            </AnimatedElement>
            <AnimatedElement types={['slideInLeft']} triggerImmediately={true} speed="slow">
              <div
                className="w-[250px] h-[250px] rounded-full bg-white"
                style={{
                  backgroundImage: "url('/images/branding/logo.svg')",
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '80%',
                }}
              ></div>
            </AnimatedElement>
          </div>
          <div className="pl-0 lg:pl-12">
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <h2 className="text-3xl uppercase text-[orange] mb-6">The Conceal Logo</h2>
            </AnimatedElement>
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <ul className="list-none p-0 space-y-2">
                {logoDownloads.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      download={link.download}
                      className="text-[orange] hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      {link.label}
                      <i className="fas fa-download"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedElement>
          </div>
        </div>

        {/* Colors Section */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 pr-0 lg:pr-12">
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <h2 className="text-3xl uppercase text-[orange] mb-6">The Colours of Conceal</h2>
            </AnimatedElement>
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <p className="text-[1.7rem] text-[#757575]">
                Different colors tell different stories.
              </p>
            </AnimatedElement>
          </div>
          <div className="order-1 lg:order-2 flex flex-wrap justify-center lg:justify-start gap-4">
            {colors.map((color, index) => (
              <AnimatedElement key={index} types={['fadeIn']} triggerImmediately={false}>
                <div
                  className={`relative w-[150px] h-[150px] ${color.className} text-white flex items-center justify-center`}
                >
                  <p className="text-center text-lg font-semibold">{color.hex}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* Fonts Section */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex items-center justify-center lg:justify-start">
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <div className="p-10 border-l-4 border-[orange]">
                <p className="text-[1.7rem] text-[#757575] italic leading-relaxed">
                  "Arguing that you don't care about privacy because you have nothing to hide is no
                  different from saying, you don't care about freedom of speech because you have
                  nothing to say."
                </p>
              </div>
            </AnimatedElement>
          </div>
          <div className="pl-0 lg:pl-12">
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <h2 className="text-3xl uppercase text-[orange] mb-6">The Fonts of Conceal</h2>
            </AnimatedElement>
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <ul className="list-none p-0 space-y-2">
                {fontLinks.map((font, index) => (
                  <li key={index}>
                    <a
                      href={font.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[orange] hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      {font.label}
                      <i className="fas fa-download"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}
