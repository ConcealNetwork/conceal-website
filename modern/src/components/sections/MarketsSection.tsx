import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export function MarketsSection() {
  return (
    <>
      <section
        id="markets"
        className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading subtitle={<span data-tkey="rBuyCCX">Buy CCX</span>} title="Markets" />
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="download" asChild href="https://nonkyc.io/market/CCX_BTC" target="_blank" rel="noopener noreferrer">
              nonKYC BTC/CCX
            </Button>
            <Button variant="download" asChild href="https://nonkyc.io/market/CCX_USDT" target="_blank" rel="noopener noreferrer">
              nonKYC USDT/CCX
            </Button>
            <Button variant="download" asChild href="https://www.sevenseas.exchange/market/CCX-USDT" target="_blank" rel="noopener noreferrer">
              Seven Seas USDT/CCX
            </Button>
          </div>
        </div>
      </section>

      <section
        id="buyingwCCXPOLYGON"
        className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading subtitle={<span data-tkey="rBuywCCX">Buy wCCX</span>} title="Polygon" />
          <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        </div>
      </section>

      <section
        id="buyingwCCXBNB"
        className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading
            subtitle={<span data-tkey="rBuywCCX">Buy wCCX</span>}
            title="Binance Smart Chain"
          />
          <div className="flex flex-wrap justify-center gap-4 mb-4">
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
          </div>
          <a
            href="https://conceal.network/community/#exchanges"
            className="text-[orange] hover:text-[#fafafa] transition-colors inline-flex items-center gap-2"
          >
            <i className="fa fa-plus"></i>
            <span data-tkey="rMore">More</span>
          </a>
        </div>
      </section>

      <section
        id="buyingwCCXETH"
        className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading subtitle={<span data-tkey="rBuywCCX">Buy wCCX</span>} title="Ethereum" />
          <div className="flex flex-wrap justify-center gap-4 mb-4">
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
          </div>
          <a
            href="https://conceal.network/community/#exchanges"
            className="text-[orange] hover:text-[#fafafa] transition-colors inline-flex items-center gap-2"
          >
            <i className="fa fa-plus"></i>
            <span data-tkey="rMore">More</span>
          </a>
        </div>
      </section>
    </>
  );
}
