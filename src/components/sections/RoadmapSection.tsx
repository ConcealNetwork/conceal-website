import { useEffect, useRef, useState } from 'react';
import { AnimatedElement } from '../ui/AnimatedElement';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'inprog' | 'activ' | 'done';
  url?: string;
}

const timelineItems: TimelineItem[] = [
  {
    date: 'April 2018',
    title: 'Initial commit',
    description:
      'The first release candidate, Testnet, Daemon, Miner and Wallet are launched. Something really great begins.',
    status: 'completed',
  },
  {
    date: 'May 2018',
    title: 'Mainnet launched',
    description:
      'On 23rd May 2018 mainnet is launched. First block is officialy mined by the miners.',
    status: 'completed',
  },
  {
    date: 'June 2018',
    title: 'Encrypted Messaging & Deposits',
    description:
      'Innovative DeFi features utilizing cold-staked deposits that pay interest and self-destructing encrypted messages are launched. Wow!',
    status: 'completed',
  },
  {
    date: 'July 2018',
    title: 'Website & Block Explorer',
    description:
      "The official website is born providing a central point of information for the project. The Block Explorer is released. We're on fire!",
    status: 'completed',
  },
  {
    date: 'October 2018',
    title: 'CN Fast',
    description: 'CCX changes to CN Fast mining algorithm to avoid ASICs.',
    status: 'completed',
  },
  {
    date: 'November 2018',
    title: 'Exchange Listing & Investments',
    description:
      'CCX is listed on the STEX exchange and the deposit system is revamped to support investments. Stock is rising!',
    status: 'completed',
  },
  {
    date: 'February 2019',
    title: 'CN Conceal',
    description: 'CCX changes to CN Conceal mining algorithm to avoid ASICs and FPGA.',
    status: 'completed',
  },
  {
    date: 'March 2019',
    title: 'Conceal Cloud',
    description:
      'Conceal Cloud is launched offering a secure, powerful and feature-rich web wallet for CCX. Adoption skyrockets!',
    status: 'completed',
  },
  {
    date: 'May 2019',
    title: 'Conceal Labs',
    description:
      'Conceal Labs is launched offering anyone the ability to get paid to build cool things with Conceal. The community grows!',
    status: 'completed',
  },
  {
    date: 'July 2019',
    title: 'CONCEAL MOBILE',
    description:
      'Conceal Mobile is launched offering a robust mobile wallet with encrypted messages. Messaging popularity explodes!',
    status: 'completed',
  },
  {
    date: 'August 2019',
    title: 'CONCEAL PAY',
    description:
      'Conceal Pay is launched making it simple for anyone to accept payments or donations in CCX. Volume expands!',
    status: 'completed',
  },
  {
    date: 'December 2019',
    title: 'CONCEAL ID',
    description:
      'Conceal ID is launched offering memorable branded addresses akin to usernames. Ease of use improves!',
    status: 'completed',
  },
  {
    date: 'January 2020',
    title: 'Daemon & Wallet Improvements',
    description:
      "Conceal Desktop v6 is released with varying interface and daemon improvements. We're getting fancy!",
    status: 'completed',
  },
  {
    date: 'August 2020',
    title: 'Wrapped CCX (wCCX)',
    description:
      'Wrapped CCX is created on ethereum blockchain allowing CCX owners to access DEFI on ETH!',
    status: 'completed',
  },
  {
    date: 'August 2020',
    title: 'wCCX on Uniswap and in Trustwallet',
    description: 'wCCX is available on the hottest DEX at the time and added to Trustwallet.',
    status: 'completed',
  },
  {
    date: 'September 2020',
    title: 'Deposits on Cloud & Mobile',
    description:
      'Cold staking came to cloud and mobile. You are able to earn interest from your phone!',
    status: 'completed',
  },
  {
    date: 'October 2020',
    title: 'CN GPU',
    description:
      'CCX changes to CN GPU mining algorithm to avoid ASICs and FPGA. Our fairest mining algorithm yet.',
    status: 'completed',
  },
  {
    date: 'Q4 2020',
    title: 'Cloud & Mobile Self-destructing Messages',
    description:
      'Send messages to other users that self destruct after given time on Cloud wallets! (service retired)',
    status: 'completed',
  },
  {
    date: 'Q1 2021',
    title: 'Conceal Bridge',
    description: 'Swap your CCX to wCCX and back the other way with our Bridge tool.',
    status: 'completed',
    url: 'https://bridge.conceal.network',
  },
  {
    date: 'Q2 2021',
    title: 'CONCEAL LIVE',
    description:
      'Decentralized p2p and end to end encrypted platform for video / audio calls and messages. (service retired)',
    status: 'completed',
  },
  {
    date: 'Q4 2021',
    title: 'Conceal App',
    description:
      'Initial release of cross platform application with Wallet and News Feed as the first supported modules.',
    status: 'completed',
  },
  {
    date: 'Q1 2022',
    title: 'Conceal App Deposits',
    description: 'Conceal Blockchain Deposits Module released for the Conceal App!',
    status: 'completed',
  },
  {
    date: 'Q2 2022',
    title: 'Conceal Web Wallet',
    description: 'Release of our 100% Client-Side Web Wallet for Conceal.',
    status: 'completed',
    url: 'https://wallet.conceal.network',
  },
  {
    date: 'Q3 2023',
    title: 'Web wallet improvements',
    description:
      'Improving speed and making optimizations. Now send encrypted Messages from your smartphone',
    status: 'completed',
    url: 'https://wallet.conceal.network',
  },
  {
    date: 'Q3 2024',
    title: 'Web wallet improvements',
    description:
      'Improving anonymity by randomly picking nodes from a bigger list, now accessing SSL SmartNodes.',
    status: 'completed',
    url: 'https://wallet.conceal.network',
  },
  {
    date: 'Q3 2024',
    title: 'Conceal Marketplace',
    description:
      'A great place to interact with other Concealers, Buy, Sell in a peer 2 peer way trading with your CCX!',
    status: 'completed',
    url: 'https://conceal.network/marketplace',
  },
  {
    date: 'Q4 2024',
    title: 'Web wallet improvements',
    description:
      'Now available in 14 languages. Access Deposits (view-only). Use qr code scanning feature to send messages. Get notified of new messages.',
    status: 'completed',
    url: 'https://wallet.conceal.network',
  },
  {
    date: 'Q2 2025',
    title: 'Web wallet deposits',
    description: 'Bringing deposits to client side web wallet',
    status: 'completed',
    url: 'https://wallet.conceal.network',
  },
  {
    date: 'Q4 2025',
    title: 'Conceal Labs',
    description:
      'Conceal Authenticator app is launched, your 2FA keys are now stored on the blockchain',
    status: 'completed',
    url: 'https://f-droid.org/en/packages/com.acktarius.concealauthenticator/',
  },
  {
    date: 'Q1 2026',
    title: 'Conceal Labs',
    description:
      'Conceal-Faucet-API is launched, "one stop shop" for developpers to create faucet or game rewards',
    status: 'completed',
    url: 'https://github.com/ConcealNetwork/conceal-faucet-api',
  },
  {
    date: '',
    title: 'Achieved Milestones',
    description: '',
    status: 'done',
  },
  {
    date: '',
    title: 'Future Milestones',
    description: '',
    status: 'activ',
  },
  {
    date: '',
    title: 'Conceal Lab project',
    description: 'a one of a kind permissionless and decentralized app',
    status: 'inprog',
  },
  {
    date: '',
    title: 'Web wallet 3.0',
    description: 'Enhancing user experience with new rendering technologies',
    status: 'inprog',
  },
  {
    date: '',
    title: 'Atomic Swaps',
    description: 'Allowing you to exchange CCX with other blockchain tokens',
    status: 'inprog',
  },
];

const TEXT_SHADOW =
  '[text-shadow:0_-0.1em_0.1em_#000,0_0.1em_0.1em_#000,-0.25em_0_0.25em_#000,0.25em_0_0.25em_#000]';

function useTimelineScale(sectionRef: React.RefObject<HTMLElement | null>) {
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [itemScales, setItemScales] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const isSectionVisible = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;

      if (!isSectionVisible) {
        const resetScales = new Map<number, number>();
        for (const [index] of itemRefs.current) resetScales.set(index, 1.0);
        setItemScales(resetScales);
        return;
      }

      const newScales = new Map<number, number>();
      const centerY = window.innerHeight / 2;
      const maxDistance = 400;
      for (const [index, element] of itemRefs.current) {
        const rect = element.getBoundingClientRect();
        const distanceFromCenter = Math.abs(centerY - (rect.top + rect.height / 2));
        newScales.set(index, 1.0 + 0.22 * (1 - Math.min(1, distanceFromCenter / maxDistance)));
      }
      setItemScales(newScales);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionRef]);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(index, el);
    else itemRefs.current.delete(index);
  };

  return { itemScales, setItemRef };
}

interface TimelineItemCardProps {
  item: TimelineItem;
  index: number;
  scale: number;
  itemRef: (el: HTMLDivElement | null) => void;
}

