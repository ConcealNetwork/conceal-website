import { useState } from 'react';

interface YouTubeCarouselProps {
  videos: string[]; // Array of YouTube embed URLs
  className?: string;
}

export function YouTubeCarousel({ videos, className = '' }: YouTubeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Inner */}
      <div
        className="relative overflow-hidden rounded-lg w-full"
        style={{ minHeight: '400px', maxWidth: '800px' }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${activeIndex} * 100%))`,
          }}
        >
          {videos.map((videoUrl, index) => (
            <div
              key={videoUrl}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '100%', minWidth: '100%' }}
            >
              <iframe
                src={videoUrl}
                className="w-[95%] h-[400px] border-4 border-[#112E41]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Featured video ${index + 1}`}
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Previous"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Next"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {videos.map((videoUrl, index) => (
          <button
            type="button"
            key={videoUrl}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === activeIndex ? 'bg-[var(--color1)] w-8' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
