import { getLabById } from "~/server/services/labsService";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import ManageGroupsInfo from "~/app/labs/[id]/settings/groups/ManageGroupsInfo";

export default async function LaboratorySettingsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: Fetch the lab data from the API
  const initialValues = await getLabById(Number(id));

  return (
    <DefaultModal title={`Grupos de ${initialValues?.labName}`}>
      <ManageGroupsInfo />
    </DefaultModal>
  );
}
