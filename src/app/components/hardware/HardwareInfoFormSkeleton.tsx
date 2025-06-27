import DefaultFormSkeleton from "../defaults/DefaultFormSkeleton";

interface HardwareInfoFormProps {
  submitButtonText: string;
}

export default function HardwareInfoFormSkeleton({
  submitButtonText,
}: HardwareInfoFormProps) {
  return (
    <DefaultFormSkeleton
      configType="hardware"
      submitButtonText={submitButtonText}
    />
  );
}
