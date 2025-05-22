"use server";

import axios from "axios";
import { redirect } from "next/navigation";

import { AxiosRequestConfig } from "axios";
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
    result = result.replace(`{${key}}`, value);
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
): Promise<any> {
  try {
    return (await axios({
      url: uri,
      ...options,
      headers: {
        ...options.headers,
      },
    })).data;
  } catch (error: any) {
    if (error.response.status === 401) {
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
): Promise<any> {
  return (await fetchWithErrorHandling(uri, {
    ...options,
  })).data
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
  data: any = {},
  options: AxiosRequestConfig = {},
): Promise<any> {
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
 * Fetch API with cookie
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchWithCookie(
  uri: string,
  options: AxiosRequestConfig = {},
): Promise<any> {
  return await fetchApi(uri, {
    ...options,
    withCredentials: true, // This ensures the session cookie is sent with the request
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
): Promise<any> {
  const session = await auth();
  const userToken = session?.user.userToken;

  return await fetchApi(uri, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${userToken}`,
    },
  });
}
