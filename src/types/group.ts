import { LaboratoryFields } from "./laboratory";

/**
 * Group interface
 */
export type Group = GroupResponse;

/**
 * Group fields enum - derived from GroupRequest keys
 */
export enum GroupFields {
  NAME = LaboratoryFields.NAME,
  DESCRIPTION = LaboratoryFields.DESCRIPTION
}

/**
 * Group request data interface
 */
export interface GroupRequest {
  name: string;
  description: string;
}

/**
 * Group response data interface
 */
export interface GroupResponse {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  createdAt: Date;
}
