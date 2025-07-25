import { getLabById } from "~/server/services/labsService";
import DefaultPage from "~/app/components/defaults/DefaultPage";
import ManageGroupsInfo from "./ManageGroupsInfo";
import { LaboratoryFields } from "~/types/laboratory";

export default async function ManageLabGroupsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const labId = Number(id);
  const initialValues = await getLabById(labId);
  const labName = initialValues[LaboratoryFields.NAME];

  return (
    <DefaultPage title={`Configurações de ${labName}`}>
      <ManageGroupsInfo lab={initialValues}/>
    </DefaultPage>
  );
}
