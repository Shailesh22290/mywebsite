import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail } from 'lucide-react';
import { personalDetails } from '@/data/personal';

const CALENDLY = 'https://calendly.com/shaileshkachhi786';

const A = ({ href, children }) =>
  href.startsWith('/') ? (
    <Link to={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>
  );

// Each area is backed by work a visitor can check.
const areas = [
  {
    title: 'AI and machine learning',
    text: 'Custom models for prediction, classification and automation, from first prototype to a deployed system, in whatever domain your data comes from.',
    proof: <>Research at IISER Bhopal, IIT Delhi and IIT Mandi, published at ACM SIGSPATIAL 2026.</>,
  },
  {
    title: 'LLM, RAG and AI agents',
    text: 'Chatbots and agents that answer questions over your documents and databases, and automate reports and routine work.',
    proof: <>Production agentic RAG systems at OpEx360AI; <A href="https://trustfirstai.streamlit.app/">Speak to Your Data</A>, a trust-first data analyst.</>,
  },
  {
    title: 'Computer vision',
    text: 'Detection, tracking, OCR and monitoring from images and video, built to run on real footage.',
    proof: <>Real-time PPE compliance monitoring at OpEx360AI; license plate recognition; drone traffic analysis at IIT Mandi.</>,
  },
  {
    title: 'Web and full-stack applications',
    text: 'Websites, portals, dashboards and internal tools, with the backend and database behind them.',
    proof: <>Built the <A href="https://library.iiserb.ac.in/">Central Library, IISER Bhopal</A> and <A href="https://dcecm.iitd.ac.in/">DST CoE, IIT Delhi</A> sites, an e-learning platform and an election system.</>,
  },
  {
    title: 'Data analysis and visualisation',
    text: 'Cleaning messy data, finding what it says, and presenting it in dashboards and reports people can act on.',
    proof: <>Analytics dashboards for the Punjab Government job portal; data pipelines across my research projects.</>,
  },
  {
    title: '3D, AR/VR and simulation',
    text: 'Interactive 3D scenes, virtual tours and simulation front-ends for the web.',
    proof: <>The <A href="https://library.iiserb.ac.in/services/virtual-tour">IISER Bhopal virtual tour</A> and 3D simulation work at SimDaaS.</>,
  },
];

const steps = [
  ['A first call', 'We talk through the problem, the data you have, and what a useful result would look like.'],
  ['A written scope', 'I send a short plan with milestones, a timeline and a quote, or tell you honestly if I am not the right fit.'],
  ['Pilot first', 'Larger projects start with a small proof of concept, so you see results on your own data before committing further.'],
  ['You own it', 'Code, models and documentation are handed over in full, with regular updates along the way.'],
];

const H2 = ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{children}</h2>;

const Consultancy = () => (
  <section className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Work with me</h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Alongside my research, I take on a small number of projects across domains: AI and machine learning,
          LLM applications, computer vision, and full-stack web development. I work with startups, companies,
          institutions and individuals who have a real problem to solve and want it built properly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 font-semibold text-white transition-colors"
          >
            <Calendar className="h-4 w-4" /> Book a call
          </a>
          <a
            href={`mailto:${personalDetails.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-2.5 font-semibold text-gray-800 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Mail className="h-4 w-4" /> Email me
          </a>
        </div>
      </header>

      <div>
        <H2>What I can help with</H2>
        <div className="grid sm:grid-cols-2 gap-5">
          {areas.map(({ title, text, proof }) => (
            <div key={title} className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{text}</p>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{proof}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
          More examples on the <A href="/projects">projects</A> and <A href="/experience">experience</A> pages.
        </p>
      </div>

      <div>
        <H2>How a project works</H2>
        <ol className="space-y-5">
          {steps.map(([title, text], i) => (
            <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-3">
              <span className="font-mono text-sm text-blue-600 dark:text-blue-400 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
                <p className="text-gray-700 dark:text-gray-300">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <H2>A good fit</H2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
            <li>You have a clear problem, and data or a product idea to go with it.</li>
            <li>You need a working prototype, MVP or production feature, built carefully.</li>
            <li>You want one person who can cover the model, the backend and the interface.</li>
          </ul>
        </div>
        <div>
          <H2>Probably not a fit</H2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
            <li>Copy-paste template sites with no real functionality.</li>
            <li>Very short turnarounds with no room to understand the problem first.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-gray-700 dark:text-gray-300">
          I am currently a visiting researcher at The University of Tokyo, so I keep my project load small and choose
          work that I can do well. If your problem sounds like a match, the quickest way to start is a short call.
        </p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <Calendar className="h-4 w-4" /> Book a call
        </a>
      </div>
    </div>
  </section>
);

export default Consultancy;
