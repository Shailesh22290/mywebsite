// Education.js

import React, { useState } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Filter } from 'lucide-react';
import CourseGrid from './CourseGrid';
import CertificateCard from './CertificateCard';

// Updated education data (from CV + Transcript)
const educationData = [
  {
    id: 1,
    degree: "B.S. in Data Science and Engineering",
    institution: "Indian Institute of Science Education and Research (IISER) Bhopal",
    location: "Bhopal, India",
    period: "Dec 2022 – Present",
    gpa: "7.21/10.0",
    status: "in-progress",
    description:
      "Undergraduate studies in Data Science and Engineering with a strong focus on Artificial Intelligence, Machine Learning, Computer Vision, Optimization, and Applied Mathematics. Completed multiple projects and internships in ML, AI, and full-stack development.",
    achievements: [
      "General Secretary, Technical Affairs – Student Activity Council (2024–2025)",
      "Convenor – Techfest Armageddon (2023–2025)",
      "Winner – Smart India Hackathon 2023 (National Level)",
      "AIR 7288 – JEE Advanced 2022 (Top 1% among 1.5M candidates)"
    ]
  },
  {
    id: 2,
    degree: "Senior Secondary Education (Class 12)",
    institution: "Ashoka Hall Senior Secondary School",
    location: "Jabalpur, India",
    period: "2020 – 2021",
    gpa: "83%",
    status: "completed",
    description:
      "Completed Class 12 with a focus on Physics, Chemistry, and Mathematics. Developed strong foundations in problem solving and logical reasoning.",
    achievements: [
      "Scored 83% in Class 12 Boards",
      "Prepared and qualified JEE Advanced 2022"
    ]
  },
  {
    id: 3,
    degree: "Secondary Education (Class 10)",
    institution: "Ashoka Hall Senior Secondary School",
    location: "Jabalpur, India",
    period: "2018 – 2019",
    gpa: "91%",
    status: "completed",
    description:
      "Completed Class 10 with distinction, excelling in mathematics and science subjects.",
    achievements: [
      "Scored 91% in Class 10 Boards",
      "School merit list for academic excellence"
    ]
  }
];

const Education = () => {
  const [activeTab, setActiveTab] = useState('degrees');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const tabs = [
    { id: 'degrees', label: 'Academic Degrees', icon: GraduationCap },
    { id: 'courses', label: 'Courses & Training', icon: BookOpen },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'phd', label: 'Doctoral' },
    { id: 'masters', label: 'Masters' },
    { id: 'bachelors', label: 'Bachelors' }
  ];

  const filteredEducation = educationData.filter((edu) => {
    if (selectedLevel === 'all') return true;
    const degreeLower = edu.degree?.toLowerCase() || '';
    const levelMap = {
      phd: 'ph.d',
      masters: 'master',
      bachelors: 'b.s'
    };
    const searchTerm = levelMap[selectedLevel] || selectedLevel;
    return degreeLower.includes(searchTerm);
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
     <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-48">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education & Learning
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My academic journey and continuous learning path in Data Science, Engineering, and Artificial Intelligence
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'degrees' && (
          <div>
            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filter by level:</span>
              </div>
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedLevel === level.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {level.label}
                </button>
              ))}
            </div>

            {/* Education Cards */}
            <div className="space-y-12">
              {filteredEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-2">
                            <span className="font-semibold">{edu.institution}</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>{edu.period}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(edu.status)}`}>
                          {edu.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {edu.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Academic Details
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex ">
                              <span>GPA:</span>
                              <span className="font-medium">{edu.gpa}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            {edu.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && <CourseGrid />}
        {activeTab === 'certifications' && <CertificateCard />}
      </div>
    </section>
  );
};

export default Education;
