import { AnimatedElement } from '../ui/AnimatedElement';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

interface Feature {
  title: string;
  description: string;
  imageSprite: string;
  imagePositionY: string;
  imageHeight: string;
  order: 'normal' | 'reverse';
}

const features: Feature[] = [
  {
    title: 'Built with the power of the Blockchain',
    description: 'Conceal-Earn is completely decentralized and built on the Conceal Blockchain.',
    imageSprite: '/images/landingPayImgs.png',
    imagePositionY: '-340px',
    imageHeight: '339px',
    order: 'normal',
  },
  {
    title: 'Deposit funds for interest',
    description:
      'Conceal-Earn empowers anyone in the world to deposit their funds in exchange for interest.',
    imageSprite: '/images/landingBankingImgs.png',
    imagePositionY: '0',
    imageHeight: '340px',
    order: 'reverse',
  },
  {
    title: 'Worldwide access',
    description:
      'There are millions without access to financial services worldwide. Conceal-Earn provides much needed access to anyone, anywhere.',
    imageSprite: '/images/landingBankingImgs.png',
    imagePositionY: '-340px',
    imageHeight: '340px',
    order: 'normal',
  },
  {
    title: 'Keep your funds safe',
    description:
      'When you deposit your funds with Conceal-Earn they are cold staked on the blockchain for safekeeping.',
    imageSprite: '/images/landingBankingImgs.png',
    imagePositionY: '-680px',
    imageHeight: '340px',
    order: 'reverse',
  },
  {
    title: 'Earn more than a savings account',
    description:
      'Deposits with Conceal-Earn earn significantly more than a savings account, as much as 6% APR plus compounding.',
    imageSprite: '/images/landingBankingImgs.png',
    imagePositionY: '-1020px',
    imageHeight: '340px',
    order: 'normal',
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
        <AnimatedElement types={['rotateInY']} triggerImmediately={false}>
          <div
            className="w-auto max-w-[340px] mx-auto"
            style={{
              height: feature.imageHeight,
              backgroundImage: `url('${feature.imageSprite}')`,
              backgroundPositionY: feature.imagePositionY,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto',
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

export function EarnSection() {
  return (
    <section id="earn" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
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
              CONCEAL EARN
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              <span className="text-[orange] font-semibold">Blockchain</span> Powered Deposits
            </h1>
          </AnimatedElement>
          <div className="flex flex-wrap gap-4">
            <Button variant="slide" asChild href="/#wallets">
              <i className="fas fa-download text-xl mr-2"></i>
              <span>Download</span>
            </Button>
            <Button variant="slideToId" targetId="earn-about">
              <i className="fas fa-book text-xl mr-2"></i>
              <span>Learn More</span>
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div id="earn-about" className="mb-24 scroll-mt-24">
          <SectionHeading
            variant="withDescription"
            title="About"
            description="Conceal-Earn removes unnecessary intermediaries by giving everyone the power to deposit their funds on the Blockchain and receive interest in exchange."
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
