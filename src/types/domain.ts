/**
 * Domain configuration interface
 */
export default interface DomainConfig {
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
export interface LaboratoryRestrictions {
  labName: Restrictions;
  labDescription: Restrictions;
  labDuration: Restrictions;
  labQueueLimit: Restrictions;
}

/**
 * Group restrictions interface
 */
export interface GroupRestrictions {
  groupName: Restrictions;
  groupDescription: Restrictions;
}

/**
 * Restrictions interface
 */
export interface Restrictions {
  min: number;
  max: number;
  optional: boolean;
  unit?: string;
}
