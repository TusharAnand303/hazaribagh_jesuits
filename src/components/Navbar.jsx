import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import logo from './../assets/images/web_images/logo.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const hoverTimeoutRef = useRef(null);
  const subMenuHoverTimeoutRef = useRef(null);

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
      if (window.innerWidth >= 1024) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setActiveMenu(null);
          setActiveSubMenu(null);
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
    setActiveSubMenu(null);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveMenu(null);
    setActiveSubMenu(null);
  };

  // Desktop: Toggle on click
  const toggleDropdown = (key) => {
    setActiveMenu(activeMenu === key ? null : key);
    setActiveSubMenu(null);
  };

  // Desktop: Hover handlers for main menu
  const handleMouseEnter = (key) => {
    if (window.innerWidth >= 1024) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setActiveMenu(key);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
        setActiveSubMenu(null);
      }, 150);
    }
  };

  // Desktop: Hover handlers for submenu (third level)
  const handleSubMenuMouseEnter = (key) => {
    if (window.innerWidth >= 1024) {
      if (subMenuHoverTimeoutRef.current) {
        clearTimeout(subMenuHoverTimeoutRef.current);
      }
      setActiveSubMenu(key);
    }
  };

  const handleSubMenuMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      subMenuHoverTimeoutRef.current = setTimeout(() => {
        setActiveSubMenu(null);
      }, 150);
    }
  };

  // Mobile: Toggle dropdown properly with explicit state check
  const toggleMobileDropdown = (key, event) => {
    event.stopPropagation();
    setActiveMenu(prevState => {
      if (prevState === key) {
        setActiveSubMenu(null);
        return null;
      }
      setActiveSubMenu(null);
      return key;
    });
  };

  // Mobile: Toggle third level dropdown
  const toggleMobileSubDropdown = (key, event) => {
    event.stopPropagation();
    setActiveSubMenu(prevState => {
      if (prevState === key) {
        return null;
      }
      return key;
    });
  };

  // Check if link is active
  const isLinkActive = (url) => {
    return location.pathname === url;
  };

  // Check if any submenu item is active
  const isSubmenuActive = (items) => {
    return items.some(item => {
      if (item.submenu) {
        return item.submenu.some(subItem => location.pathname === subItem.url);
      }
      return location.pathname === item.url;
    });
  };

  const menuData = {
    aboutUs: {
      title: 'About Us',
      items: [
        { title: 'Our History', url: '/history' },
        { title: 'Foundation', url: '/about/foundation' },
        { title: 'Legacy', url: '/about/legacy' },
        { title: 'Governance', url: '/about/governance',
          submenu: [
            { title: 'Administration Councils', url: '/about/governance/councils' },
          ] },
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
        { title: 'Education', url: '/education',
          submenu: [
            { title: 'English Medium School', url: '/education/english-medium-school' },
            { title: 'Hindi Medium School', url: '/education/hindi-medium-school' },
          ] },
        { title: 'Pastoral', url: '/pastoral',
          submenu: [
            { title: 'Parish centers', url: '/pastoral/parish-centers' },
            { title: 'Mahuahar', url: '/pastoral/mahuahar' },
            { title: 'Bhurkunda pakripath Jamuniatar', url: '/pastoral/bhurkunda-pakripath-jamuniatar' },
          ]
         },
        { title: 'Mass Centers', url: '/mass_center',
          submenu: [
            { title: 'Tarwa', url: '/mass_center/tarwa' },
            { title: 'Hutpa', url: '/mass_center/hutpa' },
            { title: 'Patra', url: '/mass_center/patra' },
            { title: 'Latehar', url: '/mass_center/latehar' },
          ]
         },
        { title: 'Social Centers', url: '/social_center',
          submenu: [
            { title: 'Jamuniatar', url: '/social_center/jamuniatar' },
            { title: 'Kajarkilo', url: '/social_center/hutpa' },
            { title: 'Patki', url: '/social_center/patki' },
            { title: 'Churadohar', url: '/social_center/churadohar' },
            { title: 'Patra', url: '/social_center/patra' },
          ]
         },
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
        { title: 'Publications', url: '/publications'},
        { title: 'Books', url: '/book' },
        { title: 'Jesuit Blogs', url: '/blogs' }
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
            : 'bg-linear-to-r from-primary via-navy to-primary py-3.5 shadow-lg'
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
                className={`px-2.5 xl:px-3 py-2 font-semibold text-sm rounded transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isLinkActive('/') 
                    ? (scrolled ? 'bg-primary text-white' : 'bg-white text-primary')
                    : (scrolled 
                        ? 'text-navy hover:text-primary hover:bg-cream' 
                        : 'text-white hover:text-secondary hover:bg-white/10')
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
                      isSubmenuActive(menuData[key].items)
                        ? (scrolled ? 'bg-primary text-white' : 'bg-white text-primary')
                        : (scrolled 
                            ? 'text-navy hover:text-primary hover:bg-cream' 
                            : 'text-white hover:text-secondary hover:bg-white/10')
                    } ${activeMenu === key ? (scrolled ? 'bg-cream text-primary' : 'bg-white/10 text-secondary') : ''}`}
                  >
                    <span>{menuData[key].title}</span>
                    <FaChevronDown 
                      className={`text-[10px] transition-all duration-300 ${
                        activeMenu === key ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Dropdown Menu (Second Level) */}
                  {activeMenu === key && (
                    <div 
                      className="absolute left-0 pt-2 z-50"
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-64 bg-white rounded shadow-2xl border-t-4 border-primary animate-fadeIn">
                        
                        {/* Menu Header */}
                        <div className="bg-linear-to-r from-primary via-navy to-primary px-4 py-3">
                          <h3 className="text-white text-sm font-bold flex items-center">
                            <FaChevronRight className="text-secondary text-[10px] mr-2" />
                            {menuData[key].title}
                          </h3>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="py-1 max-h-96 overflow-visible">
                          {menuData[key].items.map((item, idx) => (
                            <div 
                              key={idx}
                              className="relative"
                              onMouseEnter={() => item.submenu && handleSubMenuMouseEnter(`${key}-${idx}`)}
                              onMouseLeave={() => item.submenu && handleSubMenuMouseLeave()}
                            >
                              {item.submenu ? (
                                <>
                                  <div className={`flex items-center justify-between px-4 py-2.5 transition-all duration-200 group cursor-pointer ${
                                    isLinkActive(item.url) || item.submenu.some(sub => isLinkActive(sub.url))
                                      ? 'bg-primary text-white'
                                      : 'text-navy hover:bg-linear-to-r hover:from-primary hover:to-navy hover:text-white'
                                  }`}>
                                    <div className="flex items-center">
                                      <FaChevronRight className={`text-[8px] mr-3 group-hover:scale-125 transition-all ${
                                        isLinkActive(item.url) || item.submenu.some(sub => isLinkActive(sub.url))
                                          ? 'text-secondary'
                                          : 'text-secondary group-hover:text-white'
                                      }`} />
                                      <span className="text-sm font-medium">
                                        {item.title}
                                      </span>
                                    </div>
                                    <FaChevronRight className="text-[10px]" />
                                  </div>
                                  
                                  {/* Third Level Dropdown */}
                                  {activeSubMenu === `${key}-${idx}` && (
                                    <div 
                                      className="absolute left-full top-0 ml-1"
                                      style={{ zIndex: 9999 }}
                                      onMouseEnter={() => handleSubMenuMouseEnter(`${key}-${idx}`)}
                                      onMouseLeave={handleSubMenuMouseLeave}
                                    >
                                      <div className="w-64 bg-white rounded shadow-2xl border-t-4 border-primary animate-fadeIn">
                                        <div className="bg-linear-to-r from-secondary via-primary to-secondary px-4 py-3">
                                          <h4 className="text-white text-sm font-bold flex items-center">
                                            <FaChevronRight className="text-secondary text-[10px] mr-2" />
                                            {item.title}
                                          </h4>
                                        </div>
                                        <div className="py-1">
                                          {item.submenu.map((subItem, subIdx) => (
                                            <Link
                                              key={subIdx}
                                              to={subItem.url}
                                              onClick={() => {
                                                setActiveMenu(null);
                                                setActiveSubMenu(null);
                                              }}
                                              className={`flex items-center px-4 py-2.5 transition-all duration-200 group ${
                                                isLinkActive(subItem.url)
                                                  ? 'bg-primary text-white'
                                                  : 'text-navy hover:bg-linear-to-r hover:from-primary hover:to-navy hover:text-white'
                                              }`}
                                            >
                                              <FaChevronRight className={`text-[8px] mr-3 group-hover:scale-125 transition-all ${
                                                isLinkActive(subItem.url)
                                                  ? 'text-secondary'
                                                  : 'text-secondary group-hover:text-white'
                                              }`} />
                                              <span className="text-sm font-medium">
                                                {subItem.title}
                                              </span>
                                            </Link>
                                          ))}
                                        </div>
                                        <div className="h-1 bg-linear-to-r from-secondary via-primary to-secondary"></div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  to={item.url}
                                  onClick={() => setActiveMenu(null)}
                                  className={`flex items-center px-4 py-2.5 transition-all duration-200 group ${
                                    isLinkActive(item.url)
                                      ? 'bg-primary text-white'
                                      : 'text-navy hover:bg-linear-to-r hover:from-primary hover:to-navy hover:text-white'
                                  }`}
                                >
                                  <FaChevronRight className={`text-[8px] mr-3 group-hover:scale-125 transition-all ${
                                    isLinkActive(item.url)
                                      ? 'text-secondary'
                                      : 'text-secondary group-hover:text-white'
                                  }`} />
                                  <span className="text-sm font-medium">
                                    {item.title}
                                  </span>
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* Bottom Accent */}
                        <div className="h-1 bg-linear-to-r from-secondary via-primary to-secondary"></div>
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
                    isLinkActive(item.url)
                      ? (scrolled ? 'bg-primary text-white' : 'bg-white text-primary')
                      : (scrolled 
                          ? 'text-navy hover:text-primary hover:bg-cream' 
                          : 'text-white hover:text-secondary hover:bg-white/10')
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
              setActiveMenu(null);
              setActiveSubMenu(null);
            }}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 bottom-0 w-[85%] sm:w-80 bg-white z-50 lg:hidden overflow-hidden shadow-2xl animate-slideInRight">
            
            {/* Mobile Header */}
            <div className="bg-linear-to-r from-primary via-navy to-primary p-4 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-lg">Navigation</h2>
                <p className="text-secondary text-xs">Menu</p>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setActiveMenu(null);
                  setActiveSubMenu(null);
                }}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-all"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-0.5 bg-linear-to-r from-secondary via-primary to-secondary"></div>

            {/* Mobile Menu Items */}
            <div className="overflow-y-auto h-[calc(100vh-85px)] custom-scrollbar">
              <nav className="p-3">
                {/* Home Link */}
                <Link 
                  to="/" 
                  onClick={handleLinkClick}
                  className={`flex items-center gap-2 py-3 px-4 mb-1 font-semibold rounded transition-all ${
                    isLinkActive('/')
                      ? 'bg-primary text-white'
                      : 'text-navy hover:bg-cream hover:text-primary'
                  }`}
                >
                  <FaChevronRight className={`text-[10px] ${
                    isLinkActive('/') ? 'text-secondary' : 'text-primary'
                  }`} />
                  Home
                </Link>
                
                {/* Dropdown Menus - Mobile */}
                {Object.keys(menuData).map((key) => (
                  <div key={key} className="mb-1">
                    <button 
                      onClick={(e) => toggleMobileDropdown(key, e)}
                      className={`w-full flex items-center justify-between py-3 px-4 font-semibold rounded transition-all ${
                        (activeMenu === key || isSubmenuActive(menuData[key].items)) 
                          ? 'bg-primary text-white' 
                          : 'text-navy hover:bg-cream hover:text-primary'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FaChevronRight className={`text-[10px] ${
                          (activeMenu === key || isSubmenuActive(menuData[key].items))
                            ? 'text-secondary'
                            : 'text-primary'
                        }`} />
                        {menuData[key].title}
                      </span>
                      <FaChevronDown 
                        className={`text-xs transition-transform duration-300 ${
                          activeMenu === key ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Dropdown Items (Second Level) */}
                    {activeMenu === key && (
                      <div className="mt-1 ml-4 bg-cream/50 rounded overflow-hidden border-l-2 border-secondary animate-slideDown">
                        {menuData[key].items.map((item, idx) => (
                          <div key={idx}>
                            {item.submenu ? (
                              <>
                                <button
                                  onClick={(e) => toggleMobileSubDropdown(`${key}-${idx}`, e)}
                                  className={`w-full flex items-center justify-between px-4 py-2.5 transition-all ${
                                    (activeSubMenu === `${key}-${idx}` || isLinkActive(item.url) || item.submenu.some(sub => isLinkActive(sub.url)))
                                      ? 'bg-primary/20 text-navy'
                                      : 'text-navy hover:bg-primary/5'
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <FaChevronRight className="text-secondary text-[8px]" />
                                    <span className="text-sm">{item.title}</span>
                                  </span>
                                  <FaChevronRight 
                                    className={`text-[10px] transition-transform duration-300 ${
                                      activeSubMenu === `${key}-${idx}` ? 'rotate-90' : ''
                                    }`} 
                                  />
                                </button>
                                
                                {/* Third Level Dropdown - Mobile */}
                                {activeSubMenu === `${key}-${idx}` && (
                                  <div className="ml-4 bg-cream/70 rounded overflow-hidden border-l-2 border-primary animate-slideDown">
                                    {item.submenu.map((subItem, subIdx) => (
                                      <Link
                                        key={subIdx}
                                        to={subItem.url}
                                        onClick={handleLinkClick}
                                        className={`flex items-center gap-2 px-4 py-2 transition-all ${
                                          isLinkActive(subItem.url)
                                            ? 'bg-primary text-white'
                                            : 'text-navy hover:bg-linear-to-r hover:from-secondary hover:to-primary hover:text-white'
                                        }`}
                                      >
                                        <FaChevronRight className={`text-[8px] ${
                                          isLinkActive(subItem.url) ? 'text-secondary' : 'text-primary'
                                        }`} />
                                        <span className="text-xs">{subItem.title}</span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                to={item.url}
                                onClick={handleLinkClick}
                                className={`flex items-center gap-2 px-4 py-2.5 transition-all ${
                                  isLinkActive(item.url)
                                    ? 'bg-primary text-white'
                                    : 'text-navy hover:bg-linear-to-r hover:from-primary hover:to-navy hover:text-white'
                                }`}
                              >
                                <FaChevronRight className={`text-[8px] ${
                                  isLinkActive(item.url) ? 'text-secondary' : 'text-secondary'
                                }`} />
                                <span className="text-sm">{item.title}</span>
                              </Link>
                            )}
                          </div>
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
                    className={`flex items-center gap-2 py-3 px-4 mb-1 font-semibold rounded transition-all ${
                      isLinkActive(item.url)
                        ? 'bg-primary text-white'
                        : 'text-navy hover:bg-cream hover:text-primary'
                    }`}
                  >
                    <FaChevronRight className={`text-[10px] ${
                      isLinkActive(item.url) ? 'text-secondary' : 'text-primary'
                    }`} />
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
