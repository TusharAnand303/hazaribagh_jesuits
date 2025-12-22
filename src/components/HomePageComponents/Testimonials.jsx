import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  // API states
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Touch/drag states for mobile
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/whatpeople`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...testimonial objects... } ] }
        const testimonialsArray = Array.isArray(data?.data) ? data.data : [];
        
        setTestimonials(testimonialsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Duplicate for animation only if 3+ cards
  const shouldAnimate = testimonials.length >= 3;
  const displayTestimonials = shouldAnimate 
    ? [...testimonials, ...testimonials, ...testimonials] 
    : testimonials;

  // Touch/Mouse handlers for mobile drag
  const handleMouseDown = (e) => {
    if (window.innerWidth >= 768) return; // Only on mobile
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    if (window.innerWidth >= 768) return; // Only on mobile
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || window.innerWidth >= 768) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || window.innerWidth >= 768) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Dummy image fallback
  const getDummyImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=f97316&color=fff&size=200`;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-cream to-white overflow-hidden relative">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-700 text-sm sm:text-base">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  // Error or no data state
  if (error || testimonials.length === 0) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-cream to-white overflow-hidden relative">
        <div className="text-center py-12">
          <p className="text-gray-700 text-base sm:text-lg">
            {error ? 'Unable to load testimonials' : 'No testimonials available'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-cream to-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
          <span className="text-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">
            What People Say About Us
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Hear from our students, parents, and community members
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        {/* Horizontal Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays - Only show if animating */}
          {shouldAnimate && (
            <>
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            </>
          )}

          {/* Scrolling Container */}
          <div 
            ref={scrollContainerRef}
            className={`testimonial-scroll-container ${shouldAnimate ? 'animate-enabled' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`flex space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 ${shouldAnimate ? 'desktop-animate' : testimonials.length < 3 ? 'justify-center' : 'justify-start'}`}>
              {displayTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="shrink-0 w-[75vw] xs:w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px] bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200 hover:border-orange-500 transition-all duration-300 mb-4"
                >
                  {/* Quote Icon */}
                  <div className="mb-3 sm:mb-4">
                    <FaQuoteLeft className="text-lg sm:text-xl md:text-2xl text-orange-500 opacity-50" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm md:text-base line-clamp-4 sm:line-clamp-5">
                    "{testimonial.message_text}"
                  </p>

                  {/* Rating Stars - Fixed 5 stars */}
                  <div className="flex space-x-1 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm sm:text-base md:text-lg" />
                    ))}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-2 sm:space-x-3 pt-3 sm:pt-4 border-t border-gray-200">
                    <img
                      src={testimonial.image_url || getDummyImage(testimonial.author_name)}
                      alt={testimonial.author_name}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 sm:border-[3px] border-orange-200"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">{testimonial.author_name}</h4>
                      <p className="text-[10px] sm:text-xs text-orange-600">Community Member</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-6 sm:mt-8">
          {shouldAnimate && (
            <p className="text-gray-500 text-xs sm:text-sm hidden md:block">
              💡 Hover over a testimonial to pause
            </p>
          )}
          <p className="text-gray-500 text-xs sm:text-sm md:hidden">
            👆 Swipe to see more testimonials
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        /* Desktop animation - only when enabled */
        @media (min-width: 768px) {
          .animate-enabled {
            overflow: hidden !important;
          }

          .desktop-animate {
            animation: scroll 45s linear infinite;
            will-change: transform;
          }

          .animate-enabled:hover .desktop-animate {
            animation-play-state: paused;
          }
        }

        /* Mobile styles */
        .testimonial-scroll-container {
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .testimonial-scroll-container::-webkit-scrollbar {
          display: none;
        }

        /* Desktop: Default scrollable for non-animated */
        @media (min-width: 768px) {
          .testimonial-scroll-container {
            padding: 0 1.5rem;
            cursor: default;
          }
        }

        @media (min-width: 1024px) {
          .testimonial-scroll-container {
            padding: 0 2rem;
          }
        }

        /* Mobile: Manual scroll */
        @media (max-width: 767px) {
          .testimonial-scroll-container {
            padding: 0 1rem;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
          }

          .testimonial-scroll-container:active {
            cursor: grabbing;
          }

          .testimonial-scroll-container > div > div {
            scroll-snap-align: center;
          }

          /* Disable animation on mobile */
          .desktop-animate {
            animation: none !important;
          }
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .line-clamp-5 {
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
