//"use client"

import { Uris } from "~/server/services/uris";
import type { SignInResponse, UserRequest } from "~/types/user";
import { setCookies } from "../auth/config";
import axios from "axios";

// TODO: Remove this file and use the usersService.ts file instead, improve the setCookies to work with sse

/**
 * Sign in a user
 * @param userData - User data
 * @returns User data
 */
export async function signIn(userData: UserRequest): Promise<SignInResponse> {
  const uri = Uris.LOGIN;
    try {
      const response = await axios.post(uri, userData, {
        headers: {
          'X-API-Key': process.env.API_KEY || '',
        },
      });
    
      await setCookies(response);
      return response.data.data;
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(`Failed to sign in: ${error.message}`);
    }
} 