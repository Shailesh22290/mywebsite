import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    // { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Mail, href: 'mailto:your.email@domain.com', label: 'Email' },
  ];

  const footerLinks = [
    { title: 'Navigation', links: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Projects', path: '/projects' },
      // { label: 'Publications', path: '/publications' },
    ]},
    { title: 'Research', links: [
      { label: 'Experience', path: '/experience' },
      // { label: 'Talks', path: '/talks' },
      { label: 'Education', path: '/education' },
      { label: 'Blog', path: '/blog' },
    ]},
    { title: 'Connect', links: [
      { label: 'Contact', path: '/contact' },
      { label: 'Consultancy', path: '/consultancy' },
      { label: 'Resources', path: '/resources' },
      // { label: 'Discussions', path: '/discussions' },
    ]},
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-gradient">
              Shailesh K.
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              BS Data Science Student at IISERB
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {title}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {currentYear} Shailesh K. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;