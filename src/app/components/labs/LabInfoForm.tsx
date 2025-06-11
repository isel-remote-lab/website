import type { Laboratory } from "~/types/laboratory";
import DefaultForm from "../defaults/DefaultForm";
import Link from "next/link";
import { Button, Tooltip } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";

interface LabInfoFormProps {
  initialValues?: Laboratory;
  onFinish: (values: unknown) => void;
  submitButtonText: string;
}

export default function LabInfoForm({
  initialValues,
  onFinish,
  submitButtonText,
}: LabInfoFormProps) {
  return (
    <DefaultForm
      type="laboratory"
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText={submitButtonText}
    >
      <Tooltip title="Gerir Grupos" key="groups">
        <Link href={`/labs/${initialValues?.id}/settings/groups`}>
          <Button type="default" style={{ marginLeft: 8 }}> 
            <UsergroupAddOutlined />
          </Button>
        </Link>
      </Tooltip>
    </DefaultForm>
  );
}
