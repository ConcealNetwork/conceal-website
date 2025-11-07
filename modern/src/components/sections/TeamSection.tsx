import { AnimatedElement } from '../ui/AnimatedElement';
import { SectionHeading } from '../ui/SectionHeading';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  socials: {
    github?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'krypt0x (aka 0x)',
    role: 'HEAD OF OPERATIONS',
    image: '/images/teampage/krypt0x.png',
    description:
      "I'm co-founder of Conceal Community. I'm curious about cryptography and privacy-enhancing techniques. I have been working on IT for more than two decades and became involved with blockchain technology early in its inception. My mission is to empower organizations with a culture of privacy-protection.",
    socials: {
      github: 'https://github.com/krypt0x',
      twitter: 'https://x.com/Krypt0xChaos',
    },
  },
  {
    name: 'Taegus',
    role: 'Head of Development',
    image: '/images/teampage/Taegus.png',
    description:
      'I got involved with crypto in 2018. Came for the money, and stayed for the vision of Satoshi. You could say I am a true believer now. Found out about Conceal in 2019 and instantly fell in love with it. I have been helping ever since.Other than that I have finished university for computer science and have over 20 years of development experience. My passion now is advocating decentralization and privacy.',
    socials: {
      github: 'https://github.com/taeguscromis',
      twitter: 'https://x.com/Taegus1',
    },
  },
  {
    name: 'Giomarx7',
    role: 'Head of Community',
    image: '/images/teampage/Giomarx7.jpg',
    description:
      "I started mining crypto in late 2016, did it mainly for the money but as I became more curious about the technology, I was eager to learn more, in 2018 I've found out about Conceal, this was a purpose worth fighting for, joined the team in 2024. Technology can enslave you, but it can also give you freedom and privacy #Conceal..",
    socials: {
      twitter: 'https://x.com/Giomarx7',
    },
  },
  /*
  {
    name: 'LolitaLollipop',
    role: 'HEAD OF Community',
    image: '/images/teampage/LolitaLollipop.png',
    description:
      "A lover of Freedom and Privacy, interested in Cryptography, and perfectly Anonymous. Discovering Conceal in early 2019 I was blown away by the Vision and the Adherence to the Core Principles found in the Satoshi Nakamoto whitepaper, and I've been here ever since. I'm on a personal mission to see Privacy become a normal part of everyone's daily life!",
    socials: {},
  },
  */
  {
    name: 'bomb-on',
    role: 'Developer',
    image: '/images/teampage/bombon.jpg',
    description:
      'Working in IT industry for more than 20 years, exploring the crypto world since 2016. as a miner and pools operator, joined CCX team in 2018 to help with macOS issues, currently focused on front-end development. Technical analysis enthusiast and very passionate about losing money while trading. Creating crappy art and shitty music.',
    socials: {
      github: 'https://github.com/bomb-on',
    },
  },
  {
    name: 'ThrownLemon',
    role: 'Developer',
    image: '/images/media/media_articles_02.png',
    description: 'With great power, comes great responsibility',
    socials: {
      github: 'https://github.com/ThrownLemon',
    },
  },
  {
    name: 'Acktarius',
    role: 'Lead Developer',
    image: '/images/teampage/Acktarius.png',
    description:
      "I came late to the cryptocurrency world and joined Conceal mid 2021, having a very keen interest for its unique privacy features. I 'm very excited to bring my experience as R&D engineer and time spent programming as a hobby, to this community of talented, discreet, passionate and dedicated people.",
    socials: {
      github: 'https://github.com/Acktarius',
      twitter: 'https://x.com/xchaps',
    },
  },
  {
    name: 'AxVultis',
    role: 'Developer',
    image: '/images/teampage/AxVultis.png',
    description:
      'I discovered Conceal in 2019 and joined the team in 2020 as a developer. I am contributing to this decentralized privacy focused project since then. I am a true defender of open source software.',
    socials: {
      github: 'https://github.com/AxVultis',
      twitter: 'https://x.com/AxVultis',
    },
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
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
            <span className="block mb-3 text-[1.4rem] text-[rgba(255,255,255,0.7)] uppercase tracking-[0.2rem]">
              CONCEAL TEAM
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              <span className="text-[orange] font-semibold">Alone</span> we can do so little;{' '}
              <span className="text-[orange] font-semibold">together</span> we can do so much.
            </h1>
          </AnimatedElement>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <SectionHeading title="Meet the team" />
          </AnimatedElement>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <AnimatedElement
              key={index}
              types={['fadeIn']}
              triggerImmediately={false}
              startOpacity={0.15}
            >
              <div className="team-card group text-center rounded-[2em] p-4 bg-[rgba(81,70,68,0.6)] hover:bg-[#2F4F4F] transition-all duration-500 h-full flex flex-col">
                <div className="team-img-wrapper relative mb-4 flex justify-center">
                  <div className="team-img rounded-full overflow-hidden relative opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:delay-200 w-[300px] h-[300px]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Decorative border circles - positioned to cover the full image */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-[13px] border-[#181A18] pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-[13px] border-t-[orange] border-r-[orange] border-b-[#181A18] border-l-[#181A18] -rotate-[10deg] group-hover:rotate-[350deg] transition-all duration-500 z-10 pointer-events-none"></div>
                  </div>
                </div>
                <h3 className="team-name text-[1.625rem] font-normal mb-2.5 mt-4 relative pb-2.5">
                  {member.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30px] h-[2px] bg-[orange]"></span>
                </h3>
                <span className="role block text-m uppercase italic text-white group-hover:text-[orange] group-hover:not-italic transition-all duration-300">
                  {member.role}
                </span>
                <ul className="socials flex justify-center gap-1.5 list-none p-0 mt-4">
                  {member.socials.github && (
                    <li>
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-10 h-10 leading-10 rounded-full text-black hover:text-[orange] hover:bg-black transition-all duration-300"
                      >
                        <i className="fab fa-github text-3xl"></i>
                      </a>
                    </li>
                  )}
                  {member.socials.twitter && (
                    <li>
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-10 h-10 leading-10 rounded-full text-black hover:text-[orange] hover:bg-black transition-all duration-300"
                      >
                        <i className="fab fa-twitter text-3xl"></i>
                      </a>
                    </li>
                  )}
                </ul>
                <div className="tdesc max-w-[300px] mx-auto mt-4 flex-1 flex items-start">
                  <p className="desc text-2xl text-white m-0 pb-2.5 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-16">
          <SectionHeading
            variant="withDescription"
            title="Team"
            description="The Conceal Team is a group of dedicated Volunteers from the Community who have committed time and energy into managing the Development, Marketing, and Community Building efforts of the Conceal Network."
          />
          <div className="mt-8 space-y-4">
            <AnimatedElement types={['dragText']}>
              <p className="text-[1.7rem] text-[#757575]">
                Conceal Team members operate as a DAO, or Decentralized Autonomous Organization, and
                each member will take on tasks that He or She can specialize in, voluntarily and
                without the presence of any third party or legal body. In order to further organize
                the day to day operations of our DAO, the Team has created Divisions with separate
                responsibilities so that members can further specialize in the overall development
                and growth of the network.
              </p>
            </AnimatedElement>
            <AnimatedElement types={['dragText']}>
              <p className="text-[1.7rem] text-[#757575]">
                Conceal Team members are from all four corners of the world and are spread out
                around many varied geographical locations! This means that organizing events and
                other types of online gatherings can be tricky, but not impossible. Anyone can join
                as long as they are willing to commit more time into the Conceal ecosystem and have
                the necessary skill to help make it succeed!
              </p>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}
