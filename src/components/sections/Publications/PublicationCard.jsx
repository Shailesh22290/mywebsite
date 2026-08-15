import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  FileText,
  Quote,
  Calendar,
  Users,
  TrendingUp,
  Copy,
  Check,
  BookOpen,
  Github
} from 'lucide-react';

const PublicationCard = ({ publication }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    title,
    authors,
    venue,
    year,
    type,
    abstract,
    doi,
    pdfUrl,
    codeUrl,
    citations,
    impactFactor,
    keywords,
    bibtex,
    status,
    pages,
    volume,
    issue
  } = publication;

  const getTypeColor = (type) => {
    switch (type) {
      case 'journal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'conference':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'workshop':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'preprint':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'submitted':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleCopyBibtex = async () => {
    if (bibtex) {
      try {
        await navigator.clipboard.writeText(bibtex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy bibtex:', err);
      }
    }
  };

  // Authors are stored as "Name (Affiliation)"; split them apart for the chip display.
  const parseAuthor = (author) => {
    const openParen = author.indexOf('(');
    if (openParen === -1) return { name: author, affiliation: null };
    return {
      name: author.slice(0, openParen).trim(),
      affiliation: author.slice(openParen + 1, author.lastIndexOf(')')).trim(),
    };
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              {authors.map((author, index) => {
                const { name, affiliation } = parseAuthor(author);
                return (
                  <span
                    key={index}
                    className="group/author inline-flex items-baseline gap-1.5 px-2.5 py-1 rounded-full
                             bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium
                             hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300
                             hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {name}
                    {affiliation && (
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 group-hover/author:text-blue-500 dark:group-hover/author:text-blue-400">
                        {affiliation}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">{venue}</span>
              {year && (
                <>
                  <Calendar className="w-4 h-4 ml-2" />
                  <span>{year}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            {status && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {status.replace('-', ' ')}
              </span>
            )}
          </div>
        </div>

        {/* Publication Details */}
        {(volume || issue || pages) && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {volume && `Volume ${volume}`}
            {issue && `, Issue ${issue}`}
            {pages && `, Pages ${pages}`}
          </div>
        )}

        {/* Keywords */}
        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                         rounded text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 mb-4 text-sm">
          {citations !== undefined && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Quote className="w-4 h-4" />
              <span>{citations} citations</span>
            </div>
          )}
          {impactFactor && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>IF: {impactFactor}</span>
            </div>
          )}
        </div>

        {/* Abstract Toggle */}
        {abstract && (
          <div className="mb-4">
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                       text-sm font-medium transition-colors"
            >
              {showAbstract ? 'Hide Abstract' : 'Show Abstract'}
            </button>
            {showAbstract && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {abstract}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {doi && (
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>DOI</span>
            </a>
          )}
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg
                       hover:bg-red-700 transition-colors text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg
                       hover:bg-gray-900 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {bibtex && (
            <button
              onClick={handleCopyBibtex}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg 
                       hover:bg-gray-700 transition-colors text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'BibTeX'}</span>
            </button>
          )}
        </div>

        {/* BibTeX Display */}
        {bibtex && showAbstract && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-gray-900 dark:bg-gray-950 rounded-lg overflow-x-auto"
          >
            <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
              {bibtex}
            </pre>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PublicationCard;