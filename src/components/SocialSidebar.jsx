import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';

const SocialSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      url: 'https://facebook.com',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      url: 'https://youtube.com',
      bgColor: 'bg-red-600'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com',
      bgColor: 'bg-pink-600'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: 'https://wa.me/1234567890',
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <>
      {/* Desktop Floating Social - Left Side - MOVED UP */}
      <div className="hidden lg:block fixed left-0 top-1/3 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-0">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.bgColor} text-white p-4 flex items-center justify-center transition-all duration-300 transform hover:translate-x-2 hover:scale-110 group relative`}
              style={{ width: '50px', height: '50px' }}
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

      {/* Mobile Floating Social - Bottom Left - MOVED UP */}
      <div className="lg:hidden fixed bottom-24 left-6 z-40">
        <div className="relative">
          {/* Expanded Icons - Vertical */}
          {isExpanded && (
            <div className="absolute bottom-16 left-0 flex flex-col-reverse space-y-reverse space-y-3 mb-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.bgColor} text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110`}
                  style={{
                    animation: `slideUp 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          )}

          {/* Toggle Button - Primary/Navy Colors */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative bg-gradient-to-r from-primary to-navy text-white p-4 rounded-full shadow-2xl hover:from-navy hover:to-primary transition-all duration-300 transform hover:scale-110"
          >
            {isExpanded ? (
              <FaTimes className="text-2xl transition-transform duration-300" />
            ) : (
              <RiShareBoxLine className="text-2xl transition-transform duration-300" />
            )}
            
            {/* Pulse effect when closed */}
            {!isExpanded && (
              <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-20"></span>
            )}
          </button>
        </div>
      </div>

      {/* Animation Styles */}
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
