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
 * User login request data interface
 */
export type UserRequest = {
  oauthId: string,
  username: string,
  email: string,
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
   * Sign in a user
   * @param userData - User data
   * @returns User data
   */
  signIn: async (userData: UserRequest): Promise<UserResponse> => {
    const uri = Uris.LOGIN;
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to sign in: ${response.statusText}`);
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
    const response = await fetch(uri, {
      credentials: 'include'
    });
    
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
    const response = await fetch(uri, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get user by email: ${response.statusText}`);
    }
    
    return response.json();
  },
}; 