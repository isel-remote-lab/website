import Uris from "~/services/uris";
import { type RoleLetter, roleLetterToRole } from "~/types/role";
import { SignInResponse, UpdateUserRoleRequest, UserRequest, UserResponse } from "~/types/user";
import { fetchWithApiKey, fetchWithAuthHeader, replaceParams } from "./services";

/**
 * Sign in a user
 * @param userData - User data
 * @returns User data
 */
export async function signIn(userData: UserRequest): Promise<SignInResponse> {
  const uri = Uris.LOGIN;
  const response = await fetchWithApiKey(uri, userData);
  //await setCookies(response);
  return response;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const uri = Uris.LOGOUT;
  return await fetchWithAuthHeader(uri, {
    method: "POST",
  });
}

/**
 * Get a user by ID
 * @param userId - User ID
 * @returns User data
 */
export async function getUserById(userId: string): Promise<UserResponse> {
  const uri = await replaceParams(Uris.Users.GET, { id: userId });
  const user = await fetchWithAuthHeader(uri);
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
  return await fetchWithAuthHeader(uri);
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
  return await fetchWithAuthHeader(uri, {
    method: "PUT",
    data,
  });
}