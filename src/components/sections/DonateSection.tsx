import { useState } from 'react';
import { appConfig } from '@/config/app.config';
import { AnimatedElement } from '../ui/AnimatedElement';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

interface DonationAddress {
  id: string;
  name: string;
  icon: string;
  address: string;
  network?: string;
}

const donationAddresses: DonationAddress[] = [
  {
    id: 'fd31cb323dce46a6a313bc31adc4beb5',
    name: 'Conceal (CCX)',
    icon: '/icons/ccx.svg',
    address:
      'ccx7Mi9osGEiPkJ8Eq9ajfFFipavENjJ92Gf4xCmu4KXiExSjcWoSefCQYtcA2BUrTPjrMY5pssgMNPRxaR1DXtj3TvTJG6LRo',
  },
  {
    id: '4c1d510bda3b4ceaa8d67ffad8404a63',
    name: 'Bitcoin (BTC)',
    icon: '/icons/btc.svg',
    address: 'bc1qsms9qapuja6zdp7v6cysznj229nhlezg98f7lr',
  },
  {
    id: '85b860038c734fe29a5c778e20b5a1c9',
    name: 'Monero (XMR)',
    icon: '/icons/xmr.svg',
    address:
      '89Uw4SfFTTm1kcyP5ZhYwCgvMvvmLvM1nfWVxqVTpDqYMjHpwfK3ryaLNeTFk4kjScFoSip5T2TgdGAithV4GUo5Ga9FcRL',
  },
  {
    id: '93435cc42a4d4b93b4905b7033d628e8',
    name: 'Ethereum (ETH)',
    icon: '/icons/eth.svg',
    address: '0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815',
    network: 'Polygon',
  },
  {
    id: '3d3cde8ef09e401cb407a202908d0167',
    name: 'Tether (USDT)',
    icon: '/icons/usdt.svg',
    address: '0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815',
    network: 'Polygon',
  },
  {
    id: '5bc886b7adbf45b593c6a8c8f017fa61',
    name: 'USD (USDC)',
    icon: '/icons/usdc.svg',
    address: '0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815',
    network: 'Polygon',
  },
  {
    id: '27c4aa0415ab40e5978579bf7540bfbe',
    name: 'Dai (DAI)',
    icon: '/icons/dai.svg',
    address: '0x926e2b68a27426C2c26Ac7F98D40EB36939Bd815',
    network: 'Polygon',
  },
];

function DonationRow({ donation }: { donation: DonationAddress }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(donation.address);
      setCopied(true);
      setTimeout(() => setCopied(false), appConfig.animations.copyFeedbackTimeout);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-[3%_17%_9%_65%_3%] gap-3 items-center py-4 px-4 border-b border-[rgba(255,255,255,0.1)]">
        {/* Icon */}
        <div className="flex items-center justify-center w-12">
          <img src={donation.icon} alt={donation.name} className="w-12 h-12" />
        </div>

        {/* Name */}
        <div className="flex items-center">
          <span className="text-[var(--color1)] font-semibold text-[2.475rem] whitespace-nowrap">
            {donation.name}
          </span>
        </div>

        {/* Network */}
        <div className="flex items-center">
          {donation.network ? (
            <span className="text-[#757575] text-[2.475rem] whitespace-nowrap">
              {donation.network.toLowerCase()}
            </span>
          ) : null}
        </div>

        {/* Address */}
        <div className="flex items-center min-w-0">
          <input
            type="text"
            value={donation.address}
            readOnly
            className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.2)] rounded px-3 py-2 text-white text-[1.925rem]"
          />
        </div>

        {/* Copy Button */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-2 bg-[var(--color1)] text-black rounded hover:bg-[var(--color1)] transition-colors duration-200"
            title={copied ? 'Copied!' : 'Copy address'}
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden border border-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-4 bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-3 mb-3">
          <img src={donation.icon} alt={donation.name} className="w-10 h-10" />
          <div className="flex-1">
            <div className="text-[var(--color1)] font-semibold text-lg">{donation.name}</div>
            {donation.network && <div className="text-[#757575] text-sm">{donation.network}</div>}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={donation.address}
            readOnly
            className="flex-1 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.2)] rounded px-3 py-2 text-white text-sm"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 bg-[var(--color1)] text-black rounded hover:bg-[var(--color1)] transition-colors duration-200"
            title={copied ? 'Copied!' : 'Copy address'}
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
          </button>
        </div>
      </div>
    </>
  );
}

export function DonateSection() {
  return (
    <section id="donate" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
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
              <span>Marketing Fundraiser</span>
            </h1>
          </AnimatedElement>
          <div className="flex flex-wrap gap-4">
            <Button variant="slideToId" targetId="donate">
              <i className="fas fa-heart text-xl mr-2"></i>
              <span>Support us</span>
            </Button>
          </div>
        </div>

        {/* Donations Section Header */}
        <SectionHeading
          variant="withDescription"
          title="Donations"
          description="Conceal Network is a decentralized, privacy-preserving network that seeks to aid it's users in managing their finances and communications with ease. We believe privacy is a fundamental human right, and we are working towards expanding our Privacy-Preserving ecosystem and ensuring everyone can efficiently utilize it. Our overall vision is to give Freedom back to the People and to help them shield themselves from unauthorized monitoring."
        />

        <div className="h-[5rem]"></div>

        {/* Additional Description */}
        <div className="mb-12 space-y-4">
          <AnimatedElement types={['dragText']}>
            <p className="text-[1.7rem] text-[#757575]">
              You can make a donation to Conceal with your cryptocurrency of choice and send your
              desired amount to one of our receiving addresses below. Your contribution, no matter
              how big or small, has the power to increase the adoption and development of the
              Conceal Network. All of the donations we receive will support the project so that we
              can offer better services to our community, boost liquidity, hire more talented
              developers, increase our social-media presence and bolster other marketing efforts.
            </p>
          </AnimatedElement>
          <AnimatedElement types={['dragText']}>
            <p className="text-[1.7rem] text-[#757575]">
              Make a contribution today and help us on the road to a better and brighter future for
              all Concealers.
            </p>
          </AnimatedElement>
          <AnimatedElement types={['dragText']}>
            <p className="text-[1.7rem] text-[#757575]">
              We thank you for your generosity and support!
            </p>
          </AnimatedElement>
        </div>

        {/* Donation Addresses Section */}
        <div className="mt-16">
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h2 className="text-3xl uppercase text-[var(--color1)] text-center mb-4">
              Please use one of the following addresses
            </h2>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h4 className="text-xl uppercase text-[var(--color1)] text-center mb-8">
              (Donations are not refundable)
            </h4>
          </AnimatedElement>

          <div className="bg-[#194652] rounded-lg overflow-hidden">
            <div className="w-full">
              {donationAddresses.map((donation) => (
                <DonationRow key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
