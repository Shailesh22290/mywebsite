import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building, 
  Users, 
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Heart,
  Target,
  Clock,
  Globe,
  FlaskConical
} from 'lucide-react';

// CORRECTED IMPORT PATH:
// The path is changed from "./experience.js" to point to the correct directory.
import { workExperience, volunteerExperience } from '../../../data/experience.js'; 

// Note: If your 'data' folder is in a different location relative to your 'components' folder,
// you may need to adjust the '../../../data/experience.js' path slightly.

const Experience = () => { // Removed props from the component signature
  const [selectedCategory, setSelectedCategory] = useState('research');
  const [expandedExperience, setExpandedExperience] = useState(null);

  // Use the imported data directly
  const experienceData = workExperience;
  const volunteerData = volunteerExperience;

  // Combine professional and volunteer experience
  const allExperiences = [
    ...experienceData.map(exp => ({ ...exp, category: exp.kind === 'research' ? 'research' : 'industry' })),
    ...volunteerData.map(exp => ({ ...exp, category: 'volunteer' }))
  ];

  // Show only the selected category, most recent first
  const filteredExperience = allExperiences
    .filter(exp => exp.category === selectedCategory)
    .sort((a, b) => new Date(b.endDate || '2999-12-31') - new Date(a.endDate || '2999-12-31'));

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  const toggleExpanded = (index) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  // Solid colours from the site's own blue and slate palette (no gradients).
  const CATEGORY = {
    research: { label: 'Research', icon: FlaskConical, color: 'bg-blue-600 dark:bg-blue-700 text-white', border: 'border-blue-100 dark:border-blue-900/60' },
    industry: { label: 'Industry', icon: Briefcase, color: 'bg-slate-700 dark:bg-slate-700 text-white', border: 'border-gray-200 dark:border-gray-700' },
    volunteer: { label: 'Volunteer', icon: Heart, color: 'bg-sky-700 dark:bg-sky-800 text-white', border: 'border-sky-100 dark:border-sky-900/60' },
  };
  const count = (key) => allExperiences.filter((e) => e.category === key).length;
  const getCategoryIcon = (category) => CATEGORY[category].icon;
  const getCategoryColor = (category) => CATEGORY[category].color;
  const getCategoryBorderColor = (category) => CATEGORY[category].border;

  // Enhanced Work Card Component
  const EnhancedWorkCard = ({ experience, onToggleExpanded, isExpanded, category }) => {
    const CategoryIcon = getCategoryIcon(category);
    const gradientColor = getCategoryColor(category);
    const borderColor = getCategoryBorderColor(category);

    return (
      <motion.div
        layout
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                   border-2 ${borderColor} transition-all duration-300 overflow-hidden
                   hover:scale-[1.02] group`}
        whileHover={{ y: -5 }}
      >
        {/* Header with gradient background */}
        <div className={`${gradientColor} p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform translate-x-8 -translate-y-8">
            <CategoryIcon className="w-full h-full" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <CategoryIcon className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">
                  {CATEGORY[category].label}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleExpanded}
                className="p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-white">
              {experience.position || 'Position Title'}
            </h3>
            
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {/* Display company for professional or organization for volunteer */}
                <span>{experience.company || experience.organization || 'Organization Name'}</span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </span>
            </div>
            {experience.startDate && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
              </div>
            )}
          </div>

          {experience.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {experience.description}
            </p>
          )}
          
          {/* Support for contributions (from volunteer) and technologies (from work) */}
          {(experience.technologies || experience.contributions) && (
             <div className="flex flex-wrap gap-2 mb-4">
              {(experience.technologies || experience.contributions).map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                           rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 
                           transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (experience.responsibilities || experience.contributions || experience.achievements) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
            >
              <div className="p-6 space-y-6">
                {(experience.responsibilities || experience.contributions) && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {experience.responsibilities ? 'Key Responsibilities' : 'Key Contributions'}
                    </h4>
                    <ul className="space-y-2">
                      {(experience.responsibilities || experience.contributions).map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-blue-600 dark:bg-blue-400`}></div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {experience.achievements && experience.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-blue-600 dark:bg-blue-400"></div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
             Experience
            </h2>
          </motion.div>

          {/* Enhanced Category Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="flex flex-wrap justify-center bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              {Object.entries(CATEGORY).map(([key, { label, icon: Icon }]) => (

                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === key
                      ? `${getCategoryColor(key)} shadow-md`
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === key 
                      ? 'bg-white/20' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    {count(key)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Experience Display */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

            {filteredExperience.map((experience, index) => (
              <motion.div
                key={`${experience.category}-${experience.id || index}`}
                variants={itemVariants}
                className="relative mb-12"
              >
                <div className={`absolute left-6 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 ${getCategoryColor(experience.category)}`}></div>

                <div className="ml-20">
                  <EnhancedWorkCard 
                    experience={experience}
                    onToggleExpanded={() => toggleExpanded(`${experience.category}-${experience.id || index}`)}
                    isExpanded={expandedExperience === `${experience.category}-${experience.id || index}`}
                    category={experience.category}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredExperience.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
                <div className="flex justify-center mb-6">
                  {React.createElement(getCategoryIcon(selectedCategory), { className: 'w-20 h-20 text-gray-400' })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No {selectedCategory} experience yet
                </h3>
              </div>
            </motion.div>
          )}

          {/* Enhanced Summary Statistics */}
         <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
>
  {[
    {
      title: "Research Roles",
      value: count('research'),
      icon: FlaskConical,
      gradient: "bg-blue-600",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Industry Roles",
      value: count('industry'),
      icon: Briefcase,
      gradient: "bg-slate-700",
      text: "text-slate-700 dark:text-slate-300",
    },
    {
      title: "Volunteer Roles",
      value: volunteerData.length,
      icon: Heart,
      gradient: "bg-sky-700",
      text: "text-sky-700 dark:text-sky-400",
    },
    {
      title: "Organizations",
      value: [
        ...new Set(
          allExperiences.map((exp) => exp.company || exp.organization)
        ),
      ].length,
      icon: Building,
      gradient: "bg-gray-600",
      text: "text-gray-700 dark:text-gray-300",
    },
  ].map((stat, index) => (
    <motion.div
      key={stat.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 overflow-hidden group"
    >
      <div
        className={`absolute inset-0 ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10">
        <div
          className={`inline-flex p-3 rounded-xl ${stat.gradient} mb-4`}
        >
          <stat.icon className="w-6 h-6 text-white" />
        </div>

        <div
          className={`text-4xl font-bold ${stat.text} mb-2`}
        >
          {stat.value}
        </div>

        <div className="text-gray-600 dark:text-gray-400 font-medium">
          {stat.title}
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default Experience;