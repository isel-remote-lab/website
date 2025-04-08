import { type UserResponse } from "~/types/user";
import "~/env.js";

export default async function getUserByOAuthId(
  oauthId: string,
): Promise<UserResponse | null> {
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
