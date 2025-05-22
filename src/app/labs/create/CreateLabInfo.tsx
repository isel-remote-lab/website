"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { createLab } from "~/services/labsService";
import { type LaboratoryRequest } from "~/types/laboratory";
import { useRouter } from "next/navigation";

export default function CreateLabInfo() {
  const router = useRouter();
  const onFinish = async (values: {
    duration: string;
    name: string;
    description: string | null;
    queueLimit: number;
  }) => {
    // Convert date string to minutes
    const durationDate = new Date(values.duration);
    const durationInMinutes =
      durationDate.getHours() * 60 + durationDate.getMinutes();

    const labData: LaboratoryRequest = {
      labName: values.name,
      labDescription: values.description !== "" ? values.description : null,
      labQueueLimit: values.queueLimit,
      labDuration: durationInMinutes,
    };

    const response = await createLab(labData);

    console.log(response);
    if (response) {
      const labId = response.id;
      router.push(`/labs/${labId}`);
    }
  };

  return (
    <LabInfoForm
      onFinish={onFinish as (values: unknown) => void}
      submitButtonText="Criar laboratório"
    />
  );
}
