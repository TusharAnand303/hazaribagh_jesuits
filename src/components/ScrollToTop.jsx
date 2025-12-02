import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWithDelay, setShowWithDelay] = useState(false);

  // Show button when page is scrolled to 50%
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate if user has scrolled 50% of the page
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      if (scrollPercentage >= 30) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowWithDelay(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Add delay animation when button becomes visible
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setShowWithDelay(true);
      }, 200); // 200ms delay before showing
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-40 p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 ${
            showWithDelay ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            background: 'linear-gradient(to right, #800000, #01082F)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #01082F, #800000)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #800000, #01082F)';
          }}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl text-white" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
