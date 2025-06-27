import { getLabById } from "~/server/services/labsService";
import ManageGroupsInfo from "./ManageGroupsInfo";

export default async function ManageLabGroupsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialValues = await getLabById(Number(id));

  return (
    <ManageGroupsInfo lab={initialValues}/>
  );
}
