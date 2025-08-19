import React from 'react';
import { Calendar, MapPin, Users, Clock, ExternalLink, Video, Download, Star } from 'lucide-react';

const TalkCard = ({ talk, isUpcoming = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      conference: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      workshop: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      webinar: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      keynote: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      panel: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
      isUpcoming ? 'ring-2 ring-blue-500/20' : ''
    }`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(talk.type)}`}>
              {talk.type.charAt(0).toUpperCase() + talk.type.slice(1)}
            </span>
            {isUpcoming && (
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full text-xs font-medium">
                Upcoming
              </span>
            )}
            {talk.featured && (
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            )}
          </div>
          {talk.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{talk.rating}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {talk.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {talk.description}
        </p>

        {/* Event Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(talk.date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{talk.location}</span>
            {talk.country && <span className="text-xs">• {talk.country}</span>}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{talk.duration} minutes</span>
          </div>
          
          {talk.audience && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <span>{talk.audience} attendees</span>
            </div>
          )}
        </div>

        {/* Event Name */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {talk.event}
          </p>
          {talk.organizer && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Organized by {talk.organizer}
            </p>
          )}
        </div>

        {/* Topics */}
        {talk.topics && talk.topics.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {talk.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Points */}
        {talk.keyPoints && talk.keyPoints.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Key Points:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {talk.keyPoints.slice(0, 3).map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
              {talk.keyPoints.length > 3 && (
                <li className="text-xs text-gray-500 dark:text-gray-400">
                  +{talk.keyPoints.length - 3} more points...
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {talk.recordingUrl && (
              <a
                href={talk.recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Video className="h-4 w-4" />
                Recording
              </a>
            )}
            {talk.slidesUrl && (
              <a
                href={talk.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                <Download className="h-4 w-4" />
                Slides
              </a>
            )}
          </div>
          
          {talk.eventUrl && (
            <a
              href={talk.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ExternalLink className="h-4 w-4" />
              Event
            </a>
          )}
        </div>

        {/* Feedback */}
        {talk.feedback && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300 italic">
              "{talk.feedback}"
            </p>
            {talk.feedbackAuthor && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                — {talk.feedbackAuthor}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalkCard;