import { useState } from 'react';
import { AnimatedElement } from '../ui/AnimatedElement';
import { SectionHeading } from '../ui/SectionHeading';
import { YouTubeCarousel } from '../ui/YouTubeCarousel';

interface MediaItem {
  title: string;
  url: string;
  image: string;
}

interface MediaTab {
  id: string;
  label: string;
  heading: string;
  description: string;
  items?: MediaItem[]; // Optional - mining tab uses miningVideos instead
  miningVideos?: string[]; // For mining tab - YouTube embed URLs
}

const featuredVideos = [
  'https://www.youtube-nocookie.com/embed/2jBL4uzrimk',
  'https://www.youtube-nocookie.com/embed/wfUkUJuXn5s',
  'https://www.youtube.com/embed/oY5ZzJFoe4E',
];

const mediaTabs: MediaTab[] = [
  {
    id: 'ama',
    label: 'AMA Series',
    heading: 'AMA Series',
    description:
      "Despite our focus on privacy Conceal is not going unnoticed in the media. We've received attention from an ever-growing number of major publications and notable influencers.",
    items: [
      {
        title: 'The Daily Chain - Conceal Me If You Can: A CCX Interview',
        url: 'https://ggmesh.medium.com/conceal-me-if-you-can-a-ccx-interview-c9432ad01a3a',
        image: '/images/media/media_ama_04.jpg',
      },
      {
        title: 'Exclusive interview: Conceal',
        url: 'https://crypto-lowcap.com/exclusive-interview-conceal/',
        image: '/images/media/media_ama_05.jpg',
      },
      {
        title: 'Conceal Network and The Wolfonaire AMA Recap',
        url: 'https://concealnetwork.medium.com/conceal-network-and-the-wolfonaire-ama-recap-november-11th-2021-b411ab04ece9',
        image: '/images/media/media_ama_06.jpeg',
      },
      {
        title: "Binance: An Altcoin Trader's Handbook",
        url: 'https://www.altcointradershandbook.com/coin-report-conceal-network/',
        image: '/images/media/media_ama_02.jpg',
      },
    ],
  },
  {
    id: 'articles',
    label: 'Articles',
    heading: 'Articles',
    description:
      'We are constantly improving our ecoystem. You can read about our jurney and what is being done in the series of articles bellow.',
    items: [
      {
        title: 'Web Wallet re-Release',
        url: 'https://concealnetwork.substack.com/p/conceal-network-web-wallet-release',
        image: '/images/media/media_articles_00.jpg',
      },
      {
        title: 'Medium Article - Bitcoin is finished… so what next?',
        url: 'https://medium.com/@lithy_/bitcoin-is-finished-so-what-next-1501baeb146b',
        image: '/images/media/media_articles_01.png',
      },
      {
        title: 'Is privacy a right?',
        url: 'https://medium.com/@ConcealNetwork/is-privacy-a-right-74188b373425',
        image: '/images/media/media_articles_02.png',
      },
      {
        title: 'What is Conceal $CCX?',
        url: 'https://medium.com/@ConcealNetwork/what-is-conceal-28c8468b038d',
        image: '/images/media/media_articles_03.png',
      },
      {
        title: 'The Anatomy of Wrapped CCX',
        url: 'https://concealnetwork.medium.com/the-anatomy-of-wrapped-ccx-97b2a8c008d9',
        image: '/images/media/media_articles_08.png',
      },
      {
        title: 'CONCEAL BRIDGE — USER GUIDE',
        url: 'https://concealnetwork.medium.com/conceal-bridge-user-guide-2ad03eee4963',
        image: '/images/media/media_articles_09.png',
      },
      {
        title: 'Welcome to the Conceal Ambassador Program',
        url: 'https://concealnetwork.medium.com/welcome-to-the-conceal-ambassador-program-237bc5e52b2f',
        image: '/images/media/media_articles_10.jpeg',
      },
      {
        title: 'Conceal ID: Overview',
        url: 'https://medium.com/@ConcealNetwork/conceal-id-2e13884ba03a',
        image: '/images/media/media_articles_04.png',
      },
      {
        title: 'HASHR8 Privacy Coin Reviews: CONCEAL',
        url: 'https://medium.com/hashr8/hashr8-privacy-coin-reviews-conceal-cfaf3b4c8b3c',
        image: '/images/media/media_articles_05.png',
      },
      {
        title: 'Medium Article - Messages on Cloud and Mobile',
        url: 'https://medium.com/@ConcealNetwork/messages-on-cloud-and-mobile-f73c65e9284a',
        image: '/images/media/media_articles_07.png',
      },
      {
        title: 'Nic Patel - Coin Report #39: Conceal Network',
        url: 'https://www.altcointradershandbook.com/coin-report-conceal-network/',
        image: '/images/media/media_articles_06.png',
      },
      {
        title: 'Newsbit - Conceal.Network: Privacy-Preserving De-Fi',
        url: 'https://newsbit.nl/conceal-network-privacy-protected-defi/',
        image: '/images/media/media_articles_11.png',
      },
      {
        title: 'Conceal Network (₡CCX)',
        url: 'https://medium.com/@Mr_Kwibs/conceal-network-ccx-7288b2564622',
        image: '/images/media/media_articles_12.jpg',
      },
      {
        title: 'Conceal (CCX) — The Next Big PoW Mining Opportunity',
        url: 'https://concealnetwork.medium.com/conceal-ccx-the-next-big-pow-mining-opportunity-dff8e8b0adf1',
        image: '/images/media/media_articles_13.jpeg',
      },
    ],
  },
  {
    id: 'videos',
    label: 'Videos',
    heading: 'Videos',
    description:
      'Conceal sparked a lot of videos about it. We tried to gather them in one place for you, so its easily to access information.',
    items: [
      {
        title: 'Your Friend Andy - Everything you need to know about Conceal Crypto (CCX)!',
        url: 'https://www.youtube.com/watch?v=TfykuINNsCI',
        image: '/images/media/media_video_10.jpg',
      },
      {
        title: 'VoskCoin - Mineable Cryptocurrency integrates Decentralized Finance!',
        url: 'https://www.youtube.com/watch?v=oY5ZzJFoe4E',
        image: '/images/media/media_video_00.jpg',
      },
      {
        title: 'SavageMine - Conceal LIVE - P2P, E2E Encrypted Messaging',
        url: 'https://www.youtube.com/watch?v=iFRMyPSjWt8',
        image: '/images/media/media_video_01.jpg',
      },
      {
        title: 'Turan Khan - How to transfer Money in the middle of Ocean just in 2 seconds',
        url: 'https://www.youtube.com/watch?v=Wp2QO8b4LmI',
        image: '/images/media/media_video_02.jpg',
      },
      {
        title: 'SavageMine - Conceal (CCX) Core Team Chat',
        url: 'https://www.youtube.com/watch?v=zE7h95nBOl8',
        image: '/images/media/media_video_03.jpg',
      },
      {
        title: 'SavageMine - Cold-Staking! EARN Interest On Your Crypto!',
        url: 'https://youtu.be/eOto88-wZB0?list=PLMdO3H8swpD0UKP40WHxBnlgcG1ViKrvN',
        image: '/images/media/media_video_04.jpg',
      },
      {
        title: 'SavageMine - Blockchain Bank Pays INTEREST!',
        url: 'https://youtu.be/YXJ8EbTUXfw?list=PLMdO3H8swpD0UKP40WHxBnlgcG1ViKrvN',
        image: '/images/media/media_video_05.jpg',
      },
      {
        title: 'SavageMine - Monthly Mining PROFITS!',
        url: 'https://youtu.be/O8LvMqDiCbY?list=PLMdO3H8swpD0UKP40WHxBnlgcG1ViKrvN',
        image: '/images/media/media_video_06.jpg',
      },
      {
        title: 'SavageMine - Keep Your Wallet UPDATED!',
        url: 'https://youtu.be/20R_uUlM9QY?list=PLMdO3H8swpD0UKP40WHxBnlgcG1ViKrvN',
        image: '/images/media/media_video_07.jpg',
      },
      {
        title: 'SavageMine - Care About Your PRIVACY? CONCEAL Does!',
        url: 'https://youtu.be/2-UUg0ueGtg?list=PLMdO3H8swpD0UKP40WHxBnlgcG1ViKrvN',
        image: '/images/media/media_video_08.jpg',
      },
      {
        title: 'Crypto Sewer - How To Make A Conceal.Network (CCX) Wallet',
        url: 'https://youtu.be/uZaCz_8EXOw',
        image: '/images/media/media_video_09.jpg',
      },
    ],
  },
  {
    id: 'mining',
    label: 'Mining',
    heading: 'Mining',
    description:
      'Conceal is 100% PoW crypto currency. Learn how to mine it and what are best practices to do so.',
    miningVideos: [
      'https://www.youtube-nocookie.com/embed/niTcmIz_sf0',
      'https://www.youtube-nocookie.com/embed/2jBL4uzrimk',
      'https://www.youtube-nocookie.com/embed/Ze2ioyBHPIw',
      'https://www.youtube.com/embed/seiPQBFIsE0',
    ],
  },
  {
    id: 'updates',
    label: 'Monthly Updates',
    heading: 'Monthly updates',
    description:
      'We are always working to improve our ecoystem. You can read all monthly updates, where we gather all the milestones and changes we made so far.',
    items: [
      {
        title: 'This month in Conceal (July 2022)',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-july-2022-b7a170e384ce',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (June 2022)',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-june-2022-2612b35878f0',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (May 2022)',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-may-2022-c5300b7aaab9',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (April 2022)',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-april-2022-bb258761733d',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (March 2022)',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-march-2022-1c1bd56a10c3',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (February 2022)',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-february-2022-827d88b41327',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (January 2022)',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-january-2022-cf35adcf5d39',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: '2021 Conceal Network Recap',
        url: 'https://concealnetwork.medium.com/conceal-network-monthly-update-2021-recap-65e533ada2b9',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (August 2020)',
        url: 'https://concealnetwork.medium.com/this-month-in-conceal-august-2020-193e78bfdbaa',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (July 2020)',
        url: 'https://concealnetwork.medium.com/this-month-in-conceal-july-2020-16dcffe18392',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (June 2020)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-june-2020-a97a0c41aa54',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (May 2020) - 2nd Year Anniversary Edition',
        url: 'https://medium.com/@ConcealNetwork/celebrating-the-2nd-year-anniversary-of-conceal-network-54ea66f539bd',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (April 2020)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-april-2020-854580aad82b',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (March 2020)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-march-2020-f824446e47d8',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (November 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-november-2019-132330c0da59',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (September 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-september-2019-a57e2c9bad5b',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (August 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-august-2019-30eba56c38e6',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (July 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-july-2019-aa5bb975b765',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (June 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-june-2019-ef8fc731340d',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: '1st Year Anniversary Edition (May 2019)',
        url: 'https://medium.com/@ConcealNetwork/celebrating-the-one-year-anniversary-of-conceal-network-5cda072f2a33',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (April 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-april-2019-af11e8bc8ab7',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (March 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-march-2019-8dfa65775a99',
        image: '/images/media/media_devupdate_01.jpg',
      },
      {
        title: 'This month in Conceal (February 2019)',
        url: 'https://medium.com/@ConcealNetwork/this-month-in-conceal-february-2019-4bc80b2fdf86',
        image: '/images/media/media_devupdate_01.jpg',
      },
    ],
  },
];

function MediaThumbnail({ item }: { item: MediaItem }) {
  return (
    <div className="thumbex group">
      <div className="thumbnail">
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <img src={item.image} alt={item.title} />
          <span>{item.title}</span>
        </a>
      </div>
    </div>
  );
}

function MediaTabContent({ tab }: { tab: MediaTab }) {
  return (
    <div id={`media_${tab.id}`} className="tab-pane">
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <SectionHeading title={tab.heading} />
            </AnimatedElement>
          </div>
          <div className="lg:col-span-2">
            <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
              <p className="text-[1.7rem] text-[#757575]">{tab.description}</p>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* Mining videos grid */}
      {tab.miningVideos && (
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tab.miningVideos.map((videoUrl) => (
            <AnimatedElement key={videoUrl} types={['fadeIn']} triggerImmediately={false}>
              <div
                className="w-full max-w-[800px] min-w-[300px] flex-1"
                style={{ margin: '1em 0.5em' }}
              >
                <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={videoUrl}
                    className="absolute top-0 left-0 w-full h-full border-4 border-black"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Mining video"
                  ></iframe>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      )}

      {/* Media items grid */}
      {tab.items && (
        <div className="flex flex-wrap justify-center gap-4">
          {tab.items.map((item) => (
            <AnimatedElement key={item.url} types={['fadeIn']} triggerImmediately={false}>
              <MediaThumbnail item={item} />
            </AnimatedElement>
          ))}
        </div>
      )}
    </div>
  );
}

export function InTheMediaSection() {
  const [activeTab, setActiveTab] = useState('ama');

  return (
    <section
      id="in-the-media"
      className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative"
    >
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
              CONCEAL IN THE MEDIA
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              <span>Going</span> <span className="text-[orange] font-semibold">Noticed</span>,
              <br />
              Not Concealed
            </h1>
          </AnimatedElement>

          {/* Featured Videos Carousel */}
          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="mt-8">
              <h2 className="text-2xl text-[orange] text-center mb-6">
                <span className="font-semibold">Featured:</span>
              </h2>
              <div className="flex justify-center">
                <YouTubeCarousel videos={featuredVideos} className="mx-auto" />
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Tab Navigation */}
        <div className="mb-16">
          <nav className="flex flex-wrap justify-center gap-4 bg-[#222] bg-gradient-to-b from-[#222] to-transparent border-b border-[#222] shadow-[0_0_32px_#222] py-5 px-5">
            {mediaTabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[1.8rem] font-light px-4 py-2 transition-colors duration-200 ${
                  activeTab === tab.id ? 'text-[orange]' : 'text-white hover:text-[orange]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {mediaTabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
              <MediaTabContent tab={tab} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
