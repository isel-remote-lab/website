import { LaboratoryFields, type LaboratoryResponse } from "~/types/laboratory";

export default function LabInfo({ [LaboratoryFields.NAME]: name }: LaboratoryResponse) {
  return <h1>Laboratório: {name}</h1>
}