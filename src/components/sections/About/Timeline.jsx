import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Building, 
  GraduationCap, 
  Award, 
  Users, 
  BookOpen,
  Briefcase,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Timeline = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const timelineData = [
    {
      id: 1,
      type: 'work',
      title: 'Senior Professor',
      organization: 'University of Technology',
      location: 'New York, USA',
      startDate: '2020',
      endDate: 'Present',
      description: 'Leading research in AI and machine learning, supervising PhD students, and teaching advanced courses.',
      achievements: [
        'Published 15 peer-reviewed papers',
        'Secured $2M in research funding',
        'Supervised 12 PhD students',
        'Developed new ML curriculum'
      ],
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      type: 'award',
      title: 'Excellence in Teaching Award',
      organization: 'National Education Association',
      location: 'USA',
      startDate: '2019',
      endDate: null,
      description: 'Recognized for outstanding contributions to computer science education and innovative teaching methods.',
      achievements: [
        'Voted by 500+ students',
        'Innovative curriculum design',
        'Mentorship excellence',
        'Student success rate: 95%'
      ],
      icon: Award,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      type: 'work',
      title: 'Associate Professor',
      organization: 'State University',
      location: 'California, USA',
      startDate: '2017',
      endDate: '2020',
      description: 'Conducted research in deep learning applications, published extensively, and built research lab.',
      achievements: [
        'Established AI Research Lab',
        'Published 20 research papers',
        'Trained 50+ graduate students',
        'Industry collaborations with tech giants'
      ],
      icon: GraduationCap,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 4,
      type: 'education',
      title: 'Postdoctoral Research Fellow',
      organization: 'MIT',
      location: 'Massachusetts, USA',
      startDate: '2015',
      endDate: '2017',
      description: 'Advanced research in neural networks and computer vision under renowned professors.',
      achievements: [
        'Breakthrough in CNN architectures',
        'Collaboration with industry leaders',
        'Published in top-tier journals',
        'Patent applications filed'
      ],
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 5,
      type: 'education',
      title: 'Ph.D. in Computer Science',
      organization: 'Stanford University',
      location: 'California, USA',
      startDate: '2010',
      endDate: '2015',
      description: 'Dissertation on "Advanced Machine Learning Algorithms for Big Data Analytics".',
      achievements: [
        'Summa Cum Laude',
        'Teaching Assistant for 4 years',
        'Research publications: 12',
        'Conference presentations: 15'
      ],
      icon: GraduationCap,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      type: 'work',
      title: 'Software Engineer',
      organization: 'Google',
      location: 'California, USA',
      startDate: '2008',
      endDate: '2010',
      description: 'Developed machine learning systems for search algorithms and data processing.',
      achievements: [
        'Improved search relevance by 20%',
        'Led team of 5 engineers',
        'Implemented scalable ML pipelines',
        'Filed 3 patents'
      ],
      icon: Briefcase,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 7,
      type: 'education',
      title: 'M.S. in Computer Science',
      organization: 'UC Berkeley',
      location: 'California, USA',
      startDate: '2006',
      endDate: '2008',
      description: 'Specialized in artificial intelligence and machine learning algorithms.',
      achievements: [
        'GPA: 3.9/4.0',
        'Graduate Research Assistant',
        'Published 3 papers',
        'President of CS Graduate Society'
      ],
      icon: GraduationCap,
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 8,
      type: 'education',
      title: 'B.S. in Computer Science',
      organization: 'University of California, Los Angeles',
      location: 'California, USA',
      startDate: '2002',
      endDate: '2006',
      description: 'Foundation in computer science with focus on software engineering and algorithms.',
      achievements: [
        'Magna Cum Laude',
        'Dean\'s List for 6 semesters',
        'Computer Science Society President',
        'Undergraduate Research Program'
      ],
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'work': return Briefcase;
      case 'education': return GraduationCap;
      case 'award': return Award;
      default: return Calendar;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'work': return 'Professional';
      case 'education': return 'Education';
      case 'award': return 'Recognition';
      default: return 'Event';
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Career Timeline
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey through education, research, and industry experience
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline Node */}
                <div className={`absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg z-10`}></div>
                
                {/* Content Card */}
                <div className="ml-20">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} mr-3`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.color} text-white`}>
                              {getTypeLabel(item.type)}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                            <Building className="w-4 h-4 mr-2" />
                            <span className="font-medium">{item.organization}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="mr-4">{item.location}</span>
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{item.startDate} - {item.endDate || 'Present'}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {expandedItems[item.id] ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {item.description}
                      </p>

                      {/* Achievements - Expandable */}
                      {expandedItems[item.id] && (
                        <div className="mt-4 animate-fadeIn">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Star className="w-5 h-5 mr-2 text-yellow-500" />
                            Key Achievements
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {item.achievements.map((achievement, achievementIndex) => (
                              <div
                                key={achievementIndex}
                                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {achievement}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Compact Achievement Count */}
                      {!expandedItems[item.id] && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{item.achievements.length} key achievements</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Career Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {new Date().getFullYear() - 2008}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {timelineData.filter(item => item.type === 'education').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Degrees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {timelineData.filter(item => item.type === 'work').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {timelineData.filter(item => item.type === 'award').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Awards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;