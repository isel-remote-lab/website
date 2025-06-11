import type { Group, GroupRequest } from "~/types/group";
import DefaultForm from "../../defaults/DefaultForm";

interface GroupInfoFormProps {
  initialValues?: Group;
  submitButtonText: string;
}

const handleFormFinish = (values: unknown) => {
  // TODO: Implement group creation logic
};

export default function GroupInfoForm({
  initialValues,
  submitButtonText,
}: GroupInfoFormProps) {
  return (
    <DefaultForm
      configType="group"
      initialValues={initialValues}
      onFinish={handleFormFinish}
      submitButtonText={submitButtonText}
    />
  );
}
