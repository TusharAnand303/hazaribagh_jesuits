import React from 'react';
import { motion } from 'framer-motion';
import { BsQuote } from 'react-icons/bs';
import principalImage from './../../assets/images/web_images/prin.jpeg';

const AboutHead = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-4 sm:py-8 lg:py-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-cream border border-secondary/30 rounded-full text-primary text-xs font-semibold mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Leadership
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-3">
            Message from the Provincial
          </h2>
          <motion.div
            className="w-20 h-0.5 bg-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Content Flex Container */}
        <motion.div
          className="flex flex-col lg:flex-row lg:justify-between items-center max-w-6xl mx-auto gap-10 lg:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Image Section */}
          <motion.div
            className="relative group w-full lg:w-[45%] order-2 lg:order-1"
            variants={imageVariants}
          >
            <motion.div
              className="relative overflow-hidden rounded-xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={principalImage}
                alt="Fr. Provincial - Hazaribagh Jesuits"
                className="w-full h-[350px] sm:h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-3 -left-3 w-20 h-20 bg-secondary/20 rounded-full blur-2xl -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Quote Icon */}
            <motion.div
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <BsQuote className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            className="w-full lg:w-[45%] order-1 lg:order-2 space-y-4"
            variants={contentVariants}
          >
            {/* Name and Title */}
            <motion.div className="space-y-1" variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-bold text-primary">
                Rev. Fr. John Michael, S.J.
              </h3>
              <p className="text-base text-secondary font-semibold">
                Provincial Superior
              </p>
              <p className="text-xs text-gray">
                Hazaribagh Province of the Society of Jesus
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-12 h-0.5 bg-secondary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Quote/Message */}
            <motion.div
              className="relative pl-4 border-l-3 border-secondary"
              variants={itemVariants}
            >
              <p className="text-base sm:text-lg text-navy font-medium italic leading-relaxed">
                "Finding God in all things and serving Him through education, social justice, and spiritual formation."
              </p>
            </motion.div>

            {/* Description/Bio */}
            <motion.div
              className="space-y-3 text-gray leading-relaxed text-sm"
              variants={itemVariants}
            >
              <p>
                Welcome to the Hazaribagh Province of the Society of Jesus. For over decades, we have been committed to serving the people of Jharkhand through our ministries in education, social development, and spiritual formation.
              </p>
              <p>
                Our mission is rooted in the Ignatian spirituality of finding God in all things. We work with the poor, the marginalized, and the tribal communities, empowering them through quality education and faith formation.
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div className="pt-3" variants={itemVariants}>
              <div className="space-y-1">
                <motion.p
                  className="text-xl font-signature text-primary italic"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Fr. John Michael
                </motion.p>
                <p className="text-xs text-gray">
                  Provincial Superior, Society of Jesus
                </p>
              </div>
            </motion.div>

            {/* Additional Info/Stats */}
            <motion.div
              className="flex justify-between items-center pt-4 border-t border-gray-200"
              variants={itemVariants}
            >
              <motion.div
                className="text-center flex-1"
                variants={statsVariants}
                whileHover={{ scale: 1.1 }}
              >
                <motion.p
                  className="text-2xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  50+
                </motion.p>
                <p className="text-xs text-gray">Communities</p>
              </motion.div>
              <motion.div
                className="text-center flex-1 border-x border-gray-200"
                variants={statsVariants}
                whileHover={{ scale: 1.1 }}
              >
                <motion.p
                  className="text-2xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  200+
                </motion.p>
                <p className="text-xs text-gray">Jesuits</p>
              </motion.div>
              <motion.div
                className="text-center flex-1"
                variants={statsVariants}
                whileHover={{ scale: 1.1 }}
              >
                <motion.p
                  className="text-2xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  100K+
                </motion.p>
                <p className="text-xs text-gray">Lives Touched</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Quote Section */}
        <motion.div
          className="mt-10 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={quoteVariants}
        >
          <motion.div
            className="bg-gradient-to-r from-cream to-white p-6 sm:p-8 rounded-xl shadow-md border border-secondary/20"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <BsQuote className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0 mt-1" />
              </motion.div>
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-navy leading-relaxed italic">
                  "Go forth and set the world on fire with the love of Christ. Let your actions speak louder than words, and may your service to humanity reflect the greater glory of God."
                </p>
                <p className="text-xs text-gray font-semibold">
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
