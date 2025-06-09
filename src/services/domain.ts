import DomainConfig from "~/types/domain";
import { fetchWithApiKey } from "./services";
import Uris from "./uris";

let domainConfig: DomainConfig | null = null;

// Fallback configuration in case the API is not available
const fallbackConfig: DomainConfig = {
  laboratory: {
    labName: {
      min: 1,
      max: 10,
      optional: false,
    },
    labDescription: {
      min: 1,
      max: 10,
      optional: true,
    },
    labQueueLimit: {
      min: 1,
      max: 10,
      optional: false,
    },
    labDuration: {
      min: 1,
      max: 10,
      optional: false,
    },
  },
};

export const getDomainConfig = async (): Promise<DomainConfig> => {
  if (!domainConfig) {
    try {
      domainConfig = await fetchWithApiKey(Uris.DOMAIN, {}, {
        method: "GET",
      }) as DomainConfig;
    } catch (error) {
      console.error("Failed to fetch domain configuration:", error);
      return fallbackConfig;
    }
  }
  return domainConfig;
};