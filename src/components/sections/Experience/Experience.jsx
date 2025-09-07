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
  Filter,
  Search,
  Heart,
  Target,
  Clock,
  Globe,
  Sparkles
} from 'lucide-react';

// CORRECTED IMPORT PATH:
// The path is changed from "./experience.js" to point to the correct directory.
import { workExperience, volunteerExperience } from '../../../data/experience.js'; 

// Note: If your 'data' folder is in a different location relative to your 'components' folder,
// you may need to adjust the '../../../data/experience.js' path slightly.

const Experience = () => { // Removed props from the component signature
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [viewMode, setViewMode] = useState('timeline');

  // Use the imported data directly
  const experienceData = workExperience;
  const volunteerData = volunteerExperience;

  // Combine professional and volunteer experience
  const allExperiences = [
    ...experienceData.map(exp => ({ ...exp, category: 'professional' })),
    ...volunteerData.map(exp => ({ ...exp, category: 'volunteer' }))
  ];

  // Extract unique values for filters
  const types = [...new Set(allExperiences.filter(exp => exp.type).map(exp => exp.type))];
  const locations = [...new Set(allExperiences.filter(exp => exp.location).map(exp => exp.location))];

  // Filter and sort experience data
  const filteredExperience = allExperiences
    .filter(exp => {
      const matchesType = selectedType === 'all' || exp.type === selectedType;
      const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || exp.location === selectedLocation;
      const matchesSearch = searchTerm === '' || 
        (exp.position && exp.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (exp.company && exp.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (exp.organization && exp.organization.toLowerCase().includes(searchTerm.toLowerCase())) || // Added for volunteer orgs
        (exp.description && exp.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (exp.technologies && exp.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      return matchesType && matchesCategory && matchesLocation && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.endDate || '2999-12-31') - new Date(a.endDate || '2999-12-31');
        case 'oldest':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'company': // This will sort by company or organization
          return (a.company || a.organization || '').localeCompare(b.company || b.organization || '');
        case 'position':
          return (a.position || '').localeCompare(b.position || '');
        default:
          return 0;
      }
    });

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

  const getCategoryIcon = (category) => {
    return category === 'volunteer' ? Heart : Briefcase;
  };

  const getCategoryColor = (category) => {
    return category === 'volunteer' 
      ? 'from-pink-500 to-rose-500 text-white' 
      : 'from-blue-500 to-indigo-500 text-white';
  };

  const getCategoryBorderColor = (category) => {
    return category === 'volunteer' 
      ? 'border-pink-200 dark:border-pink-800' 
      : 'border-blue-200 dark:border-blue-800';
  };

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
        <div className={`bg-gradient-to-r ${gradientColor} p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform translate-x-8 -translate-y-8">
            <CategoryIcon className="w-full h-full" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <CategoryIcon className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
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

          {experience.achievements && experience.achievements.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
              <span>{experience.achievements.length} Achievement{experience.achievements.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (experience.responsibilities || experience.contributions) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
            >
              <div className="p-6">
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
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${gradientColor}`}></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Experience Journey</span>
            </div>
            
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
             Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              My journey through various roles and organizations, showcasing growth, expertise, and community involvement across different domains and technologies.
            </p>
          </motion.div>

          {/* Enhanced Category Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="flex bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              {[
                { key: 'all', label: 'All Experience', icon: Target, count: allExperiences.length },
                { key: 'professional', label: 'Professional', icon: Briefcase, count: experienceData.length },
                { key: 'volunteer', label: 'Volunteer', icon: Heart, count: volunteerData.length }
              ].map(({ key, label, icon: Icon, count }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
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
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by position, company, technology, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-transparent text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="company">Company Name</option>
                  <option value="position">Position</option>
                </select>
              </div>

              <div className="flex gap-2">
                {['timeline', 'grid'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      viewMode === mode
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Display */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={viewMode === 'timeline' 
              ? 'relative max-w-4xl mx-auto' 
              : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'}
          >
            {viewMode === 'timeline' && (
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full"></div>
            )}
            
            {filteredExperience.map((experience, index) => (
              <motion.div
                key={`${experience.category}-${experience.id || index}`}
                variants={itemVariants}
                className={viewMode === 'timeline' ? 'relative mb-12' : ''}
              >
                {viewMode === 'timeline' && (
                  <div className={`absolute left-6 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 ${
                    experience.category === 'volunteer' 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}></div>
                )}
                
                <div className={viewMode === 'timeline' ? 'ml-20' : ''}>
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
                  {selectedCategory === 'volunteer' ? (
                    <Heart className="w-20 h-20 text-pink-400" />
                  ) : selectedCategory === 'professional' ? (
                    <Briefcase className="w-20 h-20 text-blue-400" />
                  ) : (
                    <Target className="w-20 h-20 text-gray-400" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No experiences found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find more experiences.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedLocation('all');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Clear All Filters
                </button>
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
      title: "Professional Roles",
      value: experienceData.length,
      icon: Briefcase,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Volunteer Roles",
      value: volunteerData.length,
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Organizations",
      value: [
        ...new Set(
          allExperiences.map((exp) => exp.company || exp.organization)
        ),
      ].length,
      icon: Building,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Years",
      value: (() => {
        if (!allExperiences.length) return 0;

        // find earliest start and latest end
        const starts = allExperiences
          .map((exp) => exp.startDate && new Date(exp.startDate))
          .filter(Boolean);
        const ends = allExperiences.map((exp) =>
          exp.endDate ? new Date(exp.endDate) : new Date()
        );

        const minStart = new Date(Math.min(...starts));
        const maxEnd = new Date(Math.max(...ends));

        const diffYears =
          (maxEnd - minStart) / (1000 * 60 * 60 * 24 * 365);

        return Math.max(1, Math.round(diffYears)); // ensure at least 1 year
      })(),
      icon: Clock,
      gradient: "from-purple-500 to-violet-500",
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
        className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10">
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4`}
        >
          <stat.icon className="w-6 h-6 text-white" />
        </div>

        <div
          className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
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