import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  Eye, 
  Clock, 
  CheckCircle, 
  Pin,
  Share2,
  MoreVertical,
  User
} from 'lucide-react';

const DiscussionCard = ({ discussion, onLike, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(discussion.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
    onLike(discussion.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: discussion.title,
        text: discussion.content,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Machine Learning': 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
      'Web Development': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
      'DevOps': 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
      'Research': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
      'Career': 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
      'Open Source': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 relative group"
    >
      {/* Pinned indicator */}
      {discussion.isPinned && (
        <div className="absolute top-4 right-4">
          <Pin className="w-4 h-4 text-yellow-500" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={discussion.author.avatar}
            alt={discussion.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {discussion.author.name}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {discussion.author.role}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(discussion.createdAt)}
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
            {discussion.category}
          </span>
          {discussion.isResolved && (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {discussion.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {discussion.content}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {discussion.tags.slice(0, 4).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
        {discussion.tags.length > 4 && (
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            +{discussion.tags.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Replies */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{discussion.replies}</span>
          </div>

          {/* Likes */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              isLiked 
                ? 'text-red-500' 
                : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{likes}</span>
          </button>

          {/* Views */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{discussion.views}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Last activity */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Last activity {formatTimeAgo(discussion.lastActivity)}
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default DiscussionCard;