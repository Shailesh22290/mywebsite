import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Star, 
  Calendar, 
  FileText, 
  BookOpen, 
  Video, 
  Code,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

const ResourceCard = ({ resource, onDownload, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(resource.likes || Math.floor(Math.random() * 50) + 10);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'course': return <Video className="w-4 h-4" />;
      case 'toolkit': return <Code className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'guide': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'course': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'toolkit': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'template': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Preview button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => window.open(resource.previewUrl, '_blank')}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
            {getTypeIcon(resource.type)}
            {resource.type}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center gap-1">
            {renderStars(resource.rating)}
          </div>
          <span className="text-white text-xs font-medium ml-1">
            {resource.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {resource.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              +{resource.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(resource.publishedDate)}
            </span>
            <span>{resource.format}</span>
            <span>{resource.size}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {resource.downloads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
              {likes}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onDownload(resource)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={() => window.open(resource.previewUrl, '_blank')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Last updated */}
        <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Updated {formatDate(resource.lastUpdated)}
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;