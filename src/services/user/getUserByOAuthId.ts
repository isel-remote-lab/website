import { type UserResponse } from "~/types/user";

export default async function getUserByOAuthId(
  oauthId: string
): Promise<UserResponse | null> {
  try {
    const response = await fetch(`https://api.mockapi.com/api/v1/user/${oauthId}`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.X_API_KEY!,
      },
    });

    if (!response.ok) {
      console.error("Error fetching user:", response.statusText)
      return null
    }

    const data = await response.json() as UserResponse
    return data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}