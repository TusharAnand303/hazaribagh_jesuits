import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiDownload, FiCalendar, FiFileText } from 'react-icons/fi';

const NewsLetter = () => {
  const scrollRef = useRef(null);

  // Newsletter data
  const newsletters = [
    {
      id: 1,
      title: 'January 2025 Edition',
      description: 'New year, new beginnings - Stories of hope and transformation from our community',
      date: 'January 2025',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
      pdfLink: '#'
    },
    {
      id: 2,
      title: 'December 2024 Edition',
      description: 'Christmas special - Celebrating faith and community with joy',
      date: 'December 2024',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop',
      pdfLink: '#'
    },
    {
      id: 3,
      title: 'November 2024 Edition',
      description: 'Mission updates from tribal regions of Jharkhand and beyond',
      date: 'November 2024',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
      pdfLink: '#'
    },
    {
      id: 4,
      title: 'October 2024 Edition',
      description: 'Education initiatives and student success stories that inspire',
      date: 'October 2024',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop',
      pdfLink: '#'
    },
    {
      id: 5,
      title: 'September 2024 Edition',
      description: 'Community development and social impact across the region',
      date: 'September 2024',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
      pdfLink: '#'
    },
    {
      id: 6,
      title: 'August 2024 Edition',
      description: 'Summer programs and youth engagement activities for all',
      date: 'August 2024',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop',
      pdfLink: '#'
    }
  ];

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
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

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-gradient-to-b from-cream to-white overflow-hidden">
      {/* Section Header - With container */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 mb-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-white border border-secondary/30 rounded-full text-primary text-sm font-semibold mb-3 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiFileText className="inline w-4 h-4 mr-2" />
            Publications
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-3">
            Our Newsletters
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto rounded-full mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-sm sm:text-base max-w-2xl mx-auto">
            Stay informed with our monthly newsletters featuring stories, updates, and insights
          </p>
        </motion.div>
      </div>

      {/* Newsletter Carousel - Full Width */}
      <div className="relative w-full">
        {/* Large Left Navigation Button */}
        <motion.button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 w-16 h-16 lg:w-20 lg:h-20 items-center justify-center bg-white hover:bg-primary text-navy hover:text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll left"
        >
          <FiChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" />
        </motion.button>

        {/* Large Right Navigation Button */}
        <motion.button
          onClick={scrollRight}
          className="hidden md:flex absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-16 h-16 lg:w-20 lg:h-20 items-center justify-center bg-white hover:bg-primary text-navy hover:text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll right"
        >
          <FiChevronRight className="w-8 h-8 lg:w-10 lg:h-10" />
        </motion.button>

        {/* Gradient Overlays - Hidden on mobile */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable Container - Increased side padding */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto overflow-y-hidden gap-6 px-8 sm:px-16 lg:px-24 pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {newsletters.map((newsletter, index) => (
            <motion.div
              key={newsletter.id}
              className="flex-shrink-0 w-80 snap-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Fixed height card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[280px] flex flex-col">
                {/* Newsletter Image - Fixed height */}
                <div className="relative h-32 flex-shrink-0 overflow-hidden">
                  <img
                    src={newsletter.image}
                    alt={newsletter.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"></div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-primary shadow-lg">
                      <FiCalendar className="w-3 h-3" />
                      {newsletter.date}
                    </span>
                  </div>
                </div>

                {/* Content - Fixed structure */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Title - Fixed height with ellipsis */}
                  <h3 className="text-base font-bold text-navy mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {newsletter.title}
                  </h3>
                  
                  {/* Description - Fixed height with ellipsis */}
                  <p className="text-xs text-gray leading-relaxed mb-3 flex-1 line-clamp-2">
                    {newsletter.description}
                  </p>

                  {/* Download Button - Fixed at bottom */}
                  <a
                    href={newsletter.pdfLink}
                    download
                    className="inline-flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full justify-center mt-auto"
                  >
                    <FiDownload className="w-3 h-3" />
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="text-center mt-4 md:hidden px-4">
          <p className="text-gray text-xs">
            👉 Swipe to browse newsletters
          </p>
        </div>
      </div>

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
