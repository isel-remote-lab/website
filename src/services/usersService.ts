import { type AxiosResponse } from "axios";
import {
  Uris,
  fetchWithCookie,
  replaceParams,
  fetchWithApiKey,
} from "~/services/api";
import { type RoleLetter, roleLetterToRole } from "~/types/role";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { type UserInfo } from "~/app/users/[id]/UserInfo";
import { type Role } from "~/types/role";

/**
 * User data interface
 */
export type User = {
  userId: number;
} & UserInfo;

/**
 * User login request data interface
 */
export type UserRequest = {
  name: string;
  email: string;
};

/**
 * User response data interface
 */
export type UserResponse = User;

/**
 * Sign in response data interface
 */
export type SignInResponse = {
  user: UserResponse;
  token: string;
};

/**
 * Update user role request data interface
 */
export type UpdateUserRoleRequest = {
  email: string;
  role: Role;
};

/**
 * Set cookies from the response
 * @param response - The response from the fetch request
 */
async function setCookies(response: AxiosResponse) {
  const headerCookies = response.headers["set-cookie"];
  if (headerCookies && headerCookies.length > 0) {
    headerCookies.forEach(async (cookie: string) => {
      const parsedCookie = parse(cookie);
      const [cookieName, cookieValue] = Object.entries(parsedCookie)[0] as [
        string,
        string,
      ];
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
export const usersService = {
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
      return response.data.data as unknown as SignInResponse;
    } catch (error: unknown) {
      console.error("Error signing in:", error);
      throw new Error(
        `Failed to sign in: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    const uri = Uris.LOGOUT;
    try {
      await fetchWithCookie(uri, {
        method: "POST",
      });
    } catch (error: unknown) {
      throw new Error(
        `Failed to sign out: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
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

      const user = response.data.data.user as unknown as UserResponse;

      user.role = roleLetterToRole(user.role as unknown as RoleLetter);
      user.createdAt = new Date(user.createdAt).toLocaleDateString("pt-PT");
      return user;
    } catch (error: unknown) {
      throw new Error(
        `Failed to get user: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  },

  /**
   * Get a user by email
   * @param email - User email
   * @returns User data
   */
  getUserByEmail: async (email: string): Promise<UserResponse> => {
    const uri = replaceParams(Uris.Users.GET_BY_EMAIL, { email: email });
    try {
      const response = await fetchWithCookie(uri);
      return response.data as unknown as UserResponse;
    } catch (error: unknown) {
      throw new Error(
        `Failed to get user by email: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  },

  /**
   * Update a user's role
   * @param data - User email and new role
   * @returns Updated user data
   */
  updateUserRole: async (
    data: UpdateUserRoleRequest,
  ): Promise<UserResponse> => {
    const uri = Uris.Users.UPDATE_ROLE;
    try {
      const response = await fetchWithCookie(uri, {
        method: "PUT",
        data,
      });
      return response.data as unknown as UserResponse;
    } catch (error: unknown) {
      throw new Error(
        `Failed to update user role: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  },
};
