"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import type Laboratory from "~/types/laboratory";
interface EditLabInfoProps {
  labId: string;
  initialValues?: Laboratory;
}

export default function EditLabInfo({
  labId,
  initialValues,
}: EditLabInfoProps) {
  const onFinish = async (values: unknown) => {
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
