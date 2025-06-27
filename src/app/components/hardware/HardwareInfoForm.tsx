import type { Hardware } from "~/types/hardware";
import DefaultForm from "../defaults/DefaultForm";

interface HardwareInfoFormProps {
  initialValues?: Hardware;
  submitButtonText: string;
  onFinish: (values: unknown) => void;
}

export default function HardwareInfoForm({
  initialValues,
  submitButtonText,
  onFinish
}: HardwareInfoFormProps) {
  return (
    <DefaultForm
      configType="hardware"
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText={submitButtonText}
    />
  );
}
