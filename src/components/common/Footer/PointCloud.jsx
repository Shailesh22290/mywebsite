import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildings, trees, people, cars, STREET, CLASSES, BLUES, FLOOR, inWindow, WIDTH, HEIGHT } from './city';

const DENSITY = 0.22; // points per unit² of surface
const PITCH_DEG = 20; // camera looks down this far from horizontal (i.e. ~70° from straight down)
const INTRO_PITCH_DEG = 55; // where the intro camera starts
const INTRO_S = 3.5; // length of the intro scan, seconds
const FOV = 30;
const R = Math.random;

// --- surface samplers; each calls push(x, y, z) -----------------------------------
const box = (push, x0, x1, y0, y1, z0, z1, density = DENSITY) => {
  const [w, h, d] = [x1 - x0, y1 - y0, z1 - z0];
  const faces = [
    [w * h, () => push(x0 + R() * w, y0 + R() * h, z1)],
    [w * h, () => push(x0 + R() * w, y0 + R() * h, z0)],
    [d * h, () => push(x0, y0 + R() * h, z0 + R() * d)],
    [d * h, () => push(x1, y0 + R() * h, z0 + R() * d)],
    [w * d, () => push(x0 + R() * w, y1, z0 + R() * d)],
  ];
  for (const [area, fn] of faces) for (let i = 0; i < Math.max(4, area * density); i++) fn();
};
const sphere = (push, cx, cy, cz, r, n) => {
  for (let i = 0; i < n; i++) {
    const u = R() * 2 - 1, t = R() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    push(cx + r * s * Math.cos(t), cy + r * u, cz + r * s * Math.sin(t));
  }
};
const column = (push, x, y0, y1, z, r, n) => {
  for (let i = 0; i < n; i++) {
    const t = R() * Math.PI * 2;
    push(x + r * Math.cos(t), y0 + R() * (y1 - y0), z + r * Math.sin(t));
  }
};
const line = (push, x0, x1, y, z, step = 0.5) => {
  for (let x = x0; x < x1; x += step) push(x, y, z);
};

// A building as LiDAR sees it: walls with see-through windows, floor ledges, parapet, roof kit.
const tower = (push, b) => {
  const x0 = b.x - WIDTH / 2;
  const parts = [[x0, x0 + b.w, 0, b.low, b.d / 2]];
  if (b.inset) parts.push([x0 + b.inset, x0 + b.w - b.inset, b.low, b.h, b.d / 2 - b.inset * 0.6]);

  for (const [xa, xb, y0, y1, dz] of parts) {
    const span = xb - xa, h = y1 - y0, depth = 2 * dz;
    for (const z of [dz, -dz]) {
      for (let i = 0; i < span * h * DENSITY; i++) {
        const u = R() * span, y = y0 + R() * h;
        if (!inWindow(span, u, y)) push(xa + u, y, z);
      }
    }
    for (const x of [xa, xb]) {
      for (let i = 0; i < depth * h * DENSITY; i++) {
        const v = R() * depth, y = y0 + R() * h;
        if (!inWindow(depth, v, y)) push(x, y, -dz + v);
      }
    }
    for (let i = 0; i < span * depth * DENSITY; i++) push(xa + R() * span, y1, -dz + R() * depth); // roof
    for (let y = y0 + FLOOR; y < y1; y += FLOOR) line(push, xa, xb, y, dz + 0.4); // floor ledges
    line(push, xa, xb, y1 + 1, dz); // parapet, front and back
    line(push, xa, xb, y1 + 1, -dz);
  }

  const cx = x0 + b.w / 2;
  if (b.roof === 'tank') {
    const tx = x0 + b.w * 0.6;
    box(push, tx, tx + 6, b.h + 2.5, b.h + 7.5, -3, 3, 0.8);
    column(push, tx + 0.5, b.h, b.h + 2.5, 0, 0.2, 20);
    column(push, tx + 5.5, b.h, b.h + 2.5, 0, 0.2, 20);
  } else if (b.roof === 'antenna') {
    column(push, cx, b.h, b.h + 14, 0, 0.25, 90);
    line(push, cx - 2, cx + 2, b.h + 9, 0, 0.25);
  }
};

// --- the static scene ------------------------------------------------------------
// Buildings also record a shade index per point so each tower keeps its own blue.
const buildingPts = [];
const buildingShade = [];
for (const b of buildings) tower((x, y, z) => { buildingPts.push(x, y, z); buildingShade.push(b.shade); }, b);

