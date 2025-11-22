import { Button } from '@/components/ui/Button';

export function HelpdeskSection() {
  return (
    <section
      id="helpdesk"
      className="py-16 px-4 bg-[var(--color-bg-primary)] border-b border-[rgba(255,255,255,0.1)]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[3rem] text-[#E0E0E0] mb-8 leading-relaxed">
          <span data-tkey="helpdeskTitle">Do you have a problem or need to contact us?</span>
          <br />
          <span data-tkey="helpdeskText">Use our helpdesk</span>
        </h2>
        <div className="flex justify-center">
          <Button variant="primary" asChild>
            <a
              href="https://conceal.network/support/"
              id="helpdeskButton"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-tkey="helpdeskBtn">Send Ticket</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
