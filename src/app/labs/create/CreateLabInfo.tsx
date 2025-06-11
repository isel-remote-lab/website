"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { createLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, Laboratory } from "~/types/laboratory";
import { redirect } from "next/navigation";

export default function CreateLabInfo() {
  const onFinish = async (values: Laboratory) => {
    const labData = formatLaboratoryRequest(values);

    const response = await createLab(labData);

    if (response) {
      const labId = response.id;
      redirect(`/labs/${labId}`);
    }
  };

  return (
    <LabInfoForm
      onFinish={onFinish as (values: unknown) => void}
      submitButtonText="Criar laboratório"
    />
  );
}
