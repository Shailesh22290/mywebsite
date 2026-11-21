import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Skyline from './Skyline';
import Sky from './Sky';
import { CLASSES } from './city';
import { personalDetails } from '@/data/personal';

// The 3D point cloud is only worth fetching on a decent connection (reduced motion gets a still frame).
const canUse3D = () => {
  const c = navigator.connection;
  return !c?.saveData && !/2g/.test(c?.effectiveType || '');
};

const CityBanner = () => {
  const ref = useRef(null);
  const [Cloud, setCloud] = useState(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  // Start downloading three.js once the footer is near the viewport; the skyline is only a placeholder.
  useEffect(() => {
    if (!canUse3D()) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      import('./PointCloud').then((m) => setCloud(() => m.default)).catch(() => {});
    }, { rootMargin: '300px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-80 sm:h-[26rem] overflow-hidden">
      <Sky />
      <Skyline className={`absolute inset-x-0 bottom-8 w-full h-[85%] transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`} />
      {Cloud && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <Cloud onReady={onReady} />
        </div>
      )}
      {/* Segmentation legend: the colours are the classes a LiDAR model would predict. */}
      <ul className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-max max-w-[calc(100%-2rem)] rounded-full bg-gray-50/85 dark:bg-gray-900/85 px-4 py-1 flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-[11px] text-gray-500 dark:text-gray-400 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        {Object.values(CLASSES).filter((c) => !c.hidden).map(({ label, color }) => (
          <li key={label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--c)] dark:bg-[var(--cd)]" style={{ '--c': color[0], '--cd': color[1] }} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/shailesh22290', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shailesh-kachhi-681a041a2/', label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personalDetails.email}`, label: 'Email' },
];

const Footer = () => (
  <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div className="pt-14 px-4 text-center">
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Thanks for visiting. Let&apos;s connect.
      </p>
      <div className="mt-4 flex justify-center gap-5">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label={label}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
    <CityBanner />
  </footer>
);

export default Footer;
