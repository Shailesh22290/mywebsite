import React from 'react';
import { Calendar, Clock, Eye, Tag, ArrowRight, Star } from 'lucide-react';

const BlogCard = ({ post, featured = false }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'research': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'technology': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'ai': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'machine-learning': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'data-science': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'tutorial': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'opinion': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'industry': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  if (featured) {
    return (
      <div className="group cursor-pointer">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
          {/* Featured Badge */}
          <div className="relative">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.publishDate)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {getReadingTime(post.content)} min read
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          {post.image && (
            <div className="md:w-1/3">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className={`p-6 ${post.image ? 'md:w-2/3' : 'w-full'}`}>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 3).map((category, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-md"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{post.tags.length - 4} more
                </span>
              )}
            </div>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.publishDate)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {getReadingTime(post.content)} min read
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;