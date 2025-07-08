"use client";

import DefaultModal from "~/app/components/defaults/DefaultModal";
import GroupInfoForm from "~/app/components/groups/GroupInfoForm";
import { createGroup } from "~/server/services/groupsService";
import { type GroupRequest } from "~/types/group";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";

export default function CreateGroupModal({ params }: { params: Promise<{ id: string }> }) {
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
      api.success({
        message: "Grupo criado com sucesso",
        description: "O grupo foi criado e adicionado à sua lista",
        ...argsProps
      })
      router.push(`/groups/${response.id}`)
    } else {
      api.error({
        message: "Erro ao criar grupo",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  return (
    <DefaultModal title={`Criar Grupo`}>
      {contextHolder}
      <GroupInfoForm
        submitButtonText="Criar Grupo"
        onFinish={onFinish}
      />
    </DefaultModal>
  );
}
