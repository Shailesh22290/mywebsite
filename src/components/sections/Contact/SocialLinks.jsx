import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Youtube, 
  BookOpen, 
  MessageSquare,
  ExternalLink,
  Users,
  FileText
} from 'lucide-react';

const SocialLinks = ({ size = 'default', showLabels = true, className = '' }) => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/username',
      icon: Github,
      color: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      description: 'Code repositories and open source projects'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/username',
      icon: Linkedin,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900',
      description: 'Professional network and career updates'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/username',
      icon: Twitter,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900',
      description: 'Research thoughts and academic discussions'
    },
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.com/citations?user=username',
      icon: BookOpen,
      color: 'hover:bg-green-50 dark:hover:bg-green-900',
      description: 'Academic publications and citations'
    },
    {
      name: 'ResearchGate',
      url: 'https://researchgate.net/profile/username',
      icon: Users,
      color: 'hover:bg-teal-50 dark:hover:bg-teal-900',
      description: 'Research collaboration and publications'
    },
    {
      name: 'ORCID',
      url: 'https://orcid.org/0000-0000-0000-0000',
      icon: FileText,
      color: 'hover:bg-green-50 dark:hover:bg-green-900',
      description: 'Academic identifier and research outputs'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/channel/username',
      icon: Youtube,
      color: 'hover:bg-red-50 dark:hover:bg-red-900',
      description: 'Educational content and research presentations'
    },
    {
      name: 'Email',
      url: 'mailto:contact@researcher.com',
      icon: Mail,
      color: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      description: 'Direct email communication'
    }
  ];

  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const containerClasses = {
    small: 'p-2',
    default: 'p-3',
    large: 'p-4'
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center ${containerClasses[size]} rounded-lg transition-all duration-200 group ${link.color}`}
        >
          <div className="flex-shrink-0">
            <link.icon className={`${sizeClasses[size]} text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors`} />
          </div>
          
          {showLabels && (
            <div className="ml-3 flex-grow">
              <div className="flex items-center">
                <span className="font-medium text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {link.name}
                </span>
                <ExternalLink className="w-3 h-3 ml-1 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {link.description}
              </p>
            </div>
          )}
        </a>
      ))}
      
      {/* Additional Contact Methods */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Alternative Contact Methods
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Slack
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Available in academic research communities
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Users className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Discord
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Research community server: ResearchHub
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* QR Code for Contact */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Quick Connect
        </h4>
        <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">QR Code</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Scan to save contact info
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact version for use in headers/footers
export const CompactSocialLinks = ({ className = '' }) => {
  const compactLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/username',
      icon: Github
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/username',
      icon: Linkedin
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/username',
      icon: Twitter
    },
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.com/citations?user=username',
      icon: BookOpen
    },
    {
      name: 'Email',
      url: 'mailto:contact@researcher.com',
      icon: Mail
    }
  ];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {compactLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
          title={link.name}
        >
          <link.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;