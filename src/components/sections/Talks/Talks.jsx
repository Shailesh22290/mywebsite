import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ExternalLink, Filter, Search } from 'lucide-react';
import TalkCard from './TalkCard';
import TalkCalendar from './TalkCalendar';
import { talks } from '../../data/talks';

const Talks = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or calendar
  const [filteredTalks, setFilteredTalks] = useState(talks);

  const filters = [
    { id: 'all', label: 'All Talks', count: talks.length },
    { id: 'conference', label: 'Conference', count: talks.filter(t => t.type === 'conference').length },
    { id: 'workshop', label: 'Workshop', count: talks.filter(t => t.type === 'workshop').length },
    { id: 'webinar', label: 'Webinar', count: talks.filter(t => t.type === 'webinar').length },
    { id: 'keynote', label: 'Keynote', count: talks.filter(t => t.type === 'keynote').length },
    { id: 'upcoming', label: 'Upcoming', count: talks.filter(t => new Date(t.date) > new Date()).length }
  ];

  useEffect(() => {
    let filtered = talks;

    // Apply type filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'upcoming') {
        filtered = filtered.filter(talk => new Date(talk.date) > new Date());
      } else {
        filtered = filtered.filter(talk => talk.type === selectedFilter);
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(talk =>
        talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTalks(filtered);
  }, [selectedFilter, searchTerm]);

  const upcomingTalks = talks.filter(talk => new Date(talk.date) > new Date());
  const pastTalks = talks.filter(talk => new Date(talk.date) <= new Date());

  return (
    <section id="talks" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Talks & Presentations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sharing knowledge and insights through conferences, workshops, and speaking engagements
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Talks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{talks.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingTalks.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Countries</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(talks.map(t => t.country)).size}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {talks.reduce((sum, talk) => sum + talk.duration, 0)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search talks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Calendar
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {viewMode === 'calendar' ? (
          <TalkCalendar talks={filteredTalks} />
        ) : (
          <>
            {/* Upcoming Talks */}
            {upcomingTalks.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Upcoming Talks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingTalks.map((talk) => (
                    <TalkCard key={talk.id} talk={talk} isUpcoming={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Talks */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Past Talks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTalks
                  .filter(talk => new Date(talk.date) <= new Date())
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((talk) => (
                    <TalkCard key={talk.id} talk={talk} isUpcoming={false} />
                  ))}
              </div>
            </div>
          </>
        )}

        {/* No Results */}
        {filteredTalks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No talks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Talks;