import React, { useState, useEffect } from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeart
} from 'react-icons/fa';
import footer_logo from './../assets/images/web_images/logoo.png';

const Footer = () => {
  /* =======================
     LOGO STATES
  ======================== */
  const [logoData, setLogoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =======================
     FOOTER LINK STATES
  ======================== */
  const [quickLinks, setQuickLinks] = useState([]);
  const [relatedLinks, setRelatedLinks] = useState([]);
  const [moreLinks, setMoreLinks] = useState([]);

  /* =======================
     FETCH LOGO
  ======================== */
  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/logo`
        );
        if (!response.ok) throw new Error('Failed to fetch logo');

        const data = await response.json();
        const logosArray = Array.isArray(data?.data) ? data.data : [];

        const footerLogo =
          logosArray.find(item => item.title === 'Footer Logo') ||
          logosArray[0] ||
          null;

        setLogoData(footerLogo);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLogoData();
  }, []);

  /* =======================
     FETCH FOOTER LINKS
  ======================== */
  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/footerlink`
        );
        const result = await response.json();

        if (result?.status && Array.isArray(result.data)) {
          setQuickLinks(result.data.filter(l => l.link_type === 'link1'));
          setRelatedLinks(result.data.filter(l => l.link_type === 'link2'));
          setMoreLinks(result.data.filter(l => l.link_type === 'link3'));
        }
      } catch (error) {
        console.error('Footer link fetch error:', error);
      }
    };

    fetchFooterLinks();
  }, []);

  /* =======================
     LOGO SRC
  ======================== */
  const logoSrc =
    !loading && !error && logoData?.image_url
      ? logoData.image_url
      : footer_logo;

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-16 pb-8">
        <div className="flex sm:flex-row flex-col gap-10 justify-around mb-10">

          {/* ================= LOGO + SOCIAL ================= */}
          <div className="flex flex-col items-start sm:items-center">
            <img
              src={logoSrc}
              alt={logoData?.title || 'Footer Logo'}
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain mb-6"
            />

            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/1G5q1Cx3b6/" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/hazaribagjesuits" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@HazaribagJesuits" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <a href={link.url}
                    className="text-gray-400 hover:text-orange-400 text-sm flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-2 transition-all"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= RELATED LINKS ================= */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-400">
              Related Links
            </h3>
            <ul className="space-y-3">
              {relatedLinks.map(link => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 text-sm flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-2 transition-all"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= MORE LINKS ================= */}
          <div>
            <ul className="space-y-3">
              {moreLinks.map(link => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 text-sm flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-2 transition-all"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm flex items-center">
              © 2025 Hazaribagh Province – Society of Jesus
              <FaHeart className="text-red-500 mx-1 animate-pulse" />
              India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
