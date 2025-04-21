import { type UserResponse } from "~/types/user";
import "~/env.js";
import { mockUserResponse } from "~/mocks/mockUser";

/**
 * Get a user by their OAuth ID
 * @param oauthId - The OAuth ID of the user
 * @returns The user or null if the user is not found
 */
export default async function getUserByOAuthId(
  oauthId: string,
): Promise<UserResponse | null> {
  // If API mocking is enabled, return the mock user response
  if (process.env.API_MOCKING === "enabled") {
    return mockUserResponse;
  }

  try {
    const response = await fetch(
      `https://localhost:8080/api/v1/user/${oauthId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      console.error("Error fetching user:", response.statusText);
      return null;
    }

    const data = (await response.json()) as UserResponse;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
