"use server";

import { createGroup, deleteGroup, getLabGroups, getUserGroups, getGroupById } from '~/server/services/groupsService';
import { addGroupToLab, removeGroupFromLab, getLabById } from '~/server/services/labsService';
import { addUserToGroup, getGroupUsers, removeUserFromGroup } from '~/server/services/groupsService';
import { createHardware, getHardware, getLabHardware, getHardwareById } from '~/server/services/hardwareService';
import { addHardwareToLab, removeHardwareFromLab } from '~/server/services/labsService';
import { type GroupRequest, type GroupResponse } from '~/types/group';
import { type HardwareRequest, type HardwareResponse } from '~/types/hardware';
import { type UserResponse } from '~/types/user';
import { type LaboratoryResponse } from '~/types/laboratory';

// Server actions for lab groups
export async function fetchLabGroups(labId: number): Promise<GroupResponse[]> {
  return await getLabGroups(labId);
}

export async function fetchUserGroups(): Promise<GroupResponse[]> {
  return await getUserGroups();
}

export async function createGroupAction(values: unknown): Promise<GroupResponse | null> {
  try {
    return await createGroup(values as GroupRequest);
  } catch (error) {
    console.error('Error creating group:', error);
    return null;
  }
}

export async function addGroupToLabAction(groupId: number, labId: number): Promise<void> {
  await addGroupToLab(labId, groupId);
}

export async function removeGroupFromLabAction(groupId: number, labId: number): Promise<void> {
  await removeGroupFromLab(labId, groupId);
}

export async function deleteGroupAction(groupId: number): Promise<void> {
  await deleteGroup(groupId);
}

// Server actions for lab hardware
export async function fetchLabHardware(labId: number): Promise<HardwareResponse[]> {
  return await getLabHardware(labId);
}

export async function fetchHardware(): Promise<HardwareResponse[]> {
  return await getHardware();
}

export async function createHardwareAction(values: unknown): Promise<HardwareResponse | null> {
  try {
    return await createHardware(values as HardwareRequest);
  } catch (error) {
    console.error('Error creating hardware:', error);
    return null;
  }
}

export async function addHardwareToLabAction(hardwareId: number, labId: number): Promise<void> {
  await addHardwareToLab(labId, hardwareId);
}

export async function removeHardwareFromLabAction(hardwareId: number, labId: number): Promise<void> {
  await removeHardwareFromLab(labId, hardwareId);
}

// Server actions for group users
export async function fetchGroupUsers(groupId: number): Promise<UserResponse[]> {
  return await getGroupUsers(groupId);
}

export async function addUserToGroupAction(userId: number, groupId: number): Promise<void> {
  await addUserToGroup(groupId, userId);
}

export async function removeUserFromGroupAction(userId: number, groupId: number): Promise<void> {
  await removeUserFromGroup(groupId, userId);
}

// Server actions for individual entities
export async function getGroupByIdAction(groupId: number): Promise<GroupResponse> {
  return await getGroupById(groupId);
}

export async function getLabByIdAction(labId: number): Promise<LaboratoryResponse> {
  return await getLabById(labId);
}

export async function getHardwareByIdAction(hardwareId: number): Promise<HardwareResponse> {
  return await getHardwareById(hardwareId);
} 