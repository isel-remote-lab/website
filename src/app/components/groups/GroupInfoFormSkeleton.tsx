import DefaultFormSkeleton from "../defaults/DefaultFormSkeleton";

interface GroupInfoFormProps {
  submitButtonText: string;
}

export default function GroupInfoFormSkeleton({
  submitButtonText,
}: GroupInfoFormProps) {
  return (
    <DefaultFormSkeleton
      configType="group"
      submitButtonText={submitButtonText}
    />
  );
}
