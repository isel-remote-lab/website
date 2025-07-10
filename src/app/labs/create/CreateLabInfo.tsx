"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { createLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, type Laboratory } from "~/types/laboratory";
import { useRouter } from "next/navigation";
import { useNotifications } from "~/hooks/useNotifications";

export default function CreateLabInfo() {
  const { contextHolder, showSuccess, showError } = useNotifications();
  const router = useRouter()

  const onFinish = async (values: unknown) => {
    const labData = formatLaboratoryRequest(values as Laboratory);

    const response = await createLab(labData);

    if (response) {
      showSuccess({
        message: "Laboratório criado com sucesso",
        description: "Vai ser redirecionado para a página de configurações do laboratório em 5 segundos para gerir grupos e hardware"
      })

      router.push(`/labs/${response.id}/settings`)
    } else {
      showError({
        message: "Erro ao criar laboratório",
        description: "Por favor, tente novamente mais tarde"
      })
    }
  };

  return (
    <>
    {contextHolder}
      <LabInfoForm
          onFinish={onFinish}
          submitButtonText="Criar laboratório"
      />
    </>
  );
}
