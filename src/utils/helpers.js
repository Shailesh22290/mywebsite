// src/utils/helpers.js

/**
 * Formats a date string into a more readable format.
 * @param {string} dateString - The date string to format (e.g., "2024-10-25").
 * @returns {string} - The formatted date (e.g., "October 25, 2024").
 */
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  /**
   * Truncates a string to a specified length and adds an ellipsis.
   * @param {string} text - The text to truncate.
   * @param {number} maxLength - The maximum length of the text.
   * @returns {string} - The truncated text.
   */
  export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };