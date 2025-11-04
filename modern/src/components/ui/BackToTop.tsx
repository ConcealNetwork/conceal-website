import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed right-3 bottom-3 z-50',
        'flex items-center justify-center',
        'w-[2em] h-[2em] rounded-full',
        'bg-[orange] text-white border-2 border-[orange]',
        'transition-all duration-300 ease-in-out',
        'hover:text-black hover:border-white hover:scale-[1.3] hover:shadow-xl',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      )}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up text-[1em]" />
    </button>
  );
}
