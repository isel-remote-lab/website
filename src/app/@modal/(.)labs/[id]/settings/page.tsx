import DefaultModal from "~/app/components/defaults/DefaultModal";
import { labs } from "~/app/page";

export default async function LaboratorySettingsModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <DefaultModal title={"Configurações de " + labs[Number(id) - 1]}>
      TODO
    </DefaultModal>
  );
}
