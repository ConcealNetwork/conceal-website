import { useState } from 'react';

interface CarouselProps {
  images: string[];
  altPrefix?: string;
  className?: string;
}

export function Carousel({ images, altPrefix = 'Image', className = '' }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel Inner */}
      <div className="relative overflow-hidden rounded-lg w-full" style={{ minHeight: '400px' }}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${activeIndex} * 100%))`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '100%', minWidth: '100%' }}
            >
              <img
                src={image}
                alt={`${altPrefix} ${index + 1}`}
                className="max-w-full max-h-[600px] w-auto h-auto object-contain block"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', image);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="text-white text-center p-8">Image failed to load: ${image}</div>`;
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', image);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Previous"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Next"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === activeIndex ? 'bg-[orange] w-8' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
