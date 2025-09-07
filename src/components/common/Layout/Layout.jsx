import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GlobalBackground from '../UI/GlobalBackground';

const Layout = ({ children }) => {
  const location = useLocation();

  // Define background intensity based on route
  const getBackgroundIntensity = (pathname) => {
    switch (pathname) {
      case '/':
        return 'strong'; // Hero page gets strongest background
      case '/about':
      case '/projects':
      case '/experience':
        return 'medium'; // Main content pages get medium
      case '/contact':
      case '/blog':
      case '/publications':
        return 'light'; // Reading-heavy pages get lighter background
      default:
        return 'light';
    }
  };

  const backgroundIntensity = getBackgroundIntensity(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Global Background */}
      <GlobalBackground 
        intensity={backgroundIntensity} 
        animated={true} 
      />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;