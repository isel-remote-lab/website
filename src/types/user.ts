import type { Role } from "./role";

/**
 * User info interface
 */
export type UserInfo = {
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  image: string;
}

/**
 * User data interface
 */
export type User = {
  id: number;
} & UserInfo;

/**
 * User login request data interface
 */
export type UserRequest = {
  name: string;
  email: string;
};

/**
 * User response data interface
 */
export type UserResponse = User;

/**
 * Sign in response data interface
 */
export type SignInResponse = {
  user: UserResponse;
  token: string;
};

/**
 * Update user role request data interface
 */
export type UpdateUserRoleRequest = {
  email: string;
  role: Role;
};
