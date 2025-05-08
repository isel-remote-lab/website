/**
 * API URIs configuration
 * 
 * This file contains all the API endpoints used in the application.
 * It mirrors the structure defined in the Kotlin backend (Uris.kt).
 */

// Base API prefix
const PROTOCOL = "http";
const HOST = "api";
const PORT = "8080";
const API_PREFIX = `${PROTOCOL}://${HOST}:${PORT}/api/v1`;
const AUTH_URI = `${API_PREFIX}/auth`;
const LOGIN_URI = `${AUTH_URI}/login`;
const LOGOUT_URI = `${AUTH_URI}/logout`;
const USERS_URI = `${API_PREFIX}/users`;

/**
 * API URIs for user-related operations
 */
export const Uris = {
  /**
   * URI for the login endpoint
   */
  LOGIN: LOGIN_URI,

  /**
   * URI for the logout endpoint
   */
  LOGOUT: LOGOUT_URI,

  /**
   * URI for user-related operations
   */
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
  },

  /**
   * URI for laboratory-related operations
   */
  Laboratories: {
    /**
     * URI for getting all laboratories
     */
    GET_ALL: `${API_PREFIX}/laboratories`
  }
};

/**
 * Helper function to replace path parameters in URIs
 * @param {string} uri - The URI template with parameters
 * @param {Object} params - Object containing parameter values
 * @returns {string} - The URI with parameters replaced
 */
export const replaceParams = (uri: string, params: object): string => {
  let result = uri;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value);
  });
  return result;
};

/**
 * Fetch API with API key
 * @param uri - The URI to fetch
 * @param options - The options for the fetch request
 * @returns The response from the fetch request
 */
export const fetchWithApiKey = async (uri: string, options: RequestInit = {}): Promise<Response> => {
  const response = await fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_KEY || ''
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  return response;
}

/**
 * Fetch API with cookie
 * @param uri - The URI to fetch
 * @param options - The options for the fetch request
 * @returns The response from the fetch request
 */
export const fetchWithCookie = async (uri: string, options: RequestInit = {}): Promise<Response> => {
  const response = await fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  return response;
}

// Example usage:
// const userUri = replaceParams(UserUris.GET, { id: '123' });
// Result: /api/v1/users/123 