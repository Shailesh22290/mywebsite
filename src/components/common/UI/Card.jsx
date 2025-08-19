import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  background = 'bg-white dark:bg-gray-800',
  border = 'border border-gray-200 dark:border-gray-700',
  rounded = 'rounded-lg',
  shadow = 'shadow-sm',
  ...props 
}) => {
  const baseClasses = `${background} ${border} ${rounded} ${shadow} ${padding} transition-all duration-200`;
  const hoverClasses = hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2 } : {}}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;