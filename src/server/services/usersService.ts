import { Uris } from "~/server/services/uris";
import { type RoleLetter, roleLetterToRole } from "~/types/role";
import type { SignInResponse, UpdateUserRoleRequest, UserRequest, UserResponse } from "~/types/user";
import { fetchDataWithApiKey, fetchDataWithAuthHeader, replaceParams } from "./services";

/**
 * Sign in a user
 * @param userData - User data
 * @returns User data
 */
export async function signIn(userData: UserRequest): Promise<SignInResponse> {
  const uri = Uris.LOGIN;
  return (await fetchDataWithApiKey(uri, userData)) as SignInResponse;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const uri = Uris.LOGOUT;
  return (await fetchDataWithAuthHeader(uri, {
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
  const user = (await fetchDataWithAuthHeader(uri)) as UserResponse;
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
  return (await fetchDataWithAuthHeader(uri)) as UserResponse;
}

/**
 * Update a user's role
 * @param data - User email and new role
 * @returns Updated user data
 */
export async function updateUserRole(
  data: UpdateUserRoleRequest,
): Promise<UserResponse> {
  const uri = Uris.Users.UPDATE_ROLE;
  return (await fetchDataWithAuthHeader(uri, {
    method: "PUT",
    data,
  })) as UserResponse;
}