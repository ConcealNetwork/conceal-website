import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

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
  types?: (
    | 'slideInRight'
    | 'slideInLeft'
    | 'slideInTop'
    | 'slideInBottom'
    | 'fadeIn'
    | 'zoom'
    | 'rotateInX'
    | 'rotateInY'
    | 'rotateInClockwise'
    | 'rotateInCounterClockwise'
    | 'crtPowerOn'
    | 'dragText'
  )[];

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

  /**
   * Starting opacity for fadeIn animations (0-1)
   * Default: 0 (fully transparent)
   */
  startOpacity?: number;
}

/**
 * Hook to add scroll-triggered animations to elements
 * Returns a ref to attach to the element and className to apply
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    types = ['fadeIn'],
    speed = 'normal',
    offset,
    triggerImmediately = true,
    parentRef,
    startOpacity = 0,
  } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add perspective parent class if needed for 3D rotations
    const needsPerspective = types.some((t) =>
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

      // For elements at the top of the page with offset 0, trigger immediately if visible
      const isInViewport =
        rect.top < windowHeight - triggerOffset &&
        rect.bottom > triggerOffset &&
        rect.left < windowWidth &&
        rect.right > 0;

      if (isInViewport && !isVisible) {
        setIsVisible(true);
      }
    };

    // If triggerImmediately is true, set visible immediately without viewport check
    if (triggerImmediately) {
      // Use requestAnimationFrame to ensure DOM is painted, then set visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      // Otherwise, check visibility on mount and scroll
      checkVisibility();

      // Set up scroll listener only if not triggering immediately
      window.addEventListener('scroll', checkVisibility, { passive: true });
      window.addEventListener('resize', checkVisibility, { passive: true });

      return () => {
        window.removeEventListener('scroll', checkVisibility);
        window.removeEventListener('resize', checkVisibility);
      };
    }

    // No cleanup needed for triggerImmediately=true case
  }, [isVisible, types, offset, triggerImmediately, parentRef]);

  // Build className
  const baseClasses = 'anim';
  const typeClasses = types.map((t) => `anim_${t}`).join(' ');
  const speedClasses = speed !== 'normal' ? `anim_${speed}` : '';
  const showClass = isVisible ? 'anim_show' : '';

  const className = [baseClasses, typeClasses, speedClasses, showClass].filter(Boolean).join(' ');

  // Apply custom starting opacity if fadeIn is used and startOpacity is not 0
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (types.includes('fadeIn') && startOpacity > 0 && startOpacity < 1) {
      // Set initial opacity
      if (!isVisible) {
        element.style.opacity = String(startOpacity);
      } else {
        // When visible, ensure opacity is 1 (CSS will handle it, but we can remove inline style)
        element.style.opacity = '';
      }
    }
  }, [types, startOpacity, isVisible]);

  return { ref: elementRef, className, isVisible };
}
