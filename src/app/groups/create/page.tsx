import DefaultModal from "~/app/components/defaults/DefaultModal";
import CreateGroupInfo from "~/app/groups/create/CreateGroupInfo";

export default async function CreateGroupModal() {  
  return (
    <DefaultModal title="Criar Grupo">
      <CreateGroupInfo
        successRedirectPath={`/groups`}
      />
    </DefaultModal>
  );
}
