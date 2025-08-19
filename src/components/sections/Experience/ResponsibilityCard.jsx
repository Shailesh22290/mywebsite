import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
  Lightbulb,
  Shield,
  Code,
  BarChart3,
  Settings,
  MessageSquare,
  Calendar
} from 'lucide-react';

const ResponsibilityCard = ({ responsibility, index }) => {
  const {
    title,
    description,
    category,
    impact,
    skills,
    duration,
    outcome,
    metrics,
    challenges,
    solutions,
    priority
  } = responsibility;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'leadership':
        return <Users className="w-5 h-5" />;
      case 'development':
        return <Code className="w-5 h-5" />;
      case 'strategy':
        return <Target className="w-5 h-5" />;
      case 'analysis':
        return <BarChart3 className="w-5 h-5" />;
      case 'management':
        return <Settings className="w-5 h-5" />;
      case 'communication':
        return <MessageSquare className="w-5 h-5" />;
      case 'innovation':
        return <Lightbulb className="w-5 h-5" />;
      case 'security':
        return <Shield className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'leadership':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'development':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'strategy':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'analysis':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'management':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'communication':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'innovation':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'security':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white dark:bg-gray-800 rounded-lg border-l-4 ${getPriorityColor(priority)} 
                 border-t border-r border-b border-gray-200 dark:border-gray-700 
                 shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
              {getCategoryIcon(category)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {title}
              </h4>
              {duration && (
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{duration}</span>
                </div>
              )}
            </div>
          </div>
          
          {priority && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {priority}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          {description}
        </p>

        {/* Skills Used */}
        {skills && skills.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
              Skills Applied
            </h5>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 
                           dark:text-gray-300 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Impact and Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          {impact && (
            <div>
              <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                Impact
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {impact}
              </p>
            </div>
          )}
          
          {outcome && (
            <div>
              <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                Outcome
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {outcome}
              </p>
            </div>
          )}
        </div>

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
              Key Metrics
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((metric, metricIndex) => (
                <div
                  key={metricIndex}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges and Solutions */}
        {(challenges || solutions) && (
          <div className="space-y-2">
            {challenges && (
              <div>
                <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                  Challenges
                </h5>
                <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 
                            p-2 rounded">
                  {challenges}
                </p>
              </div>
            )}
            
            {solutions && (
              <div>
                <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                  Solutions
                </h5>
                <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 
                            p-2 rounded">
                  {solutions}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Achievement Badge */}
        {outcome && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Successfully Completed
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResponsibilityCard;