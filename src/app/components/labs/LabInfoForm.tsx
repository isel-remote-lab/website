import type { LaboratoryResponse } from "~/types/laboratory";
import DefaultForm from "../defaults/DefaultForm";
import Link from "next/link";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, LaptopOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { deleteLab } from "~/server/services/labsService";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useNotifications } from "~/hooks/useNotifications";

interface LabInfoFormProps {
  initialValues?: LaboratoryResponse;
  onFinish: (values: unknown) => void;
  submitButtonText: string;
}

/**
 * Delete a laboratory and redirect to the dashboard
 * @param labId - Laboratory ID
 * @param router - Next.js router
 * @param showSuccess - Success notification function
 * @param showError - Error notification function
 */
async function onDeleteLab(
  labId: number | undefined, 
  router: AppRouterInstance,
  showSuccess: (message: { message: string; description: string }) => void,
  showError: (message: { message: string; description: string }) => void
) {
  if (!labId) {
    showError({
      message: "Erro ao eliminar laboratório",
      description: "Por favor, tente novamente mais tarde"
    });
    return;
  }
  
  try {
    await deleteLab(labId);
    showSuccess({
      message: "Laboratório eliminado com sucesso",
      description: "O laboratório foi eliminado permanentemente"
    });
    router.push("/");
  } catch (error) {
    showError({
      message: "Erro ao eliminar laboratório",
      description: "Por favor, tente novamente mais tarde"
    });
  }
}

export default function LabInfoForm({
  initialValues,
  onFinish,
  submitButtonText,
}: LabInfoFormProps) {
  const router = useRouter()
  const { contextHolder, showSuccess, showError } = useNotifications();

  return (
    <>
      {contextHolder}
      <DefaultForm
        configType="laboratory"
        initialValues={initialValues}
        onFinish={onFinish}
        submitButtonText={submitButtonText}
      >
      {initialValues && (
        <>
          <Tooltip title="Gerir grupos" key="groups">
            <Link href={`/labs/${initialValues?.id}/settings/groups`}>
              <Button type="default" style={{ marginLeft: 8 }}> 
                <UsergroupAddOutlined />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Gerir hardware" key="hardware">
            <Link href={`/labs/${initialValues?.id}/settings/hardware`}>
              <Button type="default" style={{ marginLeft: 8 }}> 
                <LaptopOutlined />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Eliminar laboratório" key="delete">
            <Button type="default" style={{ marginLeft: 8 }} danger onClick={() => onDeleteLab(initialValues?.id, router, showSuccess, showError)}> 
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </>
      )}
      </DefaultForm>
    </>
  );
}
