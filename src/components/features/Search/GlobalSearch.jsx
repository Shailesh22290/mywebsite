import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Code, User, Calendar, Book, MessageCircle } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

// Mock data imports - replace with your actual data
import { projects } from '../../data/projects';
import { publications } from '../../data/publications';
import { experience } from '../../data/experience';
import { talks } from '../../data/talks';
import { blogPosts } from '../../data/blog';

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  // Search across all content types
  const searchContent = (searchQuery) => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const allResults = [];

    // Search projects
    projects.forEach(project => {
      if (project.title.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.technologies.some(tech => tech.toLowerCase().includes(query))) {
        allResults.push({
          id: project.id,
          title: project.title,
          description: project.description,
          type: 'project',
          icon: Code,
          url: `/projects#${project.id}`
        });
      }
    });

    // Search publications
    publications.forEach(pub => {
      if (pub.title.toLowerCase().includes(query) || 
          pub.abstract.toLowerCase().includes(query) ||
          pub.keywords.some(keyword => keyword.toLowerCase().includes(query))) {
        allResults.push({
          id: pub.id,
          title: pub.title,
          description: pub.abstract.substring(0, 100) + '...',
          type: 'publication',
          icon: FileText,
          url: `/publications#${pub.id}`
        });
      }
    });

    // Search experience
    experience.forEach(exp => {
      if (exp.company.toLowerCase().includes(query) || 
          exp.position.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query)) {
        allResults.push({
          id: exp.id,
          title: `${exp.position} at ${exp.company}`,
          description: exp.description.substring(0, 100) + '...',
          type: 'experience',
          icon: User,
          url: `/experience#${exp.id}`
        });
      }
    });

    // Search talks
    talks.forEach(talk => {
      if (talk.title.toLowerCase().includes(query) || 
          talk.event.toLowerCase().includes(query) ||
          talk.description.toLowerCase().includes(query)) {
        allResults.push({
          id: talk.id,
          title: talk.title,
          description: `${talk.event} - ${talk.date}`,
          type: 'talk',
          icon: Calendar,
          url: `/talks#${talk.id}`
        });
      }
    });

    // Search blog posts
    blogPosts.forEach(post => {
      if (post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))) {
        allResults.push({
          id: post.id,
          title: post.title,
          description: post.excerpt,
          type: 'blog',
          icon: Book,
          url: `/blog/${post.slug}`
        });
      }
    });

    return allResults.slice(0, 10); // Limit results
  };

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      const searchResults = searchContent(debouncedQuery);
      setResults(searchResults);
      setLoading(false);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }

      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
        }
        
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        }
        
        if (e.key === 'Enter' && selectedIndex >= 0) {
          e.preventDefault();
          handleResultClick(results[selectedIndex]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleResultClick = (result) => {
    window.location.href = result.url;
    setIsOpen(false);
    setQuery('');
  };

  const getTypeColor = (type) => {
    const colors = {
      project: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      publication: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      experience: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      talk: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      blog: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 
                   bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                   transition-colors duration-200"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <span className="hidden sm:inline text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
          ⌘K
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Search Modal */}
      <div 
        ref={searchRef}
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl 
                   border border-gray-200 dark:border-gray-700 max-h-96 overflow-hidden"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, publications, talks, blog posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-gray-900 dark:text-gray-100"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 
                               dark:hover:bg-gray-800 transition-colors duration-150 ${
                                 selectedIndex === index ? 'bg-gray-50 dark:bg-gray-800' : ''
                               }`}
                  >
                    <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {result.title}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {!query && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Start typing to search across all content</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Search across projects, publications, talks, and blog posts</span>
            <div className="flex gap-2">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;