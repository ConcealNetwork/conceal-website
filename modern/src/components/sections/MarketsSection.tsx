import { SectionHeading } from '@/components/ui/SectionHeading';

export function MarketsSection() {
  return (
    <>
      <section id="markets" className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]" style={{ background: 'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading subtitle="Buying CCX" title="Markets" />
          <ul className="flex flex-wrap justify-center gap-4 list-none">
            <li>
              <a
                href="https://nonkyc.io/market/CCX_BTC"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                Buy on nonKYC with BTC
              </a>
            </li>
            <li>
              <a
                href="https://nonkyc.io/market/CCX_USDT"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                Buy on nonKYC with USDT
              </a>
            </li>
            <li>
              <a
                href="https://www.sevenseas.exchange/market/CCX-USDT"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                Buy on Seven Seas with USDT
              </a>
            </li>
          </ul>
        </div>
      </section>

              <section id="buyingwCCXPOLYGON" className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]" style={{ background: 'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)' }}>
                <div className="max-w-6xl mx-auto text-center">
                  <SectionHeading subtitle="Buying wCCX" title="Polygon" />
          <ul className="flex flex-wrap justify-center gap-4 list-none">
            <li>
              <a
                href="https://app.sushi.com/"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                SushiSwap
              </a>
            </li>
            <li>
              <a
                href="https://app.uniswap.org/"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                Uniswap
              </a>
            </li>
          </ul>
        </div>
      </section>

              <section id="buyingwCCXBNB" className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]" style={{ background: 'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)' }}>
                <div className="max-w-6xl mx-auto text-center">
                  <SectionHeading subtitle="Buying wCCX" title="Binance Smart Chain" />
          <ul className="flex flex-wrap justify-center gap-4 list-none mb-4">
            <li>
              <a
                href="https://1inch.exchange/#/wCCX/BNB"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                1Inch
              </a>
            </li>
            <li>
              <a
                href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                Pancakeswap
              </a>
            </li>
            <li>
              <a
                href="https://www.bakeryswap.org/#/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x988c11625472340b7b36ff1534893780e0d8d841"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                Bakeryswap
              </a>
            </li>
          </ul>
          <a
            href="https://conceal.network/community/#exchanges"
            className="text-[orange] hover:text-[#fafafa] transition-colors inline-flex items-center gap-2"
          >
            <i className="fa fa-plus"></i>
            <span>More</span>
          </a>
        </div>
      </section>

              <section id="buyingwCCXETH" className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]" style={{ background: 'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)' }}>
                <div className="max-w-6xl mx-auto text-center">
                  <SectionHeading subtitle="Buying wCCX" title="Ethereum" />
          <ul className="flex flex-wrap justify-center gap-4 list-none mb-4">
            <li>
              <a
                href="https://1inch.exchange/#/r/0x9be82c0E5B75C53F32E63b40442E9dA8cCA06f21/ETH/wCCX"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                1Inch
              </a>
            </li>
            <li>
              <a
                href="https://app.uniswap.org/#/swap?outputCurrency=0x21686f8ce003a95c99acd297e302faacf742f7d4"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                Uniswap
              </a>
            </li>
          </ul>
          <a
            href="https://conceal.network/community/#exchanges"
            className="text-[orange] hover:text-[#fafafa] transition-colors inline-flex items-center gap-2"
          >
            <i className="fa fa-plus"></i>
            <span>More</span>
          </a>
        </div>
      </section>
    </>
  );
}

