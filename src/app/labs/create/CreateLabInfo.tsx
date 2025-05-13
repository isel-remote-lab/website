"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { labsService } from "~/services/labsService";
import { LaboratoryRequest } from "~/types/laboratory";

export default function CreateLabInfo() {
  const onFinish = async (values: any) => {
    // Convert date string to minutes
    const durationDate = new Date(values.duration);
    const durationInMinutes = Math.floor((durationDate.getTime() - new Date().getTime()) / (1000 * 60));

    const labData: LaboratoryRequest = {
      name: values.name,
      description: values.description,
      queueLimit: values.queueLimit,
      duration: durationInMinutes,
    };

    console.log("Lab data:", labData);

    const response = await labsService.createLab(labData);
    console.log("Response:", response);
  };

  return (
    <LabInfoForm
      onFinish={onFinish}
      submitButtonText="Criar laboratório"
    />
  );
}
