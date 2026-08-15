import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { getSortedNews } from '@/data/news';
import NewsRow from './NewsRow';

const VISIBLE_COUNT = 4;

const News = () => {
  const sortedNews = getSortedNews();
  const visibleNews = sortedNews.slice(0, VISIBLE_COUNT);
  const hasMore = sortedNews.length > VISIBLE_COUNT;

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8">
            <Newspaper className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest News</h2>
          </motion.div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {visibleNews.map((item) => (
              <NewsRow key={item.id} item={item} />
            ))}
          </div>

          {hasMore && (
            <motion.div variants={fadeInUp} className="mt-8 text-center">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                View All News
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default News;
