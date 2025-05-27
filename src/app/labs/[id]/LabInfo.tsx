import type Laboratory from "~/types/laboratory";

export default async function LabInfo({ labName }: Laboratory) {
  console.log(labName)

  return (
    <h1>Laboratório: {labName}</h1>
  );
}