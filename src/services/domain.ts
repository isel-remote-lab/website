import { fetchWithApiKey } from "./api/server/serverServices";
import Uris from "./uris";

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

const domainConfig = await fetchWithApiKey(Uris.DOMAIN) as DomainConfig;

console.log(domainConfig);

const laboratory = domainConfig.laboratory;

export const labConfig = {
  name: laboratory.labName,
  description: laboratory.labDescription,
  queueLimit: laboratory.labQueueLimit,
  duration: laboratory.labDuration,
};
