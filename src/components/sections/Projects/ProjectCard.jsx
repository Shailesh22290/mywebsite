import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag, Users } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const {
    title,
    description,
    image,
    technologies,
    category,
    status,
    duration,
    team,
    github,
    demo,
    highlights
  } = project;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'web-development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'mobile-development': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'machine-learning': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'research': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'data-science': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'open-source': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                 border border-gray-200 dark:border-gray-700 cursor-pointer
                 hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status.replace('-', ' ')}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            <Tag className="inline w-3 h-3 mr-1" />
            {category.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Project Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          {duration && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          )}
          {team && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{team}</span>
            </div>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                       rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                           rounded text-xs font-medium">
              +{technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Key Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-4">
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {highlights.slice(0, 2).map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Action Links */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 
                        text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 
                        dark:hover:bg-gray-600 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white 
                        rounded-lg hover:bg-blue-700 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </a>
          )}

          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white 
                        rounded-lg hover:bg-green-700 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Paper</span>
            </a>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;