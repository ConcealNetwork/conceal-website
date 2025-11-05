import { loadImagesWithPattern } from '../../utils/loadImagesFromFolder';
import { AnimatedElement } from '../ui/AnimatedElement';
import { Button } from '../ui/Button';
import { Carousel } from '../ui/Carousel';
import { SectionHeading } from '../ui/SectionHeading';

interface LabProject {
  title: string;
  description: string;
  labeltolink: string;
  projecturl: string;
  labeltodocument: string;
  documentlink: string;
  linktoscreenshotfolder: string;
  imagePattern?: string;
  imageCount?: number;
  imageExtension?: string;
}

const labsProjects: LabProject[] = [
  {
    title: 'Conceal-Authenticator',
    description:
      'Conceal-Authenticator is a secure 2FA (Two-Factor Authentication) app that leverages the Conceal Network blockchain to securely backup your 2FA shared keys using a built-in lite wallet.',
    labeltolink:
      'You can go the the github page for more info and for downloads by clicking on this url.',
    projecturl: 'https://github.com/Acktarius/Conceal-2fa-app/',
    labeltodocument: 'You can find more information about the product in wiki page.',
    documentlink: 'https://github.com/Acktarius/Conceal-2fa-app/wiki',
    linktoscreenshotfolder: '/images/labs/ccxauthenticator',
    imagePattern: 'authenticator',
    imageCount: 5,
    imageExtension: 'png',
  },
  {
    title: 'Conceal-Assistant',
    description:
      'Conceal-Assistant is an application made to help you oversee and manage your CCX-Box Node and Miner operations. It simply checks the status of the associated services and also allows you to easily deactivate or activate those services from any device.\n\nThe CCX-Box is a small form-factor PC that will run a Conceal Network Full-Node and Miner out of the box. Utilizing the Conceal-Assistant, this small dedicated Node can be managed remotely and will earn $CCX over time.',
    labeltolink:
      'You can go the the github page for more info and for downloads by clicking on this url.',
    projecturl: 'https://github.com/Acktarius/conceal-assistant',
    labeltodocument: 'You can find more information about the product in this PDF.',
    documentlink: '/labs/data/conceal-assistant_info.pdf',
    linktoscreenshotfolder: '/images/labs/ccxassistant',
    imagePattern: 'assistant',
    imageCount: 5,
    imageExtension: 'png',
  },
];

