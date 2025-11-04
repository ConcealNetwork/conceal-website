import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Base styles from main.css
        'block w-full min-h-[25rem] px-0 py-[1.5rem]',
        'bg-transparent border-0 outline-none',
        'text-[#aaa] font-sans text-sm leading-[3rem]',
        'border-b-2 border-b-[rgba(170,170,170,0.3)]',
        'transition-all duration-300 ease-in-out',
        'focus:text-[#aaa] focus:border-b-[#aaa]',
        'placeholder:text-[#828282]',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
