import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const SocialSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      url: 'https://facebook.com',
      color: 'hover:bg-blue-600',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: 'https://twitter.com',
      color: 'hover:bg-sky-500',
      bgColor: 'bg-sky-500'
    },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      url: 'https://youtube.com',
      color: 'hover:bg-red-600',
      bgColor: 'bg-red-600'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com',
      color: 'hover:bg-pink-600',
      bgColor: 'bg-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      url: 'https://linkedin.com',
      color: 'hover:bg-blue-700',
      bgColor: 'bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: 'https://wa.me/1234567890',
      color: 'hover:bg-green-500',
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <>
      {/* Desktop Floating Social - Left Side */}
      <div className="hidden lg:block fixed left-0 top-1/2 transform -translate-y-1/2 z-40">
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
              <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {social.name}
                <span className="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-gray-900"></span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Floating Social - Bottom Right */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Expanded Icons */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 flex flex-col-reverse space-y-reverse space-y-3 mb-3">
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

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-110"
          >
            {isExpanded ? (
              <FaYoutube className="text-2xl transform rotate-45 transition-transform duration-300" />
            ) : (
              <FaYoutube className="text-2xl transition-transform duration-300" />
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
