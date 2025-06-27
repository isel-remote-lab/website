"use client";

import { updateHardware } from "~/server/services/hardwareService";
import { HardwareRequest, type HardwareResponse } from "~/types/hardware";
import { useRouter } from "next/navigation";
import HardwareInfoForm from "~/app/components/hardware/HardwareInfoForm";

interface EditHardwareInfoProps {
  hardwareId: number;
  initialValues?: HardwareResponse;
}

export default function EditHardwareInfo({ hardwareId, initialValues }: EditHardwareInfoProps) {
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    const hardwareData = values as HardwareRequest;

    const response = await updateHardware(hardwareId, hardwareData);

    if (response) {
      // TODO: Close modal when the lab is updated
      router.back();
    }
  };

  return (
    <HardwareInfoForm
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText="Atualizar hardware"
    />
  );
}
