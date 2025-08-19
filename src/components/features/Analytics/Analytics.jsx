import React, { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics
    const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
    
    if (GA_TRACKING_ID) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // Plausible Analytics (alternative to Google Analytics)
    const PLAUSIBLE_DOMAIN = process.env.REACT_APP_PLAUSIBLE_DOMAIN;
    
    if (PLAUSIBLE_DOMAIN) {
      const script = document.createElement('script');
      script.defer = true;
      script.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
      script.src = 'https://plausible.io/js/plausible.js';
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup scripts if needed
      const scripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="plausible"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  // Track page views
  const trackPageView = (path, title) => {
    if (window.gtag) {
      window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_path: path,
        page_title: title,
      });
    }
    
    if (window.plausible) {
      window.plausible('pageview', {
        u: window.location.href,
        referrer: document.referrer,
      });
    }
  };

  // Track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }
    
    if (window.plausible) {
      window.plausible(eventName, { props: parameters });
    }
  };

  // Track download events
  const trackDownload = (fileName, fileType) => {
    trackEvent('download', {
      file_name: fileName,
      file_type: fileType,
      event_category: 'engagement',
      event_label: fileName,
    });
  };

  // Track external link clicks
  const trackExternalLink = (url, linkText) => {
    trackEvent('click', {
      event_category: 'external_link',
      event_label: linkText,
      external_url: url,
    });
  };

  // Track form submissions
  const trackFormSubmission = (formName, success = true) => {
    trackEvent('form_submit', {
      form_name: formName,
      success: success,
      event_category: 'engagement',
    });
  };

  // Track search events
  const trackSearch = (searchTerm, resultCount) => {
    trackEvent('search', {
      search_term: searchTerm,
      result_count: resultCount,
      event_category: 'engagement',
    });
  };

  // Track social media clicks
  const trackSocialClick = (platform, action = 'click') => {
    trackEvent('social_click', {
      social_platform: platform,
      action: action,
      event_category: 'social',
    });
  };

  // Track CV/Resume views
  const trackCVView = (format = 'pdf') => {
    trackEvent('cv_view', {
      format: format,
      event_category: 'engagement',
      event_label: 'CV View',
    });
  };

  // Track project interactions
  const trackProjectInteraction = (projectId, action) => {
    trackEvent('project_interaction', {
      project_id: projectId,
      action: action,
      event_category: 'projects',
    });
  };

  // Track publication interactions
  const trackPublicationInteraction = (publicationId, action) => {
    trackEvent('publication_interaction', {
      publication_id: publicationId,
      action: action,
      event_category: 'publications',
    });
  };

  // Track contact form interactions
  const trackContactInteraction = (action, method) => {
    trackEvent('contact_interaction', {
      action: action,
      method: method,
      event_category: 'contact',
    });
  };

  // Track theme changes
  const trackThemeChange = (theme) => {
    trackEvent('theme_change', {
      theme: theme,
      event_category: 'preferences',
    });
  };

  // Track time spent on page
  const trackTimeOnPage = (pageName, timeInSeconds) => {
    trackEvent('time_on_page', {
      page_name: pageName,
      time_seconds: timeInSeconds,
      event_category: 'engagement',
    });
  };

  // Track scroll depth
  const trackScrollDepth = (depth) => {
    trackEvent('scroll_depth', {
      depth_percentage: depth,
      event_category: 'engagement',
    });
  };

  // Expose tracking functions globally
  useEffect(() => {
    window.analytics = {
      trackPageView,
      trackEvent,
      trackDownload,
      trackExternalLink,
      trackFormSubmission,
      trackSearch,
      trackSocialClick,
      trackCVView,
      trackProjectInteraction,
      trackPublicationInteraction,
      trackContactInteraction,
      trackThemeChange,
      trackTimeOnPage,
      trackScrollDepth,
    };
  }, []);

  // Track scroll depth automatically
  useEffect(() => {
    let maxScrollDepth = 0;
    const scrollDepthThresholds = [25, 50, 75, 100];
    const trackedDepths = new Set();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      const scrollDepth = Math.round(((scrollTop + windowHeight) / docHeight) * 100);
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track specific thresholds
        scrollDepthThresholds.forEach(threshold => {
          if (scrollDepth >= threshold && !trackedDepths.has(threshold)) {
            trackedDepths.add(threshold);
            trackScrollDepth(threshold);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    const pageName = window.location.pathname;

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) { // Only track if user spent more than 10 seconds
        trackTimeOnPage(pageName, timeSpent);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;