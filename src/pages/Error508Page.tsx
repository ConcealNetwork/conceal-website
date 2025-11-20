export function Error508Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-[#B0B0B0] text-[1.7rem] leading-[1.8] p-8"
      style={{ fontFamily: 'var(--font-family)', backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div
        id="block_error"
        className="text-center max-w-[600px] p-16 bg-[rgba(17,17,17,0.8)] border border-[rgba(255,255,255,0.1)] rounded-lg"
      >
        <div>
          <h2 className="text-[3.6rem] text-[var(--color1)] mb-8 font-semibold">
            Error 508. Resource Limit Is Reached
          </h2>
          <p className="text-[1.7rem] text-[#757575] mb-6 leading-[1.8]">
            The website is temporarily unable to service your request as it exceeded resource limit.
            Please try again later.
          </p>
          <p className="text-[1.7rem] text-[#757575] mb-6 leading-[1.8]">
            Please read more about this error in our{' '}
            <a
              href="http://www.namecheap.com/support/knowledgebase/article.aspx/1128/103/what-happens-when-my-account-reaches-lve-limits-diagnosing-and-resolving"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color1)] hover:underline"
            >
              knowledgebase
            </a>
          </p>
          <p className="text-[1.7rem] text-[#757575] leading-[1.8]">
            If you are the owner of the account and you see this error not for the first time please
            consider upgrading your plan to the package with higher resource allocation.
          </p>
        </div>
      </div>
    </div>
  );
}
