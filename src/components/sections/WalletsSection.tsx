import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedElement } from '../ui/AnimatedElement';

export function WalletsSection() {
  return (
    <section
      id="wallets"
      className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
      }}
    >
      <div className="max-w-[66%] mx-auto">
        <SectionHeading
          subtitle={<span data-tkey="usingConceal">Using Conceal</span>}
          title={<span data-tkey="rWallets">Wallets</span>}
        />

        {/* Conceal-Desktop */}
        <h3 className="text-[2.4rem] text-[orange] uppercase mb-4 text-center">
          Conceal-Desktop | Full-Node Graphical Wallet
        </h3>

        <p className="text-[1.7rem] text-[white] mb-6 text-center" data-tkey="aboutUsingConceal">
          Conceal Desktop is the central point of interaction for the primary features of Conceal
          and is available for all major platforms. With Conceal Desktop you can send and receive
          CCX and encrypted secure messages, and manage your deposits.
        </p>
        <AnimatedElement types={['crtPowerOn']} speed="fast">
          <img
            src="/images/newgui.png"
            alt="Conceal GUI"
            className="block mx-auto mb-6 w-full h-auto"
          />
        </AnimatedElement>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="download" asChild>
            <a
              href="https://github.com/ConcealNetwork/conceal-desktop/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <i className="fab fa-windows text-2xl"></i>
              Windows
            </a>
          </Button>
          <Button variant="download" asChild>
            <a
              href="https://github.com/ConcealNetwork/conceal-desktop/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <i className="fab fa-ubuntu text-2xl"></i>
              Ubuntu/Linux
            </a>
          </Button>
          <Button variant="download" asChild>
            <a
              href="https://github.com/ConcealNetwork/conceal-desktop/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <i className="fab fa-apple text-2xl"></i>
              MacOS
            </a>
          </Button>
        </div>
        <div className="h-[1.5rem]"></div>
        {/* Conceal-Core */}
        <h3 className="text-[2.4rem] text-[orange] uppercase mb-4 text-center">
          Conceal-Core | Full-Node Command Line Wallet
        </h3>
        <p className="text-[1.7rem] text-[white] mb-6 text-center">
          Conceal-Core is the heart of our peer-to-peer privacy-preserving network. It's a full
          local node of our network.
        </p>
        <AnimatedElement types={['crtPowerOn']} speed="slow">
          <img
            src="/images/wallets-cli.jpg"
            alt="Conceal CLI"
            className="block mx-auto mb-6 w-full h-auto"
          />
        </AnimatedElement>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="download" asChild>
            <a
              href="https://github.com/ConcealNetwork/conceal-core/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8"
            >
              <i className="fab fa-windows text-2xl"></i>
              Windows
            </a>
          </Button>
          <Button variant="download" asChild>
            <a
              href="https://github.com/ConcealNetwork/conceal-core/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8"
            >
              <i className="fab fa-linux text-2xl"></i>
              Linux
            </a>
          </Button>
          <Button variant="download" asChild>
            <a
              href="https://github.com/ConcealNetwork/conceal-core/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8"
            >
              <i className="fab fa-apple text-2xl"></i>
              MacOS
            </a>
          </Button>
        </div>

        <div className="h-[1.5rem]"></div>
        {/* Web Wallet Types */}
        <h3 className="text-[2.4rem] text-[orange] uppercase mb-4 text-center">
          Web Wallet & Paper Wallet
        </h3>
        <p className="text-[1.7rem] text-[white] mb-6 text-center">
          Conceal Web Wallet runs in your Browser on any device, Mobile, PC or Mac! It is completely
          Client-Side, stores your encrypted wallet keys on your device, and is the perfect
          lightweight alternative to the Full Node Wallet. The Conceal Paper wallet is the easiest
          way to create an offline wallet with simple Key generation tools.
        </p>
        <AnimatedElement types={['crtPowerOn']} speed="normal">
          <img
            src="/images/webwallet.png"
            alt="Conceal Web Wallet"
            className="block mx-auto mb-6 max-w-full"
          />
        </AnimatedElement>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="download" asChild>
            <a
              href="https://conceal.network/paperwallet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8"
            >
              <i className="fas fa-paper-plane text-2xl"></i>
              Offline/Paper
            </a>
          </Button>
          <Button variant="download" asChild>
            <a
              href="https://wallet.conceal.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8"
            >
              <i className="fab fa-chrome text-2xl"></i>
              Web Wallet
            </a>
          </Button>
        </div>
      </div>
      <div className="h-[3rem]"></div>
      {/* Conceal-Mobile */}
      <h3 className="text-[2.4rem] text-[orange] uppercase mb-4 text-center">
        Conceal-Mobile | Lite Wallet
      </h3>
      <p className="text-[1.7rem] text-[white] mb-12 text-center">
        Conceal-Mobile is a wrapped version of our web wallet.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Button variant="download" asChild>
          <a
            href="https://github.com/ConcealNetwork/conceal-wallet-cordova/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-8"
          >
            <i className="fab fa-android text-2xl"></i>
            Android APK
          </a>
        </Button>
        <Button variant="download" asChild>
          <a
            href="https://f-droid.org/packages/com.concealnetwork.concealmobile/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-8"
          >
            <i className="fab fa-android text-2xl"></i>
            F-Droid
          </a>
        </Button>
        <Button variant="download" asChild>
          <a
            href="https://wallet.conceal.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-8"
          >
            <i className="fab fa-apple text-2xl"></i>
            iOS
          </a>
        </Button>
      </div>
    </section>
  );
}
