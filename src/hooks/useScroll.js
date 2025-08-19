import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for tracking scroll position and direction
 * @param {Object} options - Configuration options
 * @returns {Object} - Scroll information and utilities
 */
export const useScroll = (options = {}) => {
  const {
    threshold = 0,
    debounceMs = 100,
    element = null // null means window
  } = options;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const updateScrollInfo = useCallback(() => {
    const target = element || window;
    const scrollTop = element ? element.scrollTop : window.pageYOffset;
    const scrollHeight = element ? element.scrollHeight : document.documentElement.scrollHeight;
    const clientHeight = element ? element.clientHeight : window.innerHeight;

    const previousPosition = scrollPosition;
    const direction = scrollTop > previousPosition ? 'down' : 'up';
    
    setScrollPosition(scrollTop);
    setScrollDirection(direction);
    setIsScrollingDown(direction === 'down');
    setIsScrollingUp(direction === 'up');
    setIsAtTop(scrollTop <= threshold);
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - threshold);
  }, [scrollPosition, threshold, element]);

  useEffect(() => {
    const target = element || window;
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollInfo, debounceMs);
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    updateScrollInfo();

    return () => {
      target.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [updateScrollInfo, debounceMs, element]);

  return {
    scrollPosition,
    scrollDirection,
    isScrollingDown,
    isScrollingUp,
    isAtTop,
    isAtBottom
  };
};

/**
 * Hook for smooth scrolling to elements
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    scrollToBottom
  };
};

/**
 * Hook for detecting when elements come into view
 */
export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, hasIntersected]);

  const shouldShow = triggerOnce ? hasIntersected : isIntersecting;

  return [setRef, shouldShow, { isIntersecting, hasIntersected }];
};

/**
 * Hook for scroll-based animations
 */
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial values
    setScrollY(window.scrollY);
    setWindowHeight(window.innerHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate parallax offset
  const getParallaxOffset = (speed = 0.5) => {
    return scrollY * speed;
  };

  // Calculate fade based on scroll position
  const getFadeOpacity = (elementTop, fadeDistance = 200) => {
    const fadeStart = elementTop - windowHeight;
    const fadeEnd = fadeStart + fadeDistance;
    
    if (scrollY < fadeStart) return 0;
    if (scrollY > fadeEnd) return 1;
    
    return (scrollY - fadeStart) / fadeDistance;
  };

  // Calculate scale based on scroll position
  const getScaleValue = (elementTop, maxScale = 1.1) => {
    const scaleStart = elementTop - windowHeight;
    const scaleEnd = elementTop;
    
    if (scrollY < scaleStart) return 1;
    if (scrollY > scaleEnd) return maxScale;
    
    const progress = (scrollY - scaleStart) / (scaleEnd - scaleStart);
    return 1 + (maxScale - 1) * progress;
  };

  return {
    scrollY,
    windowHeight,
    getParallaxOffset,
    getFadeOpacity,
    getScaleValue
  };
};

/**
 * Hook for managing scroll lock (useful for modals)
 */
export const useScrollLock = () => {
  const [isLocked, setIsLocked] = useState(false);

  const lockScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      setIsLocked(true);
    }
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'unset';
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, []);

  return { isLocked, lockScroll, unlockScroll };
};

export default useScroll;