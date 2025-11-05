import type React from 'react';
import { AnimatedElement } from './AnimatedElement';

interface SectionHeadingProps {
  subtitle?: string | React.ReactNode;
  title?: string | React.ReactNode;
  subtitleClassName?: string;
  titleClassName?: string;
  variant?: 'default' | 'withDescription';
  description?: string | React.ReactNode;
}

export function SectionHeading({
  subtitle,
  title,
  subtitleClassName = 'text-[3rem] text-[orange] text-center mb-[-2rem] [text-shadow:0_-0.1em_0.1em_#000,0_0.1em_0.1em_#000,-0.25em_0_0.25em_#000,0.25em_0_0.25em_#000]',
  titleClassName = 'text-[6rem] text-[white] mb-8 text-center [text-shadow:0_-0.1em_0.1em_#000,0_0.1em_0.1em_#000,-0.25em_0_0.25em_#000,0.25em_0_0.25em_#000]',
  variant = 'default',
  description,
}: SectionHeadingProps) {
  if (variant === 'withDescription') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-center">
        <div className="flex flex-col">
          <h2 className={titleClassName + ' border-b-2 border-[orange] w-[90%] mt-2 mx-auto'}>
            {title}
          </h2>
        </div>
        <div className="overflow-hidden">
          {description && (
            <AnimatedElement types={['slideInRight']} triggerImmediately={true} offset={0}>
              <p className="text-[1.7rem] text-[#757575] leading-relaxed">{description}</p>
            </AnimatedElement>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className={subtitleClassName}>
        <span>{subtitle}</span>
      </h3>
      <h1 className={titleClassName}>{title}</h1>
    </>
  );
}
