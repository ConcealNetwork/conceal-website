import { AnimatedElement } from '../ui/AnimatedElement';

export function PrivacySection() {
  return (
    <section id="privacy" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
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
              <span className="text-[var(--color1)]">Privacy Policy</span>
            </h1>
          </AnimatedElement>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">What We Collect</h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                We collect standard server logs from our webserver. All data processed is
                anonymized. Like many site operators, we collect information that your browser sends
                whenever you visit our site ("Log Data"). This Log Data may include information such
                as your computer's Internet Protocol ("IP") address (with replaced last byte),
                browser type, browser version, the pages of our site that you visit, the time and
                date of your visit, the time spent on those pages and other statistics.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                What We Use the Data For
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                Server log data is used to provide statistics on the website and help us to improve
                the content and the information flow. This data is also used to analyze errors and
                diagnose requests to dead links.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">
                Changes of Privacy Policy
              </h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                We may update this privacy policy from time to time. We will notify you of any
                changes by posting the new privacy policy on the Site. You are advised to review
                this privacy policy periodically for any changes.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">Contact</h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                If you have any questions about our privacy policy, or how your data is being
                collected and processed, please{' '}
                <a
                  href="https://conceal.network/support/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color1)] hover:underline"
                >
                  contact us through the helpdesk
                </a>
                .
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
            <div className="pl-6 lg:pl-6">
              <h4 className="text-[2rem] text-[var(--color1)] mb-6 underline">Latest Updated</h4>
              <p className="text-[1.7rem] text-[#757575] mb-4">
                This Privacy Policy was last updated: 18th October, 2021.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
