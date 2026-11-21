import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, MapPin } from 'lucide-react';
import ProfileImage from '../Home/ProfileImage';
import { personalDetails } from '@/data/personal';

const EMAIL = personalDetails.email;
const CV = 'https://drive.google.com/file/d/1B3kt2UmzN5Z-iFPcgcocShfnOTpMjVHi/view?usp=sharing';

const A = ({ href, children }) =>
  href.startsWith('/') ? (
    <Link to={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>
  );

const now = [
  <>Presenting <A href="/thesis/bs">GeoBuildSSL</A>, my paper on mapping building use from street view images, at ACM SIGSPATIAL 2026.</>,
  <>Finishing my <A href="/thesis/ms">Master&apos;s thesis</A> on GAVAS, geometry-aware video-to-audio synthesis for urban scenes (submitted to Nature Cities).</>,
  <>Working with Sekimoto Laboratory, CSIS, The University of Tokyo as a JST LOTUS Fellow: remotely from India until December 2026, then on site in Tokyo from January to July 2027.</>,
];

const timeline = [
  { when: 'Oct 2026 to now', what: 'Visiting Researcher (JST LOTUS Fellowship)', where: 'Sekimoto Laboratory, CSIS, The University of Tokyo (on site Jan to Jul 2027)' },
  { when: 'Jan 2025 to now', what: 'Graduate Researcher', where: 'GeoAI4Cities Lab, IISER Bhopal: research internship, BS thesis and MS thesis' },
  { when: '2025 to 2026', what: 'AI/ML Engineer (part-time)', where: 'OpEx360AI: agentic RAG systems and a PPE compliance vision app' },
  { when: 'Summer 2025', what: 'Summer Research Intern', where: 'IIT Delhi: reconstructing historical precipitation data with deep learning' },
  { when: 'Summer 2024', what: 'Research Intern, Visual Intelligence and ML', where: 'IIT Mandi' },
  { when: '2022 to now', what: 'BS-MS, Data Science and Engineering', where: 'IISER Bhopal, research at GeoAI4Cities Lab' },
];

const skills = [
  ['Research areas', 'GeoAI, urban perception, 3D computer vision, point clouds, NLP'],
  ['ML', 'PyTorch, TensorFlow, scikit-learn, self-supervised and multimodal learning, RAG and LLM agents'],
  ['Geo and data', 'QGIS, PostgreSQL with pgvector, MySQL, MongoDB, Pandas, NumPy'],
  ['Engineering', 'Python, C++, JavaScript, SQL, React, Node.js, Docker, Git'],
];

const H2 = ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{children}</h2>;

const About = () => (
  <section id="about" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <ProfileImage size="large" />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Shailesh Kachhi</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Master&apos;s student, Data Science and Engineering, IISER Bhopal
          </p>
          <p className="mt-1 text-blue-700 dark:text-blue-300 font-medium">
            JST LOTUS Fellow, The University of Tokyo (on site from Jan 2027)
          </p>
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Bhopal, India</span>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400">
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          </div>
          <a
            href={CV}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 font-semibold text-white transition-colors"
          >
            <Download className="h-4 w-4" /> Download CV
          </a>
        </div>
      </header>

      <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        <p>
          I build AI systems that understand the real world. My research sits between geospatial AI and computer vision:
          learning what buildings are used for from street view images, reading 3D structure from LiDAR and video,
          and studying how people perceive the places they live in.
        </p>
        <p>
          I do this at the <A href="https://geoai4cities.com/">GeoAI4Cities Lab</A>, IISER Bhopal, and with Sekimoto
          Laboratory at The University of Tokyo as a JST LOTUS Fellow. Alongside research I have shipped production ML, including agentic
          RAG systems and real-time computer vision for workplace safety.
        </p>
      </div>

      <div>
        <H2>Now</H2>
        <ul className="space-y-3">
          {now.map((item, i) => (
            <li key={i} className="border-l-2 border-blue-600 dark:border-blue-400 pl-4 text-gray-700 dark:text-gray-300">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <H2>Path so far</H2>
        <ol className="space-y-5">
          {timeline.map(({ when, what, where }) => (
            <li key={what} className="grid sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4">
              <span className="font-mono text-sm text-blue-600 dark:text-blue-400 pt-0.5">{when}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{what}</p>
                <p className="text-gray-600 dark:text-gray-400">{where}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          Full details on the <A href="/experience">experience</A> and <A href="/projects">projects</A> pages.
        </p>
      </div>

      <div>
        <H2>Skills</H2>
        <dl className="space-y-3">
          {skills.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4">
              <dt className="font-semibold text-gray-900 dark:text-white">{k}</dt>
              <dd className="text-gray-700 dark:text-gray-300">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <H2>Outside research</H2>
        <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            I grew up in Jabalpur. Away from research I swim, go biking, and head to the Himalayas for treks whenever
            I get the chance. I also build web applications as a side hobby, usually small tools that start as a
            weekend idea; this website is one of them. A daily meditation practice keeps the rest of it in balance.
          </p>
          <p>
            Some of what I value most I learned outside the lab. As General Secretary, Technical Affairs at IISER
            Bhopal, and as Convenor of Techfest Armageddon for two years, I worked with a team of 80+ students to
            create spaces where juniors could try their first project, make mistakes safely, and find something they
            wanted to keep building. Seeing a few of them go on to lead those same clubs mattered more to me than any
            single event.
          </p>
          <p>
            Most of all, if I can add some value to someone&apos;s day, by helping them out or contributing something
            useful, that makes mine.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
