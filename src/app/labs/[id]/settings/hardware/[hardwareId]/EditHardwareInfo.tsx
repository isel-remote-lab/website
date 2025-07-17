"use client";

import { updateHardware } from "~/server/services/hardwareService";
import type { HardwareResponse } from "~/types/hardware";
import { HardwareRequest } from "~/types/hardware";
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

    await updateHardware(hardwareId, hardwareData);

    showSuccess({
      message: "Hardware atualizado com sucesso",
      description: "As alterações foram aplicadas com sucesso"
    })
    router.back();
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
