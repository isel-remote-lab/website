"use server";

import { fetchDataOnServerWithAuthHeader } from "~/server/services/services";
import { Uris } from "~/server/services/uris";
import { replaceParams } from "~/server/services/services";
import type { LaboratoryRequest, LaboratoryResponse } from "~/types/laboratory";
import type { GroupResponse } from "~/types/group";

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
 * Get a laboratory by ID
 * @param labId - Laboratory ID
 * @returns Laboratory data
 */
export async function getLabById(labId: number): Promise<LaboratoryResponse> {
  const uri = await replaceParams(Uris.Laboratories.GET_BY_ID, { id: labId });
  return await fetchDataOnServerWithAuthHeader(uri) as LaboratoryResponse;
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
) {
  const uri = await replaceParams(Uris.Laboratories.GET_BY_ID, { id: labId });
  const response = await fetchDataOnServerWithAuthHeader(uri, {
    method: "PATCH",
    data: labData,
  });
}

/**
 * Get all laboratories by user
 * @param userId - User ID
 * @returns List of laboratories
 */
export async function getUserLabs(userId: string): Promise<LaboratoryResponse[]> {
  const uri = await replaceParams(Uris.Laboratories.GET_ALL_BY_USER, { userId });
  return await fetchDataOnServerWithAuthHeader(uri) as LaboratoryResponse[];
}

/**
 * Get all groups from a laboratory
 * @param labId - Laboratory ID
 * @returns List of groups
 */
export async function getLabGroups(labId: number): Promise<GroupResponse[]> {
  const uri = await replaceParams(Uris.Laboratories.GET_LABORATORY_GROUPS, { id: labId });
  return await fetchDataOnServerWithAuthHeader(uri) as GroupResponse[];
}

/**
 * Add a group to a laboratory
 * @param labId - Laboratory ID
 * @param groupId - Group ID
 */
export async function addGroupToLab(labId: number, groupId: number): Promise<void> {
  const uri = await replaceParams(Uris.Groups.GET_ALL_FROM_LABORATORY, { id: labId });
  await fetchDataOnServerWithAuthHeader(uri, {
    method: "PATCH",
    data: { groupId: groupId },
  });
}

/**
 * Remove a group from a laboratory
 * @param labId - Laboratory ID
 * @param groupId - Group ID
 */
export async function removeGroupFromLab(labId: number, groupId: number): Promise<void> {
  const uri = await replaceParams(Uris.Groups.GET_ALL_FROM_LABORATORY, { id: labId });
  await fetchDataOnServerWithAuthHeader(uri, {
    method: "DELETE",
    data: { groupId: groupId },
  });
}

/**
 * Add a hardware to a laboratory
 * @param labId - Laboratory ID
 * @param hardwareId - Hardware ID
 */
export async function addHardwareToLab(labId: number, hardwareId: number): Promise<void> {
  const uri = await replaceParams(Uris.Hardware.GET_ALL_FROM_LABORATORY, { id: labId });
  await fetchDataOnServerWithAuthHeader(uri, {
    method: "PATCH",
    data: { hardwareId: hardwareId },
  });
}

/**
 * Remove a hardware from a laboratory
 * @param labId - Laboratory ID
 * @param hardwareId - Hardware ID
 */
export async function removeHardwareFromLab(labId: number, hardwareId: number): Promise<void> {
  const uri = await replaceParams(Uris.Hardware.GET_ALL_FROM_LABORATORY, { id: labId });
  await fetchDataOnServerWithAuthHeader(uri, {
    method: "DELETE",
    data: { hardwareId: hardwareId },
  });
}

/**
 * Get all laboratories
 * @returns List of laboratories
 */
export async function getAllLabs(): Promise<LaboratoryResponse[]> {
  const uri = Uris.Laboratories.GET_ALL;
  return await fetchDataOnServerWithAuthHeader(uri) as LaboratoryResponse[];
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