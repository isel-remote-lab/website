"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { updateLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, type Laboratory, type LaboratoryResponse } from "~/types/laboratory";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";

interface EditLabInfoProps {
  labId: number;
  initialValues?: LaboratoryResponse;
}

export default function EditLabInfo({ labId, initialValues }: EditLabInfoProps) {
  const [api, contextHolder] = notification.useNotification()
  const router = useRouter();

  const argsProps = {
    placement: "top" as NotificationPlacement,
    duration: 5
  }

  const onFinish = async (values: unknown) => {
    const labData = formatLaboratoryRequest(values as Laboratory);

    const response = await updateLab(labId, labData);

    if (response) {
      api.success({
        message: "Laboratório atualizado com sucesso",
        description: "As alterações foram aplicadas com sucesso",
        ...argsProps
      })
      // TODO: Close modal when the lab is updated
      router.back();
    } else {
      api.error({
        message: "Erro ao atualizar laboratório",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  return (
    <>
      {contextHolder}
      <LabInfoForm
        initialValues={initialValues}
        onFinish={onFinish}
        submitButtonText="Atualizar"
      />
    </>
  );
}
