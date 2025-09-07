import React from 'react';
import { motion } from 'framer-motion';

const GlobalBackground = ({ intensity = 'medium', animated = true }) => {
  // Intensity levels for different pages
  const intensityConfig = {
    light: { opacity: 0.05, particles: 10, nodes: 15 },
    medium: { opacity: 0.15, particles: 15, nodes: 20 },
    strong: { opacity: 0.25, particles: 20, nodes: 25 }
  };

  const config = intensityConfig[intensity];

  // Generate nodes for network visualization
  const generateNodes = () => {
    const nodes = [];
    for (let i = 0; i < config.nodes; i++) {
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
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      {/* Animated Network Background */}
      <div className="absolute inset-0" style={{ opacity: config.opacity }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {/* Connections */}
          {animated && connections.map((conn, idx) => (
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
              initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.4 }}
              animate={animated ? { 
                scale: [1, 1.5, 1], 
                opacity: [0.4, 0.8, 0.4] 
              } : {}}
              transition={animated ? {
                duration: node.duration,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            />
          ))}
        </svg>
      </div>

      {/* Floating Data Particles */}
      {animated && (
        <div className="absolute inset-0" style={{ opacity: config.opacity * 2 }}>
          {Array.from({ length: config.particles }, (_, i) => (
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
      )}

      {/* Mathematical Formulas (only on stronger intensities) */}
      {intensity !== 'light' && (
        <>
          <div className="absolute top-20 left-10 text-blue-400 dark:text-blue-300 font-mono text-sm space-y-2" style={{ opacity: config.opacity }}>
            <motion.div
              initial={animated ? { opacity: 0, x: -20 } : { opacity: config.opacity }}
              animate={animated ? { opacity: config.opacity, x: 0 } : {}}
              transition={animated ? { duration: 2, delay: 1 } : {}}
            >
              ∇f = ∂f/∂θ
            </motion.div>
            <motion.div
              initial={animated ? { opacity: 0, x: -20 } : { opacity: config.opacity }}
              animate={animated ? { opacity: config.opacity, x: 0 } : {}}
              transition={animated ? { duration: 2, delay: 1.5 } : {}}
            >
              σ(z) = 1/(1+e^-z)
            </motion.div>
            <motion.div
              initial={animated ? { opacity: 0, x: -20 } : { opacity: config.opacity }}
              animate={animated ? { opacity: config.opacity, x: 0 } : {}}
              transition={animated ? { duration: 2, delay: 2 } : {}}
            >
              J = -1/m Σ[y*log(ŷ)]
            </motion.div>
          </div>

          {/* Background Chart (right side) */}
          <div className="absolute top-1/4 right-10 w-48 h-24" style={{ opacity: config.opacity * 0.5 }}>
            <svg viewBox="0 0 150 75" className="w-full h-full">
              <rect width="150" height="75" fill="transparent" stroke="rgb(59 130 246)" strokeWidth="0.5" />
              
              {Array.from({ length: 4 }, (_, i) => (
                <line
                  key={`grid-y-${i}`}
                  x1="0"
                  y1={i * 18.75}
                  x2="150"
                  y2={i * 18.75}
                  stroke="rgb(59 130 246)"
                  strokeWidth="0.3"
                  opacity="0.5"
                />
              ))}
              
              {Array.from({ length: 6 }, (_, i) => {
                const height = Math.random() * 45 + 15;
                return (
                  <motion.rect
                    key={`bar-${i}`}
                    x={i * 24 + 3}
                    y={75 - height}
                    width="15"
                    height={height}
                    fill="rgb(96 165 250)"
                    initial={animated ? { height: 0, y: 75 } : { height, y: 75 - height }}
                    animate={animated ? { height, y: 75 - height } : {}}
                    transition={animated ? {
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 1
                    } : {}}
                  />
                );
              })}
            </svg>
          </div>
        </>
      )}

      {/* Binary Data Stream (only on strong intensity) */}
      {intensity === 'strong' && animated && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: config.opacity * 0.3 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={`binary-${i}`}
              className="absolute text-blue-400 text-xs font-mono whitespace-nowrap"
              style={{
                left: `${i * 20 + 10}%`,
                top: '-20px'
              }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
            >
              {Array.from({ length: 25 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalBackground;