"use client";

import { updateHardware } from "~/server/services/hardwareService";
import { HardwareRequest, type HardwareResponse } from "~/types/hardware";
import { useRouter } from "next/navigation";
import HardwareInfoForm from "~/app/components/hardware/HardwareInfoForm";
import { useNotifications } from "~/hooks/useNotifications";

interface EditHardwareInfoProps {
  hardwareId: number;
  initialValues?: HardwareResponse;
}

export default function EditHardwareInfo({ hardwareId, initialValues }: EditHardwareInfoProps) {
  const { contextHolder, showSuccess, showError } = useNotifications();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    const hardwareData = values as HardwareRequest;

    const response = await updateHardware(hardwareId, hardwareData);

    if (response) {
      showSuccess({
        message: "Hardware atualizado com sucesso",
        description: "As alterações foram aplicadas com sucesso"
      })
      // TODO: Close modal when the lab is updated
      router.back();
    } else {
      showError({
        message: "Erro ao atualizar hardware",
        description: "Por favor, tente novamente mais tarde"
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
