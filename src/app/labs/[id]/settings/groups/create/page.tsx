"use client";

import DefaultPage from "~/app/components/defaults/DefaultPage";
import GroupInfoForm from "~/app/components/groups/GroupInfoForm";
import { createGroup } from "~/server/services/groupsService";
import { addGroupToLab } from "~/server/services/labsService";
import { type GroupRequest } from "~/types/group";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";

export default function CreateGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const [api, contextHolder] = notification.useNotification()
  const router = useRouter()

  const argsProps = {
    placement: "top" as NotificationPlacement,
    duration: 5
  }

  const onFinish = async (values: unknown) => {
    const groupData = values as GroupRequest;

    const response = await createGroup(groupData);

    if (response) {
      // Add the group to the lab
      const { id } = await params;
      await addGroupToLab(response.id, parseInt(id));

      api.success({
        message: "Grupo criado com sucesso",
        description: "O grupo foi criado e adicionado ao laboratório",
        ...argsProps
      })
      router.push(`/labs/${id}/settings/groups`)
    } else {
      api.error({
        message: "Erro ao criar grupo",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  return (
    <DefaultPage title={`Criar Grupo`}>
      {contextHolder}
      <GroupInfoForm
        submitButtonText="Criar Grupo"
        onFinish={onFinish}
      />
    </DefaultPage>
  );
}
