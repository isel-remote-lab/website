import { getLabById } from "~/server/services/labsService";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import EditLabInfo from "~/app/labs/[id]/settings/EditLabInfo";
import { LaboratoryFields } from "~/types/laboratory";

export default async function LaboratorySettingsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialValues = await getLabById(Number(id));
  const labName = initialValues[LaboratoryFields.NAME];

  return (
    <DefaultModal title={`Configurações de ${labName}`}>
      <EditLabInfo initialValues={initialValues} />
    </DefaultModal>
  );
}
