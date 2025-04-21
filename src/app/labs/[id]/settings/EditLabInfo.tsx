"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";

interface EditLabInfoProps {
  labId: string;
  initialValues?: {
    name: string;
    description: string;
    duration: string;
    queueLimit: number;
  };
}

export default function EditLabInfo({ labId, initialValues }: EditLabInfoProps) {
  const onFinish = async (values: any) => {
    // TODO: Implement the update logic
    console.log("Form values:", values);
  };

  return (
    <LabInfoForm
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText="Atualizar laboratório"
    />
  );
} 