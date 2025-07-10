import DefaultPage from "~/app/components/defaults/DefaultPage";
import CreateGroupInfo from "~/app/groups/create/CreateGroupInfo";

export default async function CreateGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <DefaultPage title="Criar Grupo">
      <CreateGroupInfo
        labId={id}
        successRedirectPath={`/labs/${id}/settings/groups`}
      />
    </DefaultPage>
  );
}
