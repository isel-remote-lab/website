import { fetchWithAuthHeader, replaceParams } from "~/services/services";
import uris from "~/services/uris";
import { type LaboratoryRequest } from "~/types/laboratory";
import type Laboratory from "~/types/laboratory";

/**
 * Get all laboratories
 * @returns List of laboratories
 */
export async function getAllLabs(): Promise<Laboratory[]> {
  const uri = uris.Laboratories.GET_ALL;
  return await fetchWithAuthHeader(uri) as Laboratory[];
}

/**
 * Get a laboratory by ID
 * @param labId - Laboratory ID
 * @returns Laboratory data
 */
export async function getLabById(labId: number): Promise<Laboratory> {
  const uri = await replaceParams(uris.Laboratories.GET_BY_ID, { id: labId });
  return await fetchWithAuthHeader(uri) as Laboratory;
}

/**
 * Create a new laboratory
 * @param labData - Laboratory data
 * @returns Created laboratory
 */
export async function createLab(labData: LaboratoryRequest): Promise<Laboratory> {
  const uri = uris.Laboratories.GET_ALL;
  return await fetchWithAuthHeader(uri, {
    method: "POST",
    data: labData
  }) as Laboratory;
}

/**
 * Update a laboratory
 * @param labId - Laboratory ID
 * @param labData - Updated laboratory data
 * @returns Updated laboratory
 */
export async function updateLab(
  labId: number,
  labData: LaboratoryRequest,
): Promise<Laboratory> {
  const uri = await replaceParams(uris.Laboratories.GET_BY_ID, { id: labId });
  return await fetchWithAuthHeader(uri, {
    method: "PUT",
    data: labData,
  }) as Laboratory;
}

/**
 * Delete a laboratory
 * @param labId - Laboratory ID
 */
export async function deleteLab(labId: number): Promise<void> {
  const uri = await replaceParams(uris.Laboratories.GET_BY_ID, { id: labId });
  await fetchWithAuthHeader(uri, {
    method: "DELETE",
  });
}