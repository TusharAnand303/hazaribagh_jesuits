import React from 'react';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone } from 'react-icons/fi';

const SocialSidebar = () => {
  const socialLinks = [
    {
      id: 1,
      name: 'Facebook',
      icon: FiFacebook,
      url: 'https://facebook.com/hazaribaghjesuits',
      color: '#1877F2',
      hoverColor: '#0C63D4'
    },
    {
      id: 2,
      name: 'Instagram',
      icon: FiInstagram,
      url: 'https://instagram.com/hazaribaghjesuits',
      color: '#E4405F',
      hoverColor: '#D31245'
    },
    {
      id: 3,
      name: 'Twitter',
      icon: FiTwitter,
      url: 'https://twitter.com/hazaribaghjesuits',
      color: '#1DA1F2',
      hoverColor: '#0C8BD9'
    },
    {
      id: 4,
      name: 'YouTube',
      icon: FiYoutube,
      url: 'https://youtube.com/@hazaribaghjesuits',
      color: '#FF0000',
      hoverColor: '#CC0000'
    },
    {
      id: 5,
      name: 'Email',
      icon: FiMail,
      url: 'mailto:info@hazaribaghjesuits.org',
      color: '#D4AF37',
      hoverColor: '#B8941F'
    },
    {
      id: 6,
      name: 'Call Us',
      icon: FiPhone,
      url: 'tel:+916546123456',
      color: '#800000',
      hoverColor: '#5C0000'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-3">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.id}
              href={social.url}
              target={social.url.startsWith('http') ? '_blank' : '_self'}
              rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative"
              variants={itemVariants}
              whileHover={{ x: 10, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Main Icon Button */}
              <motion.div
                className="w-12 h-12 bg-white rounded-r-full shadow-lg flex items-center justify-center border-2 border-gray-100 group-hover:border-transparent transition-all duration-300"
                style={{
                  borderLeftWidth: 0
                }}
                whileHover={{
                  backgroundColor: social.color,
                  boxShadow: `0 10px 30px ${social.color}40`
                }}
              >
                <Icon className="w-5 h-5 text-navy group-hover:text-white transition-colors duration-300" />
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-xl"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                {social.name}
                {/* Arrow */}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-navy"></div>
              </motion.div>

              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-r-full"
                style={{ backgroundColor: social.color }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 0.6
                }}
              />
            </motion.a>
          );
        })}
      </div>

      {/* Decorative Line */}
      <motion.div
        className="absolute top-0 left-0 w-1 bg-gradient-to-b from-transparent via-secondary to-transparent"
        style={{ height: '200%', top: '-50%' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </motion.div>
  );
};

export default SocialSidebar;
