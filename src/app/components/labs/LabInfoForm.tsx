import type { LaboratoryResponse } from "~/types/laboratory";
import DefaultForm from "../defaults/DefaultForm";
import Link from "next/link";
import { Button, message, Tooltip } from "antd";
import { DeleteOutlined, LaptopOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { deleteLab } from "~/server/services/labsService";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface LabInfoFormProps {
  initialValues?: LaboratoryResponse;
  onFinish: (values: unknown) => void;
  submitButtonText: string;
}

/**
 * Delete a laboratory and redirect to the dashboard
 * @param labId - Laboratory ID
 * @param router - Next.js router
 */
async function onDeleteLab(labId: number | undefined, router: AppRouterInstance) {
  if (!labId) {
    message.error("Erro ao eliminar laboratório, por favor tente novamente mais tarde")
    return
  }
  await deleteLab(labId)
}

export default function LabInfoForm({
  initialValues,
  onFinish,
  submitButtonText,
}: LabInfoFormProps) {
  const router = useRouter()

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
            <Button type="default" style={{ marginLeft: 8 }} danger onClick={() => onDeleteLab(initialValues?.id, router)}> 
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </>
      )}
    </DefaultForm>
  );
}
