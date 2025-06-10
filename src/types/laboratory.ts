import type { Group } from "./group";

/**
 * Laboratory interface
 */
export type Laboratory = LaboratoryResponse;

/**
 * Laboratory request data interface
 */
export interface LaboratoryRequest {
  labName: string | null;
  labDescription: string | null;
  labQueueLimit: number | null;
  labDuration: number | null;
}

/**
 * Laboratory response data interface
 */
export interface LaboratoryResponse {
  id: number;
  labName: string;
  labDescription: string | null;
  labDuration: number;
  labQueueLimit: number;
  labCreatedAt: Date;
  labOwnerId: number;
  groups?: Group[];
}
