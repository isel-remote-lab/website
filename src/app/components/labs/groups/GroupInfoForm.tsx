import type { Group } from "~/types/group";
import DefaultForm from "../../defaults/DefaultForm";

interface GroupInfoFormProps {
  initialValues?: Group;
  onFinish: (values: unknown) => void;
  submitButtonText: string;
}

export default function GroupInfoForm({
  initialValues,
  onFinish,
  submitButtonText,
}: GroupInfoFormProps) {
  return (
    <DefaultForm
      type="group"
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText={submitButtonText}
    />
  );
}
