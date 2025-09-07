// src/components/sections/Blog/BlogCard.jsx
import React from 'react';
import { Calendar, Clock, Eye, User, Tag } from 'lucide-react';

const BlogCard = ({ post, featured = false, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  if (!post) return null;

  return (
    <article 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        featured ? 'border-l-4 border-blue-500' : ''
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read more about ${post.title}`}
    >
      {/* Image Placeholder */}
      {post.image ? (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className={`aspect-video w-full bg-gradient-to-br ${
          featured 
            ? 'from-blue-500 to-purple-600' 
            : 'from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800'
        } flex items-center justify-center`}>
          <div className="text-white text-center p-6">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {post.title}
            </h3>
            {featured && (
              <span className="inline-block px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
            {post.categories.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{post.categories.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(post.publishDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime || '5 min read'}
          </div>

          {/* <div className="flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {post.views || 0}
          </div> */}

          <div className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {post.author}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
              >
                <Tag className="w-2 h-2 mr-1" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More Button */}
        <button
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when button is clicked
            handleClick();
          }}
        >
          Read more
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-full">
            Featured
          </span>
        </div>
      )}
    </article>
  );
};

export default BlogCard;