import { getLabById } from "~/services/labsService";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";

export default async function LaboratorySettingsModal({ params }: { params: { id: string } }) {
  const { id } = params;
  // TODO: Fetch the lab data from the API
  const initialValues = await getLabById(Number(id));

  return (
    <DefaultModal title={`Configurações de ${initialValues?.labName}`}>
      <EditLabInfo labId={id} initialValues={initialValues} />
    </DefaultModal>
  );
}
