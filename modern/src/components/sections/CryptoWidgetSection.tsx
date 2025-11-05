import { useEffect, useState } from 'react';
import { appConfig } from '@/config/app.config';

interface CoinGeckoPrice {
  usd: number;
  usd_24h_change: number;
}

export function CryptoWidgetSection() {
  const [price, setPrice] = useState<CoinGeckoPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch price from CoinGecko API
    const fetchPrice = async () => {
      try {
        // Try common Conceal Network coin IDs
        const coinIds = ['conceal-network', 'conceal', 'ccx'];

        for (const coinId of coinIds) {
          try {
            const response = await fetch(
              `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`
            );

            if (response.ok) {
              const data = await response.json();
              if (data[coinId]) {
                setPrice({
                  usd: data[coinId].usd,
                  usd_24h_change: data[coinId].usd_24h_change || 0,
                });
                setLoading(false);
                setError(false);
                return;
              }
            } else if (response.status === 429) {
              // Rate limited - wait longer before retry
              console.warn('CoinGecko API rate limited');
              setError(true);
              setLoading(false);
              return;
            }
          } catch (err) {
            console.error(`Error fetching price for ${coinId}:`, err);
          }
        }

        // If none worked, set error
        setError(true);
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchPrice:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchPrice();

    // Update price at configured interval
    const interval = setInterval(fetchPrice, appConfig.refresh.cryptoPriceInterval);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section
        id="cryptoWidget"
        className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-[#757575]">Loading price...</div>
        </div>
      </section>
    );
  }

  if (error || !price) {
    return (
      <section
        id="cryptoWidget"
        className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-[#757575]">Price data unavailable</div>
        </div>
      </section>
    );
  }

  const isPositive = price.usd_24h_change >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <section
      id="cryptoWidget"
      className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#111] border border-[#444] rounded-lg p-8 text-center">
          <div className="mb-4">
            <h3 className="text-[2.4rem] text-[orange] uppercase mb-2">Conceal Network (CCX)</h3>
            <div className="text-[4rem] text-white font-bold">
              $
              {price.usd.toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}{' '}
              <span data-tkey="usd">USD</span>
            </div>
          </div>
          <div className={`text-[1.8rem] ${changeColor}`}>
            {isPositive ? '+' : ''}
            {price.usd_24h_change.toFixed(2)}% (24h)
          </div>
          <div className="mt-4 text-[1.2rem] text-[#999] flex items-center justify-center gap-2">
            <span data-tkey="dataProvidedBy">Data provided by</span>
            <a
              href="https://www.coingecko.com/en/coins/conceal-network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity bg-[#444] rounded px-2 py-1"
            >
              <img src="/external/logo/coingecko-logo.svg" alt="CoinGecko" className="h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
