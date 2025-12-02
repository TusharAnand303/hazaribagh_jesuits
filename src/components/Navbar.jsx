import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (key) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setActiveMenu(null);
  };

  const megaMenuData = {
    about: {
      title: 'About Us',
      items: [
        { title: 'Our History', url: '/about/history' },
        { title: 'Foundation', url: '/about/foundation' },
        { title: 'Timeline', url: '/about/timeline' },
        { title: 'Milestones', url: '/about/milestones' },
        { title: 'Legacy', url: '/about/legacy' },
        { title: 'Leadership', url: '/about/leadership' },
        { title: 'Provincial', url: '/about/provincial' },
        { title: 'Council Members', url: '/about/council' },
        { title: 'Directors', url: '/about/directors' },
        { title: 'Vision & Mission', url: '/about/vision' },
        { title: 'Core Values', url: '/about/values' },
        { title: 'Goals', url: '/about/goals' }
      ]
    },
    ministries: {
      title: 'Ministries',
      items: [
        { title: 'Education', url: '/education' },
        { title: 'Schools', url: '/ministries/schools' },
        { title: 'Colleges', url: '/ministries/colleges' },
        { title: 'Hostels', url: '/ministries/hostels' },
        { title: 'Vocational Training', url: '/ministries/vocational' },
        { title: 'Social Work', url: '/ministries/social-work' },
        { title: 'Rural Development', url: '/ministries/rural' },
        { title: 'Healthcare', url: '/ministries/healthcare' },
        { title: 'Women Empowerment', url: '/ministries/women' },
        { title: 'Youth Programs', url: '/ministries/youth' },
        { title: 'Pastoral Care', url: '/ministries/pastoral' },
        { title: 'Parishes', url: '/ministries/parishes' },
        { title: 'Retreat Centers', url: '/ministries/retreats' },
        { title: 'Spirituality', url: '/ministries/spirituality' },
        { title: 'Formation', url: '/ministries/formation' }
      ]
    },
    communities: {
      title: 'Communities',
      items: [
        { title: 'Hazaribagh', url: '/communities/hazaribagh' },
        { title: 'Ranchi', url: '/communities/ranchi' },
        { title: 'Dumka', url: '/communities/dumka' },
        { title: 'Giridih', url: '/communities/giridih' },
        { title: 'Formation Houses', url: '/communities/formation-houses' },
        { title: 'Parish Communities', url: '/communities/parish' },
        { title: 'Mission Centers', url: '/communities/mission' },
        { title: 'Educational Institutes', url: '/communities/institutes' }
      ]
    },
    apostolic: {
      title: 'Apostolic Planning',
      items: [
        { title: 'Strategic Plan', url: '/apostolic/strategic' },
        { title: 'Annual Reports', url: '/apostolic/reports' },
        { title: 'New Initiatives', url: '/apostolic/initiatives' },
        { title: 'Evaluations', url: '/apostolic/evaluations' },
        { title: 'Documents', url: '/apostolic/documents' },
        { title: 'Guidelines', url: '/apostolic/guidelines' },
        { title: 'Policies', url: '/apostolic/policies' },
        { title: 'Formation Materials', url: '/apostolic/materials' }
      ]
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className={`absolute inset-0 rounded-md blur-xl transition-all duration-500 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 opacity-40' 
                    : 'bg-white/30 opacity-60'
                }`}></div>
                
                <div className={`relative px-4 py-2 rounded-md transition-all duration-500 ${
                  scrolled 
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600' 
                    : 'bg-white/20 backdrop-blur-sm'
                } group-hover:scale-105`}>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-2xl font-black transition-colors duration-500 ${
                      scrolled ? 'text-white' : 'text-white'
                    }`}>HJ</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h1 className={`text-lg font-bold transition-colors duration-500 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Hazaribagh Province
                </h1>
                <p className={`text-xs font-medium transition-colors duration-500 ${
                  scrolled ? 'text-gray-600' : 'text-amber-100'
                }`}>
                  Jesuits
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link 
                to="/" 
                className={`relative px-5 py-2.5 font-semibold rounded-md transition-all duration-300 group ${
                  scrolled 
                    ? 'text-gray-700 hover:text-amber-600' 
                    : 'text-white hover:text-amber-200'
                }`}
              >
                <span className="relative z-10">Home</span>
                <div className={`absolute inset-0 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  scrolled ? 'bg-amber-50' : 'bg-white/10'
                }`}></div>
              </Link>
              
              {Object.keys(megaMenuData).map((key) => (
                <div 
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className={`relative px-5 py-2.5 font-semibold rounded-md transition-all duration-300 flex items-center space-x-2 group ${
                      scrolled 
                        ? 'text-gray-700 hover:text-amber-600' 
                        : 'text-white hover:text-amber-200'
                    }`}
                  >
                    <span className="relative z-10">{megaMenuData[key].title}</span>
                    <FaChevronDown 
                      className={`text-xs transition-all duration-300 ${
                        activeMenu === key ? 'rotate-180' : ''
                      }`} 
                    />
                    <div className={`absolute inset-0 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                      scrolled ? 'bg-amber-50' : 'bg-white/10'
                    }`}></div>
                  </button>
                  
                  {/* Single Column Dropdown Menu */}
                  {activeMenu === key && (
                    <div 
                      className="absolute left-0 pt-2"
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-72 bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100">
                        
                        {/* Menu Header */}
                        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-6 py-4">
                          <h3 className="text-white text-lg font-bold">{megaMenuData[key].title}</h3>
                        </div>
                        
                        {/* Menu Items - Single Column */}
                        <div className="max-h-96 overflow-y-auto py-2 custom-scrollbar">
                          {megaMenuData[key].items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.url}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-center px-6 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group/item"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-3 group-hover/item:w-2 group-hover/item:h-2 transition-all"></span>
                              <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform inline-block">
                                {item.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <Link 
                to="/contact" 
                className={`ml-4 px-6 py-2.5 rounded-md font-bold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-amber-200' 
                    : 'bg-white text-amber-900 hover:bg-amber-50 shadow-white/20'
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`lg:hidden p-3 rounded-md transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-amber-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl">
            
            {/* Mobile Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-center">
                    <span className="text-white font-black text-lg">HJ</span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">Menu</h2>
                    <p className="text-orange-100 text-xs">Navigation</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-md transition-all"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <nav className="p-6 space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all font-semibold"
              >
                Home
              </Link>
              
              {Object.keys(megaMenuData).map((key) => (
                <div key={key} className="border-t border-gray-100 pt-2">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                    className="w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all font-semibold"
                  >
                    <span>{megaMenuData[key].title}</span>
                    <FaChevronDown 
                      className={`text-sm transition-transform duration-300 ${
                        activeMenu === key ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {activeMenu === key && (
                    <div className="mt-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-md py-2 max-h-64 overflow-y-auto custom-scrollbar">
                      {megaMenuData[key].items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.url}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-6 py-2.5 text-gray-700 hover:text-orange-600 hover:bg-white/60 transition-all"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-3"></span>
                          <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-gray-200">
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 rounded-md transition-all text-center font-bold shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fef3c7;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </>
  );
};

export default Navbar;
