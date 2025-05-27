const DOMAIN_CONFIG_PATH = process.env.DOMAIN_CONFIG_PATH ?? "../../domain-config.json" ?? "../../../api/host/src/main/resources/domain-config.json";

interface LabConfig {
  min: number;
  max: number;
  optional: boolean;
  unit?: string;
}

interface DomainConfig {
  laboratory: {
    labName: LabConfig;
    labDescription: LabConfig;
    labQueueLimit: LabConfig;
    labDuration: LabConfig;
  };
}

const domainConfig = await import(DOMAIN_CONFIG_PATH) as DomainConfig;

const laboratory = domainConfig.laboratory;

export const labConfig = {
  name: laboratory.labName,
  description: laboratory.labDescription,
  queueLimit: laboratory.labQueueLimit,
  duration: laboratory.labDuration,
};
