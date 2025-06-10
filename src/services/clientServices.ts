import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import type { AxiosRequestConfig } from "axios";
import { auth } from "~/server/auth";
import type { ApiResponse } from "~/types/api";

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
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/api/auth/signin";
        } else {
          redirect("/api/auth/signin");
        }
      }
      console.error(error.response?.data.statusText);
    }
  }
}

/**
 * Helper function to fetch API response data object
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchApiData(
  uri: string,
  options: AxiosRequestConfig = {},
): Promise<unknown> {
  return (await fetchWithErrorHandling(uri, options) as ApiResponse<unknown>).data
}

/**
 * Fetch API with Authorization header
 * @param uri - The URI to fetch
 * @param options - The options for the axios request
 * @returns The response from the axios request
 */
export async function fetchDataWithAuthHeader(
  uri: string,
  options: AxiosRequestConfig = {},
  ): Promise<unknown> {
  const session = await auth();
  const userToken = session?.user.userToken;

  return await fetchApiData(uri, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${userToken}`,
    },
  });
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