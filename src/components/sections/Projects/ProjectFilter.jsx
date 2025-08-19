import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const ProjectFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const getCategoryDisplayName = (category) => {
    if (category === 'all') return 'All Projects';
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'web-development': '🌐',
      'mobile-development': '📱',
      'machine-learning': '🤖',
      'research': '🔬',
      'data-science': '📊',
      'open-source': '🌟',
      'all': '📋'
    };
    return icons[category] || '💻';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Filter Header */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filter by Category</span>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              flex items-center gap-2
              ${selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{getCategoryIcon(category)}</span>
            <span>{getCategoryDisplayName(category)}</span>
          </motion.button>
        ))}
      </div>

      {/* Active Filter Indicator */}
      {selectedCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          Showing projects in: 
          <span className="font-medium text-blue-600 dark:text-blue-400 ml-1">
            {getCategoryDisplayName(selectedCategory)}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectFilter;