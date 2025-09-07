import React, { useState, useEffect } from 'react';

const DataSciencePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const algorithms = [
    'Initializing Neural Networks...',
    'Loading Data Pipelines...',
    'Optimizing Gradient Descent...',
    'Training Random Forest...',
    'Clustering Data Points...',
    'Validating Models...',
    'Rendering Portfolio...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const algorithmInterval = setInterval(() => {
      setCurrentAlgorithm(prev => (prev + 1) % algorithms.length);
    }, 1200);

    return () => clearInterval(algorithmInterval);
  }, []);

  // Generate nodes for network visualization
  const generateNodes = () => {
    const nodes = [];
    for (let i = 0; i < 20; i++) {
      nodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2
      });
    }
    return nodes;
  };

  const nodes = generateNodes();

  // Generate connections between nodes
  const generateConnections = () => {
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        if (distance < 30 && Math.random() > 0.7) {
          connections.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            opacity: Math.random() * 0.8 + 0.2
          });
        }
      }
    }
    return connections;
  };

  const connections = generateConnections();

  if (isComplete) {
    return null; // Hide preloader when complete
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Network */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {/* Connections */}
          {connections.map((conn, idx) => (
            <line
              key={`conn-${idx}`}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="#3B82F6"
              strokeWidth="0.1"
              opacity={conn.opacity}
              className="animate-pulse"
            />
          ))}
          
          {/* Nodes */}
          {nodes.map((node, idx) => (
            <circle
              key={`node-${idx}`}
              cx={node.x}
              cy={node.y}
              r={node.size / 10}
              fill="#60A5FA"
              className="animate-pulse"
              style={{
                animationDelay: `${node.delay}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Data Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i % 3} ${3 + Math.random() * 2}s infinite linear`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Algorithm Animation */}
        <div className="mb-8">
          <div className="text-blue-400 text-lg font-mono mb-2">
            {algorithms[currentAlgorithm]}
          </div>
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Animated Chart */}
        <div className="w-64 h-32 mx-auto mb-8">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Chart background */}
            <rect width="200" height="100" fill="transparent" stroke="#374151" strokeWidth="1" />
            
            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`grid-${i}`}
                x1="0"
                y1={i * 20}
                x2="200"
                y2={i * 20}
                stroke="#374151"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
            
            {/* Animated data line */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              points="0,80 25,60 50,45 75,30 100,25 125,20 150,15 175,10 200,5"
              strokeDasharray="500"
              strokeDashoffset="500"
              className="animate-pulse"
              style={{
                animation: 'drawLine 3s ease-in-out infinite'
              }}
            />
            
            {/* Data points */}
            {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((x, i) => {
              const y = 80 - (i * 10);
              return (
                <circle
                  key={`point-${i}`}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#60A5FA"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              );
            })}
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Loading Shailesh's Portfolio</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Binary Rain Effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute text-blue-400 text-xs font-mono"
              style={{
                left: `${i * 10 + 5}%`,
                animation: `binaryFall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>
          ))}
        </div>

        {/* Mathematical Formulas */}
        <div className="absolute top-10 right-10 text-blue-400 font-mono text-xs opacity-30 space-y-1">
          <div>f(x) = Σ(yi - ŷi)²</div>
          <div>∇f = ∂f/∂θ</div>
          <div>P(A|B) = P(B|A)P(A)/P(B)</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(15px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        @keyframes drawLine {
          0% { stroke-dashoffset: 500; opacity: 0.5; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -500; opacity: 0.5; }
        }
        @keyframes binaryFall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default DataSciencePreloader;