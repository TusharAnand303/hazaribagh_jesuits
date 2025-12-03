import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[120px] sm:text-[180px] lg:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-navy leading-none">
            404
          </h1>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-navy text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FiHome className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-navy text-navy font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-navy hover:text-white"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-gray-300 pt-8"
        >
          <p className="text-sm text-gray-600 mb-4 font-semibold">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'About Us', url: '/about/history' },
              { name: 'Communities', url: '/communities/hazaribag' },
              { name: 'Ministries', url: '/education' },
              { name: 'Gallery', url: '/gallery' },
              { name: 'Contact', url: '/about/contact' }
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.url}
                className="text-sm text-gray-700 hover:text-primary transition-colors duration-300 underline underline-offset-4 hover:underline-offset-8"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-secondary"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
