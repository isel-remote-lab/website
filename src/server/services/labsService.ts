import { fetchDataOnServerWithAuthHeader } from "~/server/services/services";
import { Uris } from "~/server/services/uris";
import { replaceParams } from "~/server/services/services";
import type { Laboratory, LaboratoryRequest } from "~/types/laboratory";
import { fetchDataWithAuthHeader } from "~/services/clientServices";

/**
 * Get all laboratories
 * @returns List of laboratories
 */
export async function getAllLabs(): Promise<Laboratory[]> {
  const uri = Uris.Laboratories.GET_ALL;
  return await fetchDataOnServerWithAuthHeader(uri) as Laboratory[];
}

/**
 * Get a laboratory by ID
 * @param labId - Laboratory ID
 * @returns Laboratory data
 */
export async function getLabById(labId: number): Promise<Laboratory> {
  const uri = await replaceParams(Uris.Laboratories.GET_BY_ID, { id: labId });
  return await fetchDataOnServerWithAuthHeader(uri) as Laboratory;
}

/**
 * Create a new laboratory
 * @param labData - Laboratory data
 * @returns Created laboratory
 */
export async function createLab(labData: LaboratoryRequest): Promise<Laboratory> {
  const uri = Uris.Laboratories.GET_ALL;
  return await fetchDataOnServerWithAuthHeader(uri, {
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
  const uri = await replaceParams(Uris.Laboratories.GET_BY_ID, { id: labId });
  return await fetchDataOnServerWithAuthHeader(uri, {
    method: "PUT",
    data: labData,
  }) as Laboratory;
}

/**
 * Delete a laboratory
 * @param labId - Laboratory ID
 */
export async function deleteLab(labId: number): Promise<void> {
  const uri = await replaceParams(Uris.Laboratories.GET_BY_ID, { id: labId });
  await fetchDataOnServerWithAuthHeader(uri, {
    method: "DELETE",
  });
}