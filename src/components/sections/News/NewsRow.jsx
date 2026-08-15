import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Library, ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/utils/animations';
import { formatNewsDate } from '@/data/news';

const NEWS_TYPE_STYLES = {
  paper: {
    icon: Award,
    accent: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  },
  engagement: {
    icon: Library,
    accent: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  },
};

const NewsRow = ({ item }) => {
  const { icon: Icon, accent } = NEWS_TYPE_STYLES[item.type] || NEWS_TYPE_STYLES.engagement;

  return (
    <motion.div variants={fadeInUp} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
      <div className={`flex-shrink-0 p-3 rounded-lg ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {formatNewsDate(item.date)}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {item.description}
        </p>
        {item.link && (
          <Link
            to={item.link}
            className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {item.linkLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default NewsRow;
