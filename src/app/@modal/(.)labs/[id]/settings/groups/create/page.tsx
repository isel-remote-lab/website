"use client";

import DefaultModal from "~/app/components/defaults/DefaultModal";
import GroupInfoForm from "~/app/components/labs/groups/GroupInfoForm";

export default async function CreateGroupModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const handleFormFinish = async (values: unknown) => {
    // TODO: Implement group creation logic
  };

  return (
    <DefaultModal title={`Criar Grupo`}>
      <GroupInfoForm
        onFinish={handleFormFinish}
        submitButtonText="Criar Grupo"
      />
    </DefaultModal>
  );
}
