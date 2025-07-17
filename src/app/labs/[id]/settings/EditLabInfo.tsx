"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { updateLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, type Laboratory, type LaboratoryResponse } from "~/types/laboratory";
import { useRouter } from "next/navigation";
import { useNotifications } from "~/hooks/useNotifications";

interface EditLabInfoProps {
  labId: number;
  initialValues?: LaboratoryResponse;
}

export default function EditLabInfo({ labId, initialValues }: EditLabInfoProps) {
  const { contextHolder, showSuccess, showError } = useNotifications();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    const labData = formatLaboratoryRequest(values as Laboratory);

    await updateLab(labId, labData);

    showSuccess({
      message: "Laboratório atualizado com sucesso",
      description: "As alterações foram aplicadas com sucesso"
    })
    // TODO: Close modal when the lab is updated
    router.back();
  };

  return (
    <>
      {contextHolder}
      <LabInfoForm
        initialValues={initialValues}
        onFinish={onFinish}
        submitButtonText="Atualizar"
      />
    </>
  );
}
