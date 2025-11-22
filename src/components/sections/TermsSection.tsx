import { AnimatedElement } from '../ui/AnimatedElement';

export function TermsSection() {
  return (
    <section id="terms" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
      {/* Background image */}
      <div
        id="herobg"
        className="absolute top-0 left-0 w-full h-full bg-[url('/images/background_bw.jpg')] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundAttachment: 'fixed',
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
        {/* Hero Title Section */}
        <div className="mb-16">
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 text-center [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              <span className="text-[var(--color1)]">Terms & Conditions</span>
            </h1>
          </AnimatedElement>
        </div>

        {/* Definitions Section */}
        <div className="mb-12">
          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">Definitions</h4>
              <div className="space-y-4">
                <p className="text-[1.7rem] text-[#757575]">
                  <strong className="text-white">Conceal Team:</strong> Refers to the collective
                  group of volunteers, contributors, developers, and community members who
                  contribute to the Conceal Network project. There is no formal company or legal
                  entity behind Conceal Network.
                </p>
                <p className="text-[1.7rem] text-[#757575]">
                  <strong className="text-white">Lab Project:</strong> Refers to experimental,
                  conceptual, or community-funded projects showcased through the Conceal Labs
                  initiative. These projects are designed to encourage creativity and innovation in
                  the blockchain sphere but are provided "AS IS" without warranties.
                </p>
                <p className="text-[1.7rem] text-[#757575]">
                  <strong className="text-white">
                    DAO (Decentralized Autonomous Organization):
                  </strong>{' '}
                  Refers to the decentralized governance structure of Conceal Network, where
                  decisions are made through community consensus and voting mechanisms rather than a
                  centralized authority.
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                About Conceal Network
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Conceal is an open source community project, which means that there is no company
                behind it. This project is supported by the community, meaning there is no stable,
                full-time team and no physical headquarters from which the projects runs its
                operations. The advantage here is that anyone can propose changes or improvements to
                the blockchain, and, if the suggestion is voted by a majority of people, the changes
                are then implemented. This project is intended to be a community project not a
                commercial product and relies on volunteers availibility.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">No Warranty</h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Conceal is distributed in the hope that it will be useful to mankind, but WITHOUT
                ANY WARRANTY; without even the implied warranty of MERCHANT ABILITY or FITNESS FOR A
                PARTICULAR PURPOSE. There is no warranty that the coins generated/accrued will worth
                anything.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                No Financial Advice
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                The views provided in this community are from own authors. Our posts do not offer
                investment advice and nothing in them should be construed as investment advice. You
                must be satisfied that this crypto offering is suitable for you in light of your
                financial circumstances and attitude towards risk before starting. The price or
                value of cryptocurrencies can rapidly increase or decrease at any time (and may even
                fall to zero). The risk of loss in holding cryptocurrencies can be substantial.
                Funds received by us in relation to cryptocurrency transactions will not be
                safeguarded (under the UK Electronic Money Regulations 2011) or covered by the
                Financial Services Compensation Scheme. We do not make any representation regarding
                the advisability of transacting in cryptocurrency. We cannot guarantee the
                timeliness, accurateness, or completeness of any data or information used in
                connection with you holding any exposure to cryptocurrencies.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">Copyright</h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy of this
                software and associated documentation files (the "Software"), to deal in the
                Software without restriction, including without limitation the rights to use, copy,
                modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
                and to permit persons to whom the Software is furnished to do so, subject to the
                following conditions: The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software. THE SOFTWARE IS
                PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
                NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
                AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
                FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE. Conceal Network project released under the MIT
                license.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                Reliance on Information Posted
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                The information presented on or through the Website is made available solely for
                general information purposes. We do not warrant the accuracy, completeness, or
                usefulness of this information. Any reliance you place on such information is
                strictly at your own risk and should not be viewed in any way as investment advice.
                We disclaim all liability and responsibility arising from any reliance placed on
                such materials by you or any other visitor to the Website, or by anyone who may be
                informed of any of its contents. This Website may include content provided by third
                parties, including materials provided by other users, bloggers, and third-party
                licensors, syndicators, aggregators, and/or reporting services. All statements
                and/or opinions expressed in these materials, and all articles and responses to
                questions and other content, other than the content provided by the Company, are
                solely the opinions and the responsibility of the person or entity providing those
                materials. These materials do not necessarily reflect the opinion of the
                Conceal.Network team. We are not responsible, or liable to you or any third party,
                for the content or accuracy of any materials provided by any third parties. The
                inclusion of third-party links or content does not imply endorsement,
                recommendation, or affiliation with such third parties by Conceal Network, Conceal
                DAO, Conceal Team, or Conceal Developers.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                Limitation on Liability.
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE CONCEAL TEAM, ITS
                AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR
                DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF
                OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES
                LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY
                DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF
                REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS
                OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH
                OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. THE FOREGOING DOES NOT AFFECT ANY
                LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                User Responsibility & Security
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Users are responsible for ensuring their devices, operating systems, and software
                are secure before using any Conceal Network software or wallets. This includes
                protecting against malware, phishing attacks, keyloggers, and other security
                threats. Users should keep their software updated and use reputable antivirus and
                security software. The Conceal Team does not assume responsibility for losses
                arising from compromised devices or user negligence in maintaining device security.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                Private Keys Backup
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Conceal.Desktop, Conceal-Web-Wallet and Conceal.Mobile are an open-source,
                client-side, free wallets which allow you to send and receive CCX instantly on the
                blockchain. You are in control of your funds & your keys. When you generate a new
                wallet, login, send, receive or deposit $CCX everything happens locally. Your seed
                is never transmitted, received or stored. That's why its imperative to write, print
                or save your seed somewhere safe. The backup of keys is your responsibility. If you
                lose your seed, your account can not be recovered. The Conceal Team doesn't take any
                responsibility for lost funds due to nonexistent/missing/lost private keys.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">Lab Projects</h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Conceal Network uses the Lab Project initiative to encourage creativity and
                innovation in the blockchain sphere. However, Conceal Network, Conceal DAO, Conceal
                Team, and Conceal Developers cannot be held responsible for any losses, damages,
                data loss, financial losses, security breaches, or any other harm arising from the
                use of such conceptual products. Lab Projects are provided "AS IS" without any
                warranties or guarantees. Users participate in Lab Projects at their own risk and
                should exercise due diligence before engaging with any Lab Project. The Conceal
                Network disclaims all liability for any consequences resulting from the use, misuse,
                or inability to use Lab Projects, including but not limited to loss of funds, loss
                of data, system failures, or any other adverse effects.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                Data Handling Policy
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Conceal Network is committed to privacy by design. We do not collect or retain
                personal data through our software or websites. All transactions and communications
                are processed locally on your device. For more information about our privacy
                practices, please{' '}
                <a href="/privacy" className="text-[var(--color1)] hover:underline font-semibold">
                  READ OUR PRIVACY PAGE
                </a>
                .
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
