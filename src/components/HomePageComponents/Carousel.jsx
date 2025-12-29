import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef(null);

  // Banner API states
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch banner data
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/banner`);
        if (!response.ok) throw new Error('Failed to fetch banner data');

        const data = await response.json();
        const bannersArray = Array.isArray(data?.data) ? data.data.filter(b => b.status === 1) : [];

        const transformedSlides = bannersArray.map(banner => ({
          id: banner.id,
          image_url: banner.image_url,
          video_url: banner.video_url,
          title: banner.title || 'Hazaribagh Jesuits',
          subtitle: 'Society of Jesus',
          description: banner.description,
        }));

        setSlides(transformedSlides);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBannerData();
  }, []);

  // Auto-play functionality
  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setIsVideoPaused(false);
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setIsVideoPaused(false);
  };

  const goToSlide = index => {
    setCurrentSlide(index);
    setIsVideoPaused(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setIsPaused(!isPaused);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.play();
        setIsVideoPaused(false);
      } else {
        videoRef.current.pause();
        setIsVideoPaused(true);
      }
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = e => {
      if (slides.length === 0) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, slides.length]);

  // Touch/Swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const handleTouchStart = e => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  if (loading) {
    return (
      <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mb-4"></div>
          <p className="text-white text-xl">Loading banners...</p>
        </div>
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-navy flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-white text-xl mb-2">
            {error ? 'Unable to load banners' : 'No banners available'}
          </p>
          <p className="text-gray-400 text-sm">
            {error ? 'Please try again later' : 'Check back soon for updates'}
          </p>
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];
  const isCurrentSlideVideo = currentSlideData?.video_url;

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
            {/* Background Media */}
            <div className="absolute inset-0">
              {slide.video_url ? (
                <video
                  ref={index === currentSlide ? videoRef : null}
                  src={slide.video_url}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-r from-navy/40 via-navy/10 to-navy/40"></div>
            </div>

            {/* Content: only show if it's not a video */}
            {!slide.video_url && (
              <div className="relative z-20 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                  <div className="max-w-3xl">
                    <div
                      className={`transform transition-all duration-700 delay-200 translate-y-0 opacity-100`}
                    >
                      <span className="hidden sm:inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm border border-secondary/30 rounded-full text-secondary text-xs sm:text-sm font-semibold mb-4">
                        {slide.subtitle}
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-cream mb-6 sm:mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-4 sm:px-14 py-2 sm:py-3 bg-linear-to-r from-primary to-navy hover:from-navy hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                        Learn More
                      </button>
                      <button className="px-4 sm:px-14 py-2 sm:py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                        Join Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Play/Pause Button - Video or Carousel control at same position */}
      <button
        onClick={isCurrentSlideVideo ? toggleVideoPlay : toggleAutoPlay}
        className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-30 bg-white/10 hover:bg-primary backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label={isCurrentSlideVideo ? (isVideoPaused ? 'Play video' : 'Pause video') : (isPaused ? 'Play carousel' : 'Pause carousel')}
      >
        {isCurrentSlideVideo ? (
          isVideoPaused ? <FiPlay className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiPause className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          isPaused ? <FiPlay className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiPause className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
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
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Carousel;
