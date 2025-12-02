import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

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
          className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-40 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-md shadow-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
