import { getLabById } from "~/server/services/labsService";
import DefaultPage from "~/app/components/defaults/DefaultPage";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";
import { LaboratoryFields } from "~/types/laboratory";

export default async function LaboratorySettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialValues = await getLabById(Number(id));
  const labName = initialValues[LaboratoryFields.NAME];

  return (
    <DefaultPage title={`Configurações de ${labName}`}>
      <EditLabInfo initialValues={initialValues} />
    </DefaultPage>
  );
}
