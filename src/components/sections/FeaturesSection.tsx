import { useEffect, useState } from 'react';
import { AnimatedElement } from '../ui/AnimatedElement';
import { SectionHeading } from '../ui/SectionHeading';

function getEIR(nPrincipal: number, nMonths: number): number {
  let nBase: number;
  if (nPrincipal < 10000) {
    nBase = 0.029;
  } else if (nPrincipal >= 10000 && nPrincipal < 20000) {
    nBase = 0.039;
  } else if (nPrincipal >= 20000) {
    nBase = 0.049;
  } else {
    nBase = 0.029;
  }
  return ((nBase + (nMonths - 1) * 0.001) / 12) * nMonths;
}

function getTEA(nPrincipal: number, nMonths: number): number {
  const nEIR = getEIR(nPrincipal, nMonths);
  return nPrincipal * (1 + nEIR);
}

interface TableRow {
  month: number;
  tier1Interest: number;
  tier1Total: number;
  tier2Interest: number;
  tier2Total: number;
  tier3Interest: number;
  tier3Total: number;
}

const TIERS = [
  {
    label: 'Tier 1',
    principal: 'Under 10,000 CCX',
    apr: '2.90%',
    maxInterest: '4.00%',
    example: '5,000 CCX',
  },
  {
    label: 'Tier 2',
    principal: '10,000 - 19,999 CCX',
    apr: '3.90%',
    maxInterest: '5.00%',
    example: '10,000 CCX',
  },
  {
    label: 'Tier 3',
    principal: 'Over 20,000 CCX',
    apr: '4.90%',
    maxInterest: '6.00%',
    example: '20,000 CCX',
  },
];

function useInterestTable() {
  const [tableRows, setTableRows] = useState<TableRow[]>([]);
  useEffect(() => {
    const rows: TableRow[] = [];
    for (let m = 1; m < 13; m++) {
      rows.push({
        month: m,
        tier1Interest: getEIR(5000, m) * 100,
        tier1Total: getTEA(5000, m),
        tier2Interest: getEIR(10000, m) * 100,
        tier2Total: getTEA(10000, m),
        tier3Interest: getEIR(20000, m) * 100,
        tier3Total: getTEA(20000, m),
      });
    }
    setTableRows(rows);
  }, []);
  return tableRows;
}

function clampInt(value: number, min: number, max: number) {
  if (Number.isNaN(value) || value < min) return min;
  return Math.min(value, max);
}

const FMT = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
const CELL_CLASS = 'border border-[#444] p-2 text-center text-[white]';

const TIER_DATA = [
  {
    label: 'tier1',
    mult: 2.9,
    rate: (r: TableRow) => r.tier1Interest,
    total: (r: TableRow) => r.tier1Total,
  },
  {
    label: 'tier2',
    mult: 3.9,
    rate: (r: TableRow) => r.tier2Interest,
    total: (r: TableRow) => r.tier2Total,
  },
  {
    label: 'tier3',
    mult: 4.9,
    rate: (r: TableRow) => r.tier3Interest,
    total: (r: TableRow) => r.tier3Total,
  },
];

