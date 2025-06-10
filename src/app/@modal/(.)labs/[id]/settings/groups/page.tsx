import { getLabById } from "~/server/services/labsService";
import ManageGroupsInfo from "~/app/labs/[id]/settings/groups/ManageGroupsInfo";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import LaboratorySettingsModal from "../page";

export default async function ManageGroupsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: Fetch the lab data from the API
  const initialValues = await getLabById(Number(id));

  return (
    <div>
      <LaboratorySettingsModal params={params}/>

      <DefaultModal title={`Gerir Grupos de ${initialValues?.labName}`}>
        <ManageGroupsInfo labId={id} />
      </DefaultModal>
    </div>
  );
}
