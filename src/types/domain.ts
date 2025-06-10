/**
 * Domain configuration interface
 */
export default interface DomainConfig {
  user: UserRestrictions;
  laboratory: LaboratoryRestrictions;
  group: GroupRestrictions;
}

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
interface LaboratoryRestrictions {
  labName: Properties;
  labDescription: Properties;
  labDuration: Properties;
  labQueueLimit: Properties;
}

/**
 * Group restrictions interface
 */
interface GroupRestrictions {
  groupName: Properties;
  groupDescription: Properties;
}

/**
 * Properties interface
 */
interface Properties {
  min: number;
  max: number;
  optional: boolean;
  unit?: string;
}
