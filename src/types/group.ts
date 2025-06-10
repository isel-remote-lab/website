/**
 * Group interface
 */
export type Group = GroupResponse;

/**
 * Group request data interface
 */
export interface GroupRequest {
  groupName: string;
  groupDescription: string;
}

/**
 * Group response data interface
 */
export interface GroupResponse {
  id: number;
  groupName: string;
  groupDescription: string;
  ownerId: number;
  createdAt: Date;
}
