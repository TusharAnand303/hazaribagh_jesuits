import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import footer_logo from './../assets/images/web_images/logoo.png';

const Footer = () => {
  // logo states
  const [logoData, setLogoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logo data
  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/logo`);
        if (!response.ok) {
          throw new Error('Failed to fetch logo data');
        }
        const data = await response.json();

        // API: { status: true, data: [ { ...logo objects... } ] }
        const logosArray = Array.isArray(data?.data) ? data.data : [];
        // pick Footer Logo if exists, otherwise first logo, otherwise null
        const footerLogo =
          logosArray.find((item) => item.title === 'Footer Logo') ||
          logosArray[0] ||
          null;

        setLogoData(footerLogo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logo data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchLogoData();
  }, []);

  // decide which logo src to use
  const logoSrc =
    !loading && !error && logoData && logoData.image_url
      ? logoData.image_url
      : footer_logo; // fallback to local footer_logo

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white w-full">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-16 pb-8">
        <div className="flex sm:flex-row flex-col gap-10 sm:gap-0 items-start sm:p-0 sm:pl-0 pl-3 sm:items-start justify-around mb-10">
          {/* Logo and Social Links Only */}
          <div className="flex flex-col items-start sm:items-center">
            {/* Large Logo */}
            <div className="mb-6">
              <img 
                src={logoSrc} 
                alt={logoData?.title || "Hazaribagh Province Logo"}
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain transition-transform duration-300 hover:scale-105" 
              />
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">Quick Links</h3>
            <ul className="space-y-3">
              {['History', 'Our Ministries', 'Communities', 'Vocations', 'News & Events', 'Support Us'].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={`${link.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">Related Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Jesuit Curia in Rome', url: 'https://sjcuria.global/en/' },
                { name: 'Jesuit Conference of South Asia', url: 'https://jcsaweb.org/' },
                { name: 'Universal Apostolic Preferences', url: 'https://sites.google.com/view/universalpreferences/home' },
                { name: 'Jesuit Refugee Service', url: 'https://jrs.net/en/jesuit-refugee-service/' },
                { name: "Pope's Worldwide Prayer Network", url: 'https://www.popesprayer.va/' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group wrap-break-word"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300 shrink-0"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            {/* <h3 className="text-lg font-bold mb-6 text-orange-400">Resources</h3> */}
            <ul className="space-y-3">
              {[
                { name: 'Vatican Observatory', url: 'http://www.vaticanobservatory.va/content/specolavaticana/en.html' },
                { name: 'Lok Manch', url: 'http://www.hamaralokmanch.net/Default.aspx' },
                { name: 'JIVAN', url: 'https://jcsaweb.org/resources/publications/jivan/' },
                { name: 'IGNIS', url: 'https://jcsaweb.org/resources/publications/' },
                { name: 'America Magazine', url: 'https://www.americamagazine.org/' },
                { name: 'Online Ministries', url: 'https://onlineministries.creighton.edu/CollaborativeMinistry/online.html' },
                { name: 'Ignatian Spirituality', url: 'https://www.ignatianspirituality.com/' },
                { name: 'Loyola Press', url: 'https://www.loyolapress.com/our-catholic-faith/ignatian-spirituality' },
                { name: 'Archives', url: 'https://jesuitarchives.blogspot.com/' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group wrap-break-word"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300 shrink-0"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
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
