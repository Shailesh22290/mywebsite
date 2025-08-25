// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Home from './components/sections/Home/Hero'; // Assuming Hero is the main Home component
import About from './components/sections/About/About';

import Projects from './components/sections/Projects/Projects';
import Publications from './components/sections/Publications/Publications';
import Contact from './components/sections/Contact/Contact';
// Import other sections as you build them

function App() {
  return (
    <Layout>
      {/* For a single-page feel, you render all sections on one page */}
      <Home />
      <About />
      
      <Projects />
      <Publications />
      <Contact />
      {/* Add other section components here */}

      {/* Alternatively, for a multi-page site, you'd use Routes like this: */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
   
        <Route path="/projects" element={<Projects />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
     
    </Layout>
  );
}

export default App;