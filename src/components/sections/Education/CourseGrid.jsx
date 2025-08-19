import React, { useState } from 'react';
import { BookOpen, Award, Calendar, Users, Clock, ExternalLink } from 'lucide-react';

const CourseGrid = ({ courses }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['all', 'computer-science', 'mathematics', 'research', 'certification'];

  const filteredCourses = courses
    .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.completedDate) - new Date(a.completedDate);
      }
      if (sortBy === 'grade') {
        return b.grade - a.grade;
      }
      return a.title.localeCompare(b.title);
    });

  const getCategoryColor = (category) => {
    const colors = {
      'computer-science': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'mathematics': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'research': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'certification': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600 dark:text-green-400';
    if (grade >= 80) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="recent">Most Recent</option>
          <option value="grade">Highest Grade</option>
          <option value="title">Alphabetical</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {course.institution}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                    {course.category.replace('-', ' ')}
                  </span>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Course Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {course.completedDate}
                  </div>
                  {course.grade && (
                    <div className={`text-sm font-semibold ${getGradeColor(course.grade)}`}>
                      {course.grade}%
                    </div>
                  )}
                </div>

                {course.instructor && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {course.instructor}
                  </div>
                )}

                {course.duration && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.duration}
                  </div>
                )}

                {course.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {course.description}
                  </p>
                )}

                {/* Skills/Topics */}
                {course.skills && course.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {course.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Certificate/Link */}
                {course.certificateUrl && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={course.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <Award className="w-4 h-4 mr-1" />
                      View Certificate
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No courses found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or check back later for new courses.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;