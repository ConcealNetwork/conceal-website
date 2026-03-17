import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '@/config/app.config';
import { cn } from '@/lib/utils';

function scrollToElement(targetId: string, scrollOffset: number) {
  const maxAttempts = 10;
  let attempts = 0;
  const tryScroll = () => {
    attempts++;
    const el = document.getElementById(targetId);
    if (el) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.pageYOffset - scrollOffset,
          behavior: 'smooth',
        });
      });
    } else if (attempts < maxAttempts) {
      setTimeout(tryScroll, appConfig.animations.scrollRetryDelay);
    }
  };
  setTimeout(tryScroll, appConfig.animations.scrollRetryDelayButton);
}

function mergeRefs<T>(
  outer: React.ForwardedRef<T>,
  inner: React.Ref<T> | undefined
): (node: T | null) => void {
  return (node) => {
    if (typeof outer === 'function') outer(node);
    else if (outer) (outer as React.RefObject<T | null>).current = node;
    if (typeof inner === 'function') inner(node);
    else if (inner && typeof inner === 'object' && 'current' in inner)
      (inner as React.RefObject<T | null>).current = node;
  };
}

interface BaseButtonProps {
  variant?: 'primary' | 'stroke' | 'default' | 'download' | 'slide' | 'slideToId';
  size?: 'default' | 'medium' | 'large';
  fullWidth?: boolean;
  targetId?: string;
  scrollOffset?: number;
}

interface ButtonAsButtonProps extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
}

interface ButtonAsAnchorProps extends BaseButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild: true;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const SLIDE_CLASSES =
  'button-slide bg-transparent text-white border border-[var(--color1)] rounded-[0.5rem] text-2xl';
const FILLED_CLASSES =
  'bg-black text-white border border-[var(--color1)] rounded-[0.5rem] text-2xl hover:bg-[var(--color1)] hover:text-black hover:border-2 hover:border-white';

function buildBaseClasses(
  variant: string,
  size: string,
  fullWidth: boolean | undefined,
  className: string | undefined
): string {
  return cn(
    'inline-flex font-sans text-sm uppercase tracking-wider h-[5.4rem] leading-[5rem] px-[3rem] cursor-pointer transition-all duration-300 ease-in-out border-2 border-[#c5c5c5] items-center',
    variant === 'primary' && FILLED_CLASSES,
    variant === 'download' && FILLED_CLASSES,
    variant === 'stroke' &&
      'bg-transparent border-2 border-[var(--color1)] text-white rounded-[10px] hover:border-white hover:bg-[var(--color1)]',
    variant === 'default' && 'bg-transparent text-white hover:bg-[#b8b8b8] hover:border-[#b8b8b8]',
    variant === 'slide' && SLIDE_CLASSES,
    variant === 'slideToId' && SLIDE_CLASSES,
    size === 'medium' && 'h-[5.7rem] leading-[5.3rem]',
    size === 'large' && 'h-[6rem] leading-[5.6rem]',
    fullWidth && 'w-full',
    className
  );
}

const SLIDE_TO_ID_ROUTES: Record<string, string> = {
  about: '/about',
  labsHeading: '/labs',
  labs: '/labs',
};

type ClickHandler = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

interface RenderAsChildOptions {
  anchorProps: Omit<ButtonAsAnchorProps, 'asChild'>;
  ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>;
  baseClasses: string;
  handleClick: ClickHandler;
  children: React.ReactNode;
  variant: string;
  targetId: string | undefined;
}

function renderAsChild({
  anchorProps,
  ref,
  baseClasses,
  handleClick,
  children,
  variant,
  targetId,
}: RenderAsChildOptions) {
  const child = isValidElement(children)
    ? (children as ReactElement<Record<string, unknown>>)
    : null;
  const isMergeable = child && typeof child.type === 'string' && child.type === 'a';
  if (!(child && isMergeable)) {
    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        className={baseClasses}
        href={
          variant === 'slideToId' && targetId
            ? `#${targetId}`
            : (anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>).href
        }
        onClick={handleClick}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }
  const childRef = (child as unknown as { ref?: React.Ref<HTMLAnchorElement> }).ref;
  return cloneElement(child, {
    ...anchorProps,
    ...child.props,
    className: cn(baseClasses, (child.props as { className?: string }).className),
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      handleClick(e as React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>);
      if (typeof child.props.onClick === 'function')
        (child.props.onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void)(e);
    },
    ref: mergeRefs<HTMLAnchorElement>(ref as React.ForwardedRef<HTMLAnchorElement>, childRef),
  });
}

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
    const baseClasses = buildBaseClasses(variant, size, fullWidth, className);

    const handleClick: ClickHandler = (e) => {
      if (variant === 'slideToId' && targetId) {
        e.preventDefault();
        if (document.getElementById(targetId)) scrollToElement(targetId, scrollOffset);
        else
          navigate(SLIDE_TO_ID_ROUTES[targetId] ?? '/about', {
            state: { scrollToHash: `#${targetId}`, scrollOffset },
            replace: false,
          });
      }
      if (props.onClick)
        (props.onClick as React.MouseEventHandler<HTMLElement>)(e as React.MouseEvent<HTMLElement>);
    };

    if (props.asChild) {
      const { asChild: _asChild, ...anchorProps } = props as ButtonAsAnchorProps;
      return renderAsChild({
        anchorProps,
        ref,
        baseClasses,
        handleClick,
        children,
        variant,
        targetId,
      });
    }

    const { asChild: _asChild, ...buttonProps } = props as ButtonAsButtonProps;
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
