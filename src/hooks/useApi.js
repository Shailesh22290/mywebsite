import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for making API calls with state management
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options and hook configuration
 * @returns {Object} - API state and utilities
 */
export const useApi = (url, options = {}) => {
  const {
    method = 'GET',
    headers = {},
    body = null,
    immediate = true,
    onSuccess = null,
    onError = null,
    transform = null,
    ...fetchOptions
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  
  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const execute = useCallback(async (customOptions = {}) => {
    const currentRequestId = ++requestIdRef.current;
    
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...customOptions.headers
        },
        signal: abortControllerRef.current.signal,
        ...fetchOptions,
        ...customOptions
      };

      // Add body if provided
      if (body || customOptions.body) {
        requestOptions.body = JSON.stringify(customOptions.body || body);
      }

      const response = await fetch(url, requestOptions);
      
      // Check if this is still the latest request
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      setStatus(response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else if (contentType && contentType.includes('text/')) {
        responseData = await response.text();
      } else {
        responseData = await response.blob();
      }

      // Transform data if transform function is provided
      if (transform && typeof transform === 'function') {
        responseData = transform(responseData);
      }

      setData(responseData);
      
      if (onSuccess) {
        onSuccess(responseData);
      }

    } catch (err) {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      if (err.name === 'AbortError') {
        return;
      }

      setError(err);
      
      if (onError) {
        onError(err);
      }
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [url, method, headers, body, fetchOptions, transform, onSuccess, onError]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Execute immediately if specified
  useEffect(() => {
    if (immediate && url) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, url, execute]);

  return {
    data,
    loading,
    error,
    status,
    execute,
    refetch,
    cancel
  };
};

/**
 * Hook for making multiple API calls
 * @param {Array} requests - Array of request configurations
 * @returns {Object} - Combined API state
 */
export const useMultipleApi = (requests = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [completed, setCompleted] = useState(0);

  const execute = useCallback(async () => {
    setLoading(true);
    setErrors([]);
    setCompleted(0);
    
    const results = [];
    const requestErrors = [];

    for (let i = 0; i < requests.length; i++) {
      try {
        const response = await fetch(requests[i].url, requests[i].options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        results[i] = result;
        requestErrors[i] = null;
      } catch (error) {
        results[i] = null;
        requestErrors[i] = error;
      }
      
      setCompleted(i + 1);
    }

    setData(results);
    setErrors(requestErrors);
    setLoading(false);
  }, [requests]);

  const progress = requests.length > 0 ? (completed / requests.length) * 100 : 0;

  return {
    data,
    loading,
    errors,
    progress,
    execute
  };
};

/**
 * Hook for paginated API calls
 * @param {string} url - Base URL for the API
 * @param {Object} options - Configuration options
 * @returns {Object} - Pagination state and utilities
 */
export const usePaginatedApi = (url, options = {}) => {
  const {
    pageSize = 10,
    pageParam = 'page',
    sizeParam = 'size',
    immediate = true,
    ...apiOptions
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchPage = useCallback(async (pageNumber) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        [pageParam]: pageNumber,
        [sizeParam]: pageSize
      });

      const response = await fetch(`${url}?${queryParams}`, apiOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Assuming the API returns data in a specific format
      const { data: pageData, total: totalCount, hasMore: moreAvailable } = result;
      
      if (pageNumber === 1) {
        setData(pageData);
      } else {
        setData(prev => [...prev, ...pageData]);
      }
      
      setTotal(totalCount);
      setHasMore(moreAvailable);
      setPage(pageNumber);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, pageSize, pageParam, sizeParam, apiOptions]);

  const nextPage = useCallback(() => {
    if (hasMore && !loading) {
      fetchPage(page + 1);
    }
  }, [page, hasMore, loading, fetchPage]);

  const prevPage = useCallback(() => {
    if (page > 1 && !loading) {
      setPage(prev => prev - 1);
      // Note: This would require refetching or maintaining page cache
    }
  }, [page, loading]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setTotal(0);
    setError(null);
  }, []);

  const refresh = useCallback(() => {
    reset();
    fetchPage(1);
  }, [reset, fetchPage]);

  useEffect(() => {
    if (immediate && url) {
      fetchPage(1);
    }
  }, [immediate, url, fetchPage]);

  return {
    data,
    loading,
    error,
    page,
    hasMore,
    total,
    nextPage,
    prevPage,
    refresh,
    reset
  };
};

/**
 * Hook for API calls with caching
 * @param {string} key - Cache key
 * @param {Function} fetcher - Function that returns a promise
 * @param {Object} options - Configuration options
 * @returns {Object} - Cached API state
 */
export const useCachedApi = (key, fetcher, options = {}) => {
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes
    staleTime = 0,
    immediate = true
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const cacheRef = useRef(new Map());

  const isStale = useCallback(() => {
    if (!lastFetched) return true;
    return Date.now() - lastFetched > staleTime;
  }, [lastFetched, staleTime]);

  const execute = useCallback(async (force = false) => {
    // Check cache first
    const cached = cacheRef.current.get(key);
    if (cached && !force && !isStale()) {
      setData(cached.data);
      setLastFetched(cached.timestamp);
      return cached.data;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      const timestamp = Date.now();
      
      // Cache the result
      cacheRef.current.set(key, {
        data: result,
        timestamp
      });

      // Clean up old cache entries
      cacheRef.current.forEach((value, cacheKey) => {
        if (timestamp - value.timestamp > cacheTime) {
          cacheRef.current.delete(cacheKey);
        }
      });

      setData(result);
      setLastFetched(timestamp);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, isStale, cacheTime]);

  const invalidate = useCallback(() => {
    cacheRef.current.delete(key);
    setData(null);
    setLastFetched(null);
  }, [key]);

  useEffect(() => {
    if (immediate && key) {
      execute();
    }
  }, [immediate, key, execute]);

  return {
    data,
    loading,
    error,
    execute,
    invalidate,
    isStale: isStale()
  };
};

/**
 * Hook for optimistic updates
 * @param {Function} mutationFn - Function that performs the mutation
 * @param {Object} options - Configuration options
 * @returns {Object} - Mutation state and utilities
 */
export const useOptimisticApi = (mutationFn, options = {}) => {
  const { onSuccess, onError, onSettled } = options;
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOptimistic, setIsOptimistic] = useState(false);
  
  const previousDataRef = useRef(null);

  const mutate = useCallback(async (variables, optimisticData) => {
    setLoading(true);
    setError(null);
    
    // Store previous data for rollback
    previousDataRef.current = data;
    
    // Apply optimistic update
    if (optimisticData) {
      setData(optimisticData);
      setIsOptimistic(true);
    }

    try {
      const result = await mutationFn(variables);
      setData(result);
      setIsOptimistic(false);
      
      if (onSuccess) {
        onSuccess(result, variables);
      }
    } catch (err) {
      // Rollback on error
      setData(previousDataRef.current);
      setIsOptimistic(false);
      setError(err);
      
      if (onError) {
        onError(err, variables);
      }
    } finally {
      setLoading(false);
      
      if (onSettled) {
        onSettled(data, error, variables);
      }
    }
  }, [mutationFn, data, onSuccess, onError, onSettled]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setIsOptimistic(false);
  }, []);

  return {
    data,
    loading,
    error,
    isOptimistic,
    mutate,
    reset
  };
};

export default useApi;