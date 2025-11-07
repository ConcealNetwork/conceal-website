import { AnimatedElement } from '../ui/AnimatedElement';
import { SectionHeading } from '../ui/SectionHeading';

// Manifesto content from the markdown file
const manifestoContent = [
  {
    text: `**Privacy is not a privilege. It is a right.**
It is the foundation of freedom, the space where thought and identity are born. Yet in our digitized age, this right is under siege. Corporations harvest our data, governments monitor our every move, and malicious actors lurk in the shadows of the web.
We refuse to surrender.
We are the **Concealers**—inheritors of the **Cypherpunk** legacy—carrying its fire into the present and the future.`,
    image: null,
  },
  {
    text: `**Cryptography is our weapon.**
Like the Cypherpunks before us, we wield code as our shield and sword. In a world where surveillance grows smarter, we grow stronger. Quantum computing and artificial intelligence bring both threat and promise—but we will turn them to our advantage. We will build systems so secure that even the most powerful cannot break them.`,
    image: '/images/manifesto/privacy_cypherpunk.png',
  },
  {
    text: `**Decentralization is our shield.**
Power must never be concentrated in the hands of the few. Decentralized systems—blockchains, distributed networks, peer-to-peer infrastructures—give strength back to the people. They ensure that no single authority can dictate, censor, or control the digital world we inhabit.
We stand for freedom through decentralization.`,
    image: null,
  },
  {
    text: `**Open source is our creed.**
We reject secrecy and corporate monopolies. We believe in transparency, collaboration, and collective empowerment. Open-source code is digital democracy—it belongs to everyone. By building and sharing openly, we ensure that our technology serves humanity, not hierarchy.`,
    image: null,
  },
  {
    text: `**Education is our duty.**
Knowledge is the first line of defense. A digitally literate society cannot be easily deceived or controlled. We will teach, share, and empower—until every individual can defend their own privacy. Awareness is resistance.`,
    image: '/images/manifesto/inthenews.png',
  },
  {
    text: `**Sustainability is our responsibility.**
The digital world is not separate from the physical one. Our innovations must respect the planet that sustains us. We seek balance—between progress and preservation, between code and climate.`,
    image: null,
  },
  {
    text: `**Innovation is our path forward.**
We are dreamers and builders, thinkers and tinkerers. Every breakthrough, every new idea, brings us closer to a world where privacy is not a battle—but a birthright. We will not fear the future. We will shape it.`,
    image: null,
  },
  {
    text: `**We are the Concealers.**
We fight for a world where privacy lives, breathes, and belongs to all. Guided by our principles, united by our vision, we will not yield.
**The struggle continues—until every person is free.**`,
    image: null,
  },
];

function ManifestoText({ content }: { content: string }) {
  // Simple markdown-like parsing for bold text and headers
  const parseText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.trim() === '') return null;
      
      // Check for ### headers
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-[2.8rem] uppercase text-[orange] mb-6">
            {line.replace(/^### \*\*|\*\*$/g, '')}
          </h3>
        );
      }
      
      // Check for **bold** text
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={index} className="text-[1.7rem] text-[#757575] mb-4">
          {parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIndex} className="text-white font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      );
    }).filter(Boolean);
  };

  return <div>{parseText(content)}</div>;
}

function ManifestoContentBlock({ content, index }: { content: typeof manifestoContent[0]; index: number }) {
  const hasImage = content.image !== null;
  const isEven = index % 2 === 0;

  if (!hasImage) {
    // Text only block
    return (
      <div className="mb-16">
        <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
          <ManifestoText content={content.text} />
        </AnimatedElement>
      </div>
    );
  }

  // Text and image block with alternating layout
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
      {/* Image Element */}
      <div className={`order-2 mb-8 lg:mb-0 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <AnimatedElement types={['rotateInY']} triggerImmediately={false}>
          <div className="w-full max-w-md mx-auto">
            <img
              src={content.image!}
              alt="Manifesto"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </AnimatedElement>
      </div>

      {/* Text Element */}
      <div className={`order-1 ${isEven ? 'lg:order-2 pl-0 lg:pl-12' : 'lg:order-1 pr-0 lg:pr-12'}`}>
        <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
          <ManifestoText content={content.text} />
        </AnimatedElement>
      </div>
    </div>
  );
}

export function ManifestoSection() {
  return (
    <section id="manifesto" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
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
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              Concealer's <span className="text-[orange] font-semibold">Manifesto</span>
            </h1>
          </AnimatedElement>
        </div>

        {/* Citation Image with Zoom Effect */}
        <div className="mb-16 flex justify-center">
          <AnimatedElement types={['slideInLeft']} triggerImmediately={true}>
            <div className="relative group overflow-hidden rounded-lg shadow-lg max-w-4xl w-full cursor-zoom-in">
              <img
                src="/images/manifesto/citation.png"
                alt="Citation"
                className="w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-125 origin-center"
              />
            </div>
          </AnimatedElement>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-8">
          {manifestoContent.map((content, index) => (
            <ManifestoContentBlock key={index} content={content} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

