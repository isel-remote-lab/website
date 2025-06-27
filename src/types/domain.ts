import type { GroupRequest } from "./group";
import type { LaboratoryRequest } from "./laboratory";
import type { HardwareRequest } from "./hardware";

/**
 * Domain configuration interface
 */
export interface DomainConfig {
  user: UserRestrictions;
  laboratory: LaboratoryRestrictions;
  group: GroupRestrictions;
  hardware: HardwareRestrictions;
}

/**
 * Restrictions objects interface
 */
export type RestrictionsObjects = DomainConfig[keyof DomainConfig];

/**
 * User restrictions interface
 */
interface UserRestrictions {
  tokenSizeInBytes: number;
  tokenTtl: number;
  tokenRollingTtl: number;
  tokenTtlDurationUnit: string;
  maxTokensPerUser: number;
}

/**
 * Laboratory restrictions interface
 */
export type LaboratoryRestrictions = {
  [K in keyof LaboratoryRequest]?: Restrictions;
};

/**
 * Group restrictions interface
 */
export type GroupRestrictions = {
  [K in keyof GroupRequest]?: Restrictions;
};

/**
 * Hardware restrictions interface
 */
export type HardwareRestrictions = {
  [K in keyof HardwareRequest]?: Restrictions;
};

/**
 * Restrictions interface
 */
export interface Restrictions {
  min: number;
  max: number;
  optional: boolean;
  unit?: string;
}

