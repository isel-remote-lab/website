// Base API prefix
const BASE_URL = "http://nginx";

const API_PREFIX = `${BASE_URL}/api/v1`;

const PRIVATE_PREFIX = `${API_PREFIX}/_private`;

const AUTH_PREFIX = `${PRIVATE_PREFIX}/auth`;

const DOMAIN_URI = `${PRIVATE_PREFIX}/domain`;

const LOGIN_URI = `${AUTH_PREFIX}/login`;
const LOGOUT_URI = `${AUTH_PREFIX}/logout`;

const USERS_URI = `${API_PREFIX}/users`;
const LABORATORIES_URI = `${API_PREFIX}/laboratories`;
const GROUPS_URI = `${API_PREFIX}/groups`;

/**
 * API URIs for user-related operations
 */
export const Uris = {
  /**
   * URI for the domain endpoint
   */
  DOMAIN: DOMAIN_URI,

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

  /**
   * URI for group-related operations
   */
  Groups: {
    /**
     * URI for getting all groups
     */
    GET_ALL: GROUPS_URI,

    /**
     * URI for getting all groups from a laboratory
     */
    GET_ALL_FROM_LABORATORY: `${GROUPS_URI}/laboratory/{id}`,
  },
}
