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

export function FeaturesSection() {
  const [principal, setPrincipal] = useState(20000);
  const [months, setMonths] = useState(12);
  const [tableRows, setTableRows] = useState<TableRow[]>([]);

  const nTEA = getTEA(principal, months);
  const nProfit = nTEA - principal;

  useEffect(() => {
    // Populate table
    const rows: TableRow[] = [];
    const nTier1Mid = 5000;
    const nTier2 = 10000;
    const nTier3 = 20000;

    for (let nCurrentMonth = 1; nCurrentMonth < 13; nCurrentMonth++) {
      rows.push({
        month: nCurrentMonth,
        tier1Interest: getEIR(nTier1Mid, nCurrentMonth) * 100,
        tier1Total: getTEA(nTier1Mid, nCurrentMonth),
        tier2Interest: getEIR(nTier2, nCurrentMonth) * 100,
        tier2Total: getTEA(nTier2, nCurrentMonth),
        tier3Interest: getEIR(nTier3, nCurrentMonth) * 100,
        tier3Total: getTEA(nTier3, nCurrentMonth),
      });
    }
    setTableRows(rows);
  }, []);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (value > 9999999) {
      value = 9999999;
    } else if (value < 1 || Number.isNaN(value)) {
      value = 1;
    }
    setPrincipal(value);
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (value > 12) {
      value = 12;
    } else if (value < 1 || Number.isNaN(value)) {
      value = 1;
    }
    setMonths(value);
  };

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
              organizations to anonymously communicate and interact financially in a decentralized
              and censorship resistant environment.
            </p>
            <p
              className="text-[1.7rem] text-[#B0B0B0] mb-6 text-justify leading-relaxed"
              data-tkey="about2"
            >
              Conceal Network powers the $CCX cryptocurrency which is an open source, privacy
              protected digital cash system that mimics physical cash; nobody knows where you store
              or spend your $CCX. All transactions, deposits and messages on Conceal Network are
              untraceable, tamperproof and operate with no central authority through the use of
              cryptographic protocols, which makes the chameleon a mascot of choice.
            </p>
            <p
              className="text-[1.7rem] text-[#B0B0B0] mb-8 text-justify leading-relaxed"
              data-tkey="about3"
            >
              Conceal Network is a community driven, truly decentralized blockchain bank accessible
              to everyone regardless of social or financial status and geographic location. No one
              owns Conceal Network and everyone can participate for free.
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
                onChange={handlePrincipalChange}
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
                onChange={handleMonthsChange}
                className="px-3 py-2 bg-[#111] border border-[#444] text-white rounded"
              />
              <span>Months</span>
            </label>
          </fieldset>

          <div className="text-center mb-6 text-[1.7rem] text-[#757575]">
            <span>Total</span>:{' '}
            <span id="nTEA">
              {nTEA.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>{' '}
            CCX <span>Profit</span>:{' '}
            <span id="nProfit">
              {nProfit.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>{' '}
            CCX
          </div>

          <div className="tableContain" id="compoundInterestCalcTable">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse border border-[#444]">
                <thead>
                  <tr>
                    <th scope="row" className="border border-[#444] p-3 text-left">
                      Compound Level
                    </th>
                    <th scope="col" colSpan={2} className="border border-[#444] p-3">
                      Tier 1
                    </th>
                    <th scope="col" colSpan={2} className="border border-[#444] p-3">
                      Tier 2
                    </th>
                    <th scope="col" colSpan={2} className="border border-[#444] p-3">
                      Tier 3
                    </th>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-[#444] p-3 text-left">
                      Principal
                    </th>
                    <td colSpan={2} className="border border-[#444] p-3 text-center text-[white]">
                      Under 10,000 CCX
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center text-[white]">
                      10,000 - 19,999 CCX
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center text-[white]">
                      Over 20,000 CCX
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-[#444] p-3 text-left">
                      Base/APR
                    </th>
                    <td colSpan={2} className="border border-[#444] p-3 text-center">
                      2.90%
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center">
                      3.90%
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center">
                      4.90%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-[#444] p-3 text-left">
                      Example
                    </th>
                    <td colSpan={2} className="border border-[#444] p-3 text-center">
                      5,000 CCX
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center">
                      10,000 CCX
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center">
                      20,000 CCX
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-[#444] p-3 text-left">
                      Maximum Interest
                    </th>
                    <td colSpan={2} className="border border-[#444] p-3 text-center text-[white]">
                      4.00%
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center text-[white]">
                      5.00%
                    </td>
                    <td colSpan={2} className="border border-[#444] p-3 text-center text-[white]">
                      6.00%
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="border border-[#444] p-3 text-left">
                      <span>Duration</span>: <span>Months</span>
                    </th>
                    <th scope="col" className="border border-[#444] p-3">
                      Interest
                    </th>
                    <th scope="col" className="border border-[#444] p-3">
                      Total
                    </th>
                    <th scope="col" className="border border-[#444] p-3">
                      Interest
                    </th>
                    <th scope="col" className="border border-[#444] p-3">
                      Total
                    </th>
                    <th scope="col" className="border border-[#444] p-3">
                      Interest
                    </th>
                    <th scope="col" className="border border-[#444] p-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.month}>
                      <td className="border border-[#444] p-3">{row.month}</td>
                      <td
                        className="border border-[#444] p-3 text-center text-[white]"
                        style={{
                          background: `rgba(0, 255, 0, ${(row.month * 2.9) / 87})`,
                        }}
                      >
                        {row.tier1Interest.toFixed(2)}%
                      </td>
                      <td
                        className="border border-[#444] p-2 text-center text-[white]"
                        style={{
                          background: `rgba(0, 255, 0, ${(row.month * 2.9) / 87})`,
                        }}
                      >
                        {row.tier1Total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className="border border-[#444] p-2 text-center text-[white]"
                        style={{
                          background: `rgba(0, 255, 0, ${(row.month * 3.9) / 87})`,
                        }}
                      >
                        {row.tier2Interest.toFixed(2)}%
                      </td>
                      <td
                        className="border border-[#444] p-2 text-center text-[white]"
                        style={{
                          background: `rgba(0, 255, 0, ${(row.month * 3.9) / 87})`,
                        }}
                      >
                        {row.tier2Total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className="border border-[#444] p-2 text-center text-[white]"
                        style={{
                          background: `rgba(0, 255, 0, ${(row.month * 4.9) / 87})`,
                        }}
                      >
                        {row.tier3Interest.toFixed(2)}%
                      </td>
                      <td
                        className="border border-[#444] p-2 text-center text-[white]"
                        style={{
                          background: `rgba(0, 255, 0, ${(row.month * 4.9) / 87})`,
                        }}
                      >
                        {row.tier3Total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View - Simplified Tier Cards */}
            <div className="md:hidden space-y-6">
              {[
                {
                  tier: 'Tier 1',
                  principal: 'Under 10,000 CCX',
                  apr: '2.90%',
                  maxInterest: '4.00%',
                  example: '5,000 CCX',
                },
                {
                  tier: 'Tier 2',
                  principal: '10,000 - 19,999 CCX',
                  apr: '3.90%',
                  maxInterest: '5.00%',
                  example: '10,000 CCX',
                },
                {
                  tier: 'Tier 3',
                  principal: 'Over 20,000 CCX',
                  apr: '4.90%',
                  maxInterest: '6.00%',
                  example: '20,000 CCX',
                },
              ].map((tierInfo, tierIndex) => (
                <div
                  key={tierInfo.tier}
                  className="border border-[#444] rounded-lg p-4 bg-[rgba(255,255,255,0.02)]"
                >
                  <h3 className="text-[var(--color1)] text-xl font-semibold mb-4">
                    {tierInfo.tier}
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Principal:</span>
                      <span className="text-white">{tierInfo.principal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Base/APR:</span>
                      <span className="text-white">{tierInfo.apr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Max Interest:</span>
                      <span className="text-white">{tierInfo.maxInterest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Example:</span>
                      <span className="text-white">{tierInfo.example}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#444]">
                    <div className="text-[#757575] text-sm mb-2">
                      Sample Returns (First 6 months):
                    </div>
                    <div className="space-y-2 text-sm">
                      {tableRows.slice(0, 6).map((row) => {
                        const interest =
                          tierIndex === 0
                            ? row.tier1Interest
                            : tierIndex === 1
                              ? row.tier2Interest
                              : row.tier3Interest;
                        const total =
                          tierIndex === 0
                            ? row.tier1Total
                            : tierIndex === 1
                              ? row.tier2Total
                              : row.tier3Total;
                        return (
                          <div key={row.month} className="flex justify-between items-center">
                            <span className="text-[#757575]">Month {row.month}:</span>
                            <div className="flex gap-4">
                              <span className="text-white">{interest.toFixed(2)}%</span>
                              <span className="text-white">
                                {total.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
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
          </div>
        </form>
      </div>
    </section>
  );
}
