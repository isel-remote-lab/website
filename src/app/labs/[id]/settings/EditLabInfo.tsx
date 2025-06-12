"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { updateLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, type Laboratory, type LaboratoryResponse } from "~/types/laboratory";
import { useRouter } from "next/navigation";

interface EditLabInfoProps {
  labId: number;
  initialValues?: LaboratoryResponse;
}

export default function EditLabInfo({ labId, initialValues }: EditLabInfoProps) {
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    const labData = formatLaboratoryRequest(values as Laboratory);

    const response = await updateLab(labId, labData);

    if (response) {
      // TODO: Close modal when the lab is updated
      router.back();
    }
  };

  return (
    <LabInfoForm
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText="Atualizar laboratório"
    />
  );
}
