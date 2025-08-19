import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook that debounces a value
 * @param {any} value - The value to debounce
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for debouncing function calls
 * @param {Function} func - The function to debounce
 * @param {number} delay - The debounce delay in milliseconds
 * @param {Object} options - Additional options
 * @returns {Function} - The debounced function
 */
export const useDebounceCallback = (func, delay, options = {}) => {
  const { leading = false, trailing = true, maxWait } = options;
  const funcRef = useRef(func);
  const timeoutRef = useRef(null);
  const maxTimeoutRef = useRef(null);
  const lastCallTimeRef = useRef(0);
  const lastInvokeTimeRef = useRef(0);

  // Update function reference
  funcRef.current = func;

  const invokeFunc = useCallback((args) => {
    const result = funcRef.current(...args);
    lastInvokeTimeRef.current = Date.now();
    return result;
  }, []);

  const leadingEdge = useCallback((args) => {
    lastInvokeTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(() => trailingEdge(args), delay);
    return leading ? invokeFunc(args) : undefined;
  }, [delay, leading, invokeFunc]);

  const trailingEdge = useCallback((args) => {
    timeoutRef.current = null;
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
    if (trailing && lastCallTimeRef.current !== lastInvokeTimeRef.current) {
      return invokeFunc(args);
    }
  }, [trailing, invokeFunc]);

  const timedOut = useCallback(() => {
    const timeSinceLastCall = Date.now() - lastCallTimeRef.current;
    if (timeSinceLastCall < delay) {
      timeoutRef.current = setTimeout(timedOut, delay - timeSinceLastCall);
    } else {
      timeoutRef.current = null;
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
        maxTimeoutRef.current = null;
      }
      if (trailing) {
        return invokeFunc([]);
      }
    }
  }, [delay, trailing, invokeFunc]);

  const debouncedFunc = useCallback((...args) => {
    lastCallTimeRef.current = Date.now();
    const isInvoking = timeoutRef.current === null;

    if (maxWait && !maxTimeoutRef.current) {
      maxTimeoutRef.current = setTimeout(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        maxTimeoutRef.current = null;
        return invokeFunc(args);
      }, maxWait);
    }

    if (isInvoking) {
      return leadingEdge(args);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => trailingEdge(args), delay);
  }, [delay, leadingEdge, trailingEdge, maxWait, invokeFunc]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
    lastCallTimeRef.current = 0;
    lastInvokeTimeRef.current = 0;
  }, []);

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      return invokeFunc([]);
    }
  }, [invokeFunc]);

  const pending = useCallback(() => {
    return timeoutRef.current !== null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  debouncedFunc.cancel = cancel;
  debouncedFunc.flush = flush;
  debouncedFunc.pending = pending;

  return debouncedFunc;
};

/**
 * Hook for debouncing search queries
 * @param {string} query - The search query
 * @param {number} delay - The debounce delay
 * @returns {Object} - Search utilities and state
 */
export const useSearchDebounce = (query, delay = 300) => {
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (query !== debouncedQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [query, debouncedQuery]);

  return {
    debouncedQuery,
    isSearching,
    hasQuery: debouncedQuery.length > 0
  };
};

/**
 * Hook for debouncing API calls
 * @param {Function} apiCall - The API function to call
 * @param {number} delay - The debounce delay
 * @returns {Object} - API utilities and state
 */
export const useApiDebounce = (apiCall, delay = 500) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const debouncedApiCall = useDebounceCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await apiCall(...args);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    delay
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    debouncedApiCall.cancel();
  }, [debouncedApiCall]);

  return {
    call: debouncedApiCall,
    loading,
    error,
    data,
    reset
  };
};

/**
 * Hook for debouncing form validation
 * @param {Object} values - Form values
 * @param {Function} validator - Validation function
 * @param {number} delay - Debounce delay
 * @returns {Object} - Validation state and utilities
 */
export const useValidationDebounce = (values, validator, delay = 300) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const debouncedValidator = useDebounceCallback(
    async (vals) => {
      setIsValidating(true);
      
      try {
        const validationErrors = await validator(vals);
        setErrors(validationErrors || {});
        setIsValid(Object.keys(validationErrors || {}).length === 0);
      } catch (err) {
        console.error('Validation error:', err);
        setErrors({ general: 'Validation failed' });
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    },
    delay
  );

  useEffect(() => {
    if (values) {
      debouncedValidator(values);
    }
  }, [values, debouncedValidator]);

  return {
    errors,
    isValidating,
    isValid
  };
};

export default useDebounce;