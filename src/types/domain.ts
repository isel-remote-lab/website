/**
 * Domain configuration interface
 */
export default interface DomainConfig {
  laboratory: {
    labName: LabEntryConfig;
    labDescription: LabEntryConfig;
    labQueueLimit: LabEntryConfig;
    labDuration: LabEntryConfig;
  };
}

/**
 * Laboratory entry configuration interface
 */
interface LabEntryConfig {
  min: number;
  max: number;
  optional: boolean;
  unit?: string;
}