function InterestTableDesktop({ rows }: Readonly<{ rows: TableRow[] }>) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse border border-[#444]">
        <thead>
          <tr>
            <th scope="row" className="border border-[#444] p-3 text-left">
              Compound Level
            </th>
            {TIERS.map((t) => (
              <th key={t.label} scope="col" colSpan={2} className="border border-[#444] p-3">
                {t.label}
              </th>
            ))}
          </tr>
          <tr>
            <th scope="row" className="border border-[#444] p-3 text-left">
              Principal
            </th>
            {TIERS.map((t) => (
              <td key={t.label} colSpan={2} className={`${CELL_CLASS} p-3`}>
                {t.principal}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="border border-[#444] p-3 text-left">
              Base/APR
            </th>
            {TIERS.map((t) => (
              <td key={t.label} colSpan={2} className="border border-[#444] p-3 text-center">
                {t.apr}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="border border-[#444] p-3 text-left">
              Example
            </th>
            {TIERS.map((t) => (
              <td key={t.label} colSpan={2} className="border border-[#444] p-3 text-center">
                {t.example}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="border border-[#444] p-3 text-left">
              Maximum Interest
            </th>
            {TIERS.map((t) => (
              <td key={t.label} colSpan={2} className={`${CELL_CLASS} p-3`}>
                {t.maxInterest}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="col" className="border border-[#444] p-3 text-left">
              <span>Duration</span>: <span>Months</span>
            </th>
            {TIER_DATA.map((t) =>
              ['Interest', 'Total'].map((h) => (
                <th key={`${t.label}-${h}`} scope="col" className="border border-[#444] p-3">
                  {h}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month}>
              <td className="border border-[#444] p-3">{row.month}</td>
              {TIER_DATA.map(({ label, mult, rate, total }) => [
                <td
                  key={`${label}-rate`}
                  className={CELL_CLASS}
                  style={{ background: `rgba(0,255,0,${(row.month * mult) / 87})` }}
                >
                  {rate(row).toFixed(2)}%
                </td>,
                <td
                  key={`${label}-total`}
                  className={CELL_CLASS}
                  style={{ background: `rgba(0,255,0,${(row.month * mult) / 87})` }}
                >
                  {total(row).toLocaleString(undefined, FMT)}
                </td>,
              ])}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InterestTableMobile({ rows }: Readonly<{ rows: TableRow[] }>) {
  return (
    <div className="md:hidden space-y-6">
      {TIERS.map((tier, i) => (
        <div
          key={tier.label}
          className="border border-[#444] rounded-lg p-4 bg-[rgba(255,255,255,0.02)]"
        >
          <h3 className="text-[var(--color1)] text-xl font-semibold mb-4">{tier.label}</h3>
          <div className="space-y-3 mb-4">
            {(['principal', 'apr', 'maxInterest', 'example'] as const).map((k) => (
              <div key={k} className="flex justify-between">
                <span className="text-[#757575]">
                  {k === 'maxInterest' ? 'Max Interest' : k.charAt(0).toUpperCase() + k.slice(1)}:
                </span>
                <span className="text-white">{tier[k]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#444]">
            <div className="text-[#757575] text-sm mb-2">Sample Returns (First 6 months):</div>
            <div className="space-y-2 text-sm">
              {rows.slice(0, 6).map((row) => {
                const { rate, total } = TIER_DATA[i];
                return (
                  <div key={row.month} className="flex justify-between items-center">
                    <span className="text-[#757575]">Month {row.month}:</span>
                    <div className="flex gap-4">
                      <span className="text-white">{rate(row).toFixed(2)}%</span>
                      <span className="text-white">
                        {total(row).toLocaleString(undefined, FMT)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
      <div className="text-center text-[#757575] text-sm mt-4">
        <p>Scroll horizontally on desktop to see full table with all months</p>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
        <div className="flex justify-center items-center min-w-0 pr-8">
          <AnimatedElement types={['rotateInY']} speed="slow">
            <img
              src="/images/Cham-512.png"
              alt="Conceal Network chameleon mascot"
              className="max-w-[400px] h-auto"
            />
          </AnimatedElement>
        </div>
        <div className="min-w-0 pl-8">
          <p
            className="text-[1.7rem] text-[#B0B0B0] mb-6 text-justify leading-relaxed"
            data-tkey="about1"
          >
            Conceal Network is a secure peer-to-peer privacy framework empowering individuals and
            organizations to anonymously communicate and interact financially in a decentralized and
            censorship resistant environment.
          </p>
          <p
            className="text-[1.7rem] text-[#B0B0B0] mb-6 text-justify leading-relaxed"
            data-tkey="about2"
          >
            Conceal Network powers the $CCX cryptocurrency which is an open source, privacy
            protected digital cash system that mimics physical cash; nobody knows where you store or
            spend your $CCX. All transactions, deposits and messages on Conceal Network are
            untraceable, tamperproof and operate with no central authority through the use of
            cryptographic protocols, which makes the chameleon a mascot of choice.
          </p>
          <p
            className="text-[1.7rem] text-[#B0B0B0] mb-8 text-justify leading-relaxed"
            data-tkey="about3"
          >
            Conceal Network is a community driven, truly decentralized blockchain bank accessible to
            everyone regardless of social or financial status and geographic location. No one owns
            Conceal Network and everyone can participate for free.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="text-justify max-w-[66%] mx-auto md:mx-0 md:ml-auto">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-money-check-alt text-[3rem] text-[var(--color1)]"></i>
            <h3 className="text-[2.4rem] text-[var(--color1)] uppercase">
              <span data-tkey="rBanking">Banking</span>: <span>Conceal-Earn</span>
            </h3>
          </div>
          <p
            className="text-[1.7rem] text-[#B0B0B0] ml-4 leading-relaxed"
            data-tkey="aboutBankingDeposits"
          >
            Deposits form the backbone of the Conceal ecosystem, providing users with a
            decentralized and egalitarian form of cold staking that earns interests on locked
            deposits.
          </p>
        </div>
        <div className="text-justify max-w-[66%] mx-auto md:mx-0 md:mr-auto">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-comments text-[3rem] text-[var(--color1)]"></i>
            <h3
              className="text-[2.4rem] text-[var(--color1)] uppercase"
              data-tkey="encryptedMessages"
            >
              Encrypted Messages
            </h3>
          </div>
          <p
            className="text-[1.7rem] text-[#B0B0B0] ml-4 leading-relaxed"
            data-tkey="aboutEncryptedMessages"
          >
            A truly private, decentralized, anonymous, untraceable, and end-to-end encrypted
            messaging service that operates on the blockchain while allowing messages that
            self-destruct.
          </p>
        </div>
      </div>
    </>
  );
}

function InterestCalculator() {
  const [principal, setPrincipal] = useState(20000);
  const [months, setMonths] = useState(12);
  const tableRows = useInterestTable();
  const nTEA = getTEA(principal, months);
  const nProfit = nTEA - principal;
  const FMT2 = { minimumFractionDigits: 0, maximumFractionDigits: 2 };
  return (
    <form id="compoundInterestCalc" className="max-w-[66%] mx-auto">
      <h3
        className="text-[2.4rem] text-[var(--color1)] uppercase mb-6 text-center"
        data-tkey="compoundInterestCalculator"
      >
        Compound Interest Calculator
      </h3>
      <fieldset className="flex flex-wrap gap-4 justify-center mb-6">
        <label className="flex items-center gap-2">
          <span>Deposit</span>
          <input
            type="number"
            id="nPrincipal"
            value={principal}
            onChange={(e) =>
              setPrincipal(clampInt(Number.parseInt(e.target.value, 10), 1, 9999999))
            }
            min="1"
            max="9999999"
            className="px-3 py-2 bg-[#111] border border-[#444] text-white rounded"
          />
          <span>CCX</span>
        </label>
        <label className="flex items-center gap-2">
          <span>for</span>
          <input
            type="number"
            id="nMonths"
            min="1"
            max="12"
            value={months}
            onChange={(e) => setMonths(clampInt(Number.parseInt(e.target.value, 10), 1, 12))}
            className="px-3 py-2 bg-[#111] border border-[#444] text-white rounded"
          />
          <span>Months</span>
        </label>
      </fieldset>
      <div className="text-center mb-6 text-[1.7rem] text-[#757575]">
        <span>Total</span>: <span id="nTEA">{nTEA.toLocaleString(undefined, FMT2)}</span> CCX{' '}
        <span>Profit</span>: <span id="nProfit">{nProfit.toLocaleString(undefined, FMT2)}</span> CCX
      </div>
      <div className="tableContain" id="compoundInterestCalcTable">
        <InterestTableDesktop rows={tableRows} />
        <InterestTableMobile rows={tableRows} />
      </div>
    </form>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-16 px-4 bg-[var(--color-bg-primary)] border-b border-[rgba(255,255,255,0.1)]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <SectionHeading subtitle={<span>We are about</span>} title={<span>PRIVACY!</span>} />
        <AboutSection />
        <InterestCalculator />
      </div>
    </section>
  );
}
