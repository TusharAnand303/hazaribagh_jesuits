import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logo from '../assets/images/web_images/logo.png';

const Footer = () => {
  return (
    <>
      <footer className="tracking-wide bg-navy px-8 sm:px-12 pt-12 pb-6">
        <div className="grid min-[1200px]:grid-cols-3 gap-12 xl:gap-16">
          {/* Logo and Description Section */}
          <div className="min-[1200px]:max-w-sm max-w-lg w-full">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Hazaribagh Jesuits Logo" className="h-16 w-16 object-contain" />
              <div>
                <h2 className="text-lg font-bold text-secondary">Hazaribagh Jesuits</h2>
                <p className="text-xs text-cream">Society of Jesus</p>
              </div>
            </Link>
            <div className="mt-6">
              <p className="text-cream leading-relaxed text-sm">
                The Hazaribagh Province of the Society of Jesus is committed to serving God through education, social development, and spiritual formation. We work with the poor and marginalized communities across Jharkhand.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <p className="text-cream text-sm">
                  Jesuit Province House, Hazaribagh<br />
                  Jharkhand, India - 825301
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="tel:+916546123456" className="text-cream text-sm hover:text-secondary transition-colors">
                  +91 6546 123456
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="mailto:info@hazaribaghjesuits.org" className="text-cream text-sm hover:text-secondary transition-colors">
                  info@hazaribaghjesuits.org
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <ul className="mt-6 flex space-x-5">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-sm border border-white/20">
                    <FiFacebook className="w-5 h-5 text-cream group-hover:text-navy transition-colors" />
                  </div>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-sm border border-white/20">
                    <FiInstagram className="w-5 h-5 text-cream group-hover:text-navy transition-colors" />
                  </div>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-sm border border-white/20">
                    <FiTwitter className="w-5 h-5 text-cream group-hover:text-navy transition-colors" />
                  </div>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-sm border border-white/20">
                    <FiYoutube className="w-5 h-5 text-cream group-hover:text-navy transition-colors" />
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="min-[1200px]:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <div className="max-lg:min-w-[140px]">
              <h4 className="text-secondary font-bold text-base relative mb-4">About Us</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about/history" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Our History
                  </Link>
                </li>
                <li>
                  <Link to="/about/foundation" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Foundation
                  </Link>
                </li>
                <li>
                  <Link to="/about/governance" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Governance
                  </Link>
                </li>
                <li>
                  <Link to="/about/administration" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Administration
                  </Link>
                </li>
                <li>
                  <Link to="/about/contact" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ministries */}
            <div className="max-lg:min-w-[140px]">
              <h4 className="text-secondary font-bold text-base relative mb-4">Ministries</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/ministries/english-school" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Education
                  </Link>
                </li>
                <li>
                  <Link to="/ministries/formation" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Formation
                  </Link>
                </li>
                <li>
                  <Link to="/ministries/retreats" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Ignatian Retreats
                  </Link>
                </li>
                <li>
                  <Link to="/ministries/vocation" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Vocation Promotion
                  </Link>
                </li>
                <li>
                  <Link to="/ministries/popes-prayer" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Pope's Prayer Network
                  </Link>
                </li>
              </ul>
            </div>

            {/* Communities */}
            <div className="max-lg:min-w-[140px]">
              <h4 className="text-secondary font-bold text-base relative mb-4">Communities</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/communities/hazaribag" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Hazaribag
                  </Link>
                </li>
                <li>
                  <Link to="/communities/bokaro" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Bokaro
                  </Link>
                </li>
                <li>
                  <Link to="/communities/palamu" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Palamu
                  </Link>
                </li>
                <li>
                  <Link to="/communities/latehar" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Latehar
                  </Link>
                </li>
                <li>
                  <Link to="/communities/ramgarh" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Ramgarh
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="max-lg:min-w-[140px]">
              <h4 className="text-secondary font-bold text-base relative mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/apostolic-plannings" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Apostolic Plannings
                  </Link>
                </li>
                <li>
                  <Link to="/become-a-jesuit" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Become a Jesuit
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/resources/publications" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    Publications
                  </Link>
                </li>
                <li>
                  <Link to="/new-initiatives" className="hover:text-secondary text-cream text-sm font-normal transition-colors">
                    New Initiatives
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-10 mb-6 border-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-wrap max-md:flex-col gap-4 justify-between items-center">
          <ul className="md:flex md:space-x-6 max-md:space-y-2">
            <li>
              <Link to="/privacy-policy" className="hover:text-secondary text-cream/80 text-sm font-normal transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-secondary text-cream/80 text-sm font-normal transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/about/support" className="hover:text-secondary text-cream/80 text-sm font-normal transition-colors">
                Support Us
              </Link>
            </li>
          </ul>

          <p className="text-cream/80 text-sm">
            © {new Date().getFullYear()} Hazaribagh Jesuits. All rights reserved.
          </p>
        </div>

        {/* Developer Credit */}
        <div className="text-center mt-4">
          <p className="text-xs text-cream/60">
            Developed by <span className="text-secondary font-semibold">Flowweb</span>.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
