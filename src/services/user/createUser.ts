import { type UserRequest } from "../../types/user";

export default async function createUser(user: UserRequest): Promise<boolean> {
  if (process.env.API_MOCKING === "enabled") {
    // If API mocking is enabled, simulate a successful response
    console.log("Mocking API response for createUser with user:", user);
    return true;
  }

  await fetch("https://localhost:8080/api/v1/user/{id}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).catch((error) => console.error("Error:", error));
  return true;
}
