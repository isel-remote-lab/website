import type { Group, GroupRequest } from "~/types/group";
import { fetchDataOnServerWithAuthHeader } from "./services";
import { Uris } from "./uris";

/**
 * Get all groups
 * @returns List of groups
 */
export async function getUserGroups(): Promise<Group[]> {
    const uri = Uris.Groups.GET_ALL;
    return await fetchDataOnServerWithAuthHeader(uri) as Group[];
}

/**
 * Get all groups from a laboratory
 * @param labId - Laboratory ID
 * @returns List of groups
 */
export async function getLabGroups(labId: number): Promise<Group[]> {
    const uri = Uris.Groups.GET_ALL_FROM_LABORATORY.replace("{id}", labId.toString());
    return await fetchDataOnServerWithAuthHeader(uri) as Group[];
}

/**
 * Create a new group
 * @param group - Group data
 * @returns Created group
 */
export async function createGroup(group: GroupRequest): Promise<Group> {
    const uri = Uris.Groups.GET_ALL;
    return await fetchDataOnServerWithAuthHeader(uri, {
        method: "POST",
        data: group
    }) as Group;
}