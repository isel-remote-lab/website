"use client";

import LabInfoForm from "~/app/components/labs/LabInfoForm";
import { createLab } from "~/server/services/labsService";
import { formatLaboratoryRequest, type Laboratory } from "~/types/laboratory";
import { useState } from "react";
import { Button, Result } from "antd";
import Link from "next/link";

export default function CreateLabInfo() {
  const [labId, setLabId] = useState<number | null>(null);

  const onFinish = async (values: unknown) => {
    const labData = formatLaboratoryRequest(values as Laboratory);

    const response = await createLab(labData);

    if (response) {
      setLabId(response.id);
    }
  };

  return (
    <>
    {labId ? (
      <Result
        status="success"
        title="Laboratório criado com sucesso"
        subTitle="Clique no botão abaixo para continuar para o gerenciamento de grupos"
        extra={[
          <Link href={`/labs/${labId}/settings/groups`}>
            <Button type="primary" style={{ marginLeft: 8 }}> 
              Continuar
            </Button>
          </Link>
        ]}
      />
    ) : <LabInfoForm
          onFinish={onFinish}
          submitButtonText="Criar laboratório"
        />
    }
    </>
  );
}
