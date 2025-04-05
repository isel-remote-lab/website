export default interface User {
  id: number;
  oauthId: string;
  role: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface UserRequest {
  oauthId: string;
  role: string;
  username: string;
  email: string;
}

export interface UserResponse {
  id: string;
  oauthId: string;
  role: string;
  username: string;
  email: string;
  createdAt: Date;
}
