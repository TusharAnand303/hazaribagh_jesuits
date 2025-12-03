import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  // Sample news data - 3 cards
  const newsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop',
      category: 'Education',
      title: 'New School Inaugurated in Latehar',
      date: '2025-11-28',
      link: '/news/new-school-latehar'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      category: 'Spirituality',
      title: 'Annual Ignatian Retreat Concludes',
      date: '2025-11-25',
      link: '/news/ignatian-retreat'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      category: 'Community',
      title: 'Social Development Programs Impact Lives',
      date: '2025-11-20',
      link: '/news/social-development'
    },
  ];

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

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-linear-to-b from-white to-cream">
      <div className="mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
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
            Updates & Events
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-3">
            Latest News
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto rounded-full mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-sm sm:text-base max-w-2xl mx-auto">
            Stay updated with the latest happenings, events, and initiatives across our communities
          </p>
        </motion.div>

        {/* News Grid - 3 columns on desktop */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-7xl mx-auto"
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
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <Link to={news.link}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full group">
                  {/* Horizontal Layout - Image Left, Content Right */}
                  <div className="flex flex-row h-40">
                    {/* Image Section - Left Side */}
                    <div className="relative w-40 shrink-0 overflow-hidden">
                      <motion.img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-r from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-primary shadow-lg">
                          <FiTag className="w-3 h-3" />
                          {news.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section - Right Side */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      {/* Date */}
                      <div className="flex items-center gap-1 text-xs text-gray mb-2">
                        <FiCalendar className="w-3 h-3" />
                        {new Date(news.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-navy mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1">
                        {news.title}
                      </h3>

                      {/* Read More Link */}
                      <div className="flex items-center text-primary font-semibold text-xs group-hover:gap-2 gap-1 transition-all duration-300">
                        <span>Read More</span>
                        <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
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
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/news">
            <motion.button
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All News
              <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;
