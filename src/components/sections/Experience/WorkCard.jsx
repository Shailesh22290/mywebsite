import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Building, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  Briefcase,
  Clock,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

const WorkCard = ({ 
  experience, 
  onToggleExpanded, 
  isExpanded, 
  formatDate, 
  calculateDuration 
}) => {
  const {
    position,
    company,
    companyUrl,
    type,
    location,
    startDate,
    endDate,
    description,
    achievements,
    technologies,
    teamSize,
    reports,
    keyProjects,
    companyLogo,
    companyDescription,
    contactInfo
  } = experience;

  const getTypeColor = (type) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'part-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'contract':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'internship':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'freelance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 
               dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            {companyLogo && (
              <div className="flex-shrink-0">
                <img
                  src={companyLogo}
                  alt={`${company} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {position}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-gray-500" />
                {companyUrl ? (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium
                             flex items-center gap-1"
                  >
                    {company}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {company}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(startDate)} - {formatDate(endDate)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{calculateDuration(startDate, endDate)}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            
            {!endDate && (
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 
                           dark:text-green-200 rounded-full text-xs font-medium">
                Current
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 
                           dark:text-gray-300 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {teamSize && (
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {teamSize}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Team Size
              </div>
            </div>
          )}
          
          {reports && (
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {reports}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Direct Reports
              </div>
            </div>
          )}
          
          {keyProjects && (
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {keyProjects}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Key Projects
              </div>
            </div>
          )}
          
          {achievements && (
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Award className="w-5 h-5 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {achievements.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Achievements
              </div>
            </div>
          )}
        </div>

        {/* Achievements Preview */}
        {achievements && achievements.length > 0 && !isExpanded && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {achievements.slice(0, 2).map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
              {achievements.length > 2 && (
                <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                  +{achievements.length - 2} more achievements
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={onToggleExpanded}
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 border-t 
                   border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 
                   hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-sm font-medium">
            {isExpanded ? 'Show Less' : 'Show More Details'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4"
          >
            {/* Company Description */}
            {companyDescription && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  About {company}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {companyDescription}
                </p>
              </div>
            )}

            {/* Full Achievements List */}
            {achievements && achievements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  All Achievements
                </h4>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Information */}
            {contactInfo && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  {contactInfo.email && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                  {contactInfo.website && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Globe className="w-4 h-4" />
                      <a
                        href={contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {contactInfo.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkCard;