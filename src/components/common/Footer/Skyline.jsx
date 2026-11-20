import React from 'react';
import { motion } from 'framer-motion';
import { buildings, trees, people, cars, BLUES, windowRects, WIDTH, HEIGHT } from './city';

const G = HEIGHT; // ground line; scene y grows upward, SVG y grows downward
const LINE = 'stroke-blue-600 dark:stroke-blue-400';
// Street furniture is filled with the footer colour so it hides the building lines behind it.
const SOLID = `${LINE} fill-gray-50 dark:fill-gray-900`;

const Tree = ({ x, h, r }) => (
  <g className={SOLID} strokeWidth="0.9">
    <path d={`M${x} ${G}V${G - h + r}`} />
    <circle cx={x} cy={G - h + r} r={r} />
  </g>
);

const Person = ({ x }) => (
  <g className={LINE} strokeWidth="0.8" fill="none" strokeLinecap="round">
    <path d={`M${x - 1} ${G}L${x} ${G - 2.8}L${x + 1} ${G}M${x} ${G - 2.8}V${G - 5}`} />
    <circle cx={x} cy={G - 5.6} r="0.6" />
  </g>
);

const Car = ({ x, l }) => (
  <g className={SOLID} strokeWidth="0.9">
    <path d={`M${x} ${G - 1}V${G - 3.5}H${x + l * 0.2}L${x + l * 0.3} ${G - 5.5}H${x + l * 0.7}L${x + l * 0.8} ${G - 3.5}H${x + l}V${G - 1}Z`} />
    <circle cx={x + l * 0.22} cy={G - 1.2} r="1.2" />
    <circle cx={x + l * 0.78} cy={G - 1.2} r="1.2" />
  </g>
);

// Wireframe street: building outlines and floor lines drawn in on first view, then trees, people, cars.
const Skyline = ({ className = '' }) => (
  <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
    {buildings.map((b, i) => {
      const { x, w, h, low, inset, roof, shade } = b;
      const outline = inset
        ? `M${x} ${G}V${G - low}H${x + inset}V${G - h}H${x + w - inset}V${G - low}H${x + w}V${G}`
        : `M${x} ${G}V${G - h}H${x + w}V${G}`;
      const wins = [
        ...windowRects(w, 0, low).map(([u, y, ww, wh]) => [x + u, y, ww, wh]),
        ...(inset ? windowRects(w - 2 * inset, low, h).map(([u, y, ww, wh]) => [x + inset + u, y, ww, wh]) : []),
      ];
      return (
        <g key={i} className="stroke-[var(--c)] dark:stroke-[var(--cd)] fill-[var(--c)] dark:fill-[var(--cd)]" style={{ '--c': BLUES[shade][0], '--cd': BLUES[shade][1] }}>
          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.03, duration: 0.8 }}>
            <path d={outline} fillOpacity="0.06" stroke="none" />
            {wins.map(([wx, wy, ww, wh], j) => (
              <rect key={j} x={wx} y={G - wy - wh} width={ww} height={wh} fillOpacity="0.28" stroke="none" />
            ))}
            {roof === 'tank' && (
              <path d={`M${x + w * 0.6} ${G - h}v-2.5M${x + w * 0.6 + 6} ${G - h}v-2.5M${x + w * 0.6 - 0.5} ${G - h - 2.5}h7v-5h-7z`} fill="none" strokeWidth="0.9" />
            )}
            {roof === 'antenna' && (
              <path d={`M${x + w / 2} ${G - h}v-14M${x + w / 2 - 2} ${G - h - 9}h4`} fill="none" strokeWidth="0.8" />
            )}
          </motion.g>
          <motion.path
            d={outline}
            strokeWidth="1.2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.03, ease: 'easeOut' }}
          />
        </g>
      );
    })}
    <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6, duration: 0.8 }}>
      {trees.map((t, i) => <Tree key={i} {...t} />)}
      {people.map((p, i) => <Person key={i} {...p} />)}
      {cars.map((c, i) => <Car key={i} {...c} />)}
    </motion.g>
    <path d={`M0 ${G - 0.5}H${WIDTH}`} className="stroke-blue-600/40 dark:stroke-blue-400/40" strokeWidth="1" />
  </svg>
);

export default Skyline;
