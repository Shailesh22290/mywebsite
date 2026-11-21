import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, Github, Globe } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const {
    title,
    description,
    image,
    technologies,
    category,
    status,
    githubUrl,
    liveUrl,
    paperUrl,
  } = project;

  // One quiet button style for every link; the icon says what it is.
  const links = [
    { href: githubUrl, label: 'Code', Icon: Github },
    { href: liveUrl, label: 'Live demo', Icon: Globe },
    { href: paperUrl, label: 'Paper', Icon: FileText },
  ].filter((l) => l.href);

  return (
    <motion.article
      className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer
                 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500
                 hover:shadow-lg transition-all duration-300"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
        {image?.length ? (
          <img
            src={image[0]}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/40 dark:to-indigo-900/40" />
        )}
        {status !== 'completed' && (
          <span className="absolute top-3 right-3 rounded-md bg-gray-900/75 px-2 py-0.5 text-xs font-medium text-white">
            Ongoing
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
          {project.type || category}
        </p>
        <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title.trim()}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-md border border-gray-200 dark:border-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-1 py-0.5 text-xs text-gray-500 dark:text-gray-400">+{technologies.length - 4}</span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-sm font-medium
                         text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-sm text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Details <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;