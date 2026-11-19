import React from 'react';
import { Link } from 'react-router-dom';
import ThesisCards from '../Publications/ThesisCards';
import { researchInterests } from '@/data/publications';

const ME = 'Shailesh Kachhi';

const A = ({ href, children }) =>
  href.startsWith('/') ? (
    <Link to={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>
  );

const publications = [
  {
    authors: [ME, 'Vaibhav Kumar', 'Deeksha Arya'],
    title:
      'Building Instance Usage Mapping in Cross-Cultural Urban Scenes from Street View Images using Multimodal Self-Supervised Deep Learning.',
    venue:
      '34th ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems (SIGSPATIAL 2026).',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1145/3841645.3843286' },
      { label: 'PDF', href: 'https://drive.google.com/file/d/1f4rFpEHExIXyivyStMpaN3MtAG9Rrn4Q/view?usp=sharing' },
      { label: 'BibTeX', href: '/thesis/bs' },
      { label: 'Thesis page', href: '/thesis/bs' },
    ],
  },
  {
    authors: [ME, 'Vaibhav Kumar'],
    title: 'GAVAS: Geometry-Aware Video-to-Audio Synthesis with 4D Acoustic Scene Graphs.',
    venue: 'Submitted to Nature Cities.',
    links: [{ label: 'MS thesis', href: '/thesis/ms' }],
  },
];


const honours = [
  { year: '2026', text: 'JST LOTUS Fellowship for a research stay at CSIS, The University of Tokyo' },
  { year: '2026', text: 'ACM SIGSPATIAL travel grant ($500) to present at SIGSPATIAL 2026, Riverside, CA' },
  { year: '2025, 2026', text: 'GATE Data Science & AI: AIR 604 (2025) and AIR 1106 (2026)' },
  { year: '2023', text: 'Winner, Smart India Hackathon 2023 (national level)' },
  { year: '2022', text: 'JEE Advanced 2022: AIR 7288 (top 1% of 1.5M candidates)' },
  { year: '2024–25', text: 'General Secretary, Technical Affairs, Student Activity Council, IISER Bhopal' },
];

const H2 = ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{children}</h2>;

const HomeSections = () => (
  <section id="publications" className="relative z-10 py-12 bg-white dark:bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <H2>Research interests</H2>
      <ul className="flex flex-wrap gap-2 mb-12">
        {researchInterests.map((i) => (
          <li key={i} className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">{i}</li>
        ))}
      </ul>

      <H2>Publications</H2>
      <ol className="space-y-5">
        {publications.map((pub) => (
          <li key={pub.title} className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {pub.authors.map((a, i) => (
              <React.Fragment key={a}>
                {i > 0 && ', '}
                {a === ME ? <strong className="text-gray-900 dark:text-white">{a}</strong> : a}
              </React.Fragment>
            ))}
            {'. '}
            <em>{pub.title}</em> {pub.venue}
            <div className="mt-1 text-sm flex flex-wrap gap-x-3">
              {pub.links.map((l) => <A key={l.label} href={l.href}>{l.label}</A>)}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <H2>Theses</H2>
        <ThesisCards />
      </div>

      <div className="mt-12">
        <H2>Honours & achievements</H2>
        <ul className="space-y-3">
          {honours.map((h) => (
            <li key={h.text} className="flex gap-4 text-gray-700 dark:text-gray-300">
              <span className="w-20 shrink-0 text-sm text-gray-500 dark:text-gray-400 pt-0.5">{h.year}</span>
              <span>{h.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default HomeSections;