type ItemStatus = TimelineItem['status'];

function getStatusClasses(status: ItemStatus): { accentColor: string; squareColor: string } {
  const isCompleted = status === 'completed';
  const isActive = status === 'inprog' || status === 'activ';
  return {
    accentColor: isCompleted ? 'text-white' : isActive ? 'text-[var(--color1)]' : '',
    squareColor: isCompleted ? 'bg-white' : isActive ? 'bg-[var(--color1)]' : '',
  };
}

function ItemDescription({ description, url }: { description?: string; url?: string }) {
  if (!description) return null;
  return (
    <span>
      {' '}
      —{' '}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit hover:text-[var(--color1)]"
          title={`Visit ${url}`}
        >
          {description}
        </a>
      ) : (
        description
      )}
    </span>
  );
}

function TimelineItemCard({ item, index, scale, itemRef }: TimelineItemCardProps) {
  const isEven = index % 2 === 1;
  const isDone = item.status === 'done';
  const isActiv = item.status === 'activ';
  const { accentColor, squareColor } = getStatusClasses(item.status);

  return (
    <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
      <div
        ref={itemRef}
        className={`single-timeline flex items-center mb-[22px] transition-transform duration-300 ease-out ${isEven ? 'flex-row-reverse' : ''}`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <div className="timeline-blank w-1/2"></div>
        <div
          className={`timeline-text w-1/2 ${isEven ? 'pr-[30px] text-right' : 'pl-[30px]'} relative`}
        >
          <div
            className={`t-square absolute top-[10px] ${isEven ? 'right-[-6px]' : 'left-[-6px]'} w-3 h-3 ${squareColor}`}
          ></div>
          <span
            className={`block text-[#a8a8a8] ${isEven ? 'text-right' : ''} ${isDone ? 'border-b-[5px] border-dashed border-white mb-[50px] pb-4' : ''} ${isActiv ? 'border-t-[5px] border-dashed border-[var(--color1)] pt-4 mt-4' : ''}`}
          >
            <h6
              className={`font-semibold ${item.date ? 'text-[1.5rem]' : 'text-[1.2rem]'} inline-block mb-2 ${accentColor} ${TEXT_SHADOW}`}
            >
              {item.date ? `${item.date}, ${item.title}` : item.title}
            </h6>
            <ItemDescription description={item.description} url={item.url} />
          </span>
        </div>
      </div>
    </AnimatedElement>
  );
}

function RoadmapHeader() {
  return (
    <div className="mb-16">
      <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
        <span className="block mb-3 text-[1.4rem] text-[rgba(255,255,255,0.7)] uppercase tracking-[0.2rem]">
          CONCEAL ROADMAP
        </span>
      </AnimatedElement>
      <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
        <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
          <span className="text-[var(--color1)] font-semibold">The Birth</span> of something{' '}
          <span className="text-[var(--color1)] font-semibold">Amazing.</span>
        </h1>
      </AnimatedElement>
    </div>
  );
}

interface RoadmapTimelineProps {
  itemScales: Map<number, number>;
  setItemRef: (index: number) => (el: HTMLDivElement | null) => void;
}

function RoadmapTimeline({ itemScales, setItemRef }: RoadmapTimelineProps) {
  return (
    <div className="timeline-area pt-10 pb-10">
      <div className="container max-w-[1140px] mx-auto px-4">
        <div className="timelines mb-10">
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h2 className="text-[3.2rem] text-[var(--color1)] font-semibold text-center mb-10">
              CONCEAL ROADMAP
            </h2>
          </AnimatedElement>
        </div>
        <div className="all-timelines relative">
          <div className="absolute left-1/2 top-5 bottom-0 w-[2px] bg-[#19383b] -translate-x-1/2"></div>
          {timelineItems.map((item, index) => (
            <TimelineItemCard
              key={`${item.date}-${item.title}`}
              item={item}
              index={index}
              scale={itemScales.get(index) ?? 1.0}
              itemRef={setItemRef(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { itemScales, setItemRef } = useTimelineScale(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative"
    >
      <div
        id="herobg"
        className="absolute top-0 left-0 w-full h-full bg-[url('/images/background_bw.jpg')] bg-center bg-cover bg-no-repeat"
        style={{ backgroundAttachment: 'fixed' }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
        <RoadmapHeader />
        <RoadmapTimeline itemScales={itemScales} setItemRef={setItemRef} />
      </div>
    </section>
  );
}
