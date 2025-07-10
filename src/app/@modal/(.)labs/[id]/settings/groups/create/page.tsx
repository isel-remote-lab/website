import DefaultModal from "~/app/components/defaults/DefaultModal";
import CreateGroupInfo from "~/app/groups/create/CreateGroupInfo";

export default async function CreateGroupModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DefaultModal title="Criar Grupo">
      <CreateGroupInfo
        labId={id}
        successRedirectPath={`/labs/${id}/settings/groups`}
      />
    </DefaultModal>
  );
}
