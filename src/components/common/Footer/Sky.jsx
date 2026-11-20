import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Clouds drawn as dot clusters (to match the point cloud) and a few flapping birds,
// drifting both ways through the band between the footer text and the city.

let seed = 3;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// A cloud is the union of a few circles, sampled on a jittered grid.
const cloudDots = (blobs) => {
  const dots = [];
  for (let x = -60; x < 60; x += 3.2) {
    for (let y = -30; y < 10; y += 3.2) {
      const jx = x + rnd() * 1.6, jy = y + rnd() * 1.6;
      if (jy < 6 && blobs.some(([cx, cy, r]) => (jx - cx) ** 2 + (jy - cy) ** 2 < r * r)) dots.push([jx, jy]);
    }
  }
  return dots;
};

// `at` is where along the trip (0..1) each item starts, so they begin spread across the width.
// `dir` 1 drifts right, -1 drifts left.
const CLOUDS = [
  { top: '6%', scale: 1, duration: 150, at: 0.12, dir: 1, blobs: [[-25, 0, 14], [0, -8, 20], [24, -2, 15], [40, 2, 9]] },
  { top: '0%', scale: 0.7, duration: 190, at: 0.42, dir: -1, blobs: [[-20, -2, 12], [2, -10, 16], [22, -3, 12]] },
  { top: '20%', scale: 0.85, duration: 170, at: 0.68, dir: 1, blobs: [[-30, 0, 10], [-8, -6, 15], [14, -9, 17], [36, -1, 10]] },
  { top: '10%', scale: 0.6, duration: 210, at: 0.9, dir: -1, blobs: [[-18, 0, 11], [4, -7, 14], [20, -1, 10]] },
  { top: '26%', scale: 0.75, duration: 160, at: 0.3, dir: -1, blobs: [[-22, -1, 12], [0, -9, 16], [24, -2, 11]] },
].map((c) => ({ ...c, dots: cloudDots(c.blobs) }));

// Small flocks: each bird is offset a little from its leader.
const FLOCKS = [
  { top: 12, duration: 36, at: 0.2, dir: 1, birds: [[0, 0, 1], [-18, 8, 0.8], [-30, -4, 0.7]] },
  { top: 30, duration: 44, at: 0.55, dir: -1, birds: [[0, 0, 0.9], [16, 7, 0.75]] },
  { top: 6, duration: 52, at: 0.8, dir: 1, birds: [[0, 0, 0.7], [-14, 5, 0.6], [-24, 10, 0.55], [-12, -6, 0.6]] },
  { top: 22, duration: 40, at: 0.05, dir: -1, birds: [[0, 0, 0.85], [14, -6, 0.7], [26, 4, 0.65]] },
];

const Bird = ({ size, still, flip }) => (
  <svg width={22 * size} height={12 * size} viewBox="-11 -6 22 12" className="stroke-gray-600 dark:stroke-gray-300" fill="none" strokeWidth="1.4" strokeLinecap="round" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <motion.path
      animate={still ? undefined : { d: ['M-10 -3 Q-5 -5 0 1 Q5 -5 10 -3', 'M-10 3 Q-5 -1 0 1 Q5 -1 10 3', 'M-10 -3 Q-5 -5 0 1 Q5 -5 10 -3'] }}
      d="M-10 -3 Q-5 -5 0 1 Q5 -5 10 -3"
      transition={{ duration: 0.6 + rnd() * 0.3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

const Sky = () => {
  const still = useReducedMotion();
  // CSS animation (unlike framer-motion) honours negative delays, which start each item mid-trip.
  const drift = ({ duration, at, dir }) =>
    still
      ? { transform: `translateX(${-15 + at * 130}vw)` }
      : { animation: `footer-sky-drift ${duration}s linear ${-at * duration}s infinite ${dir < 0 ? 'reverse' : 'normal'}` };

  return (
    <div className="absolute inset-x-0 top-0 h-32 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{'@keyframes footer-sky-drift { from { transform: translateX(-15vw) } to { transform: translateX(115vw) } }'}</style>
      {CLOUDS.map((c, i) => (
        <svg
          key={`c${i}`}
          className="absolute left-0 fill-slate-400/70 dark:fill-slate-500/70"
          style={{ top: c.top, ...drift(c) }}
          width={130 * c.scale}
          height={50 * c.scale}
          viewBox="-65 -36 130 50"
        >
          {c.dots.map(([x, y], j) => <circle key={j} cx={x} cy={y} r="0.9" />)}
        </svg>
      ))}
      {FLOCKS.map((f, i) => (
        <div key={`f${i}`} className="absolute left-0" style={{ top: `${f.top}%`, ...drift(f) }}>
          {f.birds.map(([dx, dy, size], j) => (
            <div key={j} className="absolute" style={{ left: dx, top: dy }}>
              <Bird size={size} still={still} flip={f.dir < 0} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sky;
