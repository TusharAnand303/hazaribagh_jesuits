import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FiUsers, FiHome, FiBook, FiHeart, FiAward, FiGlobe, FiTrendingUp } from 'react-icons/fi';

const OurStats = () => {
  const stats = [
    {
      id: 1,
      icon: FiHome,
      number: 50,
      suffix: '+',
      label: 'Communities',
      color: 'from-secondary to-yellow-500'
    },
    {
      id: 2,
      icon: FiUsers,
      number: 200,
      suffix: '+',
      label: 'Jesuits',
      color: 'from-primary to-red-600'
    },
    {
      id: 3,
      icon: FiBook,
      number: 25,
      suffix: '+',
      label: 'Institutions',
      color: 'from-secondary to-orange-500'
    },
    {
      id: 4,
      icon: FiHeart,
      number: 100,
      suffix: 'K+',
      label: 'Lives Touched',
      color: 'from-primary to-pink-600'
    },
    {
      id: 5,
      icon: FiAward,
      number: 75,
      suffix: '+',
      label: 'Years of Service',
      color: 'from-secondary to-amber-600'
    },
    {
      id: 6,
      icon: FiGlobe,
      number: 15,
      suffix: '+',
      label: 'Districts',
      color: 'from-primary to-purple-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

  return (
    <section className="w-full py-4 sm:py-8 lg:py-12 px-6 sm:px-12 lg:px-20 xl:px-32 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cream border border-secondary/30 rounded-full text-primary text-sm font-semibold mb-4 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <FiTrendingUp className="inline w-4 h-4 mr-2" />
            Our Impact in Numbers
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Making a Difference
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {stats.map((stat) => (
            <SimpleStatCard key={stat.id} stat={stat} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Simple Stat Card Component
const SimpleStatCard = ({ stat, variants }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      motionValue.set(stat.number);
    }
  }, [isInView, motionValue, stat.number, hasAnimated]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [springValue]);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/50 text-center group h-full">
        {/* Icon with Gradient Background */}
        <motion.div
          className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </motion.div>

        {/* Number */}
        <motion.div
          className="text-3xl sm:text-4xl font-bold text-navy mb-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayValue}
          <span className="text-primary">{stat.suffix}</span>
        </motion.div>

        {/* Label */}
        <h3 className="text-sm sm:text-base font-semibold text-gray group-hover:text-primary transition-colors duration-300">
          {stat.label}
        </h3>
      </div>
    </motion.div>
  );
};

export default OurStats;
