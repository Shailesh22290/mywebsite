import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, ExternalLink, BookOpen, FileText, Video, Code } from 'lucide-react';
import ResourceCard from './ResourceCard';
import ResourceFilter from './ResourceFilter';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with your actual data
  const mockResources = [
    {
      id: 1,
      title: "Machine Learning Fundamentals Guide",
      description: "Comprehensive guide covering basic to advanced ML concepts with practical examples.",
      category: "Machine Learning",
      type: "guide",
      format: "PDF",
      size: "2.3 MB",
      downloads: 1240,
      rating: 4.8,
      tags: ["ML", "Python", "Beginner"],
      downloadUrl: "#",
      previewUrl: "#",
      thumbnail: "/api/placeholder/300/200",
      publishedDate: "2024-01-15",
      lastUpdated: "2024-02-01"
    },
    {
      id: 2,
      title: "Deep Learning with PyTorch",
      description: "Complete course materials for deep learning implementation using PyTorch framework.",
      category: "Deep Learning",
      type: "course",
      format: "Video + Code",
      size: "450 MB",
      downloads: 890,
      rating: 4.9,
      tags: ["Deep Learning", "PyTorch", "Neural Networks"],
      downloadUrl: "#",
      previewUrl: "#",
      thumbnail: "/api/placeholder/300/200",
      publishedDate: "2024-01-20",
      lastUpdated: "2024-02-05"
    },
    {
      id: 3,
      title: "Data Visualization Toolkit",
      description: "Collection of Python scripts and templates for creating stunning data visualizations.",
      category: "Data Science",
      type: "toolkit",
      format: "Python Scripts",
      size: "15 MB",
      downloads: 2100,
      rating: 4.7,
      tags: ["Python", "Matplotlib", "Seaborn", "Plotly"],
      downloadUrl: "#",
      previewUrl: "#",
      thumbnail: "/api/placeholder/300/200",
      publishedDate: "2024-01-10",
      lastUpdated: "2024-01-30"
    },
    {
      id: 4,
      title: "Research Paper Template",
      description: "LaTeX template for academic papers with proper formatting and citation styles.",
      category: "Academic",
      type: "template",
      format: "LaTeX",
      size: "500 KB",
      downloads: 560,
      rating: 4.6,
      tags: ["LaTeX", "Academic", "Template"],
      downloadUrl: "#",
      previewUrl: "#",
      thumbnail: "/api/placeholder/300/200",
      publishedDate: "2024-01-05",
      lastUpdated: "2024-01-25"
    },
    {
      id: 5,
      title: "API Development Best Practices",
      description: "Comprehensive guide on building scalable and secure REST APIs with Node.js.",
      category: "Web Development",
      type: "guide",
      format: "PDF + Code",
      size: "5.2 MB",
      downloads: 1680,
      rating: 4.8,
      tags: ["Node.js", "API", "REST", "Best Practices"],
      downloadUrl: "#",
      previewUrl: "#",
      thumbnail: "/api/placeholder/300/200",
      publishedDate: "2024-01-12",
      lastUpdated: "2024-02-03"
    },
    {
      id: 6,
      title: "Docker Deployment Scripts",
      description: "Ready-to-use Docker configurations for various development environments.",
      category: "DevOps",
      type: "toolkit",
      format: "Docker Files",
      size: "8 MB",
      downloads: 920,
      rating: 4.5,
      tags: ["Docker", "DevOps", "Deployment"],
      downloadUrl: "#",
      previewUrl: "#",
      thumbnail: "/api/placeholder/300/200",
      publishedDate: "2024-01-18",
      lastUpdated: "2024-02-07"
    }
  ];

  const categories = [
    'all', 'Machine Learning', 'Deep Learning', 'Data Science', 
    'Web Development', 'DevOps', 'Academic'
  ];

  const types = [
    'all', 'guide', 'course', 'toolkit', 'template'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResources(mockResources);
      setFilteredResources(mockResources);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterResources();
  }, [searchTerm, selectedCategory, selectedType, resources]);

  const filterResources = () => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  };

  const handleDownload = (resource) => {
    // Implement download logic
    console.log('Downloading:', resource.title);
    // Track download
    setResources(prevResources =>
      prevResources.map(r =>
        r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r
      )
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'course': return <Video className="w-4 h-4" />;
      case 'toolkit': return <Code className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const stats = {
    totalResources: resources.length,
    totalDownloads: resources.reduce((sum, resource) => sum + resource.downloads, 0),
    averageRating: resources.length > 0 ? 
      (resources.reduce((sum, resource) => sum + resource.rating, 0) / resources.length).toFixed(1) : 0
  };

  return (
    <section id="resources" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Free Resources
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Download guides, templates, toolkits, and course materials to accelerate your learning journey
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.totalResources}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Resources</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {stats.totalDownloads.toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Downloads</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              {stats.averageRating}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <ResourceFilter
              categories={categories}
              types={types}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              onCategoryChange={setSelectedCategory}
              onTypeChange={setSelectedType}
            />
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onDownload={handleDownload}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl">No resources found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Get Notified of New Resources</h3>
          <p className="text-blue-100 mb-6">
            Subscribe to receive updates when new resources are added
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;