import { AnimatedElement } from '../ui/AnimatedElement';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

export function AboutSection() {
  return (
    <section
      className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4">
        {/* Hero Title Section */}
        <div className="mb-16">
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <span className="block mb-3 text-[1.4rem] text-[rgba(255,255,255,0.7)] uppercase tracking-[0.2rem]">
              ABOUT CONCEAL
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              Privacy-Protected <span className="text-[orange] font-semibold"> De-Fi</span> &
              Encrypted <span className="text-[orange] font-semibold">Communications</span>
            </h1>
          </AnimatedElement>
          <div className="flex flex-wrap gap-4">
            <Button variant="slideToId" targetId="about" scrollOffset={120}>
              <i className="fab fa-leanpub text-xl mr-2"></i>
              <span>Learn More</span>
            </Button>
            <Button variant="slide" asChild href="/#wallets">
              <i className="fab fa-connectdevelop text-xl mr-2"></i>
              <span>Use Conceal</span>
            </Button>
            <Button variant="slide" asChild href="/#mining">
              <i className="fas fa-microchip text-xl mr-2"></i>
              <span>Get CCX</span>
            </Button>
          </div>
        </div>

        {/* About Section Header */}
        <div id="about" className="scroll-mt-48">
          <SectionHeading
            variant="withDescription"
            title="About"
            description="Conceal Network provides the ability for individuals to communicate and financially interact with each other in a privately, anonymous and decentralized manner."
          />
        </div>

        <div className="h-[5rem]"></div>

        {/* What is Conceal */}
        <div className="mb-12 pl-6 lg:pl-6">
          <h3 className="text-[2.4rem] text-[orange] mb-6" data-tkey="about_title">
            What is Conceal?
          </h3>
          <div className="space-y-4">
            <p className="text-[1.7rem] text-[#757575]">
              Conceal is a decentralized privacy-protected network designed for De-Fi and encrypted
              communications. It offers protocol-level private transactions, blockchain deposits and
              on-chain encrypted messages without a central authority.
            </p>
            <p className="text-[1.7rem] text-[#757575]">
              Conceal is censorship-resistant and accessible by anyone regardless of their
              geographic location or status. All interactions, transactions and messages are private
              and untraceable.
            </p>
            <p className="text-[1.7rem] text-[#757575]">
              Conceal is powered by open-source code, community-driven and truly decentralized.
            </p>
            <AnimatedElement types={['dragText']}>
              <p className="text-[1.7rem] text-[#757575]">
                No one owns Conceal, everyone can take part.
              </p>
            </AnimatedElement>
          </div>
        </div>

        {/* Vision */}
        <div className="mb-12 pl-6 lg:pl-6">
          <h4 className="text-[2rem] text-[orange] mb-6" data-tkey="vision_title">
            VISION
          </h4>
          <p className="text-[1.7rem] text-[#757575]" data-tkey="vision_desc">
            Conceal ($CCX) envisions a future where privacy is not just a luxury but a fundamental
            human right, especially in the digital realm. Inspired by the Cypherpunk Manifesto,
            Conceal is dedicated to building anonymous systems and defending privacy with
            cryptography. We believe in empowering individuals with tools and technologies that
            enable them to protect their privacy, resist surveillance, and maintain control over
            their personal data.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-12 pl-6 lg:pl-6">
          <h4 className="text-[2rem] text-[orange] mb-6" data-tkey="mission_title">
            MISSION
          </h4>

          <p className="text-[1.7rem] text-[#757575]" data-tkey="mission_desc">
            Our mission is to provide individuals with a privacy-focused cryptocurrency that
            embodies the principles of the Cypherpunk movement. By leveraging advanced cryptographic
            techniques, Conceal ensures that every transaction is private, secure, and
            censorship-resistant. We aim to create a decentralized financial ecosystem where users
            have full control over their funds and can transact freely without fear of surveillance
            or interference.
          </p>
        </div>

        {/* Privacy by Design */}
        <div className="mb-12 pl-6 lg:pl-6">
          <h4 className="text-[2rem] text-[orange] mb-6" data-tkey="privacy_title">
            PRIVACY BY DESIGN
          </h4>
          <AnimatedElement types={['dragText']} speed="fast">
            <p className="text-[1.7rem] text-[#757575]" data-tkey="privacy_desc">
              Conceal's privacy design is rooted in the Cypherpunk ethos, focusing on anonymity,
              decentralization, and cryptographic privacy. With unique one-time addresses for each
              payment, Conceal ensures that transactions are unlinkable and untraceable, preserving
              user privacy in the digital age. Our use of ring signatures and cryptographic
              signatures further enhances privacy, making it virtually impossible for third parties
              to monitor or track transactions.
            </p>
          </AnimatedElement>
        </div>

        {/* Community & Development */}
        <div className="mb-12 pl-6 lg:pl-6">
          <h4 className="text-[2rem] text-[orange] mb-6" data-tkey="community_title">
            COMMUNITY & DEVELOPMENT
          </h4>

          <AnimatedElement types={['dragText']}>
            <p className="text-[1.7rem] text-[#757575]" data-tkey="community_desc">
              At the heart of Conceal is a vibrant and passionate community of individuals dedicated
              to preserving privacy and advancing the Cypherpunk agenda. Our developers are
              committed to writing code that defends privacy and empowers users, following the
              Cypherpunk tradition of publishing open-source software for the benefit of all. We
              believe in decentralization not just as a technical concept but as a social movement,
              where individuals come together to reclaim their privacy and freedom.
            </p>
          </AnimatedElement>
        </div>

        {/* Decentralization & Resistance */}
        <div className="mb-12 pl-6 lg:pl-6">
          <h4 className="text-[2rem] text-[orange] mb-6" data-tkey="decentralization_title">
            DECENTRALIZATION & RESISTANCE
          </h4>

          <AnimatedElement types={['dragText']}>
            <p className="text-[1.7rem] text-[#757575]" data-tkey="decentralization_desc">
              Conceal is more than just a cryptocurrency; it's a symbol of resistance against
              centralized control and surveillance. With a decentralized network powered by
              blockchain technology, Conceal ensures that no single entity or authority can dictate
              the rules or monitor transactions. We stand firm in our commitment to decentralization
              and resistance, empowering individuals to take back control of their financial
              sovereignty.
            </p>
          </AnimatedElement>
        </div>

        {/* Join the Privacy Revolution */}
        <div className="mb-12 pl-6 lg:pl-6">
          <h4 className="text-[2rem] text-[orange] mb-6" data-tkey="revolution_title">
            JOIN THE PRIVACY REVOLUTION
          </h4>

          <AnimatedElement types={['dragText']}>
            <p className="text-[1.7rem] text-[#757575]" data-tkey="revolution_desc">
              In a world where privacy is increasingly under threat, Conceal offers a beacon of hope
              for those who value freedom, anonymity, and privacy. Join us in our mission to build a
              more private and secure future, where individuals have the power to transact freely
              and privately, without fear of censorship or surveillance. Together, we can make
              privacy a reality in the digital age.
            </p>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
