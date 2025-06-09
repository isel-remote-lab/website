import type DomainConfig from "~/types/domain";
import { fetchDataWithApiKey } from "./services";
import { Uris } from "./uris";
import { ApiResponse } from "~/types/api";

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
    console.log("Fetching domain configuration...");
    try {
      domainConfig = await fetchDataWithApiKey(Uris.DOMAIN, {}, {
        method: "GET",
      }) as DomainConfig;
    } catch (error) {
      console.error("Failed to fetch domain configuration:", error);
      throw error;
    }
  }
  return domainConfig;
};