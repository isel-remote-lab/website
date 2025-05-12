import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Base API prefix
const DOCKER_URL = "http://api:8080";
const API_PREFIX = `${process.env.NEXTAUTH_URL}/api/v1`;
const AUTH_URI = `${API_PREFIX}/auth`;
const LOGIN_URI = `${DOCKER_URL}/api/v1/auth/login`;
const LOGOUT_URI = `${AUTH_URI}/logout`;
const USERS_URI = `${API_PREFIX}/users`;
const LABORATORIES_URI = `${API_PREFIX}/laboratories`;

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
    GET_ALL: LABORATORIES_URI
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
 * Fetch API with logs
 * @param uri - The URI to fetch
 * @param options - The options for the fetch request
 * @returns The response from the fetch request
 */
export const fetchWithLogs = async (uri: string, options: RequestInit = {}): Promise<Response> => {
  try {
    const response = await fetch(uri, {
      ...options,
      headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    }
  });
  console.log(response);
  if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
}

/**
 * Fetch API with API key
 * @param uri - The URI to fetch
 * @param options - The options for the fetch request
 * @returns The response from the fetch request
 */
export const fetchWithApiKey = async (uri: string, data: any = {}, options: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    ...options,
    headers: {
      ...(options.headers || {}),
      'X-API-Key': process.env.API_KEY || '',
    },
  };

  return await axios.post(uri, data, config);
}

/**
 * Fetch API with cookie
 * @param uri - The URI to fetch
 * @param options - The options for the fetch request
 * @returns The response from the fetch request
 */
export const fetchWithCookie = async (uri: string, options: RequestInit = {}): Promise<Response> => {
  return fetchWithLogs(uri, {
    ...options,
    credentials: 'include' // This ensures the session cookie is sent with the request
  });
}