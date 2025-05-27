import { getLabById } from "~/services/labsService";
import DefaultPage from "~/app/components/defaults/DefaultPage";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";

export default async function LaboratorySettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialValues = await getLabById(Number(id));
  const labName = initialValues?.labName || "";

  // TODO: Fetch the lab data from the API

  return (
    <DefaultPage title={`Configurações de ${labName}`}>
      <EditLabInfo initialValues={initialValues} />
    </DefaultPage>
  );
}
