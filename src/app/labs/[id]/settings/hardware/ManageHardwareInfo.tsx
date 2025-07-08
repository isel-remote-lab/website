"use client";

import { useEffect, useState } from 'react';
import { List } from 'antd';
import { ArrowLeftOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { LaboratoryResponse } from '~/types/laboratory';
import { HardwareFields, HardwareRequest, HardwareResponse } from '~/types/hardware';
import { createHardware, getHardware, getLabHardware } from '~/server/services/hardwareService';
import { Button, Card, Form, Select, Tooltip, Typography, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import HardwareInfoForm from '~/app/components/hardware/HardwareInfoForm';
import { addHardwareToLab, removeHardwareFromLab } from '~/server/services/labsService';
import Link from 'next/link';

interface ManageHardwareInfoProps {
  lab?: LaboratoryResponse;
}

export default function ManageHardwareInfo({ lab }: ManageHardwareInfoProps) {
  const [hardware, setHardware] = useState<HardwareResponse[]>([]);
  const [allHardware, setAllHardware] = useState<HardwareResponse[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [createHardwarePage, setCreateHardwarePage] = useState(false);
  const createHardwareButtonString = "Adicionar Hardware";
  const [api, contextHolder] = notification.useNotification()

  const argsProps = {
    placement: "top" as NotificationPlacement,
    duration: 5
  }

  /**
   * Fetch the hardware from the database
   * If the user is in a lab, fetch the hardware from the lab
   * If the user is not in a lab, fetch the hardware from the user
   */
  const fetchHardware = async () => {
    setLoaded(false);
    try {
      if (lab) {
        setHardware(await getLabHardware(lab.id));
        setAllHardware(await getHardware());
      } else {
        setHardware(await getHardware());
      }
    } finally {
      setLoaded(true);
    }
  };

  // Use effect to fetch the hardware from the database when the component is mounted
  useEffect(() => {
    // Only fetch the hardware if the form is not being shown and lab is available
    if (!createHardwarePage) {
      fetchHardware();
    }
  }, [createHardwarePage]);

  /**
   * Create a new hardware and add it to the lab or user
   * @param values - The values of the hardware to be created
   */
  const onCreateHardware = async (values: unknown) => {
    const response = await createHardware(values as HardwareRequest);
    if (response) {
      if (lab) {
        await addHardwareToLab(lab.id, response.id);
      }
      
      api.success({
        message: "Hardware criado com sucesso",
        description: lab ? "O hardware foi criado e adicionado ao laboratório" : "O hardware foi criado com sucesso",
        ...argsProps
      })
      
      // When the createHardwarePage is false, the useEffect will fetch the hardware again
      setCreateHardwarePage(false);
    } else {
      api.error({
        message: "Erro ao criar hardware",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  /**
   * Add a hardware to the lab
   * @param values - The values of the hardware to be added to the lab
   */
  const onAddHardwareToLab = async (values: unknown) => {
    try {
      const hardwareId = (values as { hardware: number }).hardware;
      await addHardwareToLab(lab!.id, hardwareId);
      
      api.success({
        message: "Hardware adicionado com sucesso",
        description: "O hardware foi adicionado ao laboratório",
        ...argsProps
      })
      await fetchHardware();
    } catch (error) {
      api.error({
        message: "Erro ao adicionar hardware",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  /**
   * Form to add a hardware to the lab
   * @returns The form to add a hardware to the lab
   */
  const AddHardwareToLabForm = () => {
    const filteredHardware = allHardware.filter((hw) => !hardware.some((labHw) => labHw.id === hw.id));
    
    return (
      <Form onFinish={onAddHardwareToLab}>
        <Form.Item name="hardware" label="Hardware">
          <Select options={filteredHardware.map((hardware) => ({ label: hardware[HardwareFields.NAME], value: hardware.id }))} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Adicionar</Button>
        </Form.Item>
      </Form>
    );
  }

  /**
   * Remove a hardware from the lab
   * @param hardwareId - The id of the hardware to be removed from the lab
   */
  const onRemoveHardwareFromLab = async (hardwareId: number) => {
    try {
      await removeHardwareFromLab(lab!.id, hardwareId);
      
      api.success({
        message: "Hardware removido com sucesso",
        description: "O hardware foi removido do laboratório",
        ...argsProps
      })
      await fetchHardware();
    } catch (error) {
      api.error({
        message: "Erro ao remover hardware",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  }

  // If the user is creating a new hardware, show the form to create it
  if (createHardwarePage) {
    return (
      <>
        {contextHolder}
        <div>
          <Button 
            type="default"
            style={{ marginBottom: 16 }}
            onClick={() => setCreateHardwarePage(false)}
          >
            <ArrowLeftOutlined />
            Voltar
          </Button>
          <HardwareInfoForm
            submitButtonText={createHardwareButtonString}
            onFinish={onCreateHardware}
          />
        </div>
      </>
    );
  }

  /**
   * Get the actions for the card
   * @param hardwareId - The id of the hardware
   * @returns The actions for the card
   */
    function cardActions(hardwareId: number) {
      const title = "Remover Hardware do Laboratório";
      const icon = <MinusOutlined />;
      const onClick = () => onRemoveHardwareFromLab(hardwareId);
      const key = "removeHardwareFromLab";
      return [
          <Tooltip title={title} key={key}>
            <Button type="link" onClick={onClick}>
              {icon}
            </Button>
          </Tooltip>
      ].filter(Boolean);
    }

  return (
    <>
      {contextHolder}
      <Button 
        type="default"
        style={{ marginBottom: 16, width: "100%" }}
        onClick={() => setCreateHardwarePage(true)}
      >
        <PlusOutlined />
        {createHardwareButtonString}
      </Button>
      {lab && <AddHardwareToLabForm />}
      <List
        loading={!loaded}
        dataSource={hardware}
        renderItem={(hardware) => (
          <List.Item>
            <Card actions={cardActions(hardware.id)} style={{ width: "100%" }}>
              <Link href={`/hardware/${hardware.id}`}>
                <Typography.Title level={5}>{hardware[HardwareFields.NAME]}</Typography.Title>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
