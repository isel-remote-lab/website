import type { Group } from "~/types/group";
import DefaultForm from "../defaults/DefaultForm";

interface GroupInfoFormProps {
  initialValues?: Group;
  submitButtonText: string;
  onFinish: (values: unknown) => void;
}

export default function GroupInfoForm({
  initialValues,
  submitButtonText,
  onFinish
}: GroupInfoFormProps) {
  return (
    <DefaultForm
      configType="group"
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText={submitButtonText}
    />
  );
}
