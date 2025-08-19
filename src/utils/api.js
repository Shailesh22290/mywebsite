// src/utils/api.js

const API_BASE_URL = 'https://api.yourdomain.com/v1'; // Example API URL

/**
 * A wrapper for the fetch API to handle requests.
 * @param {string} endpoint - The API endpoint to call.
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<any>} - The JSON response from the API.
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};