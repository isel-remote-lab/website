"use server";

import type { AxiosRequestConfig } from "axios";
import { fetchApiData, fetchDataWithAuthHeader, fetchWithErrorHandling } from "~/services/clientServices";

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
export const fetchOnServerWithErrorHandling = fetchWithErrorHandling;

/**
 * Helper function to fetch API response data object
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export const fetchApiDataOnServer = fetchApiData;

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
export const fetchDataOnServerWithAuthHeader = fetchDataWithAuthHeader;