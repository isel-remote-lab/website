export default interface User {
  userId: number
  oauthId: string
  role: string
  username: string
  email: string
  createdAt: Date
}

export interface UserRequest {
  oauthId: string
  role: string
  username: string
  email: string
}

export type UserResponse = User
