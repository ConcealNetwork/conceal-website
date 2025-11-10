import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface PoolData {
  info: {
    name: string;
    host: string;
  };
  network: {
    height: number;
  };
  config: {
    poolFee: number;
  };
  pool: {
    hashrate: number;
    miners: number;
  };
}

const numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas

function localizeNumber(number: number): string {
  return numberFormatter.format(number);
}

function getReadableHashRateString(hashrate: number): string {
  const byteUnits = [' H', ' kH', ' MH', ' GH', ' TH', ' PH', ' EH', ' ZH', ' YH'];
  let i = 0;
  while (hashrate > 1000) {
    hashrate = hashrate / 1000;
    i++;
  }
  return localizeNumber(parseFloat(hashrate.toFixed(2))) + byteUnits[i];
}

function getPoolName(data: PoolData): string {
  const host = data.info.host;
  const index = host.indexOf('/');
  return index < 0 ? host : host.slice(0, index);
}

// Get the API URL based on environment
// On production (conceal.network), GitHub Pages, and Handshake domains, use direct API (CORS allowed)
// On Netlify staging, use proxy
function getPoolsApiUrl(): string {
  const hostname = window.location.hostname;
  // If on production domain, GitHub Pages, or Handshake domain, use direct API (CORS enabled)
  if (
    hostname === 'conceal.network' ||
    hostname === 'www.conceal.network' ||
    hostname === 'dweb.conceal' ||
    hostname === 'dweb.conceal.hns.to' ||
    hostname.endsWith('.github.io')
  ) {
    return 'https://explorer.conceal.network/services/pools/data';
  }
  // Otherwise use proxy (Netlify staging)
  return '/api/pools';
}

