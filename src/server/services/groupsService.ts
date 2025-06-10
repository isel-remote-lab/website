import { Group, GroupRequest } from "~/types/group";
import { fetchDataWithAuthHeader } from "./services";
import { Uris } from "./uris";

/**
 * Get all groups
 * @returns List of groups
 */
export async function getUserGroups(): Promise<Group[]> {
    const uri = Uris.Groups.GET_ALL;
    return await fetchDataWithAuthHeader(uri) as Group[];
}

/**
 * Create a new group
 * @param group - Group data
 * @returns Created group
 */
export async function createGroup(group: GroupRequest): Promise<Group> {
    const uri = Uris.Groups.GET_ALL;
    return await fetchDataWithAuthHeader(uri, {
        method: "POST",
        data: group
    }) as Group;
}