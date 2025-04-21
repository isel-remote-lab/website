import { RoleLetter } from "./role"

export default interface User {
  userId: number
  oauthId: string
  role: RoleLetter
  username: string
  email: string
  createdAt: Date
}

export interface UserRequest {
  oauthId: string
  role: RoleLetter
  username: string
  email: string
}

export type UserResponse = User
