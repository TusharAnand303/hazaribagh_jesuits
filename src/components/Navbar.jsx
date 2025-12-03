import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import logo from './../assets/images/web_images/logo.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const hoverTimeoutRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside (Desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only apply to desktop
      if (window.innerWidth >= 1024) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setActiveMenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setActiveMenu(null);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  // Desktop: Toggle on click
  const toggleDropdown = (key) => {
    setActiveMenu(activeMenu === key ? null : key);
  };

  // Desktop: Hover handlers
  const handleMouseEnter = (key) => {
    // Only work on desktop
    if (window.innerWidth >= 1024) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setActiveMenu(key);
    }
  };

  const handleMouseLeave = () => {
    // Only work on desktop
    if (window.innerWidth >= 1024) {
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 150);
    }
  };

  // Mobile: Toggle dropdown properly with explicit state check
  const toggleMobileDropdown = (key, event) => {
    event.stopPropagation(); // Prevent event bubbling
    setActiveMenu(prevState => {
      // If clicking the same menu that's open, close it
      if (prevState === key) {
        return null;
      }
      // Otherwise, open the clicked menu
      return key;
    });
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

  // Single menu items (no dropdown)
  const singleMenuItems = [
    { title: 'Apostolic Plannings', url: '/apostolic-plannings' },
    { title: 'Become a Jesuit', url: '/become-a-jesuit' },
    { title: 'Gallery', url: '/gallery' },
    { title: 'New Initiatives', url: '/new-initiatives' }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' 
            : 'bg-gradient-to-r from-primary via-navy to-primary py-3.5 shadow-lg'
        }`}
      >
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-lg transition-all duration-500 ${
                  scrolled 
                    ? 'bg-primary/30 opacity-40' 
                    : 'bg-secondary/40 opacity-60'
                } group-hover:opacity-80`}></div>
                <img 
                  src={logo} 
                  alt="Jesuit Logo" 
                  className={`relative h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform duration-500 group-hover:scale-110 ${
                    scrolled ? 'drop-shadow-md' : 'drop-shadow-lg'
                  }`}
                />
              </div>
              
              <div>
                <h1 className={`text-md sm:text-base lg:text-lg font-bold leading-tight transition-colors duration-500 whitespace-nowrap ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}>
                  Hazaribagh Jesuits
                </h1>
                <p className={`text-[12px] sm:text-xs transition-colors duration-500 ${
                  scrolled ? 'text-gray' : 'text-secondary'
                }`}>
                  Society of Jesus
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2" ref={dropdownRef}>
              <Link 
                to="/" 
                className={`px-2.5 xl:px-3 py-2 font-semibold text-sm rounded transition-all duration-300 whitespace-nowrap ${
                  scrolled 
                    ? 'text-navy hover:text-primary hover:bg-cream' 
                    : 'text-white hover:text-secondary hover:bg-white/10'
                }`}
              >
                Home
              </Link>
              
              {/* Dropdown Menus with Hover and Click */}
              {Object.keys(menuData).map((key) => (
                <div 
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    onClick={() => toggleDropdown(key)}
                    className={`px-2.5 xl:px-3 py-2 font-semibold text-sm rounded transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                      scrolled 
                        ? 'text-navy hover:text-primary hover:bg-cream' 
                        : 'text-white hover:text-secondary hover:bg-white/10'
                    } ${activeMenu === key ? (scrolled ? 'bg-cream text-primary' : 'bg-white/10 text-secondary') : ''}`}
                  >
                    <span>{menuData[key].title}</span>
                    <FaChevronDown 
                      className={`text-[10px] transition-all duration-300 ${
                        activeMenu === key ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeMenu === key && (
                    <div 
                      className="absolute left-0 pt-2 z-50"
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-64 bg-white rounded shadow-2xl overflow-hidden border-t-4 border-primary animate-fadeIn">
                        
                        {/* Menu Header */}
                        <div className="bg-gradient-to-r from-primary via-navy to-primary px-4 py-3">
                          <h3 className="text-white text-sm font-bold flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>
                            {menuData[key].title}
                          </h3>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="max-h-96 overflow-y-auto py-1 custom-scrollbar">
                          {menuData[key].items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.url}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-center px-4 py-2.5 text-navy hover:bg-gradient-to-r hover:from-primary hover:to-navy transition-all duration-200 group"
                            >
                              <span className="w-1 h-1 rounded-full bg-secondary mr-3 group-hover:scale-150 transition-transform"></span>
                              <span className="text-sm font-medium group-hover:text-white">
                                {item.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                        
                        {/* Bottom Accent */}
                        <div className="h-1 bg-gradient-to-r from-secondary via-primary to-secondary"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Single Menu Items */}
              {singleMenuItems.map((item, idx) => (
                <Link 
                  key={idx}
                  to={item.url}
                  className={`px-2.5 xl:px-3 py-2 font-semibold text-sm rounded transition-all duration-300 whitespace-nowrap ${
                    scrolled 
                      ? 'text-navy hover:text-primary hover:bg-cream' 
                      : 'text-white hover:text-secondary hover:bg-white/10'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`lg:hidden p-2 rounded transition-all duration-300 ${
                scrolled 
                  ? 'text-primary hover:bg-cream' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => {
              setIsOpen(false);
              setActiveMenu(null); // Reset dropdown state when closing sidebar
            }}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 bottom-0 w-[85%] sm:w-80 bg-white z-50 lg:hidden overflow-hidden shadow-2xl animate-slideInRight">
            
            {/* Mobile Header */}
            <div className="bg-gradient-to-r from-primary via-navy to-primary p-4 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-lg">Navigation</h2>
                <p className="text-secondary text-xs">Menu</p>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setActiveMenu(null); // Reset dropdown state
                }}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-all"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary"></div>

            {/* Mobile Menu Items */}
            <div className="overflow-y-auto h-[calc(100vh-85px)] custom-scrollbar">
              <nav className="p-3">
                {/* Home Link */}
                <Link 
                  to="/" 
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 py-3 px-4 mb-1 text-navy font-semibold rounded hover:bg-cream hover:text-primary transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Home
                </Link>
                
                {/* Dropdown Menus - Mobile */}
                {Object.keys(menuData).map((key) => (
                  <div key={key} className="mb-1">
                    <button 
                      onClick={(e) => toggleMobileDropdown(key, e)}
                      className={`w-full flex items-center justify-between py-3 px-4 text-navy font-semibold rounded transition-all ${
                        activeMenu === key ? 'bg-cream text-primary' : 'hover:bg-cream hover:text-primary'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {menuData[key].title}
                      </span>
                      <FaChevronDown 
                        className={`text-xs transition-transform duration-300 ${
                          activeMenu === key ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Dropdown Items */}
                    {activeMenu === key && (
                      <div className="mt-1 ml-4 bg-cream/50 rounded overflow-hidden border-l-2 border-secondary animate-slideDown">
                        {menuData[key].items.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.url}
                            onClick={handleLinkClick}
                            className="flex items-center gap-2 px-4 py-2.5 text-navy hover:bg-gradient-to-r hover:from-primary hover:to-navy hover:text-white transition-all"
                          >
                            <span className="w-1 h-1 rounded-full bg-secondary"></span>
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Single Menu Items */}
                {singleMenuItems.map((item, idx) => (
                  <Link 
                    key={idx}
                    to={item.url}
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 py-3 px-4 mb-1 text-navy font-semibold rounded hover:bg-cream hover:text-primary transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F8F4E3;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #800000;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
