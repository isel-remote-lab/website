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
  name: string | null
  description: string | null
  queueLimit: number | null
  duration: number | null
}

/**
 * Laboratory response data interface
 */
export interface LaboratoryResponse {
  name: string
  description: string | null
  duration: number
  queueLimit: number
  createdAt: Date
  ownerId: number
}