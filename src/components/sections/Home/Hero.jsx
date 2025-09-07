import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../common/UI/Button';
import ProfileImage from './ProfileImage';
import { Rocket, ArrowRight as ArrowRightIcon } from "lucide-react";


const Hero = () => {
  const handleDownloadCV = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/assets/documents/cv.pdf';
    link.download = 'CV.pdf';
    link.click();
  };

  // Generate nodes for network visualization
  const generateNodes = () => {
    const nodes = [];
    for (let i = 0; i < 25; i++) {
      nodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2
      });
    }
    return nodes;
  };

  // Generate connections between nodes
  const generateConnections = (nodes) => {
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        if (distance < 25 && Math.random() > 0.8) {
          connections.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            opacity: Math.random() * 0.6 + 0.2
          });
        }
      }
    }
    return connections;
  };

  const nodes = generateNodes();
  const connections = generateConnections(nodes);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Graphs and Nodes */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Network Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            {/* Connections */}
            {connections.map((conn, idx) => (
              <motion.line
                key={`conn-${idx}`}
                x1={conn.x1}
                y1={conn.y1}
                x2={conn.x2}
                y2={conn.y2}
                stroke="rgb(59 130 246)"
                strokeWidth="0.08"
                opacity={conn.opacity}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
            
            {/* Nodes */}
            {nodes.map((node, idx) => (
              <motion.circle
                key={`node-${idx}`}
                cx={node.x}
                cy={node.y}
                r={node.size / 12}
                fill="rgb(96 165 250)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [0.4, 0.8, 0.4] 
                }}
                transition={{
                  duration: node.duration,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>

        {/* Floating Data Particles */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Background Chart Visualization */}
        <div className="absolute top-1/4 right-10 w-64 h-32 opacity-5">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Chart background */}
            <rect width="200" height="100" fill="transparent" stroke="rgb(59 130 246)" strokeWidth="1" />
            
            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`grid-y-${i}`}
                x1="0"
                y1={i * 20}
                x2="200"
                y2={i * 20}
                stroke="rgb(59 130 246)"
                strokeWidth="0.5"
                opacity="0.7"
              />
            ))}
            
            {/* Animated data bars */}
            {Array.from({ length: 8 }, (_, i) => {
              const height = Math.random() * 60 + 20;
              return (
                <motion.rect
                  key={`bar-${i}`}
                  x={i * 24 + 4}
                  y={100 - height}
                  width="20"
                  height={height}
                  fill="rgb(96 165 250)"
                  initial={{ height: 0, y: 100 }}
                  animate={{ height, y: 100 - height }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Mathematical Formulas */}
        <div className="absolute top-20 left-10 text-blue-400 dark:text-blue-300 font-mono text-sm opacity-30 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 2, delay: 1 }}
          >
            ∇f = ∂f/∂θ
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            σ(z) = 1/(1+e^-z)
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 2, delay: 2 }}
          >
            J = -1/m Σ[y*log(ŷ)]
          </motion.div>
        </div>

        {/* Neural Network Representation */}
        <div className="absolute bottom-20 right-20 w-48 h-32 opacity-20">
          <svg viewBox="0 0 150 100" className="w-full h-full">
            {/* Input layer */}
            {Array.from({ length: 4 }, (_, i) => (
              <motion.circle
                key={`input-${i}`}
                cx="20"
                cy={i * 25 + 10}
                r="4"
                fill="rgb(59 130 246)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
            
            {/* Hidden layer */}
            {Array.from({ length: 3 }, (_, i) => (
              <motion.circle
                key={`hidden-${i}`}
                cx="75"
                cy={i * 30 + 20}
                r="4"
                fill="rgb(96 165 250)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.3 + 0.5, repeat: Infinity }}
              />
            ))}
            
            {/* Output layer */}
            {Array.from({ length: 2 }, (_, i) => (
              <motion.circle
                key={`output-${i}`}
                cx="130"
                cy={i * 40 + 30}
                r="4"
                fill="rgb(147 197 253)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.3 + 1, repeat: Infinity }}
              />
            ))}

            {/* Connections */}
            {/* Input to Hidden */}
            {Array.from({ length: 4 }, (_, i) => 
              Array.from({ length: 3 }, (_, j) => (
                <motion.line
                  key={`conn-ih-${i}-${j}`}
                  x1="24"
                  y1={i * 25 + 10}
                  x2="71"
                  y2={j * 30 + 20}
                  stroke="rgb(59 130 246)"
                  strokeWidth="0.5"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 + j * 0.1 }}
                />
              ))
            )}
            
            {/* Hidden to Output */}
            {Array.from({ length: 3 }, (_, i) => 
              Array.from({ length: 2 }, (_, j) => (
                <motion.line
                  key={`conn-ho-${i}-${j}`}
                  x1="79"
                  y1={i * 30 + 20}
                  x2="126"
                  y2={j * 40 + 30}
                  stroke="rgb(96 165 250)"
                  strokeWidth="0.5"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 + j * 0.1 + 0.5 }}
                />
              ))
            )}
          </svg>
        </div>

        {/* Binary Data Stream */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`binary-${i}`}
              className="absolute text-blue-400 text-xs font-mono whitespace-nowrap"
              style={{
                left: `${i * 15 + 5}%`,
                top: '-20px'
              }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5
              }}
            >
              {Array.from({ length: 30 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content - First section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Hi, I'm{' '}
              <span className="text-gradient">
                Shailesh K.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-4 md:-mb-6"
            >
             4th Year Data Science & Engineering Student at Indian Institute of Science Education and Research Bhopal, India
            </motion.p>
          </motion.div>

          {/* Profile Image - Shows after the title and education text on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end mb-6 lg:mb-0 lg:order-2 lg:row-span-2"
          >
            <ProfileImage />
          </motion.div>

          {/* Content - Second section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:order-3"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl"
            >
              I'm passionate about advancing artificial intelligence and machine learning 
              through innovative research and practical applications. My Research Interests are in 3D Computer Vision, deep learning, and natural language processing.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-l text-gray-600 dark:text-gray-300 mb-8"
            >
              I also work as a freelance web and mobile app developer with expertise in modern full-stack technologies, delivering end-to-end solutions from concept to deployment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/projects">
                <Button size="lg" className="flex items-center text-sm">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/consultancy">
                <Button
                    variant="secondary"
                    size="lg"
                    
                    className="flex items-center text-sm gap-2"
                  >
                    <Rocket className="h-5 w-5" />
                    Start Your Project
                    
                  </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center text-m"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
      > 

        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;