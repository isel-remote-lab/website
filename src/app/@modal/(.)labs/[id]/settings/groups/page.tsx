import { getLabById } from "~/server/services/labsService";
import LaboratorySettingsModal from "../page";
import ManageGroupsModal from "~/app/@modal/(.)groups/page";

export default async function ManageLabGroupsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialValues = await getLabById(Number(id));

  return (
    <div>
      <LaboratorySettingsModal params={params}/>
      <ManageGroupsModal lab={initialValues}/>
    </div>
  );
}
