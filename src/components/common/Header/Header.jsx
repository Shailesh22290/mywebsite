import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Brain, Code, Zap, Cpu, Bot } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Option 1: Icon + Text Logo
  const IconTextLogo = () => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Brain className="h-8 w-8 text-blue-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Shailesh K.
      </span>
    </div>
  );

  // Option 2: Stylized Initials with Animation
  const AnimatedInitials = () => (
    <div className="relative">
      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
        Shailesh
      </span>
      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        K.
      </span>
      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );

  // Option 3: Tech-inspired Logo
  const TechLogo = () => (
    <div className="flex items-center space-x-1">
      <div className="relative flex items-center">
        {/* <Code className="h-6 w-6 text-blue-500" />
        <Zap className="h-4 w-4 text-yellow-500 -ml-1" /> */}
      </div>
      <span className="text-xl font-mono font-bold text-gray-800 dark:text-white">
        &lt;SK/&gt;
      </span>
    </div>
  );

  // Option 4: AI-themed Logo
  const AILogo = () => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Cpu className="h-7 w-7 text-blue-500" />
        <div className="absolute inset-0 border-2 border-blue-300 rounded animate-ping opacity-20"></div>
      </div>
      <span className="text-xl font-bold">
        <span className="text-blue-500">Shailesh</span>
        <span className="text-purple-500">K.</span>
      </span>
    </div>
  );

  // Option 5: Geometric Logo
  const GeometricLogo = () => (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg transform rotate-45"></div>
        <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded transform rotate-45"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 transform -rotate-45">S</span>
        </div>
      </div>
      <span className="text-xl font-bold">Shailesh K.</span>
    </div>
  );

  // Choose which logo to use (you can switch between them)
  const LogoComponent =   TechLogo; // Change this to any of the above options 
  // IconTextLogo
// AnimatedInitials
// TechLogo
// AILogo
// GeometricLogo

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group transition-transform hover:scale-105">
            <LogoComponent />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Navigation />
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
};

export default Header;