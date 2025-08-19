import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Brain, 
  Palette, 
  Server, 
  Smartphone,
  ChevronRight,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('programming');
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBars(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const skillCategories = {
    programming: {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python', level: 95, experience: '5 years', projects: 45 },
        { name: 'JavaScript', level: 90, experience: '4 years', projects: 35 },
        { name: 'Java', level: 85, experience: '6 years', projects: 25 },
        { name: 'C++', level: 80, experience: '3 years', projects: 20 },
        { name: 'R', level: 75, experience: '2 years', projects: 15 },
        { name: 'SQL', level: 88, experience: '4 years', projects: 30 }
      ]
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      icon: Server,
      color: 'from-green-500 to-teal-500',
      skills: [
        { name: 'React', level: 90, experience: '3 years', projects: 25 },
        { name: 'Node.js', level: 85, experience: '3 years', projects: 20 },
        { name: 'Django', level: 88, experience: '4 years', projects: 22 },
        { name: 'TensorFlow', level: 92, experience: '3 years', projects: 18 },
        { name: 'PyTorch', level: 85, experience: '2 years', projects: 15 },
        { name: 'Spring Boot', level: 80, experience: '2 years', projects: 12 }
      ]
    },
    databases: {
      title: 'Databases & Tools',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PostgreSQL', level: 90, experience: '4 years', projects: 28 },
        { name: 'MongoDB', level: 85, experience: '3 years', projects: 22 },
        { name: 'Redis', level: 75, experience: '2 years', projects: 15 },
        { name: 'Docker', level: 88, experience: '3 years', projects: 25 },
        { name: 'Kubernetes', level: 70, experience: '1 year', projects: 8 },
        { name: 'Git', level: 92, experience: '5 years', projects: 40 }
      ]
    },
    ai_ml: {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Machine Learning', level: 95, experience: '5 years', projects: 35 },
        { name: 'Deep Learning', level: 90, experience: '4 years', projects: 25 },
        { name: 'Natural Language Processing', level: 85, experience: '3 years', projects: 20 },
        { name: 'Computer Vision', level: 88, experience: '3 years', projects: 18 },
        { name: 'Data Science', level: 92, experience: '4 years', projects: 30 },
        { name: 'MLOps', level: 75, experience: '2 years', projects: 12 }
      ]
    },
    design: {
      title: 'Design & UI/UX',
      icon: Palette,
      color: 'from-pink-500 to-purple-500',
      skills: [
        { name: 'Figma', level: 80, experience: '2 years', projects: 15 },
        { name: 'Adobe Creative Suite', level: 75, experience: '3 years', projects: 18 },
        { name: 'Tailwind CSS', level: 90, experience: '2 years', projects: 22 },
        { name: 'UI/UX Design', level: 85, experience: '3 years', projects: 20 },
        { name: 'Responsive Design', level: 88, experience: '3 years', projects: 25 },
        { name: 'User Research', level: 70, experience: '2 years', projects: 10 }
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: Smartphone,
      color: 'from-indigo-500 to-blue-500',
      skills: [
        { name: 'React Native', level: 80, experience: '2 years', projects: 12 },
        { name: 'Flutter', level: 75, experience: '1 year', projects: 8 },
        { name: 'iOS Development', level: 70, experience: '2 years', projects: 10 },
        { name: 'Android Development', level: 72, experience: '2 years', projects: 10 },
        { name: 'Progressive Web Apps', level: 85, experience: '2 years', projects: 15 },
        { name: 'Mobile UI/UX', level: 78, experience: '2 years', projects: 12 }
      ]
    }
  };

  const categories = Object.keys(skillCategories);
  const currentCategory = skillCategories[selectedCategory];

  const getSkillColor = (level) => {
    if (level >= 90) return 'from-green-500 to-emerald-500';
    if (level >= 80) return 'from-blue-500 to-cyan-500';
    if (level >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getSkillLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies 
            I work with on a daily basis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const categoryData = skillCategories[category];
                  const isActive = selectedCategory === category;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <categoryData.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium text-sm">{categoryData.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Skills Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${currentCategory.color} mr-4`}>
                  <currentCategory.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentCategory.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentCategory.skills.length} skills in this category
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCategory.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </h4>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          skill.level >= 90
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : skill.level >= 80
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                            : skill.level >= 70
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                        }`}>
                          {getSkillLabel(skill.level)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {skill.level}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out`}
                          style={{
                            width: animatedBars ? `${skill.level}%` : '0%'
                          }}
                        />
                      </div>
                    </div>

                    {/* Skill Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{skill.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Award className="w-4 h-4 mr-2" />
                        <span>{skill.projects} projects</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Skills Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A quick overview of my skill distribution and expertise levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Expert Level
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {Object.values(skillCategories).reduce((total, category) => 
                  total + category.skills.filter(skill => skill.level >= 90).length, 0
                )} skills
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Advanced Level
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {Object.values(skillCategories).reduce((total, category) => 
                  total + category.skills.filter(skill => skill.level >= 80 && skill.level < 90).length, 0
                )} skills
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Total Skills
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {Object.values(skillCategories).reduce((total, category) => 
                  total + category.skills.length, 0
                )} skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;