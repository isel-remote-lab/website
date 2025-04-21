import DefaultModal from "~/app/components/defaults/DefaultModal";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";
import { labs } from "~/app/page";

export default async function LaboratorySettingsModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const labName = labs[Number(id) - 1];

  // TODO: Fetch the lab data from the API
  const initialValues = {
    name: labName,
    description: "Descrição do laboratório",
    duration: "01:00",
    queueLimit: 5,
  };

  return (
    <DefaultModal title={`Configurações de ${labName}`}>
      <EditLabInfo labId={id} initialValues={initialValues} />
    </DefaultModal>
  );
}
