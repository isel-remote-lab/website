/**
 * API URIs configuration
 * 
 * This file contains all the API endpoints used in the application.
 * It mirrors the structure defined in the Kotlin backend (Uris.kt).
 */

// Base API prefix
const API_PREFIX = "/api/v1";
const USERS_URI = `${API_PREFIX}/users`;

/**
 * API URIs for user-related operations
 */
export const Uris = {
  Users: {
    /**
     * URI for creating a user
     */
    CREATE: USERS_URI,
    
    /**
     * URI for getting a user by ID
     */
    GET: `${USERS_URI}/{id}`,
    
    /**
     * URI for getting a user by email
     */
    GET_BY_EMAIL: USERS_URI,
    
    /**
     * URI for getting a user by OAuth ID
     */
    GET_BY_OAUTHID: `${USERS_URI}/{oauthid}`
  }
};

/**
 * Helper function to replace path parameters in URIs
 * @param {string} uri - The URI template with parameters
 * @param {Object} params - Object containing parameter values
 * @returns {string} - The URI with parameters replaced
 */
export const replaceParams = (uri, params) => {
  let result = uri;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value);
  });
  return result;
};

// Example usage:
// const userUri = replaceParams(UserUris.GET, { id: '123' });
// Result: /api/v1/users/123 