const treePts = [];
const pushTree = (x, y, z) => treePts.push(x, y, z);
for (const { x, h, r } of trees) {
  const cx = x - WIDTH / 2, z = STREET.sidewalk[0] + 2;
  column(pushTree, cx, 0, h - r, z, 0.6, 120);
  sphere(pushTree, cx, h - r, z, r, Math.round(r * r * 32));
}

const groundPts = [];
const pushGround = (x, y, z) => groundPts.push(x, y, z);
const [r0, r1] = STREET.road;
for (let i = 0; i < WIDTH * (r1 - r0) * 0.05; i++) pushGround(R() * WIDTH - WIDTH / 2, 0, r0 + R() * (r1 - r0));
line(pushGround, -WIDTH / 2, WIDTH / 2, 0.3, r0, 0.4); // kerb
for (let x = -WIDTH / 2; x < WIDTH / 2; x += 12) line(pushGround, x, x + 6, 0, (r0 + r1) / 2, 0.4); // centre dashes

// Beach: low dunes between the road and the sea.
const sandPts = [];
const [b0, b1] = STREET.beach;
for (let i = 0; i < WIDTH * (b1 - b0) * 0.14; i++) {
  const x = R() * WIDTH - WIDTH / 2, z = b0 + R() * (b1 - b0);
  sandPts.push(x, 0.5 + 0.6 * Math.sin(x * 0.07) * Math.sin(z * 0.4), z);
}

// Sea: a grid of points whose heights are animated as waves; foam rides the shoreline.
const [s0, s1] = STREET.sea;
const waterPts = [];
for (let x = -WIDTH / 2; x < WIDTH / 2; x += 2.4) for (let z = s0; z < s1; z += 2) waterPts.push(x + R(), 0, z + R());
const foamPts = [];
for (let i = 0; i < WIDTH * 1.4; i++) foamPts.push(R() * WIDTH - WIDTH / 2, 0.2, s0 + R() * 2);
const wave = (x, z, t) => 0.9 * Math.sin(x * 0.045 + t * 1.3) + 0.6 * Math.sin(z * 0.25 - t * 1.9) + 0.4 * Math.sin((x + z) * 0.11 + t * 0.7);

// --- moving objects, each in local coordinates around its own origin -------------
const carShape = (l) => {
  const out = [];
  const push = (x, y, z) => out.push(x, y, z);
  box(push, 0, l, 1, 3.5, -3, 3, 1.6);
  box(push, l * 0.25, l * 0.75, 3.5, 5.5, -2.6, 2.6, 1.6);
  return out;
};
const personShape = () => {
  const out = [];
  const push = (x, y, z) => out.push(x, y, z);
  column(push, 0, 0, 5, 0, 0.5, 150);
  sphere(push, 0, 5.6, 0, 0.6, 80);
  return out;
};

