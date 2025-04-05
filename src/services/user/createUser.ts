import { type UserRequest } from "../../types/user";

export default async function createUser(user: UserRequest): Promise<boolean> {
  // Simulate a database insert operation
  await fetch("https://api.mockapi.com/api/v1/user/{id}", {
    method: "POST",
    headers: {
      "x-api-key": process.env.X_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).catch((error) => console.error("Error:", error));
  return true;
}
