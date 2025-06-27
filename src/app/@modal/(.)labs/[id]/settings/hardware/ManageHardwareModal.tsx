import ManageHardwareInfo from "~/app/labs/[id]/settings/hardware/ManageHardwareInfo";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import { LaboratoryFields, type LaboratoryResponse } from "~/types/laboratory";

interface ManageHardwareModalProps {
  lab?: LaboratoryResponse;
}

export default async function ManageHardwareModal({ lab }: ManageHardwareModalProps) {
  const title = `Gerir Hardware${lab ? ` de ${lab[LaboratoryFields.NAME]}` : ""}`;

  return (
    <div>
      <DefaultModal title={title}>
        <ManageHardwareInfo lab={lab}/>
      </DefaultModal>
    </div>
  );
}
