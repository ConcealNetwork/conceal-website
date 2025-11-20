import { SectionHeading } from '@/components/ui/SectionHeading';

export function PartnersSection() {
  return (
    <section
      id="partners"
      className="py-16 px-4 bg-[var(--color-bg-primary)] border-b border-[rgba(255,255,255,0.2)]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading subtitle="Working Together" title="Our Partners" />
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <picture>
              <a href="https://ergoplatform.org" target="_blank" rel="noopener">
                <img src="/images/partners/ERGO.png" alt="ERGO" className="w-full h-auto" />
              </a>
            </picture>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <picture>
              <a href="https://crypto.com/price/conceal/" target="_blank" rel="noopener">
                <img src="/images/partners/CRYPTO.png" alt="Crypto.com" className="w-full h-auto" />
              </a>
            </picture>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <picture>
              <a href="https://cryptocurrencycheckout.com/" target="_blank" rel="noopener">
                <img
                  src="/images/partners/cyprtocurrencycheckout.png"
                  alt="cryptocurrencycheckout.com"
                  className="w-full h-auto"
                />
              </a>
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
