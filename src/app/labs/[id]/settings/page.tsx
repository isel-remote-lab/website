import { getLabById } from "~/services/labsService";
import DefaultPage from "~/app/components/defaults/DefaultPage";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";

export default async function LaboratorySettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const initialValues = await getLabById(Number(id));
  const labName = initialValues?.labName || "";

  // TODO: Fetch the lab data from the API

  return (
    <DefaultPage title={`Configurações de ${labName}`}>
      <EditLabInfo labId={id} initialValues={initialValues} />
    </DefaultPage>
  );
}
