"use server";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { fetchApiOnClient, fetchOnClientWithAuthHeader, fetchOnClientWithErrorHandling } from "../services";

/**
 * Function to fetch data from a URI with error handling and redirect to login if 401
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export const fetchWithErrorHandling = fetchOnClientWithErrorHandling;

/**
 * Helper function to fetch API response data object
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
const fetchApi = fetchApiOnClient;

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
  console.log(process.env.API_KEY);
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
export const fetchWithAuthHeader = fetchOnClientWithAuthHeader;
