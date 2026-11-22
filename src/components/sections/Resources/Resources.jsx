import React from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Globe } from 'lucide-react';
import { resources, resourceGroups } from '../../../data/resources';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const ResourceCard = ({ title, description, tags, githubUrl, demoUrl, downloadUrl }) => {
  const links = [
    { href: githubUrl, label: 'Code', Icon: Github },
    { href: demoUrl, label: 'Live demo', Icon: Globe },
    { href: downloadUrl, label: 'Download', Icon: Download },
  ].filter((l) => l.href);

  return (
    <motion.article
      variants={fadeInUp}
      className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300
                 hover:border-blue-400 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
    >
      <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900 dark:text-white">{title}</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="rounded-md border border-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
        {links.length ? (
          links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700
                         transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-200 dark:hover:text-blue-400"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))
        ) : (
          <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            Coming soon
          </span>
        )}
      </div>
    </motion.article>
  );
};

const Resources = () => (
  <section id="resources" className="bg-gray-50 py-20 dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mx-auto max-w-6xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Resources</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Free templates, tools and guides I have built. Use them, fork them, make them yours.
          </p>
        </motion.div>

        {resourceGroups.map((group) => (
          <div key={group} className="mb-12">
            <motion.h3 variants={fadeInUp} className="mb-4 font-mono text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {group}
            </motion.h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.filter((r) => r.group === group).map((r) => (
                <ResourceCard key={r.title} {...r} />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Resources;
