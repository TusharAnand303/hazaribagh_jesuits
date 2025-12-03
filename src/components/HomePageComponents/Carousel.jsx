import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FiPause, FiPlay } from 'react-icons/fi';
import b1 from './../../assets/images/web_images/banner1.jpeg';
import b2 from './../../assets/images/web_images/banner2.jpeg';
import b3 from './../../assets/images/web_images/banner3.jpeg';
import b4 from './../../assets/images/web_images/banner4.jpeg';
import b5 from './../../assets/images/web_images/banner5.jpeg';
import b6 from './../../assets/images/web_images/banner6.jpeg';


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);


  // Sample slides data - Replace with your actual images and content
  const slides = [
    {
      id: 1,
      image: b1,
      title: 'Hazaribagh Jesuits',
      subtitle: 'Society of Jesus',
      description: 'Serving God through Education, Social Development, and Spiritual Formation'
    },
    {
      id: 2,
      image: b2,
      title: 'Education for All',
      subtitle: 'Building Future Leaders',
      description: 'Empowering communities through quality education and holistic development'
    },
    {
      id: 3,
      image: b3,
      title: 'Ignatian Spirituality',
      subtitle: 'Finding God in All Things',
      description: 'Deepening faith through retreats, prayer, and spiritual accompaniment'
    },
    {
      id: 4,
      image: b4,
      title: 'Social Justice',
      subtitle: 'Serving the Marginalized',
      description: 'Working with the poor and marginalized communities across Jharkhand'
    },
    {
      id: 5,
      image: b5,
      title: 'Social Justice',
      subtitle: 'Serving the Marginalized',
      description: 'Working with the poor and marginalized communities across Jharkhand'
    },
    {
      id: 6,
      image: b6,
      title: 'Social Justice',
      subtitle: 'Serving the Marginalized',
      description: 'Working with the poor and marginalized communities across Jharkhand'
    }
  ];


  // Auto-play functionality
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);


  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  const goToSlide = (index) => {
    setCurrentSlide(index);
  };


  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setIsPaused(!isPaused);
  };


  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;


    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds


    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);


  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };


    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide]);


  // Touch/Swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);


  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };


  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };


  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };


  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-navy group">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay linear */}
              <div className="absolute inset-0 bg-linear-to-r from-navy/40 via-navy/10 to-navy/40"></div>
            </div>


            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                <div className="max-w-3xl">
                  {/* Subtitle */}
                  <div
                    className={`transform transition-all duration-700 delay-200 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <span className="hidden sm:inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm border border-secondary/30 rounded-full text-secondary text-xs sm:text-sm font-semibold mb-4">
                      {slide.subtitle}
                    </span>
                  </div>


                  {/* Title */}
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight transform transition-all duration-700 delay-300 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    }`}
                  >
                    {slide.title}
                  </h1>


                  {/* Description */}
                  <p
                    className={`text-base sm:text-lg md:text-xl text-cream mb-6 sm:mb-8 leading-relaxed transform transition-all duration-700 delay-500 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    }`}
                  >
                    {slide.description}
                  </p>


                  {/* CTA Buttons */}
                  <div
                    className={`flex flex-wrap gap-4 transform transition-all duration-700 delay-700 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <button className="px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-primary to-navy hover:from-navy hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Learn More
                    </button>
                    <button className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Join Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Previous Button - COMMENTED OUT */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-primary backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button> */}


      {/* Next Button - COMMENTED OUT */}
      {/* <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-primary backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button> */}


      {/* Play/Pause Button */}
      <button
        onClick={toggleAutoPlay}
        className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-30 bg-white/10 hover:bg-primary backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label={isPaused ? 'Play' : 'Pause'}
      >
        {isPaused ? (
          <FiPlay className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <FiPause className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>


      {/* Indicators/Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3 ">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-secondary'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/75 hover:cursor-pointer'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


      {/* Slide Counter */}
      <div className="absolute top-6 sm:top-8 right-4 sm:right-8 z-30 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
        <span className="text-white text-xs sm:text-sm font-semibold">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>


      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-secondary transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};


export default Carousel;
