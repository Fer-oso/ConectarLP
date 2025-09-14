import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "../../data/mockupSlideData";

import "./styles/ConstructionSliderStyles.css";

interface ConstructionSliderProps {
  onScrollToForm: () => void;
  openCollabModal: () => void;
  counterRef: any;
}

const ConstructionSlider: React.FC<ConstructionSliderProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <>
      {/* Slider como elemento principal */}
      <>
        <div className="construction-slider">
          <div className="slider-container">
            <div
              className="slides-wrapper"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={slide.id} className="slide">
                  <div
                    className={`slide-content ${
                      slide.type === "informational" ? "grid-cols-2" : ""
                    }`}
                  >
                    {slide.type === "informational" && (
                      <div className="slide-text">
                        <div className="slide-badge">{slide.subtitle}</div>
                        <h2 className="slide-title">{slide.title}</h2>
                        <p className="slide-description">{slide.description}</p>

                        {slide.stats && (
                          <div className="slide-stats">
                            {slide.stats.map((stat, statIndex) => (
                              <div key={statIndex} className="stat-item">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-content">
                                  <div className="stat-value">{stat.value}</div>
                                  <div className="stat-label">{stat.label}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div
                      className={`${
                        slide.type === "informational"
                          ? "slide-image"
                          : "h-full"
                      } `}
                    >
                      <picture>
                        <source
                          srcSet={slide.image.mobile}
                          media="(max-width: 425px)"
                        />

                        <source
                          srcSet={slide.image.tablet}
                          media="(max-width: 768px)"
                        />

                        <source
                          srcSet={slide.image.laptop}
                          media="(max-width: 906px)"
                        />
                        <source
                          srcSet={slide.image.laptop}
                          media="(max-width: 1024px)"
                        />
                        <source
                          srcSet={slide.image.laptop}
                          media="(max-width: 1100px)"
                        />
                        <source
                          srcSet={slide.image.desktop}
                          media="(max-width: 1200px)"
                        />
                        <img
                          src={slide.image.desktop} // imagen por defecto (desktop)
                          alt={slide.title}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </picture>
                      <div className="image-overlay"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              className="slider-nav slider-nav-prev"
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="slider-nav slider-nav-next"
              onClick={nextSlide}
              aria-label="Siguiente slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots indicator */}
            <div className="slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="slider-progress">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentSlide + 1) / slides.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ConstructionSlider;
