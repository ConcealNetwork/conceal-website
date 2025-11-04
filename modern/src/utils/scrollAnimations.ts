import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

/**
 * Scroll-based animation system ported from the original website
 * 
 * How it works:
 * 1. Elements start with classes like "anim anim_slideInRight anim_fadeIn"
 * 2. These classes position elements off-screen and make them invisible
 * 3. When element enters viewport, "anim_show" class is added
 * 4. CSS transitions animate the element to final position
 */

export interface ScrollAnimationOptions {
  /**
   * Animation types (can be combined)
   */
  types?: ('slideInRight' | 'slideInLeft' | 'slideInTop' | 'slideInBottom' | 'fadeIn' | 'zoom' | 'rotateInX' | 'rotateInY' | 'rotateInClockwise' | 'rotateInCounterClockwise' | 'crtPowerOn')[];
  
  /**
   * Animation duration speed modifier
   */
  speed?: 'fastest' | 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | 'slowest';
  
  /**
   * Custom offset for when animation should trigger (in pixels)
   * Default: 80px for fadeIn animations, screen height/2 for others
   */
  offset?: number;
  
  /**
   * Whether to trigger animation immediately on mount (if already in viewport)
   */
  triggerImmediately?: boolean;
  
  /**
   * Ref to parent element (for perspective parent when using 3D rotations)
   */
  parentRef?: RefObject<HTMLElement>;
}

/**
 * Hook to add scroll-triggered animations to elements
 * Returns a ref to attach to the element and className to apply
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { types = ['fadeIn'], speed = 'normal', offset, triggerImmediately = true, parentRef } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add perspective parent class if needed for 3D rotations
    const needsPerspective = types.some(t => 
      ['rotateInX', 'rotateInY', 'rotateInClockwise', 'rotateInCounterClockwise'].includes(t)
    );
    
    if (needsPerspective) {
      const parent = parentRef?.current || element.parentElement;
      if (parent && !parent.classList.contains('anim_perspectiveParent')) {
        parent.classList.add('anim_perspectiveParent');
      }
    }

    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;

      // Calculate trigger point based on animation type
      let triggerOffset = offset;
      if (triggerOffset === undefined) {
        const hasFadeIn = types.includes('fadeIn');
        triggerOffset = hasFadeIn ? 80 : windowHeight / 2;
      }

      const isInViewport =
        rect.top < windowHeight - triggerOffset &&
        rect.bottom > triggerOffset &&
        rect.left < windowWidth &&
        rect.right > 0;

      if (isInViewport && !isVisible) {
        setIsVisible(true);
      }
    };

    // Check immediately if requested
    if (triggerImmediately) {
      // Use a small delay to ensure DOM is ready
      setTimeout(checkVisibility, 0);
    }

    // Set up scroll listener
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [isVisible, types, offset, triggerImmediately, parentRef]);

  // Build className
  const baseClasses = 'anim';
  const typeClasses = types.map(t => `anim_${t}`).join(' ');
  const speedClasses = speed !== 'normal' ? `anim_${speed}` : '';
  const showClass = isVisible ? 'anim_show' : '';

  const className = [baseClasses, typeClasses, speedClasses, showClass]
    .filter(Boolean)
    .join(' ');

  return { ref: elementRef, className, isVisible };
}

