import { Uris, replaceParams } from '~/services/api';

/**
 * User data interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  oauthId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User creation data interface
 */
export interface UserCreateData {
  name: string;
  email: string;
  oauthId?: string;
}

/**
 * User service for handling user-related API calls
 */
export const userService = {
  /**
   * Create a new user
   * @param userData - User data to create
   * @returns Created user data
   */
  createUser: async (userData: UserCreateData): Promise<User> => {
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
  getUserById: async (userId: string): Promise<User> => {
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
  getUserByEmail: async (email: string): Promise<User> => {
    const uri = `${Uris.Users.GET_BY_EMAIL}?email=${encodeURIComponent(email)}`;
    const response = await fetch(uri);
    
    if (!response.ok) {
      throw new Error(`Failed to get user by email: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  /**
   * Get a user by OAuth ID
   * @param oauthId - OAuth ID
   * @returns User data
   */
  getUserByOAuthId: async (oauthId: string): Promise<User> => {
    const uri = replaceParams(Uris.Users.GET_BY_OAUTHID, { oauthid: oauthId });
    const response = await fetch(uri);
    
    if (!response.ok) {
      throw new Error(`Failed to get user by OAuth ID: ${response.statusText}`);
    }
    
    return response.json();
  }
}; 