function ProjectCard({ project }: { project: LabProject }) {
  // Generate image paths from folder
  const imagePattern = project.imagePattern || 'assistant';
  const imageCount = project.imageCount || 5;
  const imageExtension = project.imageExtension || 'png';
  const carouselImages = loadImagesWithPattern(
    project.linktoscreenshotfolder,
    imagePattern,
    imageCount,
    imageExtension
  );

  // Split description by newlines
  const descriptionParagraphs = project.description.split('\n').filter((p) => p.trim());

  return (
    <div id={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}`} className="mb-16">
      <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
        <h1 className="text-[4rem] uppercase text-[orange] mb-6">{project.title}</h1>
      </AnimatedElement>

      {descriptionParagraphs.map((paragraph, index) => (
        <AnimatedElement key={index} types={['fadeIn']} triggerImmediately={false}>
          <p className="text-[1.7rem] text-[#757575] mb-4">{paragraph}</p>
        </AnimatedElement>
      ))}

      <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
        <p className="text-[1.7rem] text-[#757575] mb-4">
          <a
            href={project.projecturl}
            className="text-[orange] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.labeltolink}
            <i className="fab fa-github ml-2"></i>
          </a>
        </p>
      </AnimatedElement>

      <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
        <p className="text-[1.7rem] text-[#757575] mb-6">
          <a
            href={project.documentlink}
            className="text-[orange] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.labeltodocument}
            <i className="fas fa-file-pdf ml-2"></i>
          </a>
        </p>
      </AnimatedElement>

      <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
        <h3 className="text-2xl uppercase text-[orange] mb-6">How it looks...</h3>
      </AnimatedElement>

      <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
        <Carousel images={carouselImages} altPrefix={project.title} className="max-w-4xl mx-auto" />
      </AnimatedElement>
    </div>
  );
}

export function LabsSection() {
  return (
    <section id="labs" className="py-16 px-4 border-b border-[rgba(255,255,255,0.2)] relative">
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
              CONCEAL LABS
            </span>
          </AnimatedElement>
          <AnimatedElement types={['fadeIn']} triggerImmediately={true} offset={0}>
            <h1 className="text-[4rem] md:text-[5rem] text-white mb-6 [text-shadow:0_0_24px_rgba(0,0,0,0.9)]">
              Bring your dreams <em className="text-[orange]">forward</em>
            </h1>
          </AnimatedElement>
          <div className="flex flex-wrap gap-4">
            <Button variant="slide" asChild href="https://discord.gg/YbpHVSd">
              <i className="fas fa-pencil-alt text-xl mr-2"></i>
              <span>Apply</span>
            </Button>
            <Button variant="slideToId" targetId="labsHeading">
              <i className="fas fa-flask text-xl mr-2"></i>
              <span>Projects</span>
            </Button>
            <Button variant="slideToId" targetId="about">
              <i className="fab fa-leanpub text-xl mr-2"></i>
              <span>Learn More</span>
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <SectionHeading title="About" />
              </AnimatedElement>
            </div>
            <div className="lg:col-span-2">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <p className="text-[1.7rem] text-[#757575]">
                  We strive to grow a broad ecosystem by supporting the community. Conceal Labs
                  provides developers, entrepreneurs & creators with the jump start that they need
                  to make vision a reality.
                </p>
              </AnimatedElement>
            </div>
          </div>
        </div>

        {/* Feature Sections */}
        <div className="space-y-24 mb-24">
          {/* Have an idea? */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <div
                  className="w-auto max-w-[340px] h-[322px] mx-auto"
                  style={{
                    backgroundImage: "url('/images/labs/landingLabsScreenshots.png')",
                    backgroundPositionY: '0',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
              </AnimatedElement>
            </div>
            <div className="order-1 lg:order-2 pl-0 lg:pl-12">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <h2 className="text-3xl uppercase text-[orange] mb-6">Have an idea?</h2>
              </AnimatedElement>
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <p className="text-[1.7rem] text-[#757575] mb-4">
                  Do you have a project that involves Conceal in some way?{' '}
                  <a href="https://discord.gg/YbpHVSd" className="text-[orange] hover:underline">
                    We want to hear about it!
                  </a>
                </p>
              </AnimatedElement>
            </div>
          </div>

          {/* Would money help? */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-1 lg:order-2">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <div
                  className="w-auto max-w-[340px] h-[340px] mx-auto"
                  style={{
                    backgroundImage: "url('/images/labs/landingLabsScreenshots.png')",
                    backgroundPositionY: '-322px',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
              </AnimatedElement>
            </div>
            <div className="order-2 lg:order-1 pr-0 lg:pr-12">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <h2 className="text-3xl uppercase text-[orange] mb-6">Would money help?</h2>
              </AnimatedElement>
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <p className="text-[1.7rem] text-[#757575] mb-4">
                  Sometimes money is just what it takes to get your idea off the ground.
                </p>
              </AnimatedElement>
            </div>
          </div>

          {/* Get funded by us */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <div
                  className="w-auto max-w-[340px] h-[340px] mx-auto"
                  style={{
                    backgroundImage: "url('/images/labs/landingLabsScreenshots.png')",
                    backgroundPositionY: '-662px',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
              </AnimatedElement>
            </div>
            <div className="order-1 lg:order-2 pl-0 lg:pl-12">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <h2 className="text-3xl uppercase text-[orange] mb-6">Get funded by us</h2>
              </AnimatedElement>
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <p className="text-[1.7rem] text-[#757575] mb-4">
                  Our creators set aside funds for the community to use for projects.
                </p>
              </AnimatedElement>
            </div>
          </div>

          {/* Get listed by us */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-1 lg:order-2">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <div
                  className="w-auto max-w-[340px] h-[265px] mx-auto"
                  style={{
                    backgroundImage: "url('/images/labs/landingLabsScreenshots.png')",
                    backgroundPositionY: '-1002px',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
              </AnimatedElement>
            </div>
            <div className="order-2 lg:order-1 pr-0 lg:pr-12">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <h2 className="text-3xl uppercase text-[orange] mb-6">Get listed by us</h2>
              </AnimatedElement>
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <p className="text-[1.7rem] text-[#757575] mb-4">
                  Get funded by us and we will list your project here on our website.
                </p>
              </AnimatedElement>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div id="labsHeading" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <SectionHeading title="Projects" />
              </AnimatedElement>
            </div>
            <div className="lg:col-span-2">
              <AnimatedElement types={['fadeIn']} triggerImmediately={false}>
                <p className="text-[1.7rem] text-[#757575]">
                  Check out some of the cool projects we have funded.{' '}
                  <a href="https://discord.gg/YbpHVSd" className="text-[orange] hover:underline">
                    Apply to be next!
                  </a>
                </p>
              </AnimatedElement>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div id="labsProjects">
          {labsProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
