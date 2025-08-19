import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ErrorBoundary from '../UI/ErrorBoundary';

const Layout = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;