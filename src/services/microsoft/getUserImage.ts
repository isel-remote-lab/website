import { auth } from "~/server/auth"

/**
 * Fetches the user's profile picture from Microsoft Graph API
 * and returns it as a base64 encoded string.
 * @returns The user's profile picture as a base64 encoded string
 */
export default async function getUserImage() {
    const session = await auth()
    const accessToken = session!.accessToken!
    
    try {
        const res = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
          headers: {
            Authorization: `Bearer ${accessToken as string}`,
          },
        });
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          const base64 = Buffer.from(buffer).toString("base64");
          return `data:image/jpeg;base64,${base64}`;
        } else {
          console.error("Failed to get user profile picture, status:", res.status);
        }
      } catch (error) {
        console.error("Failed to get user profile picture:", error);
      }
}