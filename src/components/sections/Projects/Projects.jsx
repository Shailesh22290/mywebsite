import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import ProjectModal from './ProjectModal';
import { projects } from '../../../data/projects';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Filter projects based on category and search term
  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A collection of projects I've worked on, showcasing my skills in development, 
              research, and problem-solving across various domains.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </motion.div>

          {/* Filter Component */}
          <motion.div variants={fadeInUp} className="mb-12">
            <ProjectFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={fadeInUp}>
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => handleProjectClick(project)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No projects found matching your criteria.
                </p>
              </div>
            )}
          </motion.div>

          {/* Project Stats */}
          <motion.div variants={fadeInUp} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {projects.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Total Projects
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Completed
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {projects.filter(p => p.status === 'in-progress').length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  In Progress
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Categories
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Projects;