// src/components/sections/Publications/Publications.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PublicationCard from './PublicationCard';
import PublicationSearch from './PublicationSearch';
import { publications } from '../../../data/publications';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';

const Publications = () => {
  const [filteredPublications, setFilteredPublications] = useState(publications);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid'); // Add viewMode state

  // Get unique years and types
  const years = ['all', ...new Set(publications.map(pub => pub.year))].sort((a, b) => {
    if (a === 'all') return -1;
    if (b === 'all') return 1;
    return b - a;
  });

  const types = ['all', ...new Set(publications.map(pub => pub.type))];

  // Filter and sort publications
  useEffect(() => {
    let filtered = publications;

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(pub => pub.year === selectedYear);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(pub => pub.type === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pub.keywords && pub.keywords.some(keyword =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Sort publications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'citations':
          return (b.citations || 0) - (a.citations || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'impact':
          return (b.impactFactor || 0) - (a.impactFactor || 0);
        default:
          return 0;
      }
    });

    setFilteredPublications(filtered);
  }, [selectedYear, selectedType, searchTerm, sortBy]);

  // Handle sort and view mode changes
  const handleSortChange = (field) => {
    setSortBy(field);
  };

  const handleSort = ({ sortBy, viewMode }) => {
    setSortBy(sortBy);
    setViewMode(viewMode); // Update viewMode
  };

  // Calculate stats
  const stats = {
    total: publications.length,
    journals: publications.filter(pub => pub.type === 'journal').length,
    conferences: publications.filter(pub => pub.type === 'conference').length,
    totalCitations: publications.reduce((sum, pub) => sum + (pub.citations || 0), 0),
    hIndex: calculateHIndex(publications),
    recentPublications: publications.filter(pub => pub.year >= new Date().getFullYear() - 2).length
  };

  function calculateHIndex(pubs) {
    const citations = pubs.map(pub => pub.citations || 0).sort((a, b) => b - a);
    let h = 0;
    for (let i = 0; i < citations.length; i++) {
      if (citations[i] >= i + 1) {
        h = i + 1;
      } else {
        break;
      }
    }
    return h;
  }

  return (
    <section id="publications" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Publications & Research
            </h2>
            {/* <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive collection of my research publications, papers, and 
              contributions to the academic community.
            </p> */}
          </motion.div>

          {/* Publication Stats */}
          {/* <motion.div variants={fadeInUp} className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Publications
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {stats.journals}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Journal Papers
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {stats.conferences}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Conference Papers
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {stats.totalCitations}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Citations
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                  {stats.hIndex}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  H-Index
                </div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  {stats.recentPublications}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Recent (2+ years)
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Search and Filters */}
          <motion.div variants={fadeInUp} className="mb-8">
            <PublicationSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              years={years}
              types={types}
              viewMode={viewMode}
              onSort={handleSort} // Pass handleSort for viewMode updates
            />
          </motion.div>

          {/* Publications List */}
          <motion.div variants={fadeInUp}>
            {filteredPublications.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredPublications.map((publication, index) => (
                  <motion.div
                    key={publication.id}
                    variants={fadeInUp}
                    custom={index}
                    className="transform hover:scale-[1.02] transition-transform duration-200"
                  >
                    <PublicationCard publication={publication} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No publications found matching your criteria.
                </p>
              </div>
            )}
          </motion.div>

          {/* Research Interests */}
          <motion.div variants={fadeInUp} className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Research Interests
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Machine Learning',
                'Deep Learning',
                'Natural Language Processing',
                'Computer Vision',
                'Data Science',
                'Artificial Intelligence',
                'Neural Networks',
                'Reinforcement Learning',
                'Statistical Modeling',
                'Pattern Recognition'
              ].map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                           rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 
                           transition-colors cursor-pointer"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;