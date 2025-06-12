"use client";

import DefaultModal from "~/app/components/defaults/DefaultModal";
import GroupInfoForm from "~/app/components/groups/GroupInfoForm";

export default async function CreateGroupModal({ params }: { params: Promise<{ id: string }> }) {
  //const { id } = await params;

  const onFinish = async (values: unknown) => {
    console.log(values);
  };

  return (
    <DefaultModal title={`Criar Grupo`}>
      <GroupInfoForm
        submitButtonText="Criar Grupo"
        onFinish={onFinish}
      />
    </DefaultModal>
  );
}
