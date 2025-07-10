import { Uris } from "~/server/services/uris";
import { type RoleLetter, roleLetterToRole } from "~/types/role";
import type { UpdateUserRoleRequest, UserResponse } from "~/types/user";
import { fetchDataOnServerWithAuthHeader, replaceParams } from "./services"; 

/**
 * Sign out the current user
 */
export async function signOut() {
  const uri = Uris.LOGOUT;
  return (await fetchDataOnServerWithAuthHeader(uri, {
    method: "POST",
  })) as void;
}

/**
 * Get a user by ID
 * @param userId - User ID
 * @returns User data
 */
export async function getUserById(userId: string): Promise<UserResponse> {
  const uri = await replaceParams(Uris.Users.GET, { id: userId });
  const user = (await fetchDataOnServerWithAuthHeader(uri)) as UserResponse;
  user.role = roleLetterToRole(user.role as unknown as RoleLetter);
  user.createdAt = new Date(user.createdAt).toLocaleDateString("pt-PT");
  return user;
}

/**
 * Get a user by email
 * @param email - User email
 * @returns User data
 */
export async function getUserByEmail(email: string): Promise<UserResponse> {
  const uri = await replaceParams(Uris.Users.GET_BY_EMAIL, { email: email });
  return (await fetchDataOnServerWithAuthHeader(uri)) as UserResponse;
}

/**
 * Update a user's role
 * @param userId - User ID
 * @param data - User role data
 * @returns Success response
 */
export async function updateUserRole(
  userId: string,
  data: UpdateUserRoleRequest,
): Promise<void> {
  const uri = await replaceParams(Uris.Users.UPDATE_ROLE, { id: userId });
  await fetchDataOnServerWithAuthHeader(uri, {
    method: "PATCH",
    data,
  });
}