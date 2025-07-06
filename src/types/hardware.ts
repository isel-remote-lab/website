/**
 * Hardware interface
 */
export type Hardware = HardwareResponse;

/**
 * Hardware fields enum - derived from HardwareRequest keys
 */
export enum HardwareFields {
  NAME = "name",
  SERIAL_NUMBER = "serial_number",
  STATUS = "status",
  MAC_ADDRESS = "mac_address",
  IP_ADDRESS = "ip_address",
  CREATED_AT = "created_at"
}

/**
 * Hardware status options
 */
export const HardwareStatusOptions = [
  { label: "Disponível", value: "A" },
  { label: "Em uso", value: "U" },
  { label: "Manutenção", value: "M" }
];

/**
 * Hardware request data interface
 */
export interface HardwareRequest {
  name: string;
  serialNumber: string;
  status: string;
  macAddress: string;
  ipAddress: string;
  createdAt: Date;
}

/**
 * Hardware response data interface
 */
export interface HardwareResponse {
  id: number;
  name: string;
  serialNumber: string;
  status: string;
  macAddress: string;
  ipAddress: string;
  createdAt: Date;
}
