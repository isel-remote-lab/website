import { GroupFields, GroupResponse } from "~/types/group";

export default function GroupInfo({ [GroupFields.NAME]: name }: GroupResponse) {
  return <h1>Grupo: {name}</h1>
}