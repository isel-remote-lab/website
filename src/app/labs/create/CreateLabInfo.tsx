"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { labsService } from "~/services/labsService";
import { LaboratoryRequest } from "~/types/laboratory";

export default function CreateLabInfo() {
  const onFinish = async (values: any) => {
    // Convert date string to minutes
    const durationDate = new Date(values.duration);
    const durationInMinutes = durationDate.getHours() * 60 + durationDate.getMinutes();

    const labData: LaboratoryRequest = {
      labName: values.name,
      labDescription: values.description,
      labQueueLimit: values.queueLimit,
      labDuration: durationInMinutes,
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
