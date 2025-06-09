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
    console.log('Making request to:', uri);
    console.log('Request options:', {
      method: options.method,
      headers: options.headers,
      data: options.data,
    });
    
    const response = await axios({
      url: uri,
      ...options,
      headers: {
        ...options.headers,
      },
    });
    
    console.log('Response status:', response.status);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Request failed with details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data,
        }
      });
      
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/api/auth/signin";
        } else {
          redirect("/api/auth/signin");
        }
      }
    } else {
      console.error('Unknown error:', error);
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
export async function fetchApi(
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
    method: options.method || "POST",
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