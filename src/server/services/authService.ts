import { Uris } from "~/server/services/uris";
import type { SignInResponse, UserRequest } from "~/types/user";
import axios, { type AxiosResponse } from "axios";
import { parse } from "cookie";
import { cookies } from "next/headers";

/**
 * Set cookies from the response
 * @param response - The response from the fetch request
 */
export const setCookies = async (response: AxiosResponse) => {
  const headerCookies = response.headers["set-cookie"];
  if (headerCookies && headerCookies.length > 0) {
    for (const cookie of headerCookies) {
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
    }
  }
}

/**
 * Sign in a user
 * @param userData - User data
 * @returns User data
 */
export async function signIn(userData: UserRequest): Promise<SignInResponse> {
  const uri = Uris.LOGIN;
    try {
      const response = await axios.post<{
        data: SignInResponse;
      }>(uri, userData, {
        headers: {
          'X-API-Key': process.env.API_KEY ?? '',
        },
      });
    
      await setCookies(response);
      return response.data.data;
    } catch (error: unknown) {
      console.error('Error signing in:', error);
      if (typeof error === 'object' && error !== null && 'message' in error) {
        throw new Error(`Failed to sign in: ${(error as { message: string }).message}`);
      } else {
        throw new Error('Failed to sign in: Unknown error');
      }
    }
} 