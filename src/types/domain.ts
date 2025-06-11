import { GroupRequest } from "./group";
import { LaboratoryRequest } from "./laboratory";

/**
 * Domain configuration interface
 */
export interface DomainConfig {
  user: UserRestrictions;
  laboratory: LaboratoryRestrictions;
  group: GroupRestrictions;
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
 * Restrictions interface
 */
export interface Restrictions {
  min: number;
  max: number;
  optional: boolean;
  unit?: string;
}

