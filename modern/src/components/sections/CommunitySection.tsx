import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedElement } from '../ui/AnimatedElement';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface LinkItem {
  label: string;
  url: string;
  icon?: string;
  svgIcon?: ReactNode;
}

interface ColumnData {
  title: string;
  items: LinkItem[];
  subSections?: {
    title: string;
    items: LinkItem[];
  }[];
}

const socialLinksData: ColumnData = {
  title: 'Official',
  items: [
    { label: 'Github', url: 'https://github.com/ConcealNetwork', icon: 'fab fa-github' },
    { label: 'Discord', url: 'https://discord.gg/YbpHVSd', icon: 'fab fa-discord' },
    { label: 'Telegram', url: 'https://t.me/concealnetwork', icon: 'fab fa-telegram' },
    { label: 'Twitter', url: 'https://twitter.com/ConcealNetwork', icon: 'fab fa-twitter' },
    { label: 'Youtube', url: 'https://www.youtube.com/channel/UC_YtRUcy0FR0yIc3H6DDxuw', icon: 'fab fa-youtube' },
    { label: 'Facebook', url: 'https://www.facebook.com/concealnetwork', icon: 'fab fa-facebook' },
    { label: 'Medium', url: 'https://medium.com/@ConcealNetwork', icon: 'fab fa-medium' },
    {
      label: 'Substack',
      url: 'https://substack.com/@concealnetwork',
      icon: '',
      svgIcon: (
        <svg
          role="img"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          strokeWidth="1.8"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M1.96484 0.624512H18.0354V2.70052H1.96484V0.624512Z" stroke="none" />
            <path d="M1.96484 4.77655H18.0354V6.85254H1.96484V4.77655Z" stroke="none" />
            <path
              d="M1.96484 8.92857V19.9505L10.0001 14.6347L18.0354 19.9505V8.92857H1.96484V8.92857Z"
              stroke="none"
            />
          </g>
        </svg>
      ),
    },
    { label: 'BitcoinTalk', url: 'https://bitcointalk.org/index.php?topic=4515873', icon: 'fab fa-bitcoin' },
    { label: 'Conceal MarketPlace', url: 'https://conceal.network/marketplace', icon: 'fas fa-shopping-cart' },
  ],
};

const otherGroupsData: ColumnData = {
  title: 'Other Groups',
  items: [],
  subSections: [
    {
      title: 'Telegram',
      items: [
        { label: 'English', url: 'https://t.me/concealnetworkusers', icon: 'fab fa-telegram' },
        { label: 'Türkiye', url: 'https://t.me/concealnetworkturkiye', icon: 'fab fa-telegram' },
        { label: 'Россия', url: 'https://t.me/concealnetworkrussia', icon: 'fab fa-telegram' },
        { label: 'Dutch', url: 'https://t.me/concealnetworkdutch', icon: 'fab fa-telegram' },
        { label: 'Français', url: 'https://t.me/concealnetworkfrench', icon: 'fab fa-telegram' },
        { label: 'Việtnam', url: 'https://t.me/concealnetworkvietnam', icon: 'fab fa-telegram' },
        { label: 'Iran', url: 'https://t.me/Conceal_Persian', icon: 'fab fa-telegram' },
        { label: 'Bangladesh', url: 'https://t.me/Conceal_Bangladesh', icon: 'fab fa-telegram' },
        { label: 'India', url: 'https://t.me/Conceal_India', icon: 'fab fa-telegram' },
      ],
    },
    {
      title: 'Twitter',
      items: [
        { label: 'Africa', url: 'https://twitter.com/ConcealAfrica', icon: 'fab fa-twitter' },
        { label: 'Español', url: 'https://twitter.com/ConcealSpanish', icon: 'fab fa-twitter' },
        { label: 'Arabia', url: 'https://twitter.com/ConcealArabia', icon: 'fab fa-twitter' },
        { label: 'Türkiye', url: 'https://twitter.com/concealturkiye', icon: 'fab fa-twitter' },
      ],
    },
  ],
};

