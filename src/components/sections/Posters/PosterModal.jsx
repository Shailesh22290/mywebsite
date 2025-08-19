import React, { useState } from 'react';
import { X, Download, ExternalLink, Calendar, MapPin, Users, Award, Eye, Share2, Heart } from 'lucide-react';

const PosterModal = ({ poster, onClose }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(poster.likes || 0);

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

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: poster.title,
        text: poster.abstract,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleDownload = () => {
    window.open(poster.pdfUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(poster.category)}`}>
              {poster.category.charAt(0).toUpperCase() + poster.category.slice(1)}
            </span>
            {poster.awards.length > 0 && (
              <div className="flex items-center gap-1">
                <Award className="text-yellow-500" size={20} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {poster.awards.length} award{poster.awards.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-colors ${
                liked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
              }`}
              title={liked ? 'Unlike' : 'Like'}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-lg transition-colors"
              title="Share"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Poster Image */}
            <div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                {isImageLoading && (
                  <div className="aspect-[3/4] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className={`w-full aspect-[3/4] object-cover ${isImageLoading ? 'hidden' : 'block'}`}
                  onLoad={() => setIsImageLoading(false)}
                  onError={(e) => {
                    setIsImageLoading(false);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-4xl hidden">
                  {poster.title.charAt(0)}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                    <Eye size={16} />
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {poster.views}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Views
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                    <Download size={16} />
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {poster.downloads}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Downloads
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                    <Heart size={16} />
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {likes}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Likes
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {poster.title}
                </h1>
                
                {/* Event Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>{formatDate(poster.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} />
                    <span>{poster.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <ExternalLink size={16} />
                    <span>{poster.event}</span>
                  </div>
                </div>
              </div>

              {/* Abstract */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Abstract
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {poster.abstract}
                </p>
              </div>

              {/* Authors */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Authors
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {poster.authors.length} author{poster.authors.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {poster.authors.map((author, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm"
                    >
                      {author}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards */}
              {poster.awards.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Awards & Recognition
                  </h2>
                  <div className="space-y-2">
                    {poster.awards.map((award, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                      >
                        <Award className="text-yellow-500" size={16} />
                        <span className="text-yellow-800 dark:text-yellow-400 font-medium">
                          {award}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {poster.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download size={18} />
                  Download PDF
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Share2 size={18} />
                  Share
                </button>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                    liked
                      ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                  {liked ? 'Liked' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterModal;