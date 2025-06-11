import { fetchDataOnServerWithAuthHeader } from "~/server/services/services";
import { Uris } from "~/server/services/uris";
import { replaceParams } from "~/server/services/services";
import type { LaboratoryRequest, LaboratoryResponse } from "~/types/laboratory";

/**
 * Get all laboratories
 * @returns List of laboratories
 */
export async function getAllLabs(): Promise<LaboratoryResponse[]> {
  const uri = Uris.Laboratories.GET_ALL;
  return await fetchDataOnServerWithAuthHeader(uri) as LaboratoryResponse[];
}

/**
 * Get a laboratory by ID
 * @param labId - Laboratory ID
 * @returns Laboratory data
 */
export async function getLabById(labId: number): Promise<LaboratoryResponse> {
  const uri = await replaceParams(Uris.Laboratories.GET_BY_ID, { id: labId });
  return await fetchDataOnServerWithAuthHeader(uri) as LaboratoryResponse;
}

/**
 * Create a new laboratory
 * @param labData - Laboratory data
 * @returns Created laboratory
 */
export async function createLab(labData: LaboratoryRequest): Promise<LaboratoryResponse> {
  const uri = Uris.Laboratories.GET_ALL;
  return await fetchDataOnServerWithAuthHeader(uri, {
    method: "POST",
    data: labData
  }) as LaboratoryResponse;
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
): Promise<LaboratoryResponse> {
  const uri = await replaceParams(Uris.Laboratories.GET_BY_ID, { id: labId });
  return await fetchDataOnServerWithAuthHeader(uri, {
    method: "PUT",
    data: labData,
  }) as LaboratoryResponse;
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