import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FiUsers, FiHome, FiBook, FiHeart, FiTrendingUp } from 'react-icons/fi';

const OurStats = () => {
  const stats = [
    {
      id: 1,
      icon: FiHome,
      number: 50,
      suffix: '+',
      label: 'Communities',
      color: 'from-secondary to-yellow-500',
    },
    {
      id: 2,
      icon: FiUsers,
      number: 200,
      suffix: '+',
      label: 'Jesuits',
      color: 'from-primary to-red-600',
    },
    {
      id: 3,
      icon: FiBook,
      number: 25,
      suffix: '+',
      label: 'Institutions',
      color: 'from-secondary to-orange-500',
    },
    {
      id: 4,
      icon: FiHeart,
      number: 100,
      suffix: 'K+',
      label: 'Lives Touched',
      color: 'from-primary to-pink-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12 bg-linear-to-b from-white to-cream ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - More compact */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
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

        {/* Stats - More compact grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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

const SimpleStatCard = ({ stat, variants }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-linear-to-b from-navy to-primary rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/50 text-center group h-full">
        {/* Icon with Gradient Background - Smaller */}
        <motion.div
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>

        {/* Number - Slightly smaller */}
        <motion.div
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayValue}
          <span className="text-white">{stat.suffix}</span>
        </motion.div>

        {/* Label - Smaller */}
        <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-white transition-colors duration-300">
          {stat.label}
        </h3>
      </div>
    </motion.div>
  );
};

export default OurStats;
