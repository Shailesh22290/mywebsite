import React, { useState, useEffect } from 'react';
import { 
  Code, 
  BookOpen, 
  Users, 
  Award, 
  Coffee, 
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react';

const QuickStats = () => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    publications: 0,
    students: 0,
    experience: 0
  });

  const finalStats = {
    projects: 50,
    publications: 25,
    students: 200,
    experience: 8
  };

  const stats = [
    {
      icon: Code,
      label: 'Projects Completed',
      value: animatedStats.projects,
      suffix: '+',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: BookOpen,
      label: 'Publications',
      value: animatedStats.publications,
      suffix: '+',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Users,
      label: 'Students Mentored',
      value: animatedStats.students,
      suffix: '+',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: Award,
      label: 'Years Experience',
      value: animatedStats.experience,
      suffix: '+',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timers = Object.keys(finalStats).map(key => {
      const increment = finalStats[key] / steps;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= finalStats[key]) {
          current = finalStats[key];
        }
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, interval);
    });

    // Cleanup intervals after animation completes
    const cleanup = setTimeout(() => {
      timers.forEach(timer => clearInterval(timer));
    }, duration + 100);

    return () => {
      timers.forEach(timer => clearInterval(timer));
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Stats
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A snapshot of my professional journey and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 dark:to-gray-800/50 rounded-xl"></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-4 relative z-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>

              {/* Stats */}
              <div className="relative z-10">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Additional Quick Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Always Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Constantly updating skills and exploring new technologies
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Growth Mindset
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Focused on continuous improvement and innovation
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Available for Work
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Open to new opportunities and collaborations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;