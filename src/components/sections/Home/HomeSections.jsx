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
    venue: 'Nature Cities (Nature Portfolio), submitted.',
    links: [{ label: 'MS thesis', href: '/thesis/ms' }],
  },
];


const honours = [
  'Received the JST LOTUS Fellowship for a Bilateral research collaboration between India and Japan by Japan Science and Technology Agency (JST), Government of Japan to stay Sekimoto Laboratory, The University of Tokyo Komaba, Meguro-ku, Tokyo Japan(2026).',
  'Received the ACM SIGSPATIAL Travel Grant to present my research work at SIGSPATIAL 2026, Riverside, California, USA (2026).',
  'Secured All India Rank 1106 in GATE Data Science and Artificial Intelligence (2026).',
  'Secured All India Rank 604 in GATE Data Science and Artificial Intelligence (2025).',
  'Elected General Secretary, Technical Affairs, Student Activity Council, IISER Bhopal (2024).',
  'Won the national level Smart India Hackathon (2023), Meerut, Uttar Pradesh for Developing "A Solution for analysing the demographics of the users for Punjab Government".',
  'Secured All India Rank 7288 in JEE Advanced, placing in the top 1% of 1.5 million candidates (2022).',
];

const H2 = ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{children}</h2>;

const HomeSections = () => (
  <section id="publications" className="relative z-10 py-12 bg-white dark:bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <H2>Research interests</H2>
      <ul className="grid sm:grid-cols-2 gap-3 mb-12">
        {researchInterests.map((i, n) => (
          <li key={i} className="flex items-baseline gap-3 border-l-2 border-blue-600 dark:border-blue-400 pl-4 py-2">
            <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{String(n + 1).padStart(2, '0')}</span>
            <span className="font-medium text-gray-900 dark:text-white">{i}</span>
          </li>
        ))}
      </ul>

      <H2>Publications</H2>
      <ol className="space-y-5">
        {publications.map((pub) => (
          <li key={pub.title} className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong className="block text-gray-900 dark:text-white">{pub.title}</strong>
            <span className="block">
              {pub.authors.map((a, i) => (
                <React.Fragment key={a}>
                  {i > 0 && ', '}
                  {a === ME ? <span className="font-semibold text-blue-600 dark:text-blue-400">{a}</span> : a}
                </React.Fragment>
              ))}
            </span>
            <em className="block text-sm">{pub.venue}</em>
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
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 marker:text-blue-600 dark:marker:text-blue-400">
          {honours.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </div>
    </div>
  </section>
);

export default HomeSections;
