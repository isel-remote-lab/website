import { getLabById } from "~/server/services/labsService";
import ManageGroupsInfo from "~/app/labs/[id]/settings/groups/ManageGroupsInfo";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import LaboratorySettingsModal from "../page";
import { LaboratoryFields } from "~/types/laboratory";

export default async function ManageGroupsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialValues = await getLabById(Number(id));
  const labName = initialValues[LaboratoryFields.NAME];

  return (
    <div>
      <LaboratorySettingsModal params={params}/>

      <DefaultModal title={`Gerir Grupos de ${labName}`}>
        <ManageGroupsInfo labId={id} />
      </DefaultModal>
    </div>
  );
}
