import { labsService } from "~/services/labsService";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";
import { labs } from "~/app/page";

export default async function LaboratorySettingsModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const labName = labs[Number(id) - 1];

  // TODO: Fetch the lab data from the API
  const initialValues = await labsService.getLabById(Number(id));

  return (
    <DefaultModal title={`Configurações de ${labName}`}>
      <EditLabInfo labId={id} initialValues={initialValues} />
    </DefaultModal>
  );
}
