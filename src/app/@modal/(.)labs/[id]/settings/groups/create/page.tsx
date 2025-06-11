"use client";

import DefaultModal from "~/app/components/defaults/DefaultModal";
import GroupInfoForm from "~/app/components/labs/groups/GroupInfoForm";

export default async function CreateGroupModal({ params }: { params: Promise<{ id: string }> }) {
  //const { id } = await params;

  return (
    <DefaultModal title={`Criar Grupo`}>
      <GroupInfoForm
        submitButtonText="Criar Grupo"
      />
    </DefaultModal>
  );
}
