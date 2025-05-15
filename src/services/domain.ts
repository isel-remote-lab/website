interface LabConfig {
  optional: boolean;
  min: number;
  max: number;
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
  process.env.DOMAIN_CONFIG_PATH || "../../../api/host/src/main/resources/domain-config.json",
);

export const labConfig = {
  name: domainConfig.laboratory.labName,
  description: domainConfig.laboratory.labDescription,
  queueLimit: domainConfig.laboratory.labQueueLimit,
  duration: domainConfig.laboratory.labDuration,
};
