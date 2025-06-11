import type { Laboratory } from "~/types/laboratory";

export default function LabInfo({ labName, id }: Laboratory) {
  return <h1>Laboratório: {labName}</h1>
}