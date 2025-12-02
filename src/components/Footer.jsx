import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-2 rounded-lg">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">HJ</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Hazaribagh Province</h3>
                <p className="text-xs text-gray-400">Society of Jesus</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The Hazaribagh Province of the Society of Jesus is committed to education, 
              social justice, and spiritual formation, serving communities across Jharkhand.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <FaFacebook className="text-lg" />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="text-lg" />
              </a>
              <a href="https://instagram.com" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="text-lg" />
              </a>
              <a href="https://youtube.com" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Our Ministries', 'Communities', 'Vocations', 'News & Events', 'Support Us'].map((link, idx) => (
                <li key={idx}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">Our Ministries</h3>
            <ul className="space-y-3">
              {['Education', 'Social Work', 'Pastoral Care', 'Formation', 'Retreat Centers', 'Media & Communication'].map((link, idx) => (
                <li key={idx}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 transition-all duration-300">
                  <FaMapMarkerAlt className="text-orange-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Provincial House<br />
                    Hazaribagh, Jharkhand<br />
                    India - 825301
                  </p>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 transition-all duration-300">
                  <FaPhone className="text-orange-400 group-hover:text-white" />
                </div>
                <a href="tel:+916546123456" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  +91 6546 123456
                </a>
              </div>
              
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 transition-all duration-300">
                  <FaEnvelope className="text-orange-400 group-hover:text-white" />
                </div>
                <a href="mailto:provincial@hazaribaghjesuits.org" className="text-gray-400 hover:text-orange-400 transition-colors text-sm break-all">
                  provincial@hazaribaghjesuits.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center">
              © 2025 Hazaribagh Province - Society of Jesus. Made with 
              <FaHeart className="text-red-500 mx-1 animate-pulse" /> 
              in India
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#privacy" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <span className="text-gray-700">•</span>
              <a href="#terms" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Terms of Service
              </a>
              <span className="text-gray-700">•</span>
              <a href="#sitemap" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
