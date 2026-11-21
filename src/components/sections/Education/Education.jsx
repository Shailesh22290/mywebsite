// Education.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, ArrowRight } from 'lucide-react';
import CourseGrid from './CourseGrid';
import CertificateCard from './CertificateCard';

// Updated education data (from CV + Transcript)
const educationData = [
  {
    id: 1,
    degree: "BS-MS (5-year integrated), Data Science and Engineering",
    institution: "Indian Institute of Science Education and Research (IISER) Bhopal",
    location: "Bhopal, India",
    period: "Dec 2022 to May 2027 (expected)",
    status: "in-progress",
    theses: [
      { label: 'BS thesis', to: '/thesis/bs' },
      { label: 'MS thesis', to: '/thesis/ms' },
    ],
    description:
      "Integrated BS-MS focused on machine learning, computer vision, NLP and optimisation, now in the MS year. Thesis research at the GeoAI4Cities Lab on AI that understands cities: the BS thesis (GeoBuild-SSL) mapped building use from street-view images, and the MS thesis covers street-view OSM enrichment, geometry-aware urban sound synthesis and spatial question answering over LiDAR scene graphs.",
    achievements: [
      "First-author paper from the BS thesis at ACM SIGSPATIAL 2026, with an ACM SIGSPATIAL Travel Grant",
      "JST LOTUS Fellowship for a research visit to The University of Tokyo (2026 to 2027)",
      "GATE Data Science and AI: AIR 604 (2025) and AIR 1106 (2026)",
    ]
  },
  {
    id: 2,
    degree: "Senior Secondary (Class 12), Physics, Chemistry and Mathematics",
    institution: "Ashoka Hall Senior Secondary School",
    location: "Jabalpur, India",
    period: "2020 to 2021",
    status: "completed",
    description: "Class 12 with Physics, Chemistry and Mathematics.",
    achievements: [
      "Qualified JEE Advanced 2022 with AIR 7288, top 1% of 1.5 million candidates"
    ]
  },
  {
    id: 3,
    degree: "Secondary (Class 10)",
    institution: "Ashoka Hall Senior Secondary School",
    location: "Jabalpur, India",
    period: "2018 to 2019",
    status: "completed",
    description: "Class 10, with a focus on mathematics and science.",
    achievements: []
  }
];

const Education = () => {
  const [activeTab, setActiveTab] = useState('degrees');

  const tabs = [
    { id: 'degrees', label: 'Academic Degrees', icon: GraduationCap },
    { id: 'courses', label: 'Courses & Training', icon: BookOpen },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  const filteredEducation = educationData;

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
     <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-48">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education & Learning
          </h2>
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
                        {edu.status !== 'completed' && (
                          <span className="flex-shrink-0 rounded-md bg-gray-900/75 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-white">
                            Ongoing
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {edu.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          {edu.theses && (
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Thesis</h4>
                              <div className="flex flex-wrap gap-2">
                                {edu.theses.map((t) => (
                                  <Link key={t.to} to={t.to}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                                    {t.label} <ArrowRight className="w-4 h-4" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {edu.achievements.length > 0 && <div>
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
                        </div>}
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