export function MiningSection() {
  const [pools, setPools] = useState<PoolData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasLoadedPools = useRef(false); // Use a ref to prevent re-fetching

  useEffect(() => {
    const loadPools = async () => {
      if (hasLoadedPools.current) return; // Already loaded, do nothing

      // Check if the section is visible
      const observer = new IntersectionObserver(
        async (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !isLoading && !hasLoadedPools.current) {
            setIsLoading(true);
            try {
              const response = await fetch(getPoolsApiUrl());
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data: PoolData[] = await response.json();

              data.sort((a, b) => a.config.poolFee - b.config.poolFee); // Sort by fee
              setPools(data);
              hasLoadedPools.current = true; // Mark as loaded
            } catch (error) {
              console.error('Failed to fetch pool data:', error);
            } finally {
              setIsLoading(false);
            }
            observer.disconnect(); // Stop observing once loaded
          }
        },
        { threshold: 0.1 } // Trigger when 10% of the section is visible
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        observer.disconnect();
      };
    };

    loadPools();
  }, [isLoading]);

  return (
    <section
      id="mining"
      ref={sectionRef}
      className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
      }}
    >
      <div className="max-w-[66%] mx-auto">
        <SectionHeading
          subtitle={<span data-tkey="gettingCCX">Getting CCX</span>}
          title={<span data-tkey="rMining">Mining</span>}
        />

        <h3 className="text-[2.4rem] text-[orange] uppercase mb-6" data-tkey="quickStart">
          Quick Start
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-[2.1rem] text-[orange] mb-2">
              <a
                href="https://github.com/fireice-uk/xmr-stak/releases"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                XMRStak
              </a>
            </h4>
            <pre className="font-[Consolas,Serif] text-[1.3rem] leading-[1.3rem] bg-[#111] border border-[#444] rounded p-4 overflow-x-auto">
              <code>{`"pool_list": [
  {
      "pool_address": "pool.conceal.network:3333",
      "wallet_address": "YOUR_WALLET_ADDRESS",
      "rig_id": "YOUR_WORKER_NAME",
      "pool_password": "x",
      "use_nicehash": false,
      "use_tls": false,
      "tls_fingerprint": "",
      "pool_weight": 1
  },
],
"currency": "cryptonight_gpu",`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-[2.1rem] text-[orange] mb-2">
              <a
                href="https://github.com/CryptoDredge/miner/releases"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                CryptoDredge
              </a>
            </h4>
            <pre className="font-[Consolas,Serif] text-[1.3rem] leading-[1.3rem] bg-[#111] border border-[#444] rounded p-4 overflow-x-auto">
              <code>{`c:/cryptodredge/CryptoDredge.exe -a cngpu 
-o stratum+tcp://pool.conceal.network:3333 
-u wallet_address -p WorkerName \n --api-type ccminer-tcp -b`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-[2.1rem] text-[orange] mb-2">
              <a
                href="https://github.com/Bendr0id/xmrigCC"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                XMRigCC
              </a>
            </h4>
            <pre className="font-[Consolas,Serif] text-[1.3rem] leading-[1.3rem] bg-[#111] border border-[#444] rounded p-4 overflow-x-auto">
              <code>{`xmrigDaemon --no-cpu -a cn/gpu \n 
-o pool:port -u wallet_address -p x -k \n
--cc-url=127.0.0.1:3344 \n
--cc-access-token=your_token \n
--cc-worker-id=worker_name pause`}</code>
            </pre>
          </div>
          <div>
            <h4 className="text-[2.1rem] text-[orange] mb-2">
              <a
                href="https://www.srbminer.com/"
                target="_blank"
                rel="noopener"
                className="text-[orange] hover:text-[#fafafa] transition-colors"
              >
                SRBMiner
              </a>
            </h4>
            <pre className="font-[Consolas,Serif] text-[1.3rem] leading-[1.3rem] bg-[#111] border border-[#444] rounded p-4 overflow-x-auto">
              <code>{`SRBMiner-MULTI.exe --algorithm gpu \n
--pool pool.conceal.network:3333 \n
--wallet "YOUR_WALLET_ADDRESS" \n
--gpu-tweak-profile 5`}</code>
            </pre>
          </div>
        </div>

        <p className="text-[1.7rem] text-[white] mb-8 text-center">
          <span data-tkey="aboutGettingCCX">
            The easiest way to get CCX is to mine with CPU or GPU using one of the miners that
            support CCX. Check out our
          </span>{' '}
          <a
            href="https://conceal.network/wiki/doku.php?id=mining"
            target="_blank"
            rel="noopener"
            className="text-[orange] hover:text-[#fafafa] transition-colors"
            data-tkey="rDocumentation"
          >
            documentation
          </a>{' '}
          <span data-tkey="aboutGettingCCX2">for more detailed information about mining CCX.</span>
        </p>

        <div className="tableContain" id="poolsTable">
          <h2 className="text-[2.1rem] text-[orange] mb-4 text-center md:text-left">
            <span>Mining</span> <span>Pools</span>
          </h2>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-[#444]">
              <thead>
                <tr>
                  <th scope="col" className="border border-[#444] p-2 text-center">
                    <i className="fa fa-server mr-2"></i>
                    <span>Pools</span>
                  </th>
                  <th scope="col" className="border border-[#444] p-2 text-center">
                    <i className="fa fa-th-large mr-2"></i>
                    <span>Height</span>
                  </th>
                  <th scope="col" className="border border-[#444] p-2 text-center">
                    <i className="fas fa-coins mr-2"></i>
                    <span>Fee</span>
                  </th>
                  <th scope="col" className="border border-[#444] p-2 text-center">
                    <i className="fas fa-tachometer-alt mr-2"></i>
                    <span>Hashrate</span>
                  </th>
                  <th scope="col" className="border border-[#444] p-2 text-center">
                    <i className="fas fa-users-cog mr-2"></i>
                    <span>Miners</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="border border-[#444] p-4 text-center text-[#757575]">
                      Loading pools...
                    </td>
                  </tr>
                )}
                {!isLoading && pools.length === 0 && (
                  <tr>
                    <td colSpan={5} className="border border-[#444] p-4 text-center text-[#757575]">
                      No pools available
                    </td>
                  </tr>
                )}
                {pools.map((pool) => {
                  const poolName = getPoolName(pool);
                  return (
                    <tr key={poolName}>
                      <td className="border border-[#444] p-2 text-center">
                        <a
                          href={`http://${pool.info.host}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[orange] hover:text-[#fafafa] transition-colors"
                        >
                          {pool.info.name}
                        </a>
                      </td>
                      <td className="border border-[#444] p-2 text-center text-[#757575]">
                        {pool.network.height.toLocaleString()}
                      </td>
                      <td className="border border-[#444] p-2 text-center text-[#757575]">
                        {pool.config.poolFee}%
                      </td>
                      <td className="border border-[#444] p-2 text-center text-[#757575]">
                        {getReadableHashRateString(pool.pool.hashrate)}
                      </td>
                      <td className="border border-[#444] p-2 text-center text-[#757575]">
                        {pool.pool.miners.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {isLoading && (
              <div className="border border-[#444] p-4 text-center text-[#757575] rounded-lg">
                Loading pools...
              </div>
            )}
            {!isLoading && pools.length === 0 && (
              <div className="border border-[#444] p-4 text-center text-[#757575] rounded-lg">
                No pools available
              </div>
            )}
            {pools.map((pool) => {
              const poolName = getPoolName(pool);
              return (
                <div
                  key={poolName}
                  className="border border-[#444] rounded-lg p-4 bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="mb-3 pb-3 border-b border-[#444]">
                    <a
                      href={`http://${pool.info.host}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[orange] hover:text-[#fafafa] transition-colors text-lg font-semibold"
                    >
                      <i className="fa fa-server mr-2"></i>
                      {pool.info.name}
                    </a>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#757575]">
                        <i className="fa fa-th-large mr-2"></i>
                        Height:
                      </span>
                      <span className="text-white">{pool.network.height.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#757575]">
                        <i className="fas fa-coins mr-2"></i>
                        Fee:
                      </span>
                      <span className="text-white">{pool.config.poolFee}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#757575]">
                        <i className="fas fa-tachometer-alt mr-2"></i>
                        Hashrate:
                      </span>
                      <span className="text-white">
                        {getReadableHashRateString(pool.pool.hashrate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#757575]">
                        <i className="fas fa-users-cog mr-2"></i>
                        Miners:
                      </span>
                      <span className="text-white">{pool.pool.miners.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
