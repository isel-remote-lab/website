import { Uris, replaceParams } from '~/services/api';
import { RoleLetter } from '~/types/role';

/**
 * User data interface
 */ 
export type User = {
  userId: number
  oauthId: string
  role: RoleLetter
  username: string
  email: string
  createdAt: Date
}

/**
 * User request data interface
 */
export type UserRequest = {
  oauthId: string
  role: RoleLetter
  username: string
  email: string
}

/**
 * User response data interface
 */
export type UserResponse = User

/**
 * User service for handling user-related API calls
 */
export const userService = {

  /**
   * Get a user by OAuth ID
   * @param oauthId - OAuth ID
   * @returns User data
   */
    getUserByOAuthId: async (oauthId: string): Promise<UserResponse> => {
      const uri = replaceParams(Uris.Users.GET_BY_OAUTHID, { oauthid: oauthId });
      const response = await fetch(uri);
      
      if (!response.ok) {
        throw new Error(`Failed to get user by OAuth ID: ${response.statusText}`);
      }
      
    return response.json();
  },

  /**
   * Create a new user
   * @param userData - User data to create
   * @returns Created user data
   */
  createUser: async (userData: UserRequest): Promise<UserResponse> => {
    const response = await fetch(Uris.Users.CREATE, {
      method: 'POST',
      headers: {
        'X-API-Key': process.env.API_KEY!,
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  /**
   * Get a user by ID
   * @param userId - User ID
   * @returns User data
   */
  getUserById: async (userId: string): Promise<UserResponse> => {
    const uri = replaceParams(Uris.Users.GET, { id: userId });
    const response = await fetch(uri);
    
    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  /**
   * Get a user by email
   * @param email - User email
   * @returns User data
   */
  getUserByEmail: async (email: string): Promise<UserResponse> => {
    const uri = `${Uris.Users.GET_BY_EMAIL}?email=${encodeURIComponent(email)}`;
    const response = await fetch(uri);
    
    if (!response.ok) {
      throw new Error(`Failed to get user by email: ${response.statusText}`);
    }
    
    return response.json();
  },
}; 