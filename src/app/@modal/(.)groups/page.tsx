import ManageGroupsInfo from "~/app/labs/[id]/settings/groups/ManageGroupsInfo";
import DefaultModal from "~/app/components/defaults/DefaultModal";
import { LaboratoryFields } from "~/types/laboratory";
import { getLabById } from "~/server/services/labsService";

export default async function ManageGroupsModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lab = id ? await getLabById(Number(id)) : undefined;
  const title = `Gerir Grupos${lab ? ` de ${lab[LaboratoryFields.NAME]}` : ""}`;

  return (
    <div>
      <DefaultModal title={title}>
        <ManageGroupsInfo lab={lab}/>
      </DefaultModal>
    </div>
  );
}
