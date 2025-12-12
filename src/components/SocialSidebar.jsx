import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { RiShareBoxLine } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';

const SocialSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);

  // Map API platform names → React Icons
  const iconMap = {
    Facebook: <FaFacebookF />,
    YouTube: <FaYoutube />,
    Instagram: <FaInstagram />,
    WhatsApp: <FaWhatsapp />,
    X: <FaXTwitter />,
    LinkedIn: <FaLinkedinIn />
  };

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/sociallinks`
        );
        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          // Transform API data → required format
          const formatted = result.data.map((item) => ({
            name: item.platform,
            icon: iconMap[item.platform] || null,
            url: item.link || "#",
            bgColor: item.bg_color || "#000"
          }));

          setSocialLinks(formatted);
        }
      } catch (error) {
        console.error("Error loading social links:", error);
      }
    };

    loadSocialLinks();
  }, []);

  return (
    <>
      {/* DESKTOP — LEFT SIDE */}
      <div className="hidden lg:block fixed left-0 top-[45%] transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-0">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white p-4 flex items-center justify-center transition-all duration-300 transform hover:translate-x-2 hover:scale-110 group relative"
              style={{
                backgroundColor: social.bgColor,
                width: '50px',
                height: '50px'
              }}
            >
              <span className="text-xl">{social.icon}</span>

              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
                {social.name}
                <span className="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-gray-900"></span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* MOBILE — FLOATING BOTTOM BUTTON */}
      <div className="lg:hidden fixed bottom-24 left-6 z-40">
        <div className="relative">
          {isExpanded && (
            <div className="absolute bottom-16 left-0 flex flex-col-reverse space-y-reverse space-y-3 mb-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: social.bgColor,
                    animation: `slideUp 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative bg-linear-to-r from-primary to-navy text-white p-4 rounded-full shadow-2xl hover:from-navy hover:to-primary transition-all duration-300 transform hover:scale-110"
          >
            {isExpanded ? (
              <FaTimes className="text-2xl" />
            ) : (
              <RiShareBoxLine className="text-2xl" />
            )}

            {!isExpanded && (
              <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-20"></span>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default SocialSidebar;
