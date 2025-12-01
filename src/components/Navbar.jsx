import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import logo from '../assets/images/web_images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);
  const timeoutRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // Close all dropdowns when toggling menu
    if (!isOpen) {
      setOpenDropdown(null);
      setActiveDesktopMenu(null);
    }
  };

  const handleDropdownToggle = (menu) => {
    // For both mobile and desktop click
    if (openDropdown === menu) {
      setOpenDropdown(null);
      setActiveDesktopMenu(null);
    } else {
      setOpenDropdown(menu);
      setActiveDesktopMenu(menu);
    }
  };

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDesktopMenu(menu);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu(null);
      setOpenDropdown(null);
    }, 300);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setActiveDesktopMenu(null);
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setActiveDesktopMenu(null);
  };

  const menuData = {
    aboutUs: {
      title: 'About Us',
      items: [
        { title: 'Our History', url: '/about/history' },
        { title: 'Foundation', url: '/about/foundation' },
        { title: 'Legacy', url: '/about/legacy' },
        { title: 'Governance', url: '/about/governance' },
        { title: 'Administration', url: '/about/administration' },
        { title: 'Councils', url: '/about/councils' },
        { title: 'Support Us', url: '/about/support' },
        { title: 'Contact Us', url: '/about/contact' }
      ]
    },
    communities: {
      title: 'Communities',
      items: [
        { title: 'Hazaribag', url: '/communities/hazaribag' },
        { title: 'Bokaro', url: '/communities/bokaro' },
        { title: 'Palamu', url: '/communities/palamu' },
        { title: 'Garha', url: '/communities/garha' },
        { title: 'Latehar', url: '/communities/latehar' },
        { title: 'Ramgarh', url: '/communities/ramgarh' }
      ]
    },
    ministries: {
      title: 'Ministries',
      items: [
        { title: 'Education', url: '/education' },
        { title: 'Pastoral', url: '/pastoral' },
        { title: 'Mass Centers', url: '/mass_center' },
        { title: 'Social Centers', url: '/social_center' },
        { title: 'Youth', url: '/youth/jamuniatar' },
        { title: 'Formation', url: '/formation/tarwa' },
        { title: 'Vocation Promotion', url: '/vocation' },
        { title: 'Ignatian Retreats', url: '/retreats' },
        { title: "Pope's Worldwide Prayer", url: '/popes-prayer' }
      ]
    },
    resources: {
      title: 'Resources',
      items: [
        { title: 'Publications', url: '/resources/publications' },
        { title: 'Books', url: '/resources/books' },
        { title: 'Jesuit Blogs', url: '/resources/blogs' }
      ]
    }
  };

  return (
    <>
      <header className="flex shadow-md py-2 px-4 sm:px-10 bg-white min-h-[70px] relative z-50">
        <div className="flex items-center justify-between gap-2 sm:gap-5 w-full">
          {/* Desktop Logo */}
          <Link to="/" className="max-sm:hidden flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <img src={logo} alt="Jesuit Logo" className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
            <div className="hidden xl:block">
              <h1 className="text-lg xl:text-xl font-bold text-primary leading-tight">Hazaribagh Jesuits</h1>
              <p className="text-xs text-gray">Society of Jesus</p>
            </div>
          </Link>

          {/* Mobile Logo */}
          <Link to="/" className="hidden max-sm:block flex-shrink-0">
            <img src={logo} alt="Jesuit Logo" className="h-12 w-12 object-contain" />
          </Link>

          {/* Navigation Menu */}
          <div
            id="collapseMenu"
            className={`${isOpen ? 'max-lg:block' : 'max-lg:hidden'} lg:!flex lg:flex-1 lg:justify-center`}
          >
            {/* Backdrop Overlay for Mobile */}
            {isOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={handleBackdropClick}
              />
            )}

            {/* Close Button for Mobile */}
            <button
              onClick={handleToggle}
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-cream hover:border-primary transition-all shadow-lg"
            >
              <FiX className="w-5 h-5 text-primary" />
            </button>

            <ul className="lg:flex lg:items-center gap-x-2 xl:gap-x-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              {/* Mobile Logo in Menu */}
              <li className="mb-6 hidden max-lg:block border-b border-gray-200 pb-4">
                <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2">
                  <img src={logo} alt="Jesuit Logo" className="h-12 w-12 object-contain" />
                  <div>
                    <span className="font-bold text-primary block">Hazaribagh Jesuits</span>
                    <span className="text-xs text-gray">Society of Jesus</span>
                  </div>
                </Link>
              </li>

              {/* Home */}
              <li className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3">
                <Link
                  to="/"
                  className="hover:text-primary text-primary block font-bold text-sm whitespace-nowrap transition-all duration-200"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>

              {/* About Us - Dropdown */}
              <li 
                className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3 relative group"
                onMouseEnter={() => handleMouseEnter('aboutUs')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleDropdownToggle('aboutUs')}
                  className="hover:text-primary text-navy font-semibold text-sm flex items-center gap-1 w-full transition-all duration-200 group whitespace-nowrap"
                >
                  {menuData.aboutUs.title}
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${activeDesktopMenu === 'aboutUs' || openDropdown === 'aboutUs' ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Desktop Dropdown */}
                {activeDesktopMenu === 'aboutUs' && (
                  <div 
                    className="hidden lg:block absolute top-full left-0 mt-3 w-80 bg-white shadow-md rounded-2xl border-2 border-cream py-2 z-50 animate-fadeIn"
                    onMouseEnter={() => handleMouseEnter('aboutUs')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menuData.aboutUs.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between px-6 py-3.5 text-sm text-navy hover:bg-cream hover:text-primary transition-all duration-200 group/item border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium">{item.title}</span>
                        <FiChevronRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-2 transition-all duration-200 text-primary" />
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Mobile Dropdown */}
                {openDropdown === 'aboutUs' && (
                  <div className="lg:hidden mt-3 ml-4 space-y-1 animate-slideDown bg-cream rounded-lg p-2">
                    {menuData.aboutUs.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 text-sm text-navy hover:text-primary py-2.5 px-3 rounded-lg hover:bg-white transition-all duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <FiChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Communities - Dropdown */}
              <li 
                className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3 relative group"
                onMouseEnter={() => handleMouseEnter('communities')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleDropdownToggle('communities')}
                  className="hover:text-primary text-navy font-semibold text-sm flex items-center gap-1 w-full transition-all duration-200 group whitespace-nowrap"
                >
                  {menuData.communities.title}
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${activeDesktopMenu === 'communities' || openDropdown === 'communities' ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Desktop Dropdown */}
                {activeDesktopMenu === 'communities' && (
                  <div 
                    className="hidden lg:block absolute top-full left-0 mt-3 w-80 bg-white shadow-md rounded-2xl border-2 border-cream py-2 z-50 animate-fadeIn"
                    onMouseEnter={() => handleMouseEnter('communities')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menuData.communities.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between px-6 py-3.5 text-sm text-navy hover:bg-cream hover:text-primary transition-all duration-200 group/item border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium">{item.title}</span>
                        <FiChevronRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-2 transition-all duration-200 text-primary" />
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Mobile Dropdown */}
                {openDropdown === 'communities' && (
                  <div className="lg:hidden mt-3 ml-4 space-y-1 animate-slideDown bg-cream rounded-lg p-2">
                    {menuData.communities.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 text-sm text-navy hover:text-primary py-2.5 px-3 rounded-lg hover:bg-white transition-all duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <FiChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Ministries - Dropdown */}
              <li 
                className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3 relative group"
                onMouseEnter={() => handleMouseEnter('ministries')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleDropdownToggle('ministries')}
                  className="hover:text-primary text-navy font-semibold text-sm flex items-center gap-1 w-full transition-all duration-200 group whitespace-nowrap"
                >
                  {menuData.ministries.title}
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${activeDesktopMenu === 'ministries' || openDropdown === 'ministries' ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Desktop Dropdown */}
                {activeDesktopMenu === 'ministries' && (
                  <div 
                    className="hidden lg:block absolute top-full left-0 mt-3 w-80 bg-white shadow-md rounded-2xl border-2 border-cream py-2 max-h-[500px] overflow-y-auto z-50 animate-fadeIn custom-scrollbar"
                    onMouseEnter={() => handleMouseEnter('ministries')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menuData.ministries.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between px-6 py-3.5 text-sm text-navy hover:bg-cream hover:text-primary transition-all duration-200 group/item border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium">{item.title}</span>
                        <FiChevronRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-2 transition-all duration-200 text-primary" />
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Mobile Dropdown */}
                {openDropdown === 'ministries' && (
                  <div className="lg:hidden mt-3 ml-4 space-y-1 max-h-80 overflow-y-auto animate-slideDown custom-scrollbar bg-cream rounded-lg p-2">
                    {menuData.ministries.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 text-sm text-navy hover:text-primary py-2.5 px-3 rounded-lg hover:bg-white transition-all duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <FiChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Resources - Dropdown */}
              <li 
                className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3 relative group"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleDropdownToggle('resources')}
                  className="hover:text-primary text-navy font-semibold text-sm flex items-center gap-1 w-full transition-all duration-200 group whitespace-nowrap"
                >
                  {menuData.resources.title}
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${activeDesktopMenu === 'resources' || openDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Desktop Dropdown */}
                {activeDesktopMenu === 'resources' && (
                  <div 
                    className="hidden lg:block absolute top-full left-0 mt-3 w-80 bg-white shadow-md rounded-2xl border-2 border-cream py-2 z-50 animate-fadeIn"
                    onMouseEnter={() => handleMouseEnter('resources')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menuData.resources.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between px-6 py-3.5 text-sm text-navy hover:bg-cream hover:text-primary transition-all duration-200 group/item border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium">{item.title}</span>
                        <FiChevronRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-2 transition-all duration-200 text-primary" />
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Mobile Dropdown */}
                {openDropdown === 'resources' && (
                  <div className="lg:hidden mt-3 ml-4 space-y-1 animate-slideDown bg-cream rounded-lg p-2">
                    {menuData.resources.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 text-sm text-navy hover:text-primary py-2.5 px-3 rounded-lg hover:bg-white transition-all duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <FiChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Apostolic Plannings */}
              <li className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3">
                <Link
                  to="/apostolic-plannings"
                  className="hover:text-primary text-navy block font-semibold text-sm transition-all duration-200 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  Apostolic Plannings
                </Link>
              </li>

              {/* Become a Jesuit */}
              <li className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3">
                <Link
                  to="/become-a-jesuit"
                  className="hover:text-primary text-navy block font-semibold text-sm transition-all duration-200 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  Become a Jesuit
                </Link>
              </li>

              {/* Gallery */}
              <li className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3">
                <Link
                  to="/gallery"
                  className="hover:text-primary text-navy block font-semibold text-sm transition-all duration-200 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  Gallery
                </Link>
              </li>

              {/* New Initiatives */}
              <li className="max-lg:border-b max-lg:border-gray-200 max-lg:py-3 px-2 xl:px-3">
                <Link
                  to="/new-initiatives"
                  className="hover:text-primary text-navy block font-semibold text-sm transition-all duration-200 whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  New Initiatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden flex-shrink-0">
            <button onClick={handleToggle} className="cursor-pointer p-2 hover:bg-cream rounded-lg transition-all">
              <FiMenu className="w-7 h-7 text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 600px;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.35s ease-out forwards;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F8F4E3;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #800000;
        }
      `}</style>
    </>
  );
};

export default Navbar;
