import { AxiosResponse } from 'axios';
import { Uris, fetchWithCookie, replaceParams, fetchWithApiKey } from '~/services/api';
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
 * Set cookies from the response
 * @param response - The response from the fetch request
 */
async function setCookies(response: AxiosResponse) {
  const headerCookies = response.headers["set-cookie"];
  if (headerCookies && headerCookies.length > 0) {
    headerCookies.forEach(async (cookie: string) => {
      const parsedCookie = parse(cookie);
      const [cookieName, cookieValue] = Object.entries(parsedCookie)[0] as [string, string];
      const httpOnly = cookie.includes("httponly;");

      (await cookies()).set({
        name: cookieName,
        value: cookieValue,
        httpOnly: httpOnly,
      });
    });
  }
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
      const response = await fetchWithApiKey(uri, userData);
      await setCookies(response);
      return response.data.data;
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(`Failed to sign in: ${error.message}`);
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    const uri = Uris.LOGOUT;
    try {
      await fetchWithCookie(uri, {
        method: 'POST'
      });
    } catch (error: any) {
      throw new Error(`Failed to sign out: ${error.message}`);
    }
  },
  
  /**
   * Get a user by ID
   * @param userId - User ID
   * @returns User data
   */
  getUserById: async (userId: string): Promise<UserResponse> => {
    const uri = replaceParams(Uris.Users.GET, { id: userId });
    try {
      const response = await fetchWithCookie(uri);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  },
  
  /**
   * Get a user by email
   * @param email - User email
   * @returns User data
   */
  getUserByEmail: async (email: string): Promise<UserResponse> => {
    const uri = `${Uris.Users.GET_BY_EMAIL}?email=${encodeURIComponent(email)}`;
    try {
      const response = await fetchWithCookie(uri);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get user by email: ${error.message}`);
    }
  },
}; 