import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsQuote } from 'react-icons/bs';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import principalImage from './../../assets/images/web_images/prin.jpeg';

const AboutHead = () => {
  // API states
  const [provincialData, setProvincialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch provincial data
  useEffect(() => {
    const fetchProvincialData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/provincial`);
        if (!response.ok) {
          throw new Error('Failed to fetch provincial data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...provincial objects... } ] }
        const provincialsArray = Array.isArray(data?.data) ? data.data : [];
        
        // Get first provincial (most recent)
        const provincial = provincialsArray[0] || null;
        
        setProvincialData(provincial);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provincial data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProvincialData();
  }, []);

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

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-6 sm:py-10 lg:py-12 overflow-hidden bg-linear-to-b from-cream to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-navy">Loading provincial message...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error or no data state
  if (error || !provincialData) {
    return (
      <section className="py-6 sm:py-10 lg:py-12 overflow-hidden bg-linear-to-b from-cream to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center min-h-[400px] flex items-center justify-center">
            <p className="text-navy">Provincial message not available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  // Truncate description to first 3 sentences for preview
  const truncateDescription = (text, sentences = 3) => {
    if (!text) return '';
    const sentenceArray = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentenceArray.slice(0, sentences).join(' ').trim();
  };

  const previewDescription = truncateDescription(provincialData.description);
  const imageSrc = provincialData.image_url || principalImage;

  return (
    <section className="py-6 sm:py-10 lg:py-12 overflow-hidden bg-linear-to-b from-cream to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-3 py-1 bg-cream border border-secondary/30 rounded-full text-primary text-xs font-semibold mb-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Leadership
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-2">
            {"Message from the Provincial"}
          </h2>
          <motion.div
            className="w-16 h-0.5 bg-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch">
              {/* Image Section */}
              <motion.div
                className="relative w-full lg:w-2/5 shrink-0"
                variants={imageVariants}
              >
                <div className="relative h-64 sm:h-80 lg:h-full min-h-80 overflow-hidden group">
                  <img
                    src={imageSrc}
                    alt={provincialData.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <BsQuote className="w-4 h-4 text-primary" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center"
                variants={contentVariants}
              >
                {/* Name and Title */}
                <motion.div className="mb-4" variants={itemVariants}>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1">
                    {provincialData.title}
                  </h3>
                  <p className="text-base text-secondary font-semibold">
                    {provincialData.subtitle }
                  </p>
                  <p className="text-sm text-gray-600">
                    Hazaribag Province
                  </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="w-12 h-0.5 bg-secondary/60 rounded-full mb-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />

                {/* Quote/Description Preview */}
                <motion.div
                  className="mb-5"
                  variants={itemVariants}
                >
                  <div className="relative pl-4 border-l-2 border-secondary/40">
                    <p className="text-sm sm:text-base text-navy leading-relaxed">
                      {previewDescription}
                      {provincialData.description && provincialData.description.length > previewDescription.length && (
                        <span className="text-primary font-semibold"> ...</span>
                      )}
                    </p>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  variants={itemVariants}
                >
                  <Link 
                    to={provincialData.read_more_link || '#'}
                    className="no-underline flex-1"
                  >
                    <motion.button
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-primary text-primary rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Read More
                      <HiArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiCalendar className="w-4 h-4" />
                    Upcoming Programme
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Quote - St. Ignatius */}
        <motion.div
          className="mt-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="bg-linear-to-r from-cream to-white p-5 sm:p-6 rounded-xl shadow-md border border-secondary/20"
            whileHover={{ scale: 1.01, boxShadow: "0 8px 25px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <BsQuote className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
              </motion.div>
              <div className="space-y-1.5">
                <p className="text-sm sm:text-base text-navy leading-relaxed italic">
                  "Go forth and set the world on fire with the love of Christ. Let your actions speak louder than words, and may your service to humanity reflect the greater glory of God."
                </p>
                <p className="text-xs text-gray-600 font-semibold">
                  — St. Ignatius of Loyola, Founder of the Society of Jesus
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHead;
