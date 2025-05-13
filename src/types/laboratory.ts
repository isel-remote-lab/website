/**
 * Laboratory interface
 */ 
export default interface Laboratory extends LaboratoryResponse {
  id: number
}

/**
 * Laboratory request data interface
 */
export interface LaboratoryRequest {
  labName: string | null
  labDescription: string | null
  labQueueLimit: number | null
  labDuration: number | null
}

/**
 * Laboratory response data interface
 */
export interface LaboratoryResponse {
  labName: string
  labDescription: string | null
  labDuration: number
  labQueueLimit: number
  labCreatedAt: Date
  labOwnerId: number
}