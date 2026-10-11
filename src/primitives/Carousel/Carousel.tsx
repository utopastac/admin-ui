import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Carousel.module.css';

interface CarouselProps {
  children: React.ReactNode;
  slidesPerView?: number;
  gap?: number;
  loop?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesPerView = 1,
  gap = 16,
  loop = false,
  className = '',
}) => {
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - slidesPerView);

  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < maxIndex;

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) return prev - 1;
      if (loop) return maxIndex;
      return prev;
    });
  }, [loop, maxIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < maxIndex) return prev + 1;
      if (loop) return 0;
      return prev;
    });
  }, [loop, maxIndex]);

  const slideWidthCalc = useMemo(
    () => `calc((100% - ${gap * (slidesPerView - 1)}px) / ${slidesPerView})`,
    [gap, slidesPerView],
  );

  const translateX = useMemo(
    () => `calc(-${currentIndex} * (${slideWidthCalc} + ${gap}px))`,
    [currentIndex, slideWidthCalc, gap],
  );

  const trackStyle = useMemo(
    () => ({ transform: `translateX(${translateX})`, gap: `${gap}px` }),
    [translateX, gap],
  );

  const containerClass = [styles.carousel, className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={trackStyle}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{ width: slideWidthCalc }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.navButton} ${styles.navButtonPrev}`}
        onClick={goToPrev}
        disabled={!canGoPrev}
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        className={`${styles.navButton} ${styles.navButtonNext}`}
        onClick={goToNext}
        disabled={!canGoNext}
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Carousel;
