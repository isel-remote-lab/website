"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";

export default function CreateLabInfo() {
  const onFinish = async (values: any) => {
    // TODO: Implement the create logic
    console.log("Form values:", values);
  };

  return (
    <LabInfoForm
      onFinish={onFinish}
      submitButtonText="Criar laboratório"
    />
  );
}
