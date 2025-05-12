import axios from 'axios';
import { Uris, fetchWithCookie, replaceParams } from '~/services/api';
import { Role } from '~/types/role';
import { parse } from "cookie";
import { cookies } from 'next/headers';


/**
 * User data interface
 */ 
export type User = {
  userId: number
  name: string
  email: string
  role: Role
  createdAt: string
}

/**
 * User login request data interface
 */
export type UserRequest = {
  name: string,
  email: string,
}

/**
 * User response data interface
 */
export type UserResponse = User

/**
 * Sign in response data interface
 */
export type SignInResponse = {
  user: UserResponse,
  token: string,
}

/**
 * User service for handling user-related API calls
 */
export const userService = {

  /**
   * Sign in a user
   * @param userData - User data
   * @returns User data
   */
  signIn: async (userData: UserRequest): Promise<SignInResponse> => {
    const uri = Uris.LOGIN;
    
    try {
      const response = await axios.post(uri, userData, {
        headers: {
          'X-API-Key': process.env.API_KEY || '',
          'Content-Type': 'application/json',
        },
      });
  
    const apiCookies = response.headers["set-cookie"];
    console.log("apiCookies", apiCookies);
    if (apiCookies && apiCookies.length > 0) {
        apiCookies.forEach((cookie) => {
            const parsedCookie = parse(cookie);
            const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
            const httpOnly = cookie.includes("httponly;");

            cookies().set({
                name: cookieName,
                value: cookieValue,
                httpOnly: httpOnly,
            });
        });
    }

      return response.data.data;
    } catch (error: any) {
      const status = error.response?.status || 'No status';
      const statusText = error.response?.statusText || 'No statusText';
      const responseText = error.response?.data || 'No response';

      console.log(error);
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    const uri = Uris.LOGOUT;
    const response = await fetchWithCookie(uri,
      {
        method: 'POST'
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to sign out: ${response.statusText}`);
    }
  },
  
  /**
   * Get a user by ID
   * @param userId - User ID+
   * @returns User data
   */
  getUserById: async (userId: string): Promise<UserResponse> => {
    const uri = replaceParams(Uris.Users.GET, { id: userId });
    const response = await fetchWithCookie(uri);
    
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
    const response = await fetchWithCookie(uri);
    
    if (!response.ok) {
      throw new Error(`Failed to get user by email: ${response.statusText}`);
    }
    
    return response.json();
  },
}; 