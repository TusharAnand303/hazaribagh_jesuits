import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FaTimes } from 'react-icons/fa';

const PopupNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popup data
  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        // Check if popup was already closed in this session
        const popupClosed = sessionStorage.getItem('popupClosed');
        if (popupClosed === 'true') {
          setLoading(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/popup`);
        if (!response.ok) {
          throw new Error('Failed to fetch popup data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...popup objects... } ] }
        const popupsArray = Array.isArray(data?.data) ? data.data : [];
        
        // Get first active popup
        const activePopup = popupsArray.find(popup => popup.status === 1);
        
        if (activePopup) {
          setPopupData(activePopup);
          // Show popup after a small delay for better UX
          setTimeout(() => {
            setIsOpen(true);
          }, 500);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popup data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPopupData();
  }, []);

  // Close popup handler
  const handleClose = () => {
    setIsOpen(false);
    // Store in sessionStorage that popup has been closed
    sessionStorage.setItem('popupClosed', 'true');
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Don't render if loading, error, or no popup data
  if (loading || error || !popupData || !isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-9999 bg-linear-to-r from-primary/20 via-secondary/10 to-navy/20  transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div
            className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full transform transition-all duration-500 ${
              isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 z-10 bg-primary hover:bg-navy text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 group cursor-pointer"
              aria-label="Close popup"
            >
              <FaTimes className="w-5 h-5 group-hover:text-secondary transition-colors" />
            </button>

            {/* Decorative Border */}
            <div className="absolute inset-0 rounded-2xl border-4 border-secondary/20 pointer-events-none"></div>

            {/* Content */}
            <div className="relative">
              {/* Top Accent Bar */}
              <div className="h-2 bg-linear-to-r from-primary via-secondary to-navy rounded-t-2xl"></div>

              {/* Image Container */}
              <div className="p-4 sm:p-6">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={popupData.image_url}
                    alt="Notice"
                    className="w-full h-auto object-contain max-h-[70vh]"
                    loading="eager"
                  />
                  
                  {/* Image Overlay linear */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="px-4 sm:px-6 pb-6 flex items-center justify-between">
                {/* Info Text */}
                <p className="text-sm text-navy/60 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                  Important Notice
                </p>

                {/* Close Button (Alternative) */}
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-linear-to-r from-primary to-navy hover:from-navy hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Got it!
                </button>
              </div>

              {/* Bottom Accent Bar */}
              <div className="h-2 bg-linear-to-r from-navy via-secondary to-primary rounded-b-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default PopupNotice;