const exchangesData: ColumnData = {
  title: 'Exchanges',
  items: [
    { label: 'nonKYC CCX/BTC', url: 'https://nonkyc.io/market/CCX_BTC' },
    { label: 'nonKYC CCX/USDT', url: 'https://nonkyc.io/market/CCX_USDT' },
  ],
};

const marketCapData: ColumnData = {
  title: 'Market Cap',
  items: [
    { label: 'CoinMarketCap', url: 'https://coinmarketcap.com/currencies/conceal' },
    { label: 'CoinGecko', url: 'https://www.coingecko.com/en/coins/conceal' },
    { label: 'Crypto.com', url: 'https://crypto.com/price/conceal' },
  ],
};

const polygonData: ColumnData = {
  title: 'Polygon',
  items: [
    { label: 'SushiSwap - wCCX/USDC', url: 'https://app.sushi.com/swap?tokens=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&tokens=0x137Ee749f0F8c2eD34cA00dE33BB59E3dafA494A&chainId=137' },
    { label: 'SushiSwap - wCCX/USDT', url: 'https://app.sushi.com/swap?tokens=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&tokens=0x137Ee749f0F8c2eD34cA00dE33BB59E3dafA494A&chainId=137' },
    { label: 'Uniswap - wCCX/DAI', url: 'https://app.uniswap.org/#/swap?inputCurrency=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063&outputCurrency=0x137ee749f0f8c2ed34ca00de33bb59e3dafa494a&chain=polygon' },
    { label: 'Uniswap - wCCX/USDC', url: 'https://app.uniswap.org/#/swap?inputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&outputCurrency=0x137ee749f0f8c2ed34ca00de33bb59e3dafa494a&chain=polygon' },
    { label: 'Uniswap - wCCX/USDT', url: 'https://app.uniswap.org/#/swap?inputCurrency=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&outputCurrency=0x137ee749f0f8c2ed34ca00de33bb59e3dafa494a&chain=polygon' },
  ],
};

const bscData: ColumnData = {
  title: 'Binance Smart Chain',
  items: [
    { label: 'PancakeSwap - wCCX/BUSD', url: 'https://pancakeswap.finance/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841' },
    { label: 'PancakeSwap - wCCX/USDT', url: 'https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841' },
  ],
};

const ethereumData: ColumnData = {
  title: 'Ethereum',
  items: [
    { label: 'Uniswap - wCCX/DAI', url: 'https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0x21686f8ce003a95c99acd297e302faacf742f7d4&chain=mainnet' },
  ],
};

