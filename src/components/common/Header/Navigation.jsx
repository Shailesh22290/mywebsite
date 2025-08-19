import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/publications', label: 'Publications' },
    { path: '/experience', label: 'Experience' },
    { path: '/talks', label: 'Talks' },
    { path: '/education', label: 'Education' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `relative py-2 px-3 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;