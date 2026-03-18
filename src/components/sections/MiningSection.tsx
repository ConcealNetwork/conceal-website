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

const numberFormatter = new Intl.NumberFormat('en-US');

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

function getPoolsApiUrl(): string {
  const hostname = window.location.hostname;
  if (
    hostname === 'conceal.network' ||
    hostname === 'www.conceal.network' ||
    hostname === 'dweb.conceal' ||
    hostname === 'dweb.conceal.hns.to' ||
    hostname.endsWith('.github.io')
  ) {
    return 'https://explorer.conceal.network/services/pools/data';
  }
  return '/api/pools';
}

async function fetchViaProxy(apiUrl: string): Promise<PoolData[]> {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
  const proxyResponse = await fetch(proxyUrl);
  if (!proxyResponse.ok) throw new Error(`Proxy error! status: ${proxyResponse.status}`);
  const proxyData = await proxyResponse.json();
  return JSON.parse(proxyData.contents);
}

async function fetchPoolData(apiUrl: string): Promise<PoolData[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (corsError) {
    if (apiUrl.startsWith('https://')) return await fetchViaProxy(apiUrl);
    throw corsError;
  }
}

function usePools(sectionRef: React.RefObject<HTMLElement | null>) {
  const [pools, setPools] = useState<PoolData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedPools = useRef(false);

  useEffect(() => {
    const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (!entry.isIntersecting || isLoading || hasLoadedPools.current) return;
      setIsLoading(true);
      try {
        const data = await fetchPoolData(getPoolsApiUrl());
        data.sort((a, b) => a.config.poolFee - b.config.poolFee);
        setPools(data);
        hasLoadedPools.current = true;
      } catch (error) {
        console.error('Failed to fetch pool data:', error);
      } finally {
        setIsLoading(false);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isLoading, sectionRef]);

  return { pools, isLoading };
}

const CELL = 'border border-[#444] p-2 text-center text-[#757575]';
const LINK = 'text-[var(--color1)] hover:text-[#fafafa] transition-colors';

function PoolRow({ pool }: Readonly<{ pool: PoolData }>) {
  const poolName = getPoolName(pool);
  return (
    <tr key={poolName}>
      <td className={CELL}>
        <a
          href={`http://${pool.info.host}`}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          {pool.info.name}
        </a>
      </td>
      <td className={CELL}>{pool.network.height.toLocaleString()}</td>
      <td className={CELL}>{pool.config.poolFee}%</td>
      <td className={CELL}>{getReadableHashRateString(pool.pool.hashrate)}</td>
      <td className={CELL}>{pool.pool.miners.toLocaleString()}</td>
    </tr>
  );
}

function PoolCard({ pool }: Readonly<{ pool: PoolData }>) {
  const poolName = getPoolName(pool);
  return (
    <div key={poolName} className="border border-[#444] rounded-lg p-4 bg-[rgba(255,255,255,0.02)]">
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
            <i className="fa fa-th-large mr-2"></i>Height:
          </span>
          <span className="text-white">{pool.network.height.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#757575]">
            <i className="fas fa-coins mr-2"></i>Fee:
          </span>
          <span className="text-white">{pool.config.poolFee}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#757575]">
            <i className="fas fa-tachometer-alt mr-2"></i>Hashrate:
          </span>
          <span className="text-white">{getReadableHashRateString(pool.pool.hashrate)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#757575]">
            <i className="fas fa-users-cog mr-2"></i>Miners:
          </span>
          <span className="text-white">{pool.pool.miners.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function PoolsTable({ pools, isLoading }: Readonly<{ pools: PoolData[]; isLoading: boolean }>) {
  const placeholder = (colSpan: number, tag: 'td' | 'div') =>
    isLoading ? (
      tag === 'td' ? (
        <tr>
          <td colSpan={colSpan} className={`${CELL} p-4`}>
            Loading pools...
          </td>
        </tr>
      ) : (
        <div className="border border-[#444] p-4 text-center text-[#757575] rounded-lg">
          Loading pools...
        </div>
      )
    ) : pools.length === 0 ? (
      tag === 'td' ? (
        <tr>
          <td colSpan={colSpan} className={`${CELL} p-4`}>
            No pools available
          </td>
        </tr>
      ) : (
        <div className="border border-[#444] p-4 text-center text-[#757575] rounded-lg">
          No pools available
        </div>
      )
    ) : null;

  return (
    <div className="tableContain" id="poolsTable">
      <h2 className="text-[2.1rem] text-[var(--color1)] mb-4 text-center md:text-left">
        <span>Mining</span> <span>Pools</span>
      </h2>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-[#444]">
          <thead>
            <tr>
              {[
                ['fa-server', 'Pools'],
                ['fa-th-large', 'Height'],
                ['fa-coins', 'Fee'],
                ['fa-tachometer-alt', 'Hashrate'],
                ['fa-users-cog', 'Miners'],
              ].map(([icon, label]) => (
                <th key={label} scope="col" className="border border-[#444] p-2 text-center">
                  <i className={`fas ${icon} mr-2`}></i>
                  <span>{label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {placeholder(5, 'td')}
            {pools.map((pool) => (
              <PoolRow key={getPoolName(pool)} pool={pool} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {placeholder(0, 'div')}
        {pools.map((pool) => (
          <PoolCard key={getPoolName(pool)} pool={pool} />
        ))}
      </div>
    </div>
  );
}

const MINERS = [
  {
    name: 'XMRStak',
    url: 'https://github.com/fireice-uk/xmr-stak/releases',
    code: `"pool_list": [
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
"currency": "cryptonight_gpu",`,
  },
  {
    name: 'CryptoDredge',
    url: 'https://github.com/CryptoDredge/miner/releases',
    code: `c:/cryptodredge/CryptoDredge.exe -a cngpu 
-o stratum+tcp://pool.conceal.network:3333 
-u wallet_address -p WorkerName \n --api-type ccminer-tcp -b`,
  },
  {
    name: 'XMRigCC',
    url: 'https://github.com/Bendr0id/xmrigCC',
    code: `xmrigDaemon --no-cpu -a cn/gpu \n 
-o pool:port -u wallet_address -p x -k \n
--cc-url=127.0.0.1:3344 \n
--cc-access-token=your_token \n
--cc-worker-id=worker_name pause`,
  },
  {
    name: 'SRBMiner',
    url: 'https://www.srbminer.com/',
    code: `SRBMiner-MULTI.exe --algorithm gpu \n
--pool pool.conceal.network:3333 \n
--wallet "YOUR_WALLET_ADDRESS" \n
--gpu-tweak-profile 5`,
  },
];

const PRE_CLASS =
  'font-[Consolas,Serif] text-[1.3rem] leading-[1.3rem] bg-[#111] border border-[#444] rounded p-4 overflow-x-auto';

function MinerQuickStart() {
  return (
    <>
      <h3 className="text-[2.4rem] text-[var(--color1)] uppercase mb-6" data-tkey="quickStart">
        Quick Start
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {MINERS.map(({ name, url, code }) => (
          <div key={name}>
            <h4 className="text-[2.1rem] text-[var(--color1)] mb-2">
              <a href={url} target="_blank" rel="noopener" className={LINK}>
                {name}
              </a>
            </h4>
            <pre className={PRE_CLASS}>
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>
    </>
  );
}

export function MiningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { pools, isLoading } = usePools(sectionRef);

  return (
    <section
      id="mining"
      ref={sectionRef}
      className="py-16 px-4 bg-[var(--color-bg-primary)] border-b border-[rgba(255,255,255,0.2)]"
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
        <MinerQuickStart />
        <p className="text-[1.7rem] text-[white] mb-8 text-center">
          <span data-tkey="aboutGettingCCX">
            The easiest way to get CCX is to mine with CPU or GPU using one of the miners that
            support CCX. Check out our
          </span>{' '}
          <a
            href="https://conceal.network/wiki/doku.php?id=mining"
            target="_blank"
            rel="noopener"
            className={LINK}
            data-tkey="rDocumentation"
          >
            documentation
          </a>{' '}
          <span data-tkey="aboutGettingCCX2">for more detailed information about mining CCX.</span>
        </p>
        <PoolsTable pools={pools} isLoading={isLoading} />
      </div>
    </section>
  );
}
