import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import { BsQuote } from 'react-icons/bs';

const Quotes = () => {
  // API states
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quotes data
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quotes`);
        if (!response.ok) {
          throw new Error('Failed to fetch quotes data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...quote objects... } ] }
        const quotesArray = Array.isArray(data?.data) ? data.data : [];
        
        setQuotes(quotesArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quotes data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12 bg-linear-to-b from-white to-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-navy">Loading quotes...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error or no data state
  if (error || quotes.length === 0) {
    return (
      <section className="w-full py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12 bg-linear-to-b from-white to-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-navy text-lg">
              {error ? 'Unable to load quotes' : 'No quotes available'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12 bg-linear-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cream border border-secondary/30 rounded-full text-primary text-sm font-semibold mb-3 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <BsQuote className="inline w-4 h-4 mr-2" />
            Voices of Impact
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-3">
            Our Stories & Impact
          </h2>
          <motion.div
            className="w-20 h-1 bg-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Quotes Grid - More gap */}
        <motion.div
          className={`grid gap-8 sm:gap-10 ${
            quotes.length === 1 
              ? 'grid-cols-1 max-w-3xl mx-auto' 
              : quotes.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
              : quotes.length === 3 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const QuoteCard = ({ quote, variants }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Animate people count with spring (smooth animation)
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated && quote.people_count) {
      setHasAnimated(true);
      motionValue.set(quote.people_count);
    }
  }, [isInView, motionValue, quote.people_count, hasAnimated]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayCount(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  // Truncate text
  const MAX_LENGTH = 100;
  const shouldTruncate = quote.quote_text && quote.quote_text.length > MAX_LENGTH;
  const displayText = isExpanded || !shouldTruncate
    ? quote.quote_text
    : quote.quote_text.substring(0, MAX_LENGTH);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-linear-to-b from-navy to-primary rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/50 h-[250px] flex flex-col group select-none">
        {/* Quote Icon */}
        <motion.div
          className="w-9 h-9 bg-linear-to-br from-secondary to-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 shrink-0"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <BsQuote className="w-4 h-4 text-white" />
        </motion.div>

        {/* People Count */}
        {quote.people_count && (
          <motion.div
            className="mb-3 shrink-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <FiUsers className="w-4 h-4 text-secondary" />
              <span className="text-xl font-bold text-white">
                {displayCount.toLocaleString()}
              </span>
            </div>
            <div className="w-10 h-0.5 bg-secondary rounded-full"></div>
          </motion.div>
        )}

        {/* Quote Text - Fixed height with overflow */}
        <div className="flex-1 overflow-hidden mb-2">
          <p className="text-xs sm:text-sm text-cream leading-relaxed italic wrap-break-word">
            "{displayText}
            {shouldTruncate && !isExpanded && (
              <span className="text-cream">...</span>
            )}"
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-secondary hover:text-yellow-400 text-xs font-semibold mt-1 underline transition-colors inline-block"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Author Name */}
        {quote.author_name && (
          <p className="text-xs font-semibold text-secondary text-right shrink-0 mt-auto">
            — {quote.author_name}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Quotes;
