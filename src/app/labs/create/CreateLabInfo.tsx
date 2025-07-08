"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { createLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, type Laboratory } from "~/types/laboratory";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";

export default function CreateLabInfo() {
  const [api, contextHolder] = notification.useNotification()
  const router = useRouter()

  const argsProps = {
    placement: "top" as NotificationPlacement,
    duration: 5
  }

  const onFinish = async (values: unknown) => {
    const labData = formatLaboratoryRequest(values as Laboratory);

    const response = await createLab(labData);

    if (response) {
      api.success({
        message: "Laboratório criado com sucesso",
        description: "Vai ser redirecionado para a página de configurações do laboratório em 5 segundos para gerir grupos e hardware",
        ...argsProps
      })

      router.push(`/labs/${response.id}/settings`)
    } else {
      api.error({
        message: "Erro ao criar laboratório",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  return (
    <>
    {contextHolder}
      <LabInfoForm
          onFinish={onFinish}
          submitButtonText="Criar laboratório"
      />
    </>
  );
}