const PointCloud = ({ onReady }) => {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      return; // no WebGL: the skyline simply stays
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 5000);
    const city = new THREE.Group();
    scene.add(city);
    const material = new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true });

    // Two LiDAR effects added to three's point shader:
    //  - uScan: an intro sweep; points right of it are hidden, points just behind it glow.
    //  - uPulse: an expanding ring from the scanner car (uSensor) that lights what it hits.
    const uniforms = {
      uScan: { value: -WIDTH },
      uPulse: { value: 0 },
      uSensor: { value: new THREE.Vector3() },
      uGlow: { value: new THREE.Color() },
    };
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('void main() {', 'uniform float uScan; uniform float uPulse; uniform vec3 uSensor; uniform vec3 uGlow;\nvoid main() {')
        .replace('#include <fog_vertex>', `#include <fog_vertex>
          vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
          float behind = uScan - wp.x;
          float front = 1.0 - smoothstep(0.0, 45.0, behind);
          float ring = 1.0 - smoothstep(0.0, 4.0, abs(distance(wp, uSensor) - uPulse));
          ring *= 1.0 - smoothstep(150.0, 420.0, uPulse); // fade as it travels
          float glow = max(front, ring);
          vColor.rgb = mix(vColor.rgb, uGlow, glow);
          gl_PointSize += glow * 1.4;
          if (behind < 0.0) gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // not scanned yet: push outside the view`);
    };

    // Every layer remembers its class so colours can be re-applied when the theme toggles.
    const layers = [];
    const addLayer = (pts, cls, shades) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pts);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(pts.length), 3));
      const obj = new THREE.Points(geometry, material);
      city.add(obj);
      layers.push({ geometry, positions, cls, shades });
      return obj;
    };

    addLayer(buildingPts, 'building', buildingShade);
    addLayer(treePts, 'tree');
    addLayer(groundPts, 'ground');
    addLayer(sandPts, 'sand');
    addLayer(waterPts, 'water');
    addLayer(foamPts, 'foam');
    const water = layers.find((l) => l.cls === 'water');
    const foam = layers.find((l) => l.cls === 'foam');
    const animateSea = (t) => {
      const w = water.positions;
      for (let i = 0; i < w.length; i += 3) w[i + 1] = wave(w[i], w[i + 2], t);
      water.geometry.attributes.position.needsUpdate = true;
      // foam washes up and back along the shore
      const f = foam.positions;
      for (let i = 0; i < f.length; i += 3) f[i + 2] = s0 - 1 - 2.5 * (1 + Math.sin(t * 0.9 + f[i] * 0.02)) + (i % 7) * 0.3;
      foam.geometry.attributes.position.needsUpdate = true;
    };
    const movers = [
      ...cars.map((c) => ({
        obj: addLayer(carShape(c.l), 'car'),
        x: c.x, z: STREET.lanes[c.lane], speed: c.lane === 0 ? 28 : -24,
      })),
      ...people.map((p) => ({
        obj: addLayer(personShape(), 'person'),
        x: p.x, z: p.z, speed: p.dir * (2 + R() * 2),
      })),
    ];

    const paint = () => {
      const dark = document.documentElement.classList.contains('dark') ? 1 : 0;
      uniforms.uGlow.value.set(dark ? '#e0f2fe' : '#06b6d4');
      const c = new THREE.Color();
      const sky = new THREE.Color(dark ? '#e0f2fe' : '#93c5fd');
      const blues = BLUES.map((pair) => new THREE.Color(pair[dark]));
      for (const { geometry, positions, cls, shades } of layers) {
        const base = new THREE.Color(CLASSES[cls].color[dark]);
        const colors = geometry.attributes.color.array;
        for (let i = 0, p = 0; i < positions.length; i += 3, p++) {
          // each tower has its own blue, catching a little light toward the top
          if (shades) c.copy(blues[shades[p]]).lerp(sky, (positions[i + 1] / HEIGHT) * 0.35);
          else c.copy(base).offsetHSL(0, 0, (R() - 0.5) * 0.08); // slight speckle, like real returns
          c.toArray(colors, i);
        }
        geometry.attributes.color.needsUpdate = true;
      }
    };
    paint();
    const themeObserver = new MutationObserver(paint);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Elevated street view: look down at the middle of the block, whole width in frame.
    // The intro glides from INTRO_PITCH_DEG down to PITCH_DEG.
    const target = new THREE.Vector3(0, HEIGHT * 0.2, 20);
    let dist = 1;
    const frame = (deg) => {
      const p = THREE.MathUtils.degToRad(deg);
      camera.position.set(0, target.y + dist * Math.sin(p), target.z + dist * Math.cos(p));
      camera.lookAt(target);
    };
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      const k = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      dist = Math.min((WIDTH * 0.7) / (k * camera.aspect), (HEIGHT * 1.6) / k);
      camera.updateProjectionMatrix();
      frame(PITCH_DEG);
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(el);
    resize();

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove);

    // Skip GPU work while the footer is off screen.
    let visible = false;
    const viewObserver = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    viewObserver.observe(el);

    const place = (t) => {
      for (const m of movers) {
        const x = (((m.x + m.speed * t) % WIDTH) + WIDTH) % WIDTH; // wrap around the block
        m.obj.position.set(x - WIDTH / 2, 0, m.z);
        m.obj.rotation.y = m.speed < 0 ? Math.PI : 0;
      }
    };

    const sensor = movers[0].obj; // the first car carries the scanner
    const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

    let raf;
    let start = null; // intro clock starts the first time the footer is actually on screen
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      start ??= now;
      const t = (now - start) / 1000;
      place(t);
      animateSea(t);

      const intro = ease(t / INTRO_S);
      uniforms.uScan.value = -WIDTH / 2 - 60 + intro * (WIDTH + 200);
      if (intro < 1) frame(INTRO_PITCH_DEG + (PITCH_DEG - INTRO_PITCH_DEG) * intro);
      sensor.getWorldPosition(uniforms.uSensor.value).y += 6;
      uniforms.uPulse.value = t > INTRO_S ? ((t - INTRO_S) * 140) % 560 : 1e4;

      city.rotation.y += (Math.sin(t * 0.25) * 0.12 + mouse.x * 0.2 - city.rotation.y) * 0.05;
      city.rotation.x += (mouse.y * 0.05 - city.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };
    place(0);
    animateSea(0);
    renderer.render(scene, camera);
    onReady?.();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      themeObserver.disconnect();
      viewObserver.disconnect();
      sizeObserver.disconnect();
      layers.forEach((l) => l.geometry.dispose());
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
};

export default PointCloud;
