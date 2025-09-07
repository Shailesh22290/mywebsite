import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Calendar, Award, Download, ExternalLink } from 'lucide-react';
import PosterCard from './PosterCard';
import PosterModal from './PosterModal';

const Posters = () => {
  const [posters, setPosters] = useState([]);
  const [filteredPosters, setFilteredPosters] = useState([]);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all',
    'research',
    'conference',
    'workshop',
    'symposium',
    'competition',
    'academic'
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Title' },
    { value: 'category', label: 'Category' },
    { value: 'event', label: 'Event' }
  ];

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchPosters = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockPosters = [
          {
            id: 1,
            title: "Machine Learning Applications in Healthcare Analytics",
            event: "International Conference on AI in Medicine",
            category: "research",
            date: "2024-03-15",
            location: "San Francisco, CA",
            authors: ["Shailesh K.", "Jane Smith", "Dr. Robert Johnson"],
            abstract: "This poster presents novel applications of machine learning algorithms in healthcare analytics, focusing on predictive modeling for patient outcomes and diagnostic accuracy improvements.",
            awards: ["Best Poster Award", "People's Choice Award"],
            imageUrl: "/assets/images/posters/poster1.jpg",
            pdfUrl: "/assets/documents/posters/poster1.pdf",
            tags: ["machine learning", "healthcare", "predictive modeling", "AI"],
            views: 1250,
            downloads: 89
          },
          {
            id: 2,
            title: "Sustainable Energy Solutions for Smart Cities",
            event: "Green Technology Symposium",
            category: "conference",
            date: "2024-02-20",
            location: "Berlin, Germany",
            authors: ["Shailesh K.", "Dr. Maria García"],
            abstract: "Exploring innovative approaches to sustainable energy integration in smart city infrastructure, with case studies from European metropolitan areas.",
            awards: [],
            imageUrl: "/assets/images/posters/poster2.jpg",
            pdfUrl: "/assets/documents/posters/poster2.pdf",
            tags: ["sustainability", "smart cities", "renewable energy", "urban planning"],
            views: 980,
            downloads: 65
          },
          {
            id: 3,
            title: "Quantum Computing Applications in Cryptography",
            event: "Quantum Computing Workshop",
            category: "workshop",
            date: "2024-01-10",
            location: "Tokyo, Japan",
            authors: ["Shailesh K.", "Dr. Chen Wei", "Prof. Sarah Williams"],
            abstract: "Investigating the implications of quantum computing on modern cryptographic systems and proposing quantum-resistant algorithms.",
            awards: ["Innovation Award"],
            imageUrl: "/assets/images/posters/poster3.jpg",
            pdfUrl: "/assets/documents/posters/poster3.pdf",
            tags: ["quantum computing", "cryptography", "security", "algorithms"],
            views: 2100,
            downloads: 156
          },
          {
            id: 4,
            title: "Data Visualization Techniques for Big Data",
            event: "Data Science Competition",
            category: "competition",
            date: "2023-11-30",
            location: "New York, NY",
            authors: ["Shailesh K.", "Alex Thompson"],
            abstract: "Presenting innovative visualization techniques for handling and presenting large-scale datasets in an intuitive and actionable manner.",
            awards: ["First Place", "Technical Excellence Award"],
            imageUrl: "/assets/images/posters/poster4.jpg",
            pdfUrl: "/assets/documents/posters/poster4.pdf",
            tags: ["data visualization", "big data", "analytics", "user experience"],
            views: 1500,
            downloads: 120
          }
        ];
        
        setPosters(mockPosters);
        setFilteredPosters(mockPosters);
      } catch (error) {
        console.error('Error fetching posters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  // Filter and sort posters
  useEffect(() => {
    let filtered = [...posters];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(poster =>
        poster.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poster.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poster.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        poster.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(poster => poster.category === selectedCategory);
    }

    // Apply year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(poster => new Date(poster.date).getFullYear().toString() === selectedYear);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'event':
          return a.event.localeCompare(b.event);
        default:
          return 0;
      }
    });

    setFilteredPosters(filtered);
  }, [posters, searchTerm, selectedCategory, selectedYear, sortBy]);

  const getYears = () => {
    const years = [...new Set(posters.map(poster => new Date(poster.date).getFullYear()))];
    return years.sort((a, b) => b - a);
  };

  const handlePosterClick = (poster) => {
    setSelectedPoster(poster);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-blue-600 dark:text-blue-400" size={32} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Research Posters
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A collection of research posters presented at conferences, workshops, and symposiums
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posters, events, authors, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Grid size={18} />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <List size={18} />
                List
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Years</option>
              {getYears().map(year => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredPosters.length} of {posters.length} posters
          </p>
        </div>

        {/* Posters Grid/List */}
        {filteredPosters.length === 0 ? (
          <div className="text-center py-12">
            <Award className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posters found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }>
            {filteredPosters.map(poster => (
              <PosterCard
                key={poster.id}
                poster={poster}
                viewMode={viewMode}
                onClick={() => handlePosterClick(poster)}
              />
            ))}
          </div>
        )}

        {/* Pagination could be added here */}
      </div>

      {/* Poster Modal */}
      {selectedPoster && (
        <PosterModal
          poster={selectedPoster}
          onClose={() => setSelectedPoster(null)}
        />
      )}
    </div>
  );
};

export default Posters;