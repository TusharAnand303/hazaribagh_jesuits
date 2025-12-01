import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  // Sample news data - Replace with your actual data
  const newsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop',
      category: 'Education',
      title: 'New School Inaugurated in Latehar',
      excerpt: 'A new school building was inaugurated to serve tribal communities with quality education and modern facilities.',
      date: '2025-11-28',
      readTime: '5 min read',
      link: '/news/new-school-latehar'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      category: 'Spirituality',
      title: 'Annual Ignatian Retreat Concludes',
      excerpt: 'Over 200 participants experienced spiritual renewal during the annual Ignatian retreat held at Hazaribagh.',
      date: '2025-11-25',
      readTime: '4 min read',
      link: '/news/ignatian-retreat'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      category: 'Community',
      title: 'Social Development Programs Impact Lives',
      excerpt: 'Community development initiatives reach over 10,000 families across rural Jharkhand this year.',
      date: '2025-11-20',
      readTime: '6 min read',
      link: '/news/social-development'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
      category: 'Formation',
      title: 'New Jesuits Begin Their Novitiate',
      excerpt: 'Ten young men join the Society of Jesus, beginning their journey of Jesuit formation and discernment.',
      date: '2025-11-15',
      readTime: '3 min read',
      link: '/news/new-novices'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-4 sm:py-8 lg:py-10 bg-gradient-to-b from-white to-cream">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-white border border-secondary/30 rounded-full text-primary text-sm font-semibold mb-4 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Updates & Events
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Latest News
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-base sm:text-lg max-w-2xl mx-auto">
            Stay updated with the latest happenings, events, and initiatives across our communities
          </p>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {newsData.map((news) => (
            <motion.div
              key={news.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={news.link}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-primary shadow-lg">
                        <FiTag className="w-3 h-3" />
                        {news.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Date and Read Time */}
                    <div className="flex items-center gap-3 text-xs text-gray mb-3">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        {new Date(news.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {news.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray leading-relaxed mb-4 line-clamp-3 flex-1">
                      {news.excerpt}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all duration-300">
                      <span>Read More</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/news">
            <motion.button
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All News
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;
