// Base API prefix
const DOCKER_URL = "http://api:8080";
const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
const API_PREFIX = `${BASE_URL}/api/v1`;
const AUTH_URI = `${API_PREFIX}/auth`;
const LOGIN_URI = `${DOCKER_URL}/api/v1/auth/login`;
const LOGOUT_URI = `${AUTH_URI}/logout`;
const USERS_URI = `${API_PREFIX}/users`;
const LABORATORIES_URI = `${API_PREFIX}/laboratories`;

/**
 * API URIs for user-related operations
 */
export default {
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
    GET_BY_OAUTHID: `${USERS_URI}/{oauthid}`,

    /**
     * URI for updating a user's role
     */
    UPDATE_ROLE: `${USERS_URI}/role`,
  },

  /**
   * URI for laboratory-related operations
   */
  Laboratories: {
    /**
     * URI for getting all laboratories
     */
    GET_ALL: LABORATORIES_URI,

    /**
     * URI for getting a laboratory by ID
     */
    GET_BY_ID: `${LABORATORIES_URI}/{id}`,
  },
}
