import type { GroupRequest, GroupResponse } from "~/types/group";
import { fetchDataOnServerWithAuthHeader } from "./services";
import { Uris } from "./uris";
import { UserResponse } from "~/types/user";

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
    const response = await fetchDataOnServerWithAuthHeader(uri) as GroupResponse;
    return response;
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

/**
 * Get group users
 * @param groupId - Group ID
 * @returns List of users
 */
export async function getGroupUsers(groupId: number): Promise<UserResponse[]> {
    const uri = Uris.Groups.GET_GROUP_USERS.replace("{id}", groupId.toString());
    return await fetchDataOnServerWithAuthHeader(uri) as UserResponse[];
}

/**
 * Add a user to a group
 * @param groupId - Group ID
 * @param userId - User ID
 * @returns Added user
 */
export async function addUserToGroup(groupId: number, userId: number): Promise<void> {
    const uri = Uris.Groups.GET_GROUP_USERS.replace("{id}", groupId.toString());
    const response = await fetchDataOnServerWithAuthHeader(uri, {
        method: "PATCH",
        data: { userId: userId }
    }) as void;
    console.log(response)
}

/**
 * Remove a user from a group
 * @param groupId - Group ID
 * @param userId - User ID
 * @returns Removed user
 */
export async function removeUserFromGroup(groupId: number, userId: number): Promise<UserResponse> {
    const uri = Uris.Groups.GET_GROUP_USERS.replace("{id}", groupId.toString());
    return await fetchDataOnServerWithAuthHeader(uri, {
        method: "DELETE",
        data: { userId: userId }
    }) as UserResponse;
}