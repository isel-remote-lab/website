import ManageGroupsInfo from "~/app/labs/[id]/settings/groups/ManageGroupsInfo";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import { LaboratoryFields, type LaboratoryResponse } from "~/types/laboratory";

interface ManageGroupsModalProps {
  lab?: LaboratoryResponse;
}

export default async function ManageGroupsModal({ lab }: ManageGroupsModalProps) {
  const title = `Gerir Grupos${lab ? ` de ${lab[LaboratoryFields.NAME]}` : ""}`;

  return (
    <div>
      <DefaultModal title={title}>
        <ManageGroupsInfo lab={lab}/>
      </DefaultModal>
    </div>
  );
}
