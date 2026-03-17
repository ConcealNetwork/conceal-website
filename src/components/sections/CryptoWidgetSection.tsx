import { useEffect, useState } from 'react';
import { appConfig } from '@/config/app.config';

interface PriceData {
  usd: number;
  usd_24h_change: number;
  source: 'coingecko' | 'coinpaprika';
}

const JSON_HEADERS = { mode: 'cors' as const, headers: { Accept: 'application/json' } };

async function fetchFromCoinGecko(): Promise<PriceData | null> {
  for (const coinId of ['conceal', 'conceal-network']) {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
        JSON_HEADERS
      );
      if (response.status === 429) {
        console.warn('CoinGecko rate limited, trying fallback...');
        break;
      }
      if (response.ok) {
        const data = await response.json();
        if (data[coinId]) {
          return {
            usd: data[coinId].usd,
            usd_24h_change: data[coinId].usd_24h_change || 0,
            source: 'coingecko',
          };
        }
      }
    } catch (err) {
      console.warn(`CoinGecko failed for ${coinId}:`, err);
    }
  }
  return null;
}

async function fetchFromCoinPaprika(): Promise<PriceData | null> {
  try {
    const response = await fetch(
      'https://api.coinpaprika.com/v1/tickers/ccx-conceal',
      JSON_HEADERS
    );
    if (response.ok) {
      const data = await response.json();
      if (data.quotes?.USD) {
        return {
          usd: data.quotes.USD.price,
          usd_24h_change: data.quotes.USD.percent_change_24h || 0,
          source: 'coinpaprika',
        };
      }
    }
  } catch (err) {
    console.error('CoinPaprika API failed:', err);
  }
  return null;
}

async function fetchCCXPrice(): Promise<PriceData | null> {
  return (await fetchFromCoinGecko()) ?? (await fetchFromCoinPaprika());
}

const SECTION_STYLE = {
  background:
    'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
};
const SECTION_CLASS =
  'py-16 px-4 bg-[var(--color-bg-primary)] border-b border-[rgba(255,255,255,0.2)]';

function WidgetSection({ children }: { children: React.ReactNode }) {
  return (
    <section id="cryptoWidget" className={SECTION_CLASS} style={SECTION_STYLE}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function PriceDisplay({ price }: { price: PriceData }) {
  const isPositive = price.usd_24h_change >= 0;
  return (
    <div className="bg-[#111] border border-[#444] rounded-lg p-8 text-center">
      <div className="mb-4">
        <h3 className="text-[2.4rem] text-[var(--color1)] uppercase mb-2">Conceal Network (CCX)</h3>
        <div className="text-[4rem] text-white font-bold">
          $
          {price.usd.toLocaleString(undefined, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          })}{' '}
          <span data-tkey="usd">USD</span>
        </div>
      </div>
      <div className={`text-[1.8rem] ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}
        {price.usd_24h_change.toFixed(2)}% (24h)
      </div>
      <div className="mt-4 text-[1.2rem] text-[#999] flex items-center justify-center gap-2">
        <span data-tkey="dataProvidedBy">Data provided by</span>
        {price.source === 'coingecko' ? (
          <a
            href="https://www.coingecko.com/en/coins/conceal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:opacity-80 transition-opacity bg-[#444] rounded px-2 py-1"
          >
            <img src="/external/logo/coingecko-logo.svg" alt="CoinGecko" className="h-6" />
          </a>
        ) : (
          <a
            href="https://coinpaprika.com/coin/ccx-conceal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:opacity-80 transition-opacity bg-[#444] rounded px-2 py-1"
          >
            <img src="/external/logo/coinpaprika.ico" alt="CoinPaprika" className="h-6" />{' '}
            <span className="text-white font-semibold">CoinPaprika</span>
          </a>
        )}
      </div>
    </div>
  );
}

export function CryptoWidgetSection() {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCCXPrice();
        if (data) {
          setPrice(data);
          setError(false);
        } else setError(true);
      } catch (err) {
        console.error('Error fetching price:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, appConfig.refresh.cryptoPriceInterval);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <WidgetSection>
        <div className="text-center text-[#757575]">Loading price...</div>
      </WidgetSection>
    );
  if (error || !price)
    return (
      <WidgetSection>
        <div className="text-center text-[#757575]">Price data unavailable</div>
      </WidgetSection>
    );
  return (
    <WidgetSection>
      <PriceDisplay price={price} />
    </WidgetSection>
  );
}
