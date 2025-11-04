
interface SectionHeadingProps {
  subtitle: string;
  title: string;
  subtitleClassName?: string;
  titleClassName?: string;
}

export function SectionHeading({
  subtitle,
  title,
  subtitleClassName = 'text-[3rem] text-[orange] mb-0.25 text-center',
  titleClassName = 'text-[6rem] text-[white] mb-8 text-center [text-shadow:0_-0.1em_0.1em_#000,0_0.1em_0.1em_#000,-0.25em_0_0.25em_#000,0.25em_0_0.25em_#000]',
}: SectionHeadingProps) {
  return (
    <>
      <h3 className={subtitleClassName}>
        <span>{subtitle}</span>
      </h3>
      <h1 className={titleClassName}>
        {title}
      </h1>
    </>
  );
}

