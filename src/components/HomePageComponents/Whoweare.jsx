import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import logo from './../../assets/images/web_images/logoo.png';

const Whoweare = () => {
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-linear-to-b from-white to-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Title with Badge */}
        <motion.div
          className="text-center mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          {/* Badge */}
          <motion.span
            className="inline-block px-4 py-2 bg-white border border-secondary/30 rounded-full text-primary text-sm font-semibold mb-3 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiUsers className="inline w-4 h-4 mr-2" />
            About Us
          </motion.span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-2">
            Who We Are
          </h2>
          <motion.div
            className="w-20 h-0.5 bg-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>

        {/* Main Content - Wider Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            
            {/* Logo Section - Smaller */}
            <motion.div
              className="w-full lg:w-1/4 flex items-center justify-center shrink-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageVariants}
            >
              <img
                src={logo}
                alt="Society of Jesus Logo"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 object-contain"
              />
            </motion.div>

            {/* Content Section - Takes More Width */}
            <motion.div
              className="w-full lg:w-3/4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={contentVariants}
            >
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                The Society of Jesus is a world-wide organization with Headquarters in Rome where the highest authority called the Superior General resides and guides the world-wide operations of nearly 16,000 Jesuits spread out in about 112 countries.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                These 16,000 Jesuits are grouped into smaller administrative units corresponding to different geographical locations called "Provinces" presided over by Superiors appointed by the Superior General.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Whoweare;
