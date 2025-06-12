import DefaultPage from "~/app/components/defaults/DefaultPage";
import GroupInfoForm from "~/app/components/groups/GroupInfoForm";

export default async function CreateGroupPage({ params }: { params: Promise<{ id: string }> }) {
  //const { id } = await params;

  const onFinish = async (values: unknown) => {
    console.log(values);
  };

  return (
    <DefaultPage title={`Criar Grupo`}>
      <GroupInfoForm
        submitButtonText="Criar Grupo"
        onFinish={onFinish}
      />
    </DefaultPage>
  );
}
