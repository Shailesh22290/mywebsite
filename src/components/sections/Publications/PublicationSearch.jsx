// src/components/sections/Publications/PublicationSearch.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  Calendar,
  BookOpen,
  Users,
  SortAsc,
  SortDesc,
  Grid,
  List,
} from 'lucide-react';

// Update prop names to match what Publications.jsx passes
const PublicationSearch = ({
  searchTerm,
  onSearchChange,
  selectedYear,
  onYearChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  years,
  types,
  viewMode, // Add viewMode if needed for parent communication
  onSort, // Add onSort for viewMode updates
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Remove local state that duplicates parent state
  // const [searchTerm, setSearchTerm] = useState('');
  // const [selectedType, setSelectedType] = useState('all');
  // const [selectedStatus, setSelectedStatus] = useState('all');
  // const [selectedYear, setSelectedYear] = useState('all');
  // const [sortBy, setSortBy] = useState('year');
  // const [sortOrder, setSortOrder] = useState('desc');
  // const [viewMode, setViewMode] = useState('grid');

  // Remove publications prop and related logic since filtering is handled in Publications.jsx
  // const types = [...new Set(publications.map(pub => pub.type))];
  // const statuses = [...new Set(publications.map(pub => pub.status).filter(Boolean))];
  // const years = [...new Set(publications.map(pub => pub.year))].sort((a, b) => b - a);

  // Remove handleFilter since filtering is handled in parent
  /*
  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedType, selectedStatus, selectedYear, sortBy, sortOrder]);
  */

  const handleSort = (field) => {
    onSortChange(field); // Use parent's sort change handler
  };

  const clearFilters = () => {
    onSearchChange('');
    onTypeChange('all');
    // Remove status since it's not used in Publications.jsx
    onYearChange('all');
    onSortChange('date'); // Match Publications.jsx sortBy
  };

  const activeFiltersCount = [
    selectedType !== 'all',
    // selectedStatus !== 'all', // Remove since status is not used
    selectedYear !== 'all',
    searchTerm !== '',
  ].filter(Boolean).length;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search publications by title, author, venue, or keywords..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Filter Toggle and View Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 
                     text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 
                     dark:hover:bg-gray-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 
                       hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSort({ sortBy, viewMode: 'grid' })}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSort({ sortBy, viewMode: 'list' })}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 
                   bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 
                   dark:border-gray-600"
        >
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Publication Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="citations">Citations</option>
              <option value="impact">Impact Factor</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Quick Sort Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSort('date')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            sortBy === 'date'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Date</span>
        </button>

        <button
          onClick={() => handleSort('title')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            sortBy === 'title'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Title</span>
        </button>

        <button
          onClick={() => handleSort('citations')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            sortBy === 'citations'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Citations</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {types.length} publication type{types.length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
};

export default PublicationSearch;