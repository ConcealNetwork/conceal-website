export function Error504Page() {
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
            Error 504. Server is unavailable
          </h2>
          <p className="text-[1.7rem] text-[#757575] mb-6 leading-[1.8]">
            The server is temporary unavailable. Please accept our apologies for the inconveniences
            this might cause to you.
          </p>
          <p className="text-[1.7rem] text-[#757575] leading-[1.8]">
            Please try to access the site later.
          </p>
        </div>
      </div>
    </div>
  );
}
