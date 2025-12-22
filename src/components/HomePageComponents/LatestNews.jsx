import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiTag, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from API with timeout
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Create fetch promise
        const fetchPromise = fetch(`${import.meta.env.VITE_API_BASE_URL}/news`);
        
        // Create timeout promise (15 seconds)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 15000) 
        );

        // Race between fetch and timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status && result.data) {
          // Take only first 3 items for homepage
          setNewsData(result.data.slice(0, 3));
        } else {
          setNewsData([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Strip HTML tags from content
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Get short excerpt from content
  const getExcerpt = (content, maxLength = 100) => {
    const text = stripHtml(content);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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

  // Loading state with spinner
  if (loading) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white to-cream">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              {/* Spinner */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-gray-600 text-base sm:text-lg">Loading latest news...</p>
              <p className="text-gray-400 text-xs sm:text-sm">Please wait while we fetch the updates</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white to-cream">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4 max-w-md mx-auto">
              <FiAlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
              <h3 className="text-lg sm:text-xl font-bold text-navy">Unable to Load News</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {error === 'Request timeout' 
                  ? 'The request is taking longer than expected. Please check your connection and try again.'
                  : 'There was an error loading the news. Please try again later.'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 sm:px-6 sm:py-2.5 bg-primary hover:bg-primary/90 text-white text-sm sm:text-base rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // No news state
  if (!newsData || newsData.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white to-cream">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <FiTag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy">No News Available</h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-md">
                There are no news updates available at the moment. Please check back later.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white to-cream">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10"
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
            Updates & Events
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-2 sm:mb-3">
            Latest News
          </h2>
          <motion.div
            className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-secondary mx-auto rounded-full mb-2 sm:mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
            Stay updated with the latest happenings, events, and initiatives across our communities
          </p>
        </motion.div>

        {/* News Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {newsData.map((news) => (
            <motion.div
              key={news.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/news/${news.id}`} className="block">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full group">
                  {/* Responsive Layout: Vertical on mobile/tablet, Horizontal on desktop */}
                  <div className="flex flex-col sm:flex-col lg:flex-row h-auto lg:h-40">
                    {/* Image Section - Top on mobile/tablet, Left on desktop */}
                    <div className="relative w-full sm:w-full lg:w-40 h-48 sm:h-52 md:h-56 lg:h-full shrink-0 overflow-hidden">
                      <motion.img
                        src={news.main_image_url || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop'}
                        alt={news.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop';
                        }}
                      />
                      {/* Overlay - adjusted for responsive */}
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <span className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs sm:text-xs font-semibold text-primary shadow-lg">
                          <FiTag className="w-3 h-3" />
                          News
                        </span>
                      </div>
                    </div>

                    {/* Content Section - Bottom on mobile/tablet, Right on desktop */}
                    <div className="flex-1 p-4 sm:p-5 md:p-5 lg:p-4 flex flex-col justify-between">
                      {/* Date */}
                      <div className="flex items-center gap-1 text-xs sm:text-xs text-gray mb-2">
                        <FiCalendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="text-xs sm:text-xs">
                          {new Date(news.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Title - adjusted line clamp for different screens */}
                      <h3 className="text-base sm:text-lg md:text-lg lg:text-sm font-bold text-navy mb-3 sm:mb-4 lg:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 lg:line-clamp-2 flex-1">
                        {news.title}
                      </h3>

                      {/* Read More Link */}
                      <div className="flex items-center text-primary font-semibold text-xs sm:text-sm lg:text-xs group-hover:gap-2 gap-1 transition-all duration-300">
                        <span>Read More</span>
                        <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-3 lg:h-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/news">
            <motion.button
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All News
              <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;
