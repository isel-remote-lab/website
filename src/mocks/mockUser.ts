import { type User, type UserResponse } from "~/services/userService";

const MOCK_USER_ROLE = "T";

/**
 * Mock user
 * @type {User}
 */
export const mockUser: User = {
    userId: 0,
    username: "John Doe",
    email: "john.doe@example.com",
    role: MOCK_USER_ROLE,
    oauthId: "0",
    createdAt: new Date(),
}

export const mockUserResponse: UserResponse = {
    userId: 0,
    username: "John Doe",
    email: "john.doe@example.com",
    role: MOCK_USER_ROLE,
    oauthId: "0",
    createdAt: new Date(),
}