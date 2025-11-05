import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BaseButtonProps {
  variant?: 'primary' | 'stroke' | 'default' | 'download' | 'slide' | 'slideToId';
  size?: 'default' | 'medium' | 'large';
  fullWidth?: boolean;
  targetId?: string; // For slideToId variant - the ID to scroll to
  scrollOffset?: number; // Offset for scroll (default: 100 for header)
}

interface ButtonAsButtonProps extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
}

interface ButtonAsAnchorProps extends BaseButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild: true;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      fullWidth,
      targetId,
      scrollOffset = 100,
      children,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();
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
      variant === 'slideToId' && [
        'button-slide bg-transparent text-white border border-[orange] rounded-[0.5rem] text-2xl',
      ],

      // Sizes
      size === 'medium' && 'h-[5.7rem] leading-[5.3rem]',
      size === 'large' && 'h-[6rem] leading-[5.6rem]',

      // Full width
      fullWidth && 'w-full',

      className
    );

    // Handle scroll-to-id functionality
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (variant === 'slideToId' && targetId) {
        e.preventDefault();

        // Check if element exists on current page
        const element = document.getElementById(targetId);

        if (element) {
          // Element exists on current page, scroll to it
          const maxAttempts = 10;
          let attempts = 0;

          const tryScroll = () => {
            attempts++;
            const el = document.getElementById(targetId);
            if (el) {
              requestAnimationFrame(() => {
                const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                  top: elementTop - scrollOffset,
                  behavior: 'smooth',
                });
              });
            } else if (attempts < maxAttempts) {
              setTimeout(tryScroll, 50);
            }
          };

          setTimeout(tryScroll, 100);
        } else {
          // Element not on current page - navigate to appropriate page
          // Map of targetIds to their page routes
          const targetIdToRoute: { [key: string]: string } = {
            about: '/about',
            labsHeading: '/labs',
            labs: '/labs',
            // Add more mappings as needed
          };

          const targetRoute = targetIdToRoute[targetId] || '/about'; // Default to /about for unknown IDs

          // Navigate to the page with hash in state
          navigate(targetRoute, {
            state: { scrollToHash: `#${targetId}`, scrollOffset },
            replace: false,
          });
        }
      }

      // Call original onClick if provided
      if (props.onClick) {
        props.onClick(e as any);
      }
    };

    if (props.asChild) {
      const { asChild, ...anchorProps } = props as ButtonAsAnchorProps;
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={baseClasses}
          href={variant === 'slideToId' && targetId ? `#${targetId}` : anchorProps.href}
          onClick={handleClick}
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
        onClick={handleClick}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
