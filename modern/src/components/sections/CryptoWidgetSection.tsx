import { useEffect } from 'react';

export function CryptoWidgetSection() {
  useEffect(() => {
    // Load Crypto.com widget script
    const script = document.createElement('script');
    script.src = 'https://crypto.com/price/static/widget/index.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector('script[src="https://crypto.com/price/static/widget/index.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="cryptoWidget" className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]" style={{ background: 'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div
          id="crypto-widget-CoinTicker"
          data-transparent="true"
          data-theme="dark"
          data-design="modern"
          data-coins="conceal"
        ></div>
      </div>
    </section>
  );
}

