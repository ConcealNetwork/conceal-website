import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

const exchanges = [
  { label: 'nonKYC BTC/CCX', href: 'https://nonkyc.io/market/CCX_BTC' },
  { label: 'nonKYC USDT/CCX', href: 'https://nonkyc.io/market/CCX_USDT' },
  { label: 'Nonlogs USDT/CCX', href: 'https://nonlogs.io/trade/CCX-USDT' },
];

const SECTION_CLASS =
  'py-16 px-4 bg-[var(--color-bg-primary)] border-b border-[rgba(255,255,255,0.2)]';
const SECTION_STYLE = {
  background:
    'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
};
const MORE_LINK = 'https://conceal.network/community/#exchanges';
const LINK_CLASS =
  'text-[var(--color1)] hover:text-[#fafafa] transition-colors inline-flex items-center gap-2';

function MarketSection({
  id,
  subtitle,
  title,
  children,
  showMore = false,
}: Readonly<{
  id: string;
  subtitle: React.ReactNode;
  title: string;
  children: React.ReactNode;
  showMore?: boolean;
}>) {
  return (
    <section id={id} className={SECTION_CLASS} style={SECTION_STYLE}>
      <div className="max-w-6xl mx-auto text-center">
        <SectionHeading subtitle={subtitle} title={title} />
        <div className="flex flex-wrap justify-center gap-4 mb-4">{children}</div>
        {showMore && (
          <a href={MORE_LINK} className={LINK_CLASS}>
            <i className="fa fa-plus"></i>
            <span data-tkey="rMore">More</span>
          </a>
        )}
      </div>
    </section>
  );
}

function ExchangeButton({ href, label }: Readonly<{ href: string; label: string }>) {
  return (
    <Button variant="download" asChild href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </Button>
  );
}

export function MarketsSection() {
  return (
    <>
      <MarketSection
        id="markets"
        subtitle={<span data-tkey="rBuyCCX">Buy CCX</span>}
        title="Markets"
      >
        {exchanges.map((e) => (
          <ExchangeButton key={e.href} href={e.href} label={e.label} />
        ))}
      </MarketSection>

      <MarketSection
        id="buyingwCCXPOLYGON"
        subtitle={<span data-tkey="rBuywCCX">Buy wCCX</span>}
        title="Polygon"
      >
        <Button variant="download" asChild>
          <a href="https://app.sushi.com/" target="_blank" rel="noopener noreferrer">
            SushiSwap
          </a>
        </Button>
        <Button variant="download" asChild>
          <a href="https://app.uniswap.org/" target="_blank" rel="noopener noreferrer">
            Uniswap
          </a>
        </Button>
      </MarketSection>

      <MarketSection
        id="buyingwCCXBNB"
        subtitle={<span data-tkey="rBuywCCX">Buy wCCX</span>}
        title="Binance Smart Chain"
        showMore
      >
        <Button variant="download" asChild>
          <a href="https://1inch.exchange/#/wCCX/BNB" target="_blank" rel="noopener noreferrer">
            1Inch
          </a>
        </Button>
        <Button variant="download" asChild>
          <a
            href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pancakeswap
          </a>
        </Button>
        <Button variant="download" asChild>
          <a
            href="https://www.bakeryswap.org/#/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bakeryswap
          </a>
        </Button>
        <Button variant="download" asChild>
          <a
            href="https://www.mexc.com/dex/trade?pair_ca=0x523d5d8ae2f38dd2d8900eb195c132ff19bf6d18&chain_id=56&token_ca=0x988c11625472340b7b36ff1534893780e0d8d841"
            target="_blank"
            rel="noopener noreferrer"
          >
            MEXC DEX
          </a>
        </Button>
        <Button variant="download" asChild>
          <a
            href="https://kyberswap.com/swap/bnb/-to-0x988c11625472340b7b36ff1534893780e0d8d841"
            target="_blank"
            rel="noopener noreferrer"
          >
            KyberSwap
          </a>
        </Button>
      </MarketSection>

      <MarketSection
        id="buyingwCCXETH"
        subtitle={<span data-tkey="rBuywCCX">Buy wCCX</span>}
        title="Ethereum"
        showMore
      >
        <Button variant="download" asChild>
          <a
            href="https://1inch.exchange/#/r/0x9be82c0E5B75C53F32E63b40442E9dA8cCA06f21/ETH/wCCX"
            target="_blank"
            rel="noopener noreferrer"
          >
            1Inch
          </a>
        </Button>
        <Button variant="download" asChild>
          <a
            href="https://app.uniswap.org/#/swap?outputCurrency=0x21686f8ce003a95c99acd297e302faacf742f7d4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Uniswap
          </a>
        </Button>
      </MarketSection>
    </>
  );
}
