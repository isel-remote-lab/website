import { auth } from "~/server/auth";

/**
 * Fetches the user's profile picture from Microsoft Graph API
 * and returns it as a base64 encoded string.
 * @returns The user's profile picture as a base64 encoded string
 */
export async function getUserOwnImage() {
  const session = await auth();
  const accessToken = session!.user.accessToken;

  try {
    const res = await fetch(
      "https://graph.microsoft.com/v1.0/me/photo/$value",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      return `data:image/jpeg;base64,${base64}`;
    } else {
      console.error("Failed to get user profile picture, status:", res.status)
    }
  } catch (error) {
    console.error("Failed to get user profile picture:", error);
  }
}

/**
 * Fetches the user's profile picture from Microsoft Graph API
 * and returns it as a base64 encoded string.
 * @param userPrincipalName - The user principal name of the user to get the profile picture for
 * @returns The user's profile picture as a base64 encoded string
 */
export async function getUserImage(userPrincipalName: string) {
  const session = await auth();
  const accessToken = session!.user.accessToken;

  try {
    const res = await fetch(`https://graph.microsoft.com/v1.0/users/${userPrincipalName}/photo/$value`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      return `data:image/jpeg;base64,${base64}`;
    } else {
      console.error("Failed to get user profile picture, status:", res.status)
    }
  } catch (error) {
    console.error("Failed to get user profile picture:", error);
  }
}
