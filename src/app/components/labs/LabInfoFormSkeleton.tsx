import DefaultFormSkeleton from "../defaults/DefaultFormSkeleton";

interface LabInfoFormProps {
  submitButtonText: string;
}

export default function LabInfoFormSkeleton({
  submitButtonText,
}: LabInfoFormProps) {
  return (
    <DefaultFormSkeleton
      configType="laboratory"
      submitButtonText={submitButtonText}
    />
  );
}
