export default interface Laboratory extends LaboratoryResponse {
  id: number
}

export interface LaboratoryRequest {
  labName: string | null
  labDescription: string | null
  labQueueLimit: number | null
  labDuration: number | null
}

export interface LaboratoryResponse {
  labName: string
  labDescription: string | null
  labDuration: number
  labQueueLimit: number
  createdAt: Date
  ownerId: number
}