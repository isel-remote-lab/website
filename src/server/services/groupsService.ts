import type { GroupRequest, GroupResponse } from "~/types/group";
import { fetchDataOnServerWithAuthHeader } from "./services";
import { Uris } from "./uris";

/**
 * Get all groups
 * @returns List of groups
 */
export async function getUserGroups(): Promise<GroupResponse[]> {
    const uri = Uris.Groups.GET_ALL;
    return await fetchDataOnServerWithAuthHeader(uri) as GroupResponse[];
}

/**
 * Get all groups from a laboratory
 * @param labId - Laboratory ID
 * @returns List of groups
 */
export async function getLabGroups(labId: number): Promise<GroupResponse[]> {
    const uri = Uris.Groups.GET_ALL_FROM_LABORATORY.replace("{id}", labId.toString());
    return await fetchDataOnServerWithAuthHeader(uri) as GroupResponse[];
}

/**
 * Get a group by ID
 * @param groupId - Group ID
 * @returns Group
 */
export async function getGroupById(groupId: number): Promise<GroupResponse> {
    const uri = Uris.Groups.GET_BY_ID.replace("{id}", groupId.toString());
    return await fetchDataOnServerWithAuthHeader(uri) as GroupResponse;
}

/**
 * Create a new group
 * @param group - Group data
 * @returns Created group
 */
export async function createGroup(group: GroupRequest): Promise<GroupResponse> {
    const uri = Uris.Groups.GET_ALL;
    return await fetchDataOnServerWithAuthHeader(uri, {
        method: "POST",
        data: group
    }) as GroupResponse;
}

/**
 * Update a group
 * @param groupId - Group ID
 * @param group - Updated group data
 * @returns Updated group
 */
export async function updateGroup(groupId: number, group: GroupRequest): Promise<GroupResponse> {
    const uri = Uris.Groups.GET_BY_ID.replace("{id}", groupId.toString());
    return await fetchDataOnServerWithAuthHeader(uri, {
        method: "PATCH",
        data: group
    }) as GroupResponse;
}