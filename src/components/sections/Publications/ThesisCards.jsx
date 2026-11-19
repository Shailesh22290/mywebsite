import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { theses } from '@/data/theses';

const ThesisCards = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    {Object.values(theses).map((t) => (
      <Link key={t.id} to={`/thesis/${t.id}`}
        className="group block p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">{t.pageTitle}</span>
          {t.ongoing && <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">Ongoing</span>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white leading-snug mb-2">{t.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{t.cardBlurb}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
    ))}
  </div>
);

export default ThesisCards;
