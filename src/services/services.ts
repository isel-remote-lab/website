"use server";

import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { auth } from "~/server/auth";

/**
 * Helper function to replace path parameters in URIs
 * @param {string} uri - The URI template with parameters
 * @param {Object} params - Object containing parameter values
 * @returns {string} - The URI with parameters replaced
 */
export async function replaceParams(uri: string, params: object): Promise<string> {
  let result = uri;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value as string);
  });
  return result;
}

/**
 * Function to fetch data from a URI with error handling and redirect to login if 401
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchWithErrorHandling(
  uri: string,
  options: AxiosRequestConfig = {},
): Promise<unknown> {
  try {
    return (await axios({
      url: uri,
      ...options,
      headers: {
        ...options.headers,
      },
    })).data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // If the code is running on the client side, make the redirect happen on the client side
        window.location.href = "/api/auth/signin";
      } else {
        // If the code is running on the server side, make the redirect happen on the server side
        redirect("/api/auth/signin");
      }
    }
    throw error;
  }
}

/**
 * Helper function to fetch API response data object
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
async function fetchApi(
  uri: string,
  options: AxiosRequestConfig = {},
): Promise<unknown> {
  return (await fetchWithErrorHandling(uri, {
    ...options,
  }) as AxiosResponse).data;
}

/**
 * Fetch API with API key
 * @param uri - The URI to fetch
 * @param data - The data to send
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchWithApiKey(
  uri: string,
  data: unknown = {},
  options: AxiosRequestConfig = {},
): Promise<unknown> {
  return await fetchApi(uri, {
    ...options,
    method: "POST",
    data: data,
    ...options,
    headers: {
      ...options.headers,
      "X-API-Key": process.env.API_KEY,
    },
  });
}

/**
 * Fetch API with Authorization header
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchWithAuthHeader(
  uri: string,
  options: AxiosRequestConfig = {},
  ): Promise<unknown> {
  const session = await auth();
  const userToken = session?.user.userToken;

  return await fetchApi(uri, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${userToken}`,
    },
  }) as AxiosResponse;
}

/**
 * Fetch API with cookie
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
/*
export async function fetchWithCookie(
  uri: string,
  options: AxiosRequestConfig = {},
): Promise<any> {
  return await fetchApi(uri, {
    ...options,
    withCredentials: true, // This ensures the session cookie is sent with the request
  });
}
*/
