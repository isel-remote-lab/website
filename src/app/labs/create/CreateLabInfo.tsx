"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { labsService } from "~/services/labsService";
import { LaboratoryRequest } from "~/types/laboratory";
import { useRouter } from "next/navigation";

export default function CreateLabInfo() {
  const router = useRouter();
  const onFinish = async (values: any) => {
    // Convert date string to minutes
    const durationDate = new Date(values.duration)
    const durationInMinutes = durationDate.getHours() * 60 + durationDate.getMinutes()

    const labData: LaboratoryRequest = {
      labName: values.name,
      labDescription: values.description !== "" ? values.description : null,
      labQueueLimit: values.queueLimit,
      labDuration: durationInMinutes,
    };

    const response = await labsService.createLab(labData)
    if (response) {
      router.push(`/labs/${response}`)
    }
  };

  return (
    <LabInfoForm
      onFinish={onFinish}
      submitButtonText="Criar laboratório"
    />
  );
}
