import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { getSortedNews } from '@/data/news';
import NewsRow from './NewsRow';

const AllNews = () => {
  const sortedNews = getSortedNews();

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8">
            <Newspaper className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All News</h1>
          </motion.div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedNews.map((item) => (
              <NewsRow key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AllNews;
