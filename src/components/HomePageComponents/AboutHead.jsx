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
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden bg-linear-to-b from-cream to-white">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-6xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center min-h-[280px] xs:min-h-[320px] sm:min-h-[360px] md:min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary mb-3 sm:mb-4"></div>
              <p className="text-navy text-sm sm:text-base font-medium">Loading provincial message...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }


  // Error or no data state
  if (error || !provincialData) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden bg-linear-to-b from-cream to-white">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-6xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 text-center min-h-[280px] xs:min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex items-center justify-center">
            <p className="text-navy text-sm sm:text-base">Provincial message not available at this time.</p>
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
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden bg-linear-to-b from-cream to-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1400px]">
        {/* Section Title */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-3 py-1 xs:px-4 xs:py-1.5 sm:px-5 sm:py-2 bg-cream border border-secondary/30 rounded-full text-primary text-[10px] xs:text-xs sm:text-sm font-semibold mb-2 sm:mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Leadership
          </motion.span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-navy mb-2 sm:mb-3 px-2 xs:px-4 leading-tight">
            Message from the Provincial
          </h2>
          <motion.div
            className="w-12 xs:w-14 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
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
          <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Image Section */}
              <motion.div
                className="relative w-full lg:w-[40%] shrink-0"
                variants={imageVariants}
              >
                <div className="relative h-80 xs:h-[360px] sm:h-[400px] md:h-[450px] lg:h-full lg:min-h-[480px] overflow-hidden group">
                  <img
                    src={imageSrc}
                    alt={provincialData.title}
                    className="w-full h-full object-contain lg:object-cover bg-linear-to-t to-cream from-white transform transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute top-3 right-3 xs:top-4 xs:right-4 bg-white/95 backdrop-blur-sm p-2 xs:p-2.5 sm:p-3 rounded-full shadow-lg"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <BsQuote className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-primary" />
                  </motion.div>
                </div>
              </motion.div>


              {/* Content Section */}
              <motion.div
                className="w-full lg:w-[60%] p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-center"
                variants={contentVariants}
              >
                {/* Name and Title */}
                <motion.div className="mb-3 xs:mb-4 sm:mb-4" variants={itemVariants}>
                  <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-primary mb-1 xs:mb-1.5 leading-tight">
                    {provincialData.title}
                  </h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-base text-secondary font-semibold leading-snug">
                    {provincialData.subtitle}
                  </p>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-0.5 xs:mt-1">
                    Hazaribag Province
                  </p>
                </motion.div>


                {/* Divider */}
                <motion.div
                  className="w-10 xs:w-12 sm:w-14 md:w-16 h-0.5 bg-secondary/60 rounded-full mb-3 xs:mb-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />


                {/* Quote/Description Preview */}
                <motion.div
                  className="mb-4 xs:mb-5"
                  variants={itemVariants}
                >
                  <div className="relative pl-3 xs:pl-4 sm:pl-4 border-l-2 border-secondary/40">
                    <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-navy leading-relaxed">
                      {previewDescription}
                      {provincialData.description && provincialData.description.length > previewDescription.length && (
                        <span className="text-primary font-semibold"> ...</span>
                      )}
                    </p>
                  </div>
                </motion.div>


                {/* Buttons - 50/50 side by side */}
                <motion.div
                  className="grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3"
                  variants={itemVariants}
                >
                  <Link 
                    to={provincialData.read_more_link || '#'}
                    className="no-underline"
                  >
                    <motion.button
                      className="w-full flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 bg-white border-2 border-primary text-primary rounded-md sm:rounded-lg font-medium text-[10px] xs:text-[11px] sm:text-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="truncate">Read More</span>
                      <HiArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    </motion.button>
                  </Link>
                  <motion.button
                    className="w-full flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 bg-primary text-white rounded-md sm:rounded-lg font-medium text-[10px] xs:text-[11px] sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiCalendar className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Programme</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>


        {/* Bottom Quote - St. Ignatius */}
        <motion.div
          className="mt-6 xs:mt-7 sm:mt-8 md:mt-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="bg-linear-to-r from-cream to-white p-3 xs:p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-md border border-secondary/20"
            whileHover={{ scale: 1.01, boxShadow: "0 8px 25px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="shrink-0"
              >
                <BsQuote className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-secondary mt-0.5 xs:mt-1" />
              </motion.div>
              <div className="space-y-1 xs:space-y-1.5 flex-1 min-w-0">
                <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-navy leading-relaxed italic">
                  "Go forth and set the world on fire with the love of Christ. Let your actions speak louder than words, and may your service to humanity reflect the greater glory of God."
                </p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-600 font-semibold">
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
