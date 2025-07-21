import type { AxiosRequestConfig } from "axios";
import { auth } from "~/server/auth";
import { fetchOnServerWithErrorHandling } from "../services";

/**
 * Fetches data from Microsoft Graph API
 * @param uri - The URI to fetch
 * @param options - The options for the fetch
 * @returns The response from the fetch
 */
export async function fetchMicrosoftApi(uri: string, options: AxiosRequestConfig = {}) {
  const session = await auth();
  const accessToken = session!.user.oauthUserToken;
  
  return (await fetchOnServerWithErrorHandling(uri, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })) as string;
}
/**
 * Fetches the user's profile picture from Microsoft Graph API
 * and returns it as a base64 encoded string.
 * @returns The user's profile picture as a base64 encoded string
 */
export async function getUserOwnImage() {
  const uri = "https://graph.microsoft.com/v1.0/me/photo/$value";

  const data = await fetchMicrosoftApi(uri, {
    responseType: "arraybuffer",
  }) as unknown as ArrayBuffer;

  if (data) {
    const base64 = Buffer.from(data).toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  }
}

/**
 * Fetches the user's profile picture from Microsoft Graph API
 * and returns it as a base64 encoded string.
 * @param userPrincipalName - The user principal name of the user to get the profile picture for
 * @returns The user's profile picture as a base64 encoded string
 */
export async function getUserImage(userPrincipalName: string) {
  const uri = `https://graph.microsoft.com/v1.0/users/${userPrincipalName}/photo/$value`;

  const data = await fetchMicrosoftApi(uri, {
    responseType: "arraybuffer",
  }) as unknown as ArrayBuffer;

  const base64 = Buffer.from(data).toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}
