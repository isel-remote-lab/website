import { fetchWithApiKey } from "./services";
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

// TODO: Add the domain fetch to the start of the app, so that it runs only once

/*
const domainConfig = await fetchWithApiKey(Uris.DOMAIN, {}, {
  method: "GET",
}) as DomainConfig;
 */

//const laboratory = domainConfig.laboratory;

/*
export const labConfig = {
  name: laboratory.labName,
  description: laboratory.labDescription,
  queueLimit: laboratory.labQueueLimit,
  duration: laboratory.labDuration,
};
*/

export const labConfig = {
  name: {
    min: 1,
    max: 10,
    optional: false,
  },
  description: {
    min: 1,
    max: 10,
    optional: true,
  },
  queueLimit: {
    min: 1,
    max: 10,
    optional: false,
  },
  duration: {
    min: 1,
    max: 10,
    optional: false,
  },
};
