const DOMAIN_CONFIG_PATH = process.env.DOMAIN_CONFIG_PATH

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

const domainConfig: DomainConfig = require(
  DOMAIN_CONFIG_PATH || "../../domain-config.json" || "../../../api/host/src/main/resources/domain-config.json",
);

export const labConfig = {
  name: domainConfig.laboratory.labName,
  description: domainConfig.laboratory.labDescription,
  queueLimit: domainConfig.laboratory.labQueueLimit,
  duration: domainConfig.laboratory.labDuration,
};
