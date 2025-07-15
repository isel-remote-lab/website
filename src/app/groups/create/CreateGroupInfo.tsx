"use client";

import GroupInfoForm from "~/app/components/groups/GroupInfoForm";
import { createGroupAction, addGroupToLabAction } from "~/app/components/defaults/entityServerActions";
import { type GroupRequest } from "~/types/group";
import { useRouter } from "next/navigation";
import { useNotifications } from "~/hooks/useNotifications";

interface CreateGroupInfoProps {
  labId?: string;
  successRedirectPath?: string;
  submitButtonText?: string;
  successMessage?: string;
  successDescription?: string;
}

export default function CreateGroupInfo({
  labId,
  successRedirectPath,
  submitButtonText = "Criar Grupo",
  successMessage = "Grupo criado com sucesso",
  successDescription
}: CreateGroupInfoProps) {
  const { contextHolder, showSuccess, showError } = useNotifications();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    const groupData = values as GroupRequest;

    const response = await createGroupAction(groupData);

    if (response) {
      // Add the group to the lab if labId is provided
      if (labId) {
        await addGroupToLabAction(response.id, parseInt(labId));
      }

      // Show success message
      const description = successDescription ?? 
        (labId 
          ? "O grupo foi criado e adicionado ao laboratório"
          : "O grupo foi criado e adicionado à sua lista"
        );

      showSuccess({
        message: successMessage,
        description
      });

      // Redirect if path is provided
      if (successRedirectPath) {
        router.push(successRedirectPath);
      }
    } else {
      showError({
        message: "Erro ao criar grupo",
        description: "Por favor, tente novamente mais tarde"
      });
    }
  };

  return (
    <>
      {contextHolder}
      <GroupInfoForm
        submitButtonText={submitButtonText}
        onFinish={onFinish}
      />
    </>
  );
} 