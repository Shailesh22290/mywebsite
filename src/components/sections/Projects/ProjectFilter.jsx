import React from 'react';
import { Code2, FlaskConical, LayoutGrid, Rocket, Folder } from 'lucide-react';

const META = {
  all: { label: 'All', Icon: LayoutGrid },
  Research: { label: 'Research', Icon: FlaskConical },
  'Product/Prototype': { label: 'Products', Icon: Rocket },
  Development: { label: 'Development', Icon: Code2 },
};

const ProjectFilter = ({ categories, selectedCategory, onCategoryChange }) => (
  <div role="tablist" aria-label="Project category" className="flex flex-wrap justify-center gap-2">
    {categories.map((category) => {
      const { label, Icon } = META[category] || { label: category, Icon: Folder };
      const active = selectedCategory === category;
      return (
        <button
          key={category}
          role="tab"
          aria-selected={active}
          onClick={() => onCategoryChange(category)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active
              ? 'border-blue-600 bg-blue-600 text-white'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      );
    })}
  </div>
);

export default ProjectFilter;
