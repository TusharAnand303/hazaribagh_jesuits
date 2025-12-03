import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiNavigation } from 'react-icons/fi';

const Maps = () => {
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

  const mapVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
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
            <FiMapPin className="inline w-4 h-4 mr-1" />
            Find Us
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Our Location
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-gray text-base sm:text-lg max-w-2xl mx-auto">
            Visit us at Arrupe Niwas, Jesuit Provincialate. We welcome you to our community.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={mapVariants}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Responsive Map Wrapper - Using Tailwind aspect-ratio */}
            <div className="relative w-full aspect-[5/2] sm:aspect-[2/1] lg:aspect-[5/2]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.1932617310854!2d90.47817987566367!3d23.88276467858032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755cf000259f935%3A0x2c370d86aa46cc29!2sArrupe%20Niwas%2C%20Jesuit%20Novitiate!5e0!3m2!1sen!2sin!4v1764678827425!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Arrupe Niwas Location Map"
              />
            </div>

            {/* Location Info */}
            <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-gray text-sm sm:text-base leading-relaxed">
                    <span className="font-semibold text-navy">Arrupe Niwas, Jesuits Provincialate</span><br />
                    Holy Cross Marg, Hazaribagh<br />
                    P.O. Box 6, 825301<br />
                    Jharkhand, India
                  </p>
                </div>
                <motion.a
                  href="https://www.google.com/maps/dir/?api=1&destination=23.88276467858032,90.47817987566367"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiNavigation className="w-4 h-4" />
                  Get Directions
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Maps;
