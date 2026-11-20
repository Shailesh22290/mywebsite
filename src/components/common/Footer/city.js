// One deterministic street scene shared by the SVG skyline and the 3D point cloud,
// so the fade from one to the other lines up. Units: roughly 1 unit = 0.3 m.
let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const between = (a, b) => a + rnd() * (b - a);

export const WIDTH = 1000;
export const HEIGHT = 160;

// Depth (z) layout, front of buildings toward the camera: sidewalk, then a two-lane road.
export const STREET = { sidewalk: [32, 48], lanes: [60, 78], road: [50, 90], beach: [92, 106], sea: [106, 150] };

// Shades of blue per building, [light theme, dark theme].
export const BLUES = [
  ['#1e3a8a', '#bfdbfe'],
  ['#1e40af', '#93c5fd'],
  ['#1d4ed8', '#60a5fa'],
  ['#2563eb', '#7dd3fc'],
  ['#3b82f6', '#a5b4fc'],
];

export const FLOOR = 10; // one storey
const COL = 6; // window bay width

export const buildings = [];
for (let x = 0; x < WIDTH; ) {
  const w = between(18, 58);
  const h = 25 + rnd() * rnd() * 125;
  const setback = h > 70 && rnd() < 0.45; // tall towers step in near the top
  const r = rnd();
  buildings.push({
    x, w, h, d: between(20, 60),
    shade: Math.floor(rnd() * BLUES.length),
    low: setback ? Math.round((h * 0.8) / FLOOR) * FLOOR : h, // height of the full-width part
    inset: setback ? w * 0.15 : 0,
    roof: r < 0.3 ? 'tank' : r < 0.5 ? 'antenna' : 'flat',
  });
  x += w + between(3, 11);
}

// Window grid in facade coordinates: u runs along the wall (0..span), y up from the ground.
// Returns [u0, y0, width, height] rectangles; used for SVG windows and LiDAR "see-through" holes.
export function windowRects(span, y0, y1) {
  const cols = Math.max(1, Math.floor(span / COL));
  const bay = span / cols;
  const out = [];
  for (let y = y0 + FLOOR; y + FLOOR <= y1 + 0.01; y += FLOOR) {
    for (let c = 0; c < cols; c++) out.push([c * bay + bay * 0.25, y + 3, bay * 0.5, 5]);
  }
  return out;
}

export const inWindow = (span, u, y) => {
  const cols = Math.max(1, Math.floor(span / COL));
  const bay = span / cols;
  const fu = (u % bay) / bay, fy = y % FLOOR;
  return y > FLOOR && fu > 0.25 && fu < 0.75 && fy > 3 && fy < 8;
};

export const trees = [];
for (let x = between(10, 40); x < WIDTH; x += between(65, 120)) {
  trees.push({ x, h: between(17, 25), r: between(5, 8) });
}

export const people = Array.from({ length: 14 }, () => ({
  x: rnd() * WIDTH,
  z: between(STREET.sidewalk[0] + 3, STREET.sidewalk[1] - 3),
  dir: rnd() < 0.5 ? -1 : 1,
}));

export const cars = Array.from({ length: 8 }, (_, i) => ({
  x: rnd() * WIDTH,
  lane: i % 2, // lane 0 drives right, lane 1 drives left
  l: between(13, 17),
}));

// Semantic classes, as a LiDAR segmentation model would label them: [light, dark] colours.
export const CLASSES = {
  building: { label: 'building', color: ['#1d4ed8', '#93c5fd'] },
  tree: { label: 'vegetation', color: ['#16a34a', '#4ade80'] },
  car: { label: 'vehicle', color: ['#d97706', '#fbbf24'] },
  person: { label: 'pedestrian', color: ['#e11d48', '#fb7185'] },
  ground: { label: 'road', color: ['#9ca3af', '#4b5563'] },
  sand: { label: 'beach', color: ['#d4a373', '#c9a46a'] },
  water: { label: 'water', color: ['#0891b2', '#22d3ee'] },
  foam: { label: 'foam', color: ['#a5f3fc', '#ecfeff'], hidden: true }, // not in the legend
};
