import React from 'react';
import { Calendar, MapPin, Award, Users, Eye, Download, ExternalLink } from 'lucide-react';

const PosterCard = ({ poster, viewMode, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      research: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      conference: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      workshop: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      symposium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      competition: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      academic: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    return colors[category] || colors.academic;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onClick}>
        <div className="flex flex-col md:flex-row">
          {/* Poster Image */}
          <div className="md:w-48 md:h-32 w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
            <img
              src={poster.imageUrl}
              alt={poster.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg hidden">
              {poster.title.charAt(0)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(poster.category)}`}>
                    {poster.category.charAt(0).toUpperCase() + poster.category.slice(1)}
                  </span>
                  {poster.awards.length > 0 && (
                    <Award className="text-yellow-500" size={16} />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {poster.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {poster.abstract}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(poster.date)}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {poster.location}
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} />
                {poster.authors.length} author{poster.authors.length > 1 ? 's' : ''}
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                {poster.views} views
              </div>
              <div className="flex items-center gap-1">
                <Download size={14} />
                {poster.downloads} downloads
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {poster.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
              {poster.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs">
                  +{poster.tags.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Presented at <span className="font-medium">{poster.event}</span>
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  <Eye size={14} />
                  View Details
                </button>
                {poster.website && (
                  <a
                    href={poster.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col">
        {/* Poster Image */}
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
          <img
            src={poster.imageUrl}
            alt={poster.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg hidden">
            {poster.title.charAt(0)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(poster.category)}`}>
              {poster.category.charAt(0).toUpperCase() + poster.category.slice(1)}
            </span>
            {poster.awards.length > 0 && (
              <Award className="text-yellow-500" size={14} />
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {poster.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
            {poster.abstract}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Calendar size={14} />
            {formatDate(poster.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <MapPin size={14} />
            {poster.location}
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              <Eye size={14} />
              View
            </button>
            {poster.website && (
              <a
                href={poster.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ExternalLink size={14} />
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;