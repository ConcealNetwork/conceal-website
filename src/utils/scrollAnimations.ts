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

const ROTATION_TYPES = ['rotateInX', 'rotateInY', 'rotateInClockwise', 'rotateInCounterClockwise'];

function setupPerspectiveParent(
  element: HTMLElement,
  types: string[],
  parentRef?: RefObject<HTMLElement>
) {
  if (!types.some((t) => ROTATION_TYPES.includes(t))) return;
  const parent = parentRef?.current ?? element.parentElement;
  if (parent && !parent.classList.contains('anim_perspectiveParent')) {
    parent.classList.add('anim_perspectiveParent');
  }
}

function isInViewport(el: HTMLElement, triggerOffset: number): boolean {
  const { top, bottom, left, right } = el.getBoundingClientRect();
  const wh = window.innerHeight || document.documentElement.clientHeight;
  const ww = window.innerWidth || document.documentElement.clientWidth;
  return top < wh - triggerOffset && bottom > triggerOffset && left < ww && right > 0;
}

function computeTriggerOffset(types: string[], offset?: number): number {
  if (offset !== undefined) return offset;
  const wh = window.innerHeight || document.documentElement.clientHeight;
  return types.includes('fadeIn') ? 80 : wh / 2;
}

function buildClassName(types: string[], speed: string, isVisible: boolean): string {
  const typeClasses = types.map((t) => `anim_${t}`).join(' ');
  const speedClass = speed !== 'normal' ? `anim_${speed}` : '';
  const showClass = isVisible ? 'anim_show' : '';
  return ['anim', typeClasses, speedClass, showClass].filter(Boolean).join(' ');
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

    setupPerspectiveParent(element, types, parentRef);

    if (triggerImmediately) {
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
      return;
    }

    const checkVisibility = () => {
      if (!isVisible && isInViewport(element, computeTriggerOffset(types, offset))) {
        setIsVisible(true);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [isVisible, types, offset, triggerImmediately, parentRef]);

  useEffect(() => {
    const element = elementRef.current;
    if (!(element && types.includes('fadeIn')) || startOpacity <= 0 || startOpacity >= 1) return;
    element.style.opacity = isVisible ? '' : String(startOpacity);
  }, [types, startOpacity, isVisible]);

  return { ref: elementRef, className: buildClassName(types, speed, isVisible), isVisible };
}
