import type { LaboratoryResponse } from "~/types/laboratory";
import DefaultForm from "../defaults/DefaultForm";
import Link from "next/link";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, LaptopOutlined, UsergroupAddOutlined } from "@ant-design/icons";

interface LabInfoFormProps {
  initialValues?: LaboratoryResponse;
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
      configType="laboratory"
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText={submitButtonText}
    >
      {initialValues && (
        <>
          <Tooltip title="Gerir Grupos" key="groups">
            <Link href={`/labs/${initialValues?.id}/settings/groups`}>
              <Button type="default" style={{ marginLeft: 8 }}> 
                <UsergroupAddOutlined />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Gerir Hardware" key="hardware">
            <Link href={`/labs/${initialValues?.id}/settings/hardware`}>
              <Button type="default" style={{ marginLeft: 8 }}> 
                <LaptopOutlined />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Eliminar laboratório" key="delete">
            <Button type="default" style={{ marginLeft: 8 }} danger onClick={() => {
              console.log("delete")
            }}> 
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </>
      )}
    </DefaultForm>
  );
}
