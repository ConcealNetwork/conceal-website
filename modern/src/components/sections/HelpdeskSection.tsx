
export function HelpdeskSection() {
  return (
    <section id="helpdesk" className="py-16 px-4 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.2)]" style={{ background: 'linear-gradient(to bottom, rgba(34,34,34,1) 0%, rgba(34,34,34,0) 30%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,1) 100%)' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[3rem] text-[#ddd] mb-8">
          <span>Do you have a problem or need to contact us?</span>
          <br />
          <span>Use our helpdesk</span>
        </h2>
        <ul className="flex justify-center list-none">
          <li>
            <a
              href="https://conceal.network/support/"
              id="helpdeskButton"
              target="_blank"
              rel="noopener"
              className="text-[orange] hover:text-[#fafafa] transition-colors text-[1.4rem] uppercase tracking-[0.3rem]"
            >
              <span>Send Ticket</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

