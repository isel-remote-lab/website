"use client";

import DefaultPage from "~/app/components/defaults/DefaultPage";
import GroupInfoForm from "~/app/components/labs/groups/GroupInfoForm";

export default async function CreateGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const handleFormFinish = async (values: unknown) => {
    // TODO: Implement group creation logic
  };

  return (
    <DefaultPage title={`Criar Grupo`}>
      <GroupInfoForm
        onFinish={handleFormFinish}
        submitButtonText="Criar Grupo"
      />
    </DefaultPage>
  );
}
