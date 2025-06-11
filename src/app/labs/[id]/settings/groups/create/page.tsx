import DefaultPage from "~/app/components/defaults/DefaultPage";
import GroupInfoForm from "~/app/components/labs/groups/GroupInfoForm";

export default async function CreateGroupPage({ params }: { params: Promise<{ id: string }> }) {
  //const { id } = await params;

  return (
    <DefaultPage title={`Criar Grupo`}>
      <GroupInfoForm
        submitButtonText="Criar Grupo"
      />
    </DefaultPage>
  );
}
