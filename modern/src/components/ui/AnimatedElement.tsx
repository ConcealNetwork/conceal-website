import React, { type ElementType, type ReactNode } from 'react';
import type { ScrollAnimationOptions } from '../../utils/scrollAnimations';
import { useScrollAnimation } from '../../utils/scrollAnimations';

interface AnimatedElementProps extends ScrollAnimationOptions {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Wrapper component that adds scroll-triggered animations to its children
 *
 * Example usage:
 * <AnimatedElement types={['slideInRight', 'fadeIn']} speed="fast">
 *   <div>This will slide in from right and fade in</div>
 * </AnimatedElement>
 */
export function AnimatedElement({
  children,
  className = '',
  as: Component = 'div',
  ...animationOptions
}: AnimatedElementProps) {
  const { ref, className: animClassName } = useScrollAnimation(animationOptions);

  return (
    <Component ref={ref} className={`${animClassName} ${className}`.trim()}>
      {children}
    </Component>
  );
}
