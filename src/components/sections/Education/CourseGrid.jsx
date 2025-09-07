// src/components/sections/Education/CourseGrid.jsx
import React, { useState } from 'react';
import { BookOpen, Award, Calendar, Users, Clock, ExternalLink } from 'lucide-react';

// Real course data from Transcript + Extra courses provided
const coursesData = [
  // Data Science Core + Electives
  {
    id: 1,
    title: "Machine Learning",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Core course covering supervised, unsupervised, and reinforcement learning algorithms.",
    skills: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Python"]
  },
  {
    id: 2,
    title: "Deep Learning",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Neural networks, CNNs, RNNs, transformers, and generative models.",
    skills: ["Neural Networks", "CNN", "RNN", "Transformers"]
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "AI foundations including search algorithms, knowledge representation, and planning.",
    skills: ["Search Algorithms", "Knowledge Representation", "AI Planning"]
  },
  {
    id: 4,
    title: "Data Science in Practice",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Hands-on data science workflows, preprocessing, visualization, and pipelines.",
    skills: ["Data Wrangling", "Visualization", "Pandas", "NumPy"]
  },
  {
    id: 5,
    title: "Computer Vision",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2024",
    instructor: "Dept. of Data Science & Engineering",
    description: "Introduction to classical and deep learning-based computer vision.",
    skills: ["Image Processing", "Object Detection", "CNN"]
  },
  {
    id: 6,
    title: "Fundamentals of Database Systems",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2024",
    instructor: "Dept. of Data Science & Engineering",
    description: "Database design, normalization, SQL queries, and transaction management.",
    skills: ["SQL", "Database Design", "Transactions"]
  },
  {
    id: 7,
    title: "Data Structures and Algorithms",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2024",
    instructor: "Dept. of Data Science & Engineering",
    description: "Data structures, algorithm design, time/space complexity analysis.",
    skills: ["Algorithms", "Data Structures", "Complexity Analysis"]
  },
  {
    id: 8,
    title: "Algorithms",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Algorithm design and analysis with applications in optimization and ML.",
    skills: ["Algorithms", "Complexity Analysis", "Optimization"]
  },
  // Electives merged into data-science
  {
    id: 9,
    title: "3D Deep Learning and Applications",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Deep learning techniques for 3D data including point clouds, meshes, and volumetric models.",
    skills: ["3D CNN", "Point Clouds", "3D Vision"]
  },
  {
    id: 10,
    title: "Advanced Natural Language Processing",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Transformer-based NLP, BERT, GPT, and multilingual applications.",
    skills: ["Transformers", "BERT", "GPT", "Attention Models"]
  },
  {
    id: 11,
    title: "Machine Learning with Graphs",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Graph neural networks, embeddings, and applications to structured data.",
    skills: ["Graph Neural Networks", "Embeddings", "Graph ML"]
  },

  // Mathematics
  {
    id: 12,
    title: "Calculus of One Variable",
    institution: "IISER Bhopal",
    category: "mathematics",
    completedDate: "2023",
    instructor: "Dept. of Mathematics",
    description: "Foundational calculus course covering limits, derivatives, and integrals.",
    skills: ["Calculus", "Differentiation", "Integration"]
  },
  {
    id: 13,
    title: "Linear Algebra",
    institution: "IISER Bhopal",
    category: "mathematics",
    completedDate: "2023",
    instructor: "Dept. of Mathematics",
    description: "Vectors, matrices, eigenvalues, and linear transformations.",
    skills: ["Matrices", "Eigenvalues", "Vector Spaces"]
  },
  {
    id: 14,
    title: "Multivariable Calculus",
    institution: "IISER Bhopal",
    category: "mathematics",
    completedDate: "2024",
    instructor: "Dept. of Mathematics",
    description: "Functions of several variables, gradients, divergence, curl, and integration.",
    skills: ["Partial Derivatives", "Vector Calculus", "Integrals"]
  },
  {
    id: 15,
    title: "Probability and Statistics",
    institution: "IISER Bhopal",
    category: "mathematics",
    completedDate: "2024",
    instructor: "Dept. of Mathematics",
    description: "Probability theory, statistical inference, regression, and hypothesis testing.",
    skills: ["Probability", "Statistics", "Regression"]
  },
  {
    id: 16,
    title: "Discrete Mathematics",
    institution: "IISER Bhopal",
    category: "mathematics",
    completedDate: "2024",
    instructor: "Dept. of Mathematics",
    description: "Logic, sets, combinatorics, and graph theory.",
    skills: ["Logic", "Graph Theory", "Combinatorics"]
  },
  {
    id: 17,
    title: "Signals and Systems",
    institution: "IISER Bhopal",
    category: "physics",
    completedDate: "2024",
    instructor: "Dept. of Data Science & Engineering",
    description: "Signal representation, Fourier transforms, and system modeling.",
    skills: ["Signals", "Fourier Transform", "Systems Theory"]
  },
  {
    id: 18,
    title: "Applied Optimization",
    institution: "IISER Bhopal",
    category: "data-science",
    completedDate: "2025",
    instructor: "Dept. of Data Science & Engineering",
    description: "Optimization techniques including linear, nonlinear, and metaheuristic methods.",
    skills: ["Linear Programming", "Nonlinear Optimization", "Metaheuristics"]
  },

  // Humanities (5 courses, new category)
  {
    id: 19,
    title: "Reading Children’s Literature: Adventures, Ghosts and the Cultural Imagination",
    institution: "IISER Bhopal",
    category: "humanities",
    completedDate: "2024",
    instructor: "HSS Faculty",
    description: "Analysis of children's literature across genres and cultural contexts.",
    skills: ["Literary Analysis", "Cultural Studies"]
  },
  {
    id: 20,
    title: "Cities: Memories, Perceptions and Stories",
    institution: "IISER Bhopal",
    category: "humanities",
    completedDate: "2025",
    instructor: "HSS Faculty",
    description: "Urban literature and cultural narratives in historical and modern contexts.",
    skills: ["Urban Studies", "Narrative Analysis"]
  },
  {
    id: 21,
    title: "Reading English Literature: Texts and Contexts",
    institution: "IISER Bhopal",
    category: "humanities",
    completedDate: "2025",
    instructor: "HSS Faculty",
    description: "Close reading and analysis of English literary texts across historical contexts.",
    skills: ["Literary Analysis", "Critical Thinking"]
  },
  {
    id: 22,
    title: "Greek Tragedy",
    institution: "IISER Bhopal",
    category: "humanities",
    completedDate: "2025",
    instructor: "HSS Faculty",
    description: "Study of classical Greek tragedies and their socio-political significance.",
    skills: ["Greek Literature", "Cultural Studies"]
  },
  {
    id: 23,
    title: "Research Methodology for Social Science",
    institution: "IISER Bhopal",
    category: "humanities",
    completedDate: "2025",
    instructor: "HSS Faculty",
    description: "Research design, methodology, and ethics for social sciences.",
    skills: ["Research Design", "Qualitative Research", "Quantitative Research"]
  },

  // Chemical Engineering (>=5 courses, new category)
  {
    id: 24,
    title: "Engineering Design and Drawing",
    institution: "IISER Bhopal",
    category: "chemical-engineering",
    completedDate: "2023",
    instructor: "CHE Dept.",
    description: "Basics of engineering drawing and design.",
    skills: ["Engineering Drawing", "Design"]
  },
  {
    id: 25,
    title: "Engineering Mechanics (Solid and Fluid)",
    institution: "IISER Bhopal",
    category: "chemical-engineering",
    completedDate: "2023",
    instructor: "CHE Dept.",
    description: "Mechanics of solids and fluids applied to chemical processes.",
    skills: ["Solid Mechanics", "Fluid Mechanics"]
  },
  {
    id: 26,
    title: "Chemical Engineering Thermodynamics",
    institution: "IISER Bhopal",
    category: "chemical-engineering",
    completedDate: "2023",
    instructor: "CHE Dept.",
    description: "Thermodynamic principles applied to chemical systems.",
    skills: ["Thermodynamics", "Phase Equilibria"]
  },
  {
    id: 27,
    title: "Chemical Process Calculations",
    institution: "IISER Bhopal",
    category: "chemical-engineering",
    completedDate: "2024",
    instructor: "CHE Dept.",
    description: "Material and energy balances in chemical engineering.",
    skills: ["Mass Balance", "Energy Balance"]
  },
  {
    id: 28,
    title: "Introduction to Chemical Engineering Laboratory",
    institution: "IISER Bhopal",
    category: "chemical-engineering",
    completedDate: "2024",
    instructor: "CHE Dept.",
    description: "Basic chemical engineering laboratory experiments.",
    skills: ["Lab Techniques", "Process Analysis"]
  },
  {
    id: 29,
    title: "Chemical Process Technology",
    institution: "IISER Bhopal",
    category: "chemical-engineering",
    completedDate: "2024",
    instructor: "CHE Dept.",
    description: "Principles and applications of process technology.",
    skills: ["Process Engineering", "Industrial Chemistry"]
  },

  // Others (Physics, Chemistry, Biology, Environment, Law, PT, Economics)
  {
    id: 30,
    title: "Mechanics",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Physics",
    description: "Classical mechanics including motion, forces, and energy.",
    skills: ["Newtonian Mechanics", "Dynamics"]
  },
  {
    id: 31,
    title: "General Physics Laboratory I",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Physics",
    description: "Basic physics laboratory experiments.",
    skills: ["Experimental Physics", "Lab Skills"]
  },
  {
    id: 32,
    title: "Quantum Physics",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Physics",
    description: "Introduction to quantum mechanics and applications.",
    skills: ["Quantum Mechanics", "Wave Functions"]
  },
  {
    id: 33,
    title: "Physics Through Computational Thinking",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2024",
    instructor: "Dept. of Physics",
    description: "Physics concepts taught through computation and simulation.",
    skills: ["Simulation", "Computational Physics"]
  },
  {
    id: 34,
    title: "Biology I: Biomolecules",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Biology",
    description: "Introduction to biomolecules and structures.",
    skills: ["Biomolecules", "Molecular Biology"]
  },
  {
    id: 35,
    title: "General Biology Laboratory",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Biology",
    description: "Fundamental biology experiments.",
    skills: ["Microscopy", "Lab Techniques"]
  },
  {
    id: 36,
    title: "Biology II: Fundamentals of Cell Biology",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Biology",
    description: "Cell structures, functions, and processes.",
    skills: ["Cell Biology", "Genetics"]
  },
  {
    id: 37,
    title: "General Chemistry",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Chemistry",
    description: "Introductory general chemistry concepts.",
    skills: ["Chemistry", "Molecular Structure"]
  },
  {
    id: 38,
    title: "Basic Organic Chemistry I",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Chemistry",
    description: "Fundamentals of organic chemistry.",
    skills: ["Organic Chemistry", "Reactions"]
  },
  {
    id: 39,
    title: "Chemistry Laboratory I",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Chemistry",
    description: "Introductory chemistry experiments.",
    skills: ["Lab Work", "Experimental Chemistry"]
  },
  {
    id: 40,
    title: "Earth Materials and Processes",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Earth Sciences",
    description: "Earth systems, minerals, and rock processes.",
    skills: ["Geology", "Earth Science"]
  },
  {
    id: 41,
    title: "Introduction to Environmental Sciences",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Earth Sciences",
    description: "Fundamentals of environmental science and sustainability.",
    skills: ["Sustainability", "Environment"]
  },
  {
    id: 42,
    title: "Econometrics I",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "Dept. of Economics",
    description: "Econometrics fundamentals and applications.",
    skills: ["Econometrics", "Statistical Analysis"]
  },
  {
    id: 43,
    title: "Law Relating to Intellectual Property and Patents",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2025",
    instructor: "Law Faculty",
    description: "Intellectual property rights and patents law.",
    skills: ["IP Law", "Patent Systems"]
  },
  {
    id: 44,
    title: "Physical Training",
    institution: "IISER Bhopal",
    category: "others",
    completedDate: "2023",
    instructor: "PT Instructor",
    description: "Physical training sessions for health and fitness.",
    skills: ["Fitness", "Discipline"]
  }
];

const CourseGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['all', 'data-science', 'mathematics', 'humanities', 'chemical-engineering', 'others'];


  const filteredCourses = (Array.isArray(coursesData) ? coursesData : [])
    .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.completedDate || 0) - new Date(a.completedDate || 0);
      }
      return (a.title || '').localeCompare(b.title || '');
    });

  const getCategoryColor = (category) => {
    const colors = {
      'data-science': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'mathematics': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'humanities': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
          <option value="title">Alphabetical</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <div
            key={course.id || index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title || 'Untitled Course'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {course.institution || 'Unknown Institution'}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                    {(course.category || 'Uncategorized').replace('-', ' ')}
                  </span>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Course Details */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {course.completedDate || 'Unknown Date'}
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

                {Array.isArray(course.skills) && course.skills.length > 0 && (
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
