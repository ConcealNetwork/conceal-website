import { useState, useEffect, useRef } from 'react';
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
              const response = await fetch('/api/pools');
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
        { threshold: 0.1 }, // Trigger when 10% of the section is visible
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        observer.disconnect();
      };
    };

    loadPools();
  }, [isLoading, pools.length]);

  return (
    <section id="mining" ref={sectionRef} className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]" style={{ background: 'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading subtitle="Getting CCX" title="Mining" />

        <h3 className="text-[2.4rem] text-[orange] uppercase mb-6">Quick Start</h3>
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
              {`c:/cryptodredge/CryptoDredge.exe -a cngpu -o stratum+tcp://pool.conceal.network:3333 -u wallet_address -p WorkerName --api-type ccminer-tcp -b`}
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
              {`xmrigDaemon --no-cpu -a cn/gpu -o pool:port -u wallet_address -p x -k --cc-url=127.0.0.1:3344 --cc-access-token=your_token --cc-worker-id=worker_name pause`}
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
              <samp>{`SRBMiner-MULTI.exe --algorithm gpu --pool pool.conceal.network:3333 --wallet "YOUR_WALLET_ADDRESS" --gpu-tweak-profile 5`}</samp>
            </pre>
          </div>
        </div>

        <p className="text-[1.7rem] text-[white] mb-8 text-center">
          <span>The easiest way to get CCX is to mine with CPU or GPU using one of the miners that support CCX. Check out our</span>{' '}
          <a
            href="https://conceal.network/wiki/doku.php?id=mining"
            target="_blank"
            rel="noopener"
            className="text-[orange] hover:text-[#fafafa] transition-colors"
          >
            documentation
          </a>{' '}
          <span>for more detailed information about mining CCX.</span>
        </p>

        <div className="tableContain overflow-x-auto" id="poolsTable">
          <table className="w-full border-collapse border border-[#444]">
            <caption className="text-[2.1rem] text-[orange] mb-4">
              <span>Mining</span> <span>Pools</span>
            </caption>
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
      </div>
    </section>
  );
}

