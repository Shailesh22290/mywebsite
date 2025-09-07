import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  User, 
  FolderOpen, 
  BookOpen, 
  Briefcase, 
  Mic, 
  GraduationCap, 
  PenTool, 
  Handshake, 
  MessageSquare, 
  FileImage, 
  Archive, 
  Mail,
  Menu,
  X
} from 'lucide-react';

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const navRef = useRef(null);
  const containerRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    // { path: '/publications', label: 'Publications', icon: BookOpen },
    { path: '/experience', label: 'Experience', icon: Briefcase },
    // { path: '/talks', label: 'Talks', icon: Mic },
    { path: '/education', label: 'Education', icon: GraduationCap },
    { path: '/blog', label: 'Blog', icon: PenTool },
    { path: '/consultancy', label: 'Consultancy', icon: Handshake },
    // { path: '/discussions', label: 'Discussions', icon: MessageSquare },
    // { path: '/posters', label: 'Posters', icon: FileImage },
    { path: '/resources', label: 'Resources', icon: Archive },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  // Check if navigation overflows and needs toggle menu
  useEffect(() => {
    const checkOverflow = () => {
      const viewportWidth = window.innerWidth;
      
      // More direct approach - estimate space needed
      // Each icon needs approximately 48px (icon + padding + spacing)
      const estimatedNavWidth = navItems.length * 48;
      
      // Different logic for different screen sizes
      if (viewportWidth <= 768) {
        // Mobile: always use toggle
        setShowToggle(true);
      } else if (viewportWidth <= 1024) {
        // iPad: check if estimated width fits with buffer
        const availableWidth = viewportWidth * 0.7; // Assume nav takes 70% of screen
        setShowToggle(estimatedNavWidth > availableWidth);
      } else {
        // Laptop/Desktop: more generous space calculation
        const availableWidth = viewportWidth * 0.6; // Assume nav takes 60% of screen
        setShowToggle(estimatedNavWidth > availableWidth);
      }
    };

    // Run immediately and on resize
    checkOverflow();
    
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [navItems.length]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on route change
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  if (showToggle) {
    return (
      <div className="relative" ref={containerRef}>
        {/* Toggle Button with Tooltip */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredItem('menu')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            aria-label="Toggle menu"
            title={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Toggle Button Tooltip */}
          {hoveredItem === 'menu' && !isMenuOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 z-[9999] pointer-events-none animate-in fade-in-0 zoom-in-95 duration-15">
              <div className="bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 whitespace-nowrap">
                Menu
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/95 dark:bg-gray-800/95 rotate-45 border-l border-t border-gray-200/50 dark:border-gray-700/50"></div>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 bg-black bg-opacity-20 md:hidden" />
            
            {/* Menu */}
            <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 max-h-96 overflow-y-auto">
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300'
                    }`
                  }
                  title={label}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="mr-3 h-5 w-5" />
                      <span>{label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop full navigation
  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <nav 
        ref={navRef}
        className="flex items-center space-x-2 lg:space-x-4 min-w-max"
      >
        {navItems.map(({ path, label, icon: Icon }) => (
          <div
            key={path}
            className="relative flex-shrink-0"
            onMouseEnter={() => setHoveredItem(path)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavLink
              to={path}
              className={({ isActive }) =>
                `relative py-2 px-2 lg:px-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`
              }
              title={label}
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            {/* Custom Tooltip */}
            {hoveredItem === path && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 z-[9999] pointer-events-none animate-in fade-in-0 zoom-in-95 duration-15">
                <div className="bg-white/95 dark:bg-gray-800/95 text-blue-800 dark:text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 whitespace-nowrap">
                  {label}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/95 dark:bg-gray-800/95 rotate-45 border-l border-t border-gray-200/50 dark:border-gray-700/50"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;