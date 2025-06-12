"use server";

import type { AxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import type { ApiResponse } from "~/types/api";

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
export async function fetchOnServerWithErrorHandling(
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
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/api/auth/signin";
        } else {
          redirect("/api/auth/signin");
        }
      }
      console.error(error.response?.data ?? error.message);
    }
  }
}

/**
 * Helper function to fetch API response data object
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchApiDataOnServer(
  uri: string,
  options: AxiosRequestConfig = {},
): Promise<unknown> {
  return (await fetchOnServerWithErrorHandling(uri, options) as ApiResponse<unknown>).data;
}

/**
 * Fetch API with API key
 * @param uri - The URI to fetch
 * @param data - The data to send
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchDataWithApiKey(
  uri: string,
  data: unknown = {},
  options: AxiosRequestConfig = {},
): Promise<unknown> {
  return await fetchApiDataOnServer(uri, {
    ...options,
    method: options.method ?? "POST",
    data: data,
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
export async function fetchDataOnServerWithAuthHeader(
  uri: string,
  options: AxiosRequestConfig = {},
): Promise<unknown> {
  const session = await auth();
  const userToken = session?.user.userToken;

  return await fetchApiDataOnServer(uri, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${userToken}`,
    },
  });
}