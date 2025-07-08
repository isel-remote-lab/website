"use client";

import { updateHardware } from "~/server/services/hardwareService";
import { HardwareRequest, type HardwareResponse } from "~/types/hardware";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";
import HardwareInfoForm from "~/app/components/hardware/HardwareInfoForm";

interface EditHardwareInfoProps {
  hardwareId: number;
  initialValues?: HardwareResponse;
}

export default function EditHardwareInfo({ hardwareId, initialValues }: EditHardwareInfoProps) {
  const [api, contextHolder] = notification.useNotification()
  const router = useRouter();

  const argsProps = {
    placement: "top" as NotificationPlacement,
    duration: 5
  }

  const onFinish = async (values: unknown) => {
    const hardwareData = values as HardwareRequest;

    const response = await updateHardware(hardwareId, hardwareData);

    if (response) {
      api.success({
        message: "Hardware atualizado com sucesso",
        description: "As alterações foram aplicadas com sucesso",
        ...argsProps
      })
      // TODO: Close modal when the lab is updated
      router.back();
    } else {
      api.error({
        message: "Erro ao atualizar hardware",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  return (
    <>
      {contextHolder}
      <HardwareInfoForm
        initialValues={initialValues}
        onFinish={onFinish}
        submitButtonText="Atualizar hardware"
      />
    </>
  );
}
