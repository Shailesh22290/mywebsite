import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_MOBILE_MENU_OPEN: 'SET_MOBILE_MENU_OPEN',
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  SET_TOAST: 'SET_TOAST',
  CLEAR_TOAST: 'CLEAR_TOAST',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
  SET_VIEWPORT_SIZE: 'SET_VIEWPORT_SIZE'
};

// Initial state
const initialState = {
  loading: false,
  error: null,
  mobileMenuOpen: false,
  activeSection: 'home',
  searchQuery: '',
  searchResults: [],
  modalOpen: false,
  modalContent: null,
  toast: null,
  notifications: [],
  scrollPosition: 0,
  viewportSize: { width: 0, height: 0 },
  userPreferences: {
    language: 'en',
    emailNotifications: true,
    viewMode: 'grid',
    autoSave: true
  }
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actionTypes.SET_MOBILE_MENU_OPEN:
      return { ...state, mobileMenuOpen: action.payload };
    
    case actionTypes.SET_ACTIVE_SECTION:
      return { ...state, activeSection: action.payload };
    
    case actionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case actionTypes.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    
    case actionTypes.SET_MODAL_OPEN:
      return { 
        ...state, 
        modalOpen: action.payload.open,
        modalContent: action.payload.content || null
      };
    
    case actionTypes.SET_TOAST:
      return { ...state, toast: action.payload };
    
    case actionTypes.CLEAR_TOAST:
      return { ...state, toast: null };
    
    case actionTypes.SET_USER_PREFERENCES:
      return { 
        ...state, 
        userPreferences: { ...state.userPreferences, ...action.payload }
      };
    
    case actionTypes.ADD_NOTIFICATION:
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload]
      };
    
    case actionTypes.REMOVE_NOTIFICATION:
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case actionTypes.SET_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload };
    
    case actionTypes.SET_VIEWPORT_SIZE:
      return { ...state, viewportSize: action.payload };
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [persistedPreferences, setPersistedPreferences] = useLocalStorage('userPreferences', initialState.userPreferences);

  // Initialize user preferences from localStorage
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_USER_PREFERENCES,
      payload: persistedPreferences
    });
  }, [persistedPreferences]);

  // Persist user preferences to localStorage
  useEffect(() => {
    setPersistedPreferences(state.userPreferences);
  }, [state.userPreferences, setPersistedPreferences]);

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: actionTypes.SET_VIEWPORT_SIZE,
        payload: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    };

    handleResize(); // Initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      dispatch({
        type: actionTypes.SET_SCROLL_POSITION,
        payload: window.pageYOffset
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
    
    setMobileMenuOpen: (open) => dispatch({ type: actionTypes.SET_MOBILE_MENU_OPEN, payload: open }),
    
    setActiveSection: (section) => dispatch({ type: actionTypes.SET_ACTIVE_SECTION, payload: section }),
    
    setSearchQuery: (query) => dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: query }),
    
    setSearchResults: (results) => dispatch({ type: actionTypes.SET_SEARCH_RESULTS, payload: results }),
    
    openModal: (content) => dispatch({ 
      type: actionTypes.SET_MODAL_OPEN, 
      payload: { open: true, content } 
    }),
    
    closeModal: () => dispatch({ 
      type: actionTypes.SET_MODAL_OPEN, 
      payload: { open: false, content: null } 
    }),
    
    showToast: (message, type = 'info', duration = 5000) => {
      const toast = {
        id: Date.now(),
        message,
        type,
        duration
      };
      dispatch({ type: actionTypes.SET_TOAST, payload: toast });
      
      // Auto-clear toast after duration
      setTimeout(() => {
        dispatch({ type: actionTypes.CLEAR_TOAST });
      }, duration);
    },
    
    clearToast: () => dispatch({ type: actionTypes.CLEAR_TOAST }),
    
    updateUserPreferences: (preferences) => dispatch({ 
      type: actionTypes.SET_USER_PREFERENCES, 
      payload: preferences 
    }),
    
    addNotification: (notification) => {
      const newNotification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...notification
      };
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: newNotification });
    },
    
    removeNotification: (id) => dispatch({ 
      type: actionTypes.REMOVE_NOTIFICATION, 
      payload: id 
    }),
    
    markNotificationAsRead: (id) => {
      const updatedNotifications = state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      dispatch({ type: actionTypes.SET_NOTIFICATIONS, payload: updatedNotifications });
    },
    
    clearAllNotifications: () => dispatch({ 
      type: actionTypes.SET_NOTIFICATIONS, 
      payload: [] 
    })
  };

  // Computed values
  const computed = {
    isMobile: state.viewportSize.width < 768,
    isTablet: state.viewportSize.width >= 768 && state.viewportSize.width < 1024,
    isDesktop: state.viewportSize.width >= 1024,
    unreadNotifications: state.notifications.filter(n => !n.read).length,
    hasError: Boolean(state.error),
    hasToast: Boolean(state.toast),
    isSearching: state.searchQuery.length > 0
  };

  // Error boundary functionality
  const handleError = (error, errorInfo) => {
    console.error('App Error:', error, errorInfo);
    actions.setError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  };

  const value = {
    ...state,
    ...actions,
    ...computed,
    handleError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;