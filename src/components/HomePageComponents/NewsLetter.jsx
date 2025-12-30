import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiDownload, FiCalendar, FiFileText, FiEye, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewsLetter = () => {
  const scrollRef = useRef(null);
  
  // API states
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch newsletter data
  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/newsletter`);
        if (!response.ok) {
          throw new Error('Failed to fetch newsletter data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...newsletter objects... } ] }
        const newslettersArray = Array.isArray(data?.data) ? data.data : [];
        
        setNewsletters(newslettersArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching newsletter data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNewsletterData();
  }, []);

  // Scroll functions - responsive scroll distance
  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 350;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-linear-to-b from-cream to-white overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary mb-3 sm:mb-4"></div>
            <p className="text-navy text-sm sm:text-base">Loading newsletters...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error or no data state
  if (error || newsletters.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-linear-to-b from-cream to-white overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="text-center py-12">
            <p className="text-navy text-sm sm:text-base">
              {error ? 'Unable to load newsletters' : 'No newsletters available'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-linear-to-b from-cream to-white overflow-hidden">
      {/* Section Header - Constrained container */}
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-6 sm:mb-8 md:mb-10 max-w-7xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-secondary/30 rounded-full text-primary text-xs sm:text-sm font-semibold mb-2 sm:mb-3 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiFileText className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Publications
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-2 sm:mb-3">
            Our Newsletters
          </h2>
          <motion.div
            className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-secondary mx-auto rounded-full mb-2 sm:mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
            Stay informed with our monthly newsletters featuring stories, updates, and insights
          </p>
        </motion.div>
      </div>

      {/* Newsletter Carousel - Constrained container with max-width */}
      <div className="relative max-w-7xl mx-auto">
        {/* Smaller Left Navigation Button */}
        <motion.button
          onClick={scrollLeft}
          className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center bg-white hover:bg-primary text-navy hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll left"
        >
          <FiChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </motion.button>

        {/* Smaller Right Navigation Button */}
        <motion.button
          onClick={scrollRight}
          className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center bg-white hover:bg-primary text-navy hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll right"
        >
          <FiChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </motion.button>

        {/* Symmetrical linear Overlays - Same width and opacity on both sides */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-cream to-transparent z-10 pointer-events-none"></div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-cream to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto overflow-y-hidden gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {newsletters.map((newsletter, index) => (
            <motion.div
              key={newsletter.id}
              className="shrink-0 w-72 sm:w-80 snap-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Responsive height card */}
              <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[270px] sm:h-[280px] flex flex-col">
                {/* Newsletter Image - Responsive height */}
                <div className="relative h-28 sm:h-32 shrink-0 overflow-hidden">
                  <img
                    src={newsletter.image_url}
                    alt={newsletter.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-transparent"></div>
                  
                  {/* Date Badge - Responsive */}
                  <div className="absolute top-2 right-2">
                    <span className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-semibold text-primary shadow-lg">
                      <FiCalendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden xs:inline">{formatDate(newsletter.newsletter_date)}</span>
                      <span className="xs:hidden">{new Date(newsletter.newsletter_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </span>
                  </div>
                </div>

                {/* Content - Responsive padding */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col">
                  {/* Title - Responsive font size */}
                  <h3 className="text-sm sm:text-base font-bold text-navy mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {newsletter.title}
                  </h3>
                  
                  {/* Description - Responsive font and spacing */}
                  <p className="text-[11px] sm:text-xs text-gray leading-relaxed mb-2.5 sm:mb-3 flex-1 line-clamp-2">
                    {newsletter.description}
                  </p>

                  {/* View PDF Button - Responsive sizing */}
                  <Link
                    to={`/newsletter/view/${newsletter.id}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-2.5 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full justify-center mt-auto"
                  >
                    <FiEye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    View PDF
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Scroll Indicator - Responsive */}
        <div className="text-center mt-3 sm:mt-4 md:hidden px-4">
          <p className="text-gray text-[10px] sm:text-xs">
            👉 Swipe to browse newsletters
          </p>
        </div>
      </div>

      {/* View All Newsletter Button */}
      <motion.div
        className="text-center mt-6 sm:mt-8 md:mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link to="/newsletter-details">
          <motion.button
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Newsletters
            <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Ensure ellipsis for text overflow */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </section>
  );
};

export default NewsLetter;