function Column({ data }: { data: ColumnData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col">
      <h2
        className="text-4xl uppercase text-white mb-6 cursor-pointer transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.title}
      </h2>
      <ul className="flex flex-col list-none p-0 space-y-2">
        {data.items.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 transition-colors duration-300 ${
                isHovered ? 'text-[orange]' : 'text-white'
              } hover:underline`}
            >
              {item.svgIcon ? (
                <span className="flex items-center justify-center">{item.svgIcon}</span>
              ) : (
                item.icon && <i className={`${item.icon} text-lg`}></i>
              )}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      {data.subSections?.map((subSection, subIndex) => (
        <div key={subIndex} className="mt-6">
          <h4 className="text-xl text-white mb-4 transition-colors duration-300">
            {subSection.title}
          </h4>
          <ul className="flex flex-col list-none p-0 space-y-2">
            {subSection.items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isHovered ? 'text-[orange]' : 'text-white'
                  } hover:underline`}
                >
                  {item.svgIcon ? (
                    <span className="flex items-center justify-center">{item.svgIcon}</span>
                  ) : (
                    item.icon && <i className={`${item.icon} text-lg`}></i>
                  )}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function CommunitySection() {
  const [activeTab, setActiveTab] = useState<'socials' | 'exchanges' | 'dex'>('socials');

  return (
    <section
      id="community"
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
              CONCEAL COMMUNITY
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              <span>Improving the World</span> <strong className="text-[orange]">Together</strong>
            </h1>
          </AnimatedElement>
        </div>

        {/* Community Section Header */}
        <SectionHeading
          variant="withDescription"
          title="Community"
          description="Conceal has a huge thriving community of awesome people that are sharing ideas, working together and helping each other regardless of where they are in their Blockchain journey. What are you waiting for?"
        />

        <div className="h-[5rem]"></div>

        {/* Community Image with rotateY animation */}
        <div className="mb-16 flex justify-center">
          <AnimatedElement types={['rotateInY']} speed="slow" triggerImmediately={true}>
            <img
              src="/images/community.png"
              alt="Conceal Community"
              className="max-w-full h-auto"
            />
          </AnimatedElement>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex justify-center gap-4 border-b border-[#222] pb-4">
            <button
              onClick={() => setActiveTab('socials')}
              className={`text-8xl font-light transition-colors duration-300 ${
                activeTab === 'socials' ? 'text-[orange]' : 'text-white hover:text-[orange]'
              }`}
            >
              Social links
            </button>
            <span className="text-white text-8xl">|</span>
            <button
              onClick={() => setActiveTab('exchanges')}
              className={`text-8xl font-light transition-colors duration-300 ${
                activeTab === 'exchanges' ? 'text-[orange]' : 'text-white hover:text-[orange]'
              }`}
            >
              Exchanges
            </button>
            <span className="text-white text-8xl">|</span>
            <button
              onClick={() => setActiveTab('dex')}
              className={`text-8xl font-light transition-colors duration-300 ${
                activeTab === 'dex' ? 'text-[orange]' : 'text-white hover:text-[orange]'
              }`}
            >
              DEX
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-16">
          {activeTab === 'socials' && (
            <div className="grid grid-cols-[10%_26.6%_26.6%_26.6%_10%] gap-8">
              <div></div>
              {/* Column 1: Official */}
              <Column data={socialLinksData} />
              
              {/* Column 2: Other Groups - Telegram */}
              <div className="flex flex-col">
                <h2 className="text-4xl uppercase text-white mb-6">Other Groups</h2>
                <h4 className="text-xl text-white mb-4">Telegram</h4>
                <ul className="flex flex-col list-none p-0 space-y-2">
                  {otherGroupsData.subSections?.[0].items.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-colors duration-300 text-white hover:text-[orange] hover:underline"
                      >
                        {item.svgIcon ? (
                          <span className="flex items-center justify-center">{item.svgIcon}</span>
                        ) : (
                          item.icon && <i className={`${item.icon} text-lg`}></i>
                        )}
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Column 3: Other Groups - Twitter */}
              <div className="flex flex-col">
                <h2 className="text-4xl uppercase text-white mb-6 opacity-0">Other Groups</h2>
                <h4 className="text-xl text-white mb-4">Twitter</h4>
                <ul className="flex flex-col list-none p-0 space-y-2">
                  {otherGroupsData.subSections?.[1].items.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-colors duration-300 text-white hover:text-[orange] hover:underline"
                      >
                        {item.svgIcon ? (
                          <span className="flex items-center justify-center">{item.svgIcon}</span>
                        ) : (
                          item.icon && <i className={`${item.icon} text-lg`}></i>
                        )}
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div></div>
            </div>
          )}

          {activeTab === 'exchanges' && (
            <div className="grid grid-cols-[10%_40%_40%_10%] gap-8">
              <div></div>
              <Column data={exchangesData} />
              <Column data={marketCapData} />
              <div></div>
            </div>
          )}

          {activeTab === 'dex' && (
            <div className="grid grid-cols-[10%_26.6%_26.6%_26.6%_10%] gap-8">
              <div></div>
              <Column data={polygonData} />
              <Column data={bscData} />
              <Column data={ethereumData} />
              <div></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

