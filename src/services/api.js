const API_URL = import.meta.env.VITE_API_URL || 'https://immerrock-customsongs-backend.onrender.com';

/**
 * Common fetch wrapper for consistent error handling and header management
 */
async function apiRequest(endpoint, options = {}) {
  const { body, headers, ...customOptions } = options;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customOptions,
    headers: defaultHeaders,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || errorMessage;
      } catch {
        // Fallback to generic error
      }
      throw new Error(errorMessage);
    }

    // Only try to parse JSON if there's content
    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.error(`Request failed for ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
