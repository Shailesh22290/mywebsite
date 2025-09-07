// src/components/sections/Blog/Blog.jsx
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Tag, TrendingUp, BookOpen, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Load blog posts from JSON file
  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Loading posts from src/components/sections/Blog/posts.json...');
        const response = await fetch('src/components/sections/Blog/posts.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Successfully loaded posts:', data);
        
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          setFilteredPosts(data.posts);
        } else {
          throw new Error('Invalid JSON structure - expected posts array');
        }
        
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setError(error.message);
        
        // Fallback to sample data
        const fallbackPosts = [
          {
            id: 1,
            slug: 'sample-post',
            title: 'Sample Blog Post',
            excerpt: 'This is a sample blog post. Please add your posts.json file to the public folder.',
            content: 'Sample content',
            publishDate: new Date().toISOString(),
            categories: ['General'],
            tags: ['Sample'],
            views: 0,
            featured: false,
            author: 'System',
            readTime: '1 min read'
          }
        ];
        
        setPosts(fallbackPosts);
        setFilteredPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Handle post click navigation
  const handlePostClick = (post) => {
    // Navigate to individual post page
    navigate(`/blog/${post.slug}`, { state: { post } });
  };

  // Get unique categories
  const categories = ['all', ...new Set(posts.flatMap(post => post.categories || []))];

  // Filter and sort posts
  useEffect(() => {
    let filtered = posts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (post.content?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (Array.isArray(post.tags) && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) || false)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => Array.isArray(post.categories) && post.categories.includes(selectedCategory));
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.publishDate || 0) - new Date(a.publishDate || 0);
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 5);
  const popularTags = [...new Set(posts.flatMap(post => post.tags || []))].slice(0, 15);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Research Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Loading blog posts...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Research Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights, discoveries, and thoughts from my research journey. 
            Exploring the intersection of technology, science, and innovation.
          </p>
          {error && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Could not load posts from JSON file: {error}
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                Make sure to place your posts.json file in the public folder.
              </p>
            </div>
          )}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  featured={true} 
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  All Posts ({filteredPosts.length})
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>

              <BlogSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showFilters={showFilters}
              />
            </div>

            {/* Blog Posts Grid */}
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {posts.length === 0 
                    ? "No blog posts available. Add your posts.json file to the public folder."
                    : "Try adjusting your search terms or filters."
                  }
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Recent Posts */}
              {recentPosts.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <div key={post.id} className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 
                            className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2"
                            onClick={() => handlePostClick(post)}
                          >
                            {post.title || 'Untitled'}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(post.publishDate || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Tags */}
              {popularTags.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-blue-600" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {categories.length > 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.filter(cat => cat !== 'all').map((category, index) => {
                      const count = posts.filter(post => Array.isArray(post.categories) && post.categories.includes(category)).length;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span>{category}</span>
                          <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;