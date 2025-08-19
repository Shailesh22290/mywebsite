import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {any} initialValue - The initial value if key doesn't exist
 * @returns {[any, function]} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
};

/**
 * Hook for managing user preferences in localStorage
 */
export const usePreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    reducedMotion: false,
    emailNotifications: true,
    language: 'en',
    viewMode: 'grid'
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetPreferences = () => {
    setPreferences({
      theme: 'light',
      reducedMotion: false,
      emailNotifications: true,
      language: 'en',
      viewMode: 'grid'
    });
  };

  return {
    preferences,
    updatePreference,
    resetPreferences
  };
};

/**
 * Hook for managing recently viewed items
 */
export const useRecentlyViewed = (maxItems = 10) => {
  const [recentItems, setRecentItems] = useLocalStorage('recentlyViewed', []);

  const addRecentItem = (item) => {
    setRecentItems(prev => {
      const filtered = prev.filter(i => i.id !== item.id);
      const updated = [{ ...item, viewedAt: new Date().toISOString() }, ...filtered];
      return updated.slice(0, maxItems);
    });
  };

  const removeRecentItem = (itemId) => {
    setRecentItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearRecentItems = () => {
    setRecentItems([]);
  };

  return {
    recentItems,
    addRecentItem,
    removeRecentItem,
    clearRecentItems
  };
};

export default useLocalStorage;