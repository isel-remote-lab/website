/**
 * Group interface
 */
export type Group = GroupResponse;

/**
 * Group request data interface
 */
export interface GroupRequest {
  groupName: string | null;
  groupDescription: string | null;
}

/**
 * Group response data interface
 */
export interface GroupResponse {
  id: number;
  groupName: string | null;
  groupDescription: string | null;
  ownerId: number;
  createdAt: Date;
}
