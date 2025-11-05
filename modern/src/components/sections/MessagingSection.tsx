import { AnimatedElement } from '../ui/AnimatedElement';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

interface Feature {
  title: string;
  description: string;
  imageSprite: string;
  imagePositionY: string;
  imageHeight: string;
  imageMaxWidth: string;
  order: 'normal' | 'reverse';
  imageAnimation: 'rotateInY' | 'crtPowerOn';
}

const features: Feature[] = [
  {
    title: 'Self-Destructing Messages',
    description:
      'Conceal Messaging supports self-destructing messages that delete themselves after being read.',
    imageSprite: '/images/landingMessagingImgs.png',
    imagePositionY: '0',
    imageHeight: '284px',
    imageMaxWidth: '340px',
    order: 'normal',
    imageAnimation: 'rotateInY',
  },
  {
    title: 'Desktop or Web',
    description: 'Conceal Messaging works on the Web and Desktop.',
    imageSprite: '/images/mobile_screenshots.png',
    imagePositionY: '-400px',
    imageHeight: '400px',
    imageMaxWidth: '398px',
    order: 'reverse',
    imageAnimation: 'crtPowerOn',
  },
  {
    title: 'Decentralized',
    description: 'Conceal Messaging is a decentralized service that operates on the Blockchain.',
    imageSprite: '/images/landingMessagingImgs.png',
    imagePositionY: '-284px',
    imageHeight: '350px',
    imageMaxWidth: '340px',
    order: 'normal',
    imageAnimation: 'rotateInY',
  },
  {
    title: 'Address Book',
    description:
      'There is no need to copy / paste an address every time. Maintain your address book for easily sending messages to your contacts.',
    imageSprite: '/images/mobile_screenshots.png',
    imagePositionY: '-1200px',
    imageHeight: '400px',
    imageMaxWidth: '398px',
    order: 'reverse',
    imageAnimation: 'crtPowerOn',
  },
  {
    title: 'Encrypted',
    description:
      'All Conceal Messages are encrypted and cannot be read by anyone other than the sender and receiver.',
    imageSprite: '/images/landingMessagingImgs.png',
    imagePositionY: '-634px',
    imageHeight: '294px',
    imageMaxWidth: '340px',
    order: 'normal',
    imageAnimation: 'rotateInY',
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  // normal = image left, text right
  // reverse = text left, image right
  const isNormal = feature.order === 'normal';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
      {/* Image Element */}
      <div className={`order-2 mb-8 lg:mb-0 ${isNormal ? 'lg:order-1' : 'lg:order-2'}`}>
        <AnimatedElement types={[feature.imageAnimation]} triggerImmediately={false}>
          <div
            className="w-auto mx-auto"
            style={{
              height: feature.imageHeight,
              maxWidth: feature.imageMaxWidth,
              backgroundImage: `url('${feature.imageSprite}')`,
              backgroundPositionY: feature.imagePositionY,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto',
              ...(feature.imageSprite.includes('mobile_screenshots') && {
                borderRadius: '32px',
                borderBottom: '2px solid #AAA',
                boxShadow: '0 3px #000',
              }),
            }}
          ></div>
        </AnimatedElement>
      </div>

      {/* Text Element */}
      <div
        className={`order-1 ${isNormal ? 'lg:order-2 pl-0 lg:pl-12' : 'lg:order-1 pl-6 lg:pl-6 pr-0 lg:pr-12'}`}
      >
        <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
          <h2 className="text-[2.8rem] uppercase text-[orange] mb-6">{feature.title}</h2>
        </AnimatedElement>
        <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
          <p className="text-[1.7rem] text-[#757575]">{feature.description}</p>
        </AnimatedElement>
      </div>
    </div>
  );
}

export function MessagingSection() {
  return (
    <section id="messaging" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
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
              CONCEAL MESSAGING
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              Decentralized <span className="text-[orange] font-semibold">Encrypted</span> Messages
            </h1>
          </AnimatedElement>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="slide"
              asChild
              href="https://wallet.conceal.network/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-mobile-alt text-xl mr-2"></i>
              <span>Web Wallet</span>
            </Button>
            <Button variant="slide" asChild href="/#wallets">
              <i className="fas fa-download text-xl mr-2"></i>
              <span>Desktop</span>
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-24">
          <SectionHeading
            variant="withDescription"
            title="Messaging"
            description="Conceal Messaging expands our ecosystem by providing fully integrated encrypted messaging on the Blockchain."
          />
        </div>

        {/* Features */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
