import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BaseButtonProps {
  variant?: 'primary' | 'stroke' | 'default' | 'download' | 'slide';
  size?: 'default' | 'medium' | 'large';
  fullWidth?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
}

interface ButtonAsAnchorProps extends BaseButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild: true;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', fullWidth, children, ...props }, ref) => {
    const baseClasses = cn(
      // Base styles from main.css
      'inline-flex font-sans text-sm uppercase tracking-wider',
      'h-[5.4rem] leading-[5rem] px-[3rem] cursor-pointer',
      'transition-all duration-300 ease-in-out',
      'border-2 border-[#c5c5c5]',
      'items-center',

      // Variants
      variant === 'primary' && [
        'bg-black text-white border border-[orange] rounded-[0.5rem] text-2xl',
        'hover:bg-[orange] hover:text-black hover:border-2 hover:border-white',
      ],
      variant === 'stroke' && [
        'bg-transparent border-2 border-[orange] text-white rounded-[10px]',
        'hover:border-white hover:bg-[orange]',
      ],
      variant === 'default' && [
        'bg-transparent text-white',
        'hover:bg-[#b8b8b8] hover:border-[#b8b8b8]',
      ],
      variant === 'download' && [
        'bg-black text-white border border-[orange] rounded-[0.5rem] text-2xl',
        'hover:bg-[orange] hover:text-black hover:border-2 hover:border-white',
      ],
      variant === 'slide' && [
        'button-slide bg-transparent text-white border border-[orange] rounded-[0.5rem] text-2xl',
      ],

      // Sizes
      size === 'medium' && 'h-[5.7rem] leading-[5.3rem]',
      size === 'large' && 'h-[6rem] leading-[5.6rem]',

      // Full width
      fullWidth && 'w-full',

      className
    );

    if (props.asChild) {
      const { asChild, ...anchorProps } = props as ButtonAsAnchorProps;
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={baseClasses}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const { asChild, ...buttonProps } = props as ButtonAsButtonProps;
    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={baseClasses}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
