"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { createLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, type Laboratory } from "~/types/laboratory";
import { useRouter } from "next/navigation";

export default function CreateLabInfo() {
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    const labData = formatLaboratoryRequest(values as Laboratory);

    const response = await createLab(labData);

    if (response) {
      const labId = response.id;

      // TODO: Close modal when the lab is created
      router.push(`/labs/${labId}`);
    }
  };

  return (
    <LabInfoForm
      onFinish={onFinish}
      submitButtonText="Criar laboratório"
    />
  );
}
