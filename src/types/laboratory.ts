import dayjs from "dayjs";
import type { Group } from "./group";

/**
 * Format a duration in minutes to a dayjs object
 * @param duration - The duration in minutes
 * @returns The formatted duration
 */
export function formatNumberToDayjs(duration: number): dayjs.Dayjs {
  return dayjs().hour(Math.floor(duration / 60)).minute(duration % 60);
}

/**
 * Format a dayjs object to a duration in minutes
 * @param dayjs - The dayjs object
 * @returns The formatted duration
 */
function formatDayjsToNumber(dayjs: dayjs.Dayjs): number {
  return dayjs.hour() * 60 + dayjs.minute();
}

/**
 * Format a laboratory request to a laboratory
 * @param laboratory - The laboratory request
 * @returns The formatted laboratory
 */
export function formatLaboratory(laboratory: LaboratoryRequest): Laboratory {
  return {
    ...laboratory,
    duration: formatNumberToDayjs(laboratory.duration)
  } as Laboratory;
}

/**
 * Format a laboratory to a laboratory request
 * @param laboratory - The laboratory
 * @returns The formatted laboratory request
 */ 
export function formatLaboratoryRequest(laboratory: Laboratory): LaboratoryRequest {
  return {
    ...laboratory,
    duration: formatDayjsToNumber(laboratory.duration)
  } as LaboratoryRequest;
}

/**
 * Laboratory interface
 */
export type Laboratory = Omit<LaboratoryRequest, LaboratoryFields.DURATION> & {
  duration: dayjs.Dayjs;
};

/**
 * Laboratory fields enum - derived from LaboratoryRequest keys
 */
export enum LaboratoryFields {
  NAME = "name",
  DESCRIPTION = "description",
  DURATION = "duration",
  QUEUE_LIMIT = "queueLimit"
}

/**
 * Laboratory request data interface
 */
export interface LaboratoryRequest {
  name: string;
  description: string | null;
  duration: number;
  queueLimit: number;
}

/**
 * Laboratory response data interface
 */
export interface LaboratoryResponse {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  queueLimit: number;
  createdAt: Date;
  ownerId: number;
  groups?: Group[];
}
