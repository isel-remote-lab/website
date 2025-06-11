import { LaboratoryFields, type Laboratory } from "~/types/laboratory";

export default function LabInfo({ [LaboratoryFields.NAME]: name }: Laboratory) {
  return <h1>Laboratório: {name}</h1>
}