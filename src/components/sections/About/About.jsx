import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe,
  Download,
  ExternalLink,
  Heart,
  Coffee,
  Code,
  Book
} from 'lucide-react';
import ProfileImage from '../Home/ProfileImage';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const personalInfo = {
    name: "Dr. Shailesh K",
    title: "Professor & Researcher",
    location: "University City, Country",
    email: "your.email@university.edu",
    phone: "+1 (555) 123-4567",
    website: "https://yourwebsite.com",
    joinDate: "September 2015"
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'philosophy', label: 'Philosophy', icon: Book },
    { id: 'personal', label: 'Personal', icon: Coffee }
  ];

  const interests = [
    { category: 'Research', items: ['Machine Learning', 'Data Science', 'AI Ethics', 'Computer Vision'] },
    { category: 'Teaching', items: ['Curriculum Design', 'Student Mentoring', 'Educational Technology'] },
    { category: 'Technology', items: ['React', 'Python', 'TensorFlow', 'Cloud Computing'] },
    { category: 'Hobbies', items: ['Photography', 'Travel', 'Reading', 'Cooking'] }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I am a passionate educator and researcher with over 8 years of experience in computer science 
              and artificial intelligence. My work focuses on developing innovative solutions that bridge 
              the gap between theoretical research and practical applications.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Throughout my career, I have been dedicated to fostering the next generation of technologists 
              through teaching, mentoring, and collaborative research. I believe in the power of technology 
              to solve real-world problems and create positive impact in society.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Core Expertise</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Machine Learning & AI
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Data Science & Analytics
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Software Engineering
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Educational Technology
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Research Focus</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Deep Learning Applications
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Natural Language Processing
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                    Computer Vision
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    Ethical AI Development
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'interests':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              My interests span across various domains, from cutting-edge research to creative pursuits. 
              I believe in maintaining a balance between professional growth and personal fulfillment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {interest.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {interest.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'philosophy':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              My educational philosophy centers on the belief that learning is a collaborative journey. 
              I strive to create an environment where students feel empowered to explore, question, 
              and discover their own potential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Teaching</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I believe in hands-on learning, encouraging students to apply theoretical knowledge 
                  to real-world problems while fostering critical thinking and creativity.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Research</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Research should be purpose-driven, addressing real challenges while maintaining 
                  the highest standards of scientific rigor and ethical responsibility.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'personal':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Beyond my professional life, I enjoy exploring new cultures through travel, 
              capturing moments through photography, and staying active through various outdoor activities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Family</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Spending quality time with loved ones and creating lasting memories.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Travel</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Exploring new places, cultures, and cuisines around the world.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reading</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Continuous learning through books on technology, philosophy, and fiction.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know me better - my background, interests, and what drives my passion for 
            education and research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sticky top-8">
              <div className="text-center mb-8">
                <ProfileImage size="large" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                  {personalInfo.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  {personalInfo.title}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-green-500" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Globe className="w-5 h-5 mr-3 text-orange-500" />
                  <span>{personalInfo.website}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-red-500" />
                  <span>Since {personalInfo.joinDate}</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-t-lg font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;