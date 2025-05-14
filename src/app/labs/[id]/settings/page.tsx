import { labsService } from "~/services/labsService";
import DefaultPage from "~/app/components/defaults/DefaultPage";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";
import { labs } from "~/app/page";

export default async function LaboratorySettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const labName = labs[Number(id) - 1];

  // TODO: Fetch the lab data from the API
  const initialValues = await labsService.getLabById(Number(id));

  return (
    <DefaultPage title={`Configurações de ${labName}`}>
      <EditLabInfo labId={id} initialValues={initialValues} />
    </DefaultPage>
  );
}
