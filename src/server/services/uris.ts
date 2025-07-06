// Base API prefix
const INTERNAL_URI = "http://nginx";

const API_PREFIX = `${INTERNAL_URI}/api/v1`;

const PRIVATE_PREFIX = `${API_PREFIX}/_private`;

const AUTH_PREFIX = `${PRIVATE_PREFIX}/auth`;

const DOMAIN_URI = `${PRIVATE_PREFIX}/domain`;

const LOGIN_URI = `${AUTH_PREFIX}/login`;
const LOGOUT_URI = `${AUTH_PREFIX}/logout`;

const USERS_URI = `${API_PREFIX}/users`;
const LABORATORIES_URI = `${API_PREFIX}/laboratories`;
const RELATIVE_LABORATORIES_URI = `api/v1/laboratories`;
const GROUPS_URI = `${API_PREFIX}/groups`;
const HARDWARE_URI = `${API_PREFIX}/hardware`;

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
     * URI for getting all laboratories by user
     */
    GET_ALL_BY_USER: `${LABORATORIES_URI}/user/{userId}`, 

    /**
     * URI for getting a laboratory by ID
     */
    GET_BY_ID: `${LABORATORIES_URI}/{id}`,

    /**
     * URI for getting all groups from a laboratory
     */
    GET_LABORATORY_GROUPS: `${LABORATORIES_URI}/{id}/groups`,

    /**
     * URI for getting all hardware from a laboratory
     */
    GET_LABORATORY_HARDWARE: `${LABORATORIES_URI}/{id}/hardware`,
  },

  /**
   * URI for group-related operations
   */
  Groups: {
    /**
     * URI for getting all groups
     */
    ALL_GROUPS: GROUPS_URI,

    /**
     * URI for getting all groups from a laboratory
     */
    GET_ALL_FROM_LABORATORY: `${LABORATORIES_URI}/{id}/groups`,

    /**
     * URI for getting a group by ID
     */
    GROUP_BY_ID: `${GROUPS_URI}/{id}`,

    /**
     * URI for getting group users
     */
    GROUP_USERS: `${GROUPS_URI}/{id}/users`,
  },

  /**
   * URI for hardware-related operations
   */
  Hardware: {
    /**
     * URI for getting all hardware
     */
    GET_ALL: HARDWARE_URI,

    /**
     * URI for getting a hardware by ID
     */
    GET_BY_ID: `${HARDWARE_URI}/{id}`,

    /**
     * URI for getting all hardware from a laboratory
     */
    GET_ALL_FROM_LABORATORY: `${LABORATORIES_URI}/{id}/hardware`,
  },

  /**
   * URI for lab session endpoint
   */
  LabSession: {
    /**
     * URI for creating a lab session
     */
    CREATE: `${RELATIVE_LABORATORIES_URI}/{id}/sessions`,
  } 
}
