import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Home from './components/sections/Home/Hero';
import About from './components/sections/About/About';
import Projects from './components/sections/Projects/Projects';
import Publications from './components/sections/Publications/Publications';
import Contact from './components/sections/Contact/Contact';
import Blog from './components/sections/Blog/Blog';
import BlogPost from './pages/BlogPost';
import Education from './components/sections/Education/Education';
import Experience from './components/sections/Experience/Experience';
import Talks from './components/sections/Talks/Talks';  
import Consultancy from './components/sections/Consultancy/Consultancy';
import Discussions from './components/sections/Discussions/Discussions';
import Posters from './components/sections/Posters/Posters';
import Resources from './components/sections/Resources/Resources';
import { workExperience } from "./data/experience";
import DataSciencePreloader from './components/common/UI/DataSciencePreloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for portfolio initialization
    // You can adjust this duration or tie it to actual data loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 6 seconds loading time

    // Optional: Add real loading logic here
    // For example, you could wait for critical data to load:
    /*
    const loadCriticalData = async () => {
      try {
        // Simulate or replace with actual data loading
        await Promise.all([
          // load portfolio data,
          // load projects,
          // load publications, etc.
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error('Loading error:', error);
        setIsLoading(false); // Still show the app even if some data fails
      }
    };
    loadCriticalData();
    */

    return () => clearTimeout(loadingTimer);
  }, []);

  // Show preloader while loading
  if (isLoading) {
    return <DataSciencePreloader />;
  }

  // Render main app after loading
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Projects />
              <Contact />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/education" element={<Education />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/experience" element={<Experience experienceData={workExperience} />} />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/posters" element={<Posters />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<div className="text-center py-16">404 - Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;