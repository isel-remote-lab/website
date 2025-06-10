"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import type { Laboratory } from "~/types/laboratory";

interface EditLabInfoProps {
  initialValues?: Laboratory;
}

export default function EditLabInfo({ initialValues }: EditLabInfoProps) {
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
