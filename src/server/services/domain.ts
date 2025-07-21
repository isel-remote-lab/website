"use server";

import type { DomainConfig } from "~/types/domain";
import { fetchDataWithApiKey } from "./services";
import { Uris } from "./uris";

let domainConfig: DomainConfig | null = null;

export const getDomainConfig = async (): Promise<DomainConfig> => {
  if (!domainConfig) {
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