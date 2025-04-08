export default interface Laboratory {
  id: number;
  labName: string;
  labDescription: string;
  labDuration: number;
  createdAt: Date;
  ownerId: number;
}

export interface LaboratoryRequest {
  labName: string;
  labDescription: string;
  labDuration: number;
}

export interface LaboratoryResponse {
  labName: string;
  labDescription: string;
  labDuration: number;
  createdAt: Date;
  ownerId: number;
}
