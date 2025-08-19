import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Plus, Search, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import DiscussionCard from './DiscussionCard';
import NewDiscussion from './NewDiscussion';

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with your actual data
  const mockDiscussions = [
    {
      id: 1,
      title: "Best practices for implementing machine learning in production",
      content: "I'm working on deploying my first ML model to production and would love to hear about your experiences with MLOps, monitoring, and scaling challenges.",
      author: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/40/40",
        role: "ML Engineer"
      },
      category: "Machine Learning",
      tags: ["MLOps", "Production", "Deployment", "Monitoring"],
      replies: 12,
      likes: 28,
      views: 145,
      createdAt: "2024-02-15T10:30:00Z",
      lastActivity: "2024-02-16T09:15:00Z",
      isResolved: false,
      isPinned: false
    },
    {
      id: 2,
      title: "React performance optimization techniques",
      content: "What are the most effective techniques for optimizing React applications? I'm particularly interested in large-scale applications with complex state management.",
      author: {
        name: "Michael Rodriguez",
        avatar: "/api/placeholder/40/40",
        role: "Frontend Developer"
      },
      category: "Web Development",
      tags: ["React", "Performance", "Optimization", "State Management"],
      replies: 8,
      likes: 35,
      views: 89,
      createdAt: "2024-02-14T16:45:00Z",
      lastActivity: "2024-02-15T14:20:00Z",
      isResolved: true,
      isPinned: true
    },
    {
      id: 3,
      title: "Career transition from software development to data science",
      content: "I'm a software engineer with 5 years of experience looking to transition into data science. What skills should I focus on and what's the best learning path?",
      author: {
        name: "Alex Thompson",
        avatar: "/api/placeholder/40/40",
        role: "Software Engineer"
      },
      category: "Career",
      tags: ["Career Change", "Data Science", "Learning Path", "Skills"],
      replies: 15,
      likes: 42,
      views: 203,
      createdAt: "2024-02-13T11:20:00Z",
      lastActivity: "2024-02-16T08:45:00Z",
      isResolved: false,
      isPinned: false
    },
    {
      id: 4,
      title: "Docker vs Kubernetes: When to use what?",
      content: "I'm confused about when to use Docker alone vs when to introduce Kubernetes. Can someone explain the decision factors and use cases?",
      author: {
        name: "Emily Davis",
        avatar: "/api/placeholder/40/40",
        role: "DevOps Engineer"
      },
      category: "DevOps",
      tags: ["Docker", "Kubernetes", "Containerization", "Infrastructure"],
      replies: 6,
      likes: 19,
      views: 67,
      createdAt: "2024-02-12T14:15:00Z",
      lastActivity: "2024-02-14T16:30:00Z",
      isResolved: false,
      isPinned: false
    },
    {
      id: 5,
      title: "Research methodology for AI ethics studies",
      content: "I'm starting research on AI ethics and looking for guidance on appropriate methodologies. What approaches have worked well for interdisciplinary research?",
      author: {
        name: "Dr. James Wilson",
        avatar: "/api/placeholder/40/40",
        role: "Research Scientist"
      },
      category: "Research",
      tags: ["AI Ethics", "Research Methods", "Interdisciplinary", "Academia"],
      replies: 4,
      likes: 22,
      views: 78,
      createdAt: "2024-02-11T09:30:00Z",
      lastActivity: "2024-02-13T12:15:00Z",
      isResolved: false,
      isPinned: false
    },
    {
      id: 6,
      title: "Open source contribution guidelines",
      content: "What are the best practices for contributing to open source projects? I'm particularly interested in Python and JavaScript ecosystems.",
      author: {
        name: "Lisa Park",
        avatar: "/api/placeholder/40/40",
        role: "Developer"
      },
      category: "Open Source",
      tags: ["Open Source", "Contributing", "Python", "JavaScript"],
      replies: 9,
      likes: 31,
      views: 112,
      createdAt: "2024-02-10T13:45:00Z",
      lastActivity: "2024-02-15T10:20:00Z",
      isResolved: false,
      isPinned: false
    }
  ];

  const categories = [
    'all', 'Machine Learning', 'Web Development', 'DevOps', 
    'Research', 'Career', 'Open Source'
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'replies', label: 'Most Replies' },
    { value: 'views', label: 'Most Views' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDiscussions(mockDiscussions);
      setFilteredDiscussions(mockDiscussions);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortDiscussions();
  }, [searchTerm, selectedCategory, sortBy, discussions]);

  const filterAndSortDiscussions = () => {
    let filtered = discussions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(discussion =>
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(discussion => discussion.category === selectedCategory);
    }

    // Sort discussions
    filtered.sort((a, b) => {
      // Pinned discussions always come first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'replies':
          return b.replies - a.replies;
        case 'views':
          return b.views - a.views;
        case 'recent':
        default:
          return new Date(b.lastActivity) - new Date(a.lastActivity);
      }
    });

    setFilteredDiscussions(filtered);
  };

  const handleNewDiscussion = (newDiscussion) => {
    const discussion = {
      id: Date.now(),
      ...newDiscussion,
      author: {
        name: "You",
        avatar: "/api/placeholder/40/40",
        role: "User"
      },
      replies: 0,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      isResolved: false,
      isPinned: false
    };
    
    setDiscussions(prev => [discussion, ...prev]);
    setShowNewDiscussion(false);
  };

  const handleLike = (discussionId) => {
    setDiscussions(prev =>
      prev.map(discussion =>
        discussion.id === discussionId
          ? { ...discussion, likes: discussion.likes + 1 }
          : discussion
      )
    );
  };

  const stats = {
    totalDiscussions: discussions.length,
    totalReplies: discussions.reduce((sum, discussion) => sum + discussion.replies, 0),
    activeUsers: new Set(discussions.map(d => d.author.name)).size
  };

  return (
    <section id="discussions" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community Discussions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join the conversation, ask questions, and share your knowledge with the community
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.totalDiscussions}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Discussions</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {stats.totalReplies}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Replies</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {stats.activeUsers}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Active Users</div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* New Discussion Button */}
            <button
              onClick={() => setShowNewDiscussion(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Discussion
            </button>
          </div>
        </motion.div>

        {/* Discussions List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDiscussions.length > 0 ? (
            <div className="space-y-6">
              {filteredDiscussions.map((discussion, index) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  onLike={handleLike}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl">No discussions found</p>
                <p className="text-sm">Try adjusting your search or create a new discussion</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* New Discussion Modal */}
        {showNewDiscussion && (
          <NewDiscussion
            onSubmit={handleNewDiscussion}
            onClose={() => setShowNewDiscussion(false)}
            categories={categories.filter(cat => cat !== 'all')}
          />
        )}
      </div>
    </section>
  );
};

export default Discussions;