"use server";

import type { HardwareRequest, HardwareResponse } from "~/types/hardware";
import { fetchDataOnServerWithAuthHeader } from "./services";
import { Uris } from "./uris";

/**
 * Get all hardware
 * @returns List of hardware
 */
export async function getHardware(): Promise<HardwareResponse[]> {
    const uri = Uris.Hardware.GET_ALL;
    return await fetchDataOnServerWithAuthHeader(uri) as HardwareResponse[];
}

/**
 * Get all hardware from a laboratory
 * @param labId - Laboratory ID
 * @returns List of hardware
 */
export async function getLabHardware(labId: number): Promise<HardwareResponse[]> {
    const uri = Uris.Hardware.GET_ALL_FROM_LABORATORY.replace("{id}", labId.toString());
    return await fetchDataOnServerWithAuthHeader(uri) as HardwareResponse[];
}

/**
 * Get a hardware by ID
 * @param hardwareId - Hardware ID
 * @returns Hardware
 */
export async function getHardwareById(hardwareId: number): Promise<HardwareResponse> {
    const uri = Uris.Hardware.GET_BY_ID.replace("{id}", hardwareId.toString());
    return await fetchDataOnServerWithAuthHeader(uri) as HardwareResponse;
}

/**
 * Create a new hardware
 * @param hardware - Hardware data
 * @returns Created hardware
 */
export async function createHardware(hardware: HardwareRequest): Promise<HardwareResponse> {
    const uri = Uris.Hardware.GET_ALL;
    return await fetchDataOnServerWithAuthHeader(uri, {
        method: "POST",
        data: hardware
    }) as HardwareResponse;
}

/**
 * Update a hardware
 * @param hardwareId - Hardware ID
 * @param hardware - Updated hardware data
 * @returns Updated hardware
 */
export async function updateHardware(hardwareId: number, hardware: HardwareRequest): Promise<HardwareResponse> {
    const uri = Uris.Hardware.GET_BY_ID.replace("{id}", hardwareId.toString());
    return await fetchDataOnServerWithAuthHeader(uri, {
        method: "PATCH",
        data: hardware
    }) as HardwareResponse;
}