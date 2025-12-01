import React from 'react';
import { motion } from 'framer-motion';
import { BsQuote } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';

const Testimonials = () => {
  // Testimonials data - Replace with actual testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Fr. Thomas D\'Souza',
      role: 'Alumni, St. Xavier\'s College',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      quote: 'The Jesuit education I received transformed my life. The values of service, excellence, and compassion continue to guide me every day.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sr. Mary Joseph',
      role: 'Social Worker',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      quote: 'Working alongside the Jesuits in tribal communities has been an incredible journey. Their dedication to social justice is truly inspiring.',
      rating: 5
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      role: 'Teacher, Loyola School',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      quote: 'The Ignatian pedagogy has helped me become not just a better teacher, but a better human being. I am grateful for this mission.',
      rating: 5
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.15,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      opacity: 0.25,
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  };

  const textReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-white via-cream/30 to-cream relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-white border border-secondary/30 rounded-full text-primary text-sm font-semibold mb-4 shadow-sm"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Voices of Impact
          </motion.span>
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What People Say About Us
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.p 
            className="text-gray text-base sm:text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Hear from those whose lives have been touched by our mission and ministry
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              style={{ perspective: 1000 }}
            >
              <motion.div 
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 h-full flex flex-col group relative overflow-hidden"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(128, 0, 0, 0.15)"
                }}
              >
                {/* Animated Quote Icon Background */}
                <motion.div
                  className="absolute top-4 right-4"
                  variants={quoteVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <BsQuote className="w-16 h-16 text-primary" />
                </motion.div>

                {/* Animated Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Stars Rating with Animation */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotate: 0 
                      }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: idx * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{
                        scale: 1.3,
                        rotate: 360,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <FiStar className="w-4 h-4 fill-secondary text-secondary" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote Text with Stagger Animation */}
                <div className="flex-1 mb-6 relative z-10">
                  <motion.p 
                    className="text-gray text-sm sm:text-base leading-relaxed italic"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                </div>

                {/* Person Info with Animation */}
                <motion.div 
                  className="flex items-center gap-4 pt-4 border-t border-gray-200 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {/* Animated Image */}
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-secondary/20 group-hover:ring-secondary/50 transition-all duration-300 relative"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                  >
                    <motion.img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Ring Pulse Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-secondary"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Name and Role with Stagger */}
                  <div>
                    <motion.h4 
                      className="font-bold text-navy text-base group-hover:text-primary transition-colors duration-300"
                      custom={0}
                      variants={textReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <motion.p 
                      className="text-xs sm:text-sm text-gray"
                      custom={1}
                      variants={textReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {testimonial.role}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Decorative Corner Elements */}
                <motion.div
                  className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-secondary/10 to-transparent rounded-tl-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Quote Marks Decoration */}
        <motion.div
          className="absolute top-1/2 left-0 transform -translate-y-1/2"
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BsQuote className="w-32 h-32 text-secondary/20" />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-0"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <BsQuote className="w-24 h-24 text-primary/20 transform rotate-180" />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
