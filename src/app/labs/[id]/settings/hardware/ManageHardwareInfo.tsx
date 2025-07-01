"use client";

import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import type { LaboratoryResponse } from '~/types/laboratory';
import { useRouter } from 'next/navigation';
import { HardwareFields, HardwareRequest, HardwareResponse } from '~/types/hardware';
import { createHardware, getHardware, getLabHardware } from '~/server/services/hardwareService';
import { Button, Card, Form, Select, Typography } from 'antd';
import { List } from 'antd';
import HardwareInfoForm from '~/app/components/hardware/HardwareInfoForm';
import { addHardwareToLab, removeHardwareFromLab } from '~/server/services/labsService';

interface ManageHardwareInfoProps {
  lab?: LaboratoryResponse;
}

export default function ManageHardwareInfo({ lab }: ManageHardwareInfoProps) {
  const [hardware, setHardware] = useState<HardwareResponse[]>([]);
  const [allHardware, setAllHardware] = useState<HardwareResponse[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [createHardwarePage, setCreateHardwarePage] = useState(false);
  const router = useRouter();
  const createHardwareButtonString = "Adicionar Hardware";

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
    // Only fetch the hardware if the form is not being shown
    if (!createHardwarePage) {
      void fetchHardware();
    }
  }, [createHardwarePage]);

  /**
   * Create a new hardware and add it to the lab or user
   * @param values - The values of the hardware to be created
   */
  const onCreateHardware = async (values: unknown) => {
    const response = await createHardware(values as HardwareRequest);
    if (lab) {
      await addHardwareToLab(lab.id, response.id);
    }
    // When the createHardwarePage is false, the useEffect will fetch the hardware again
    setCreateHardwarePage(false);
  };

  /**
   * Add a hardware to the lab
   * @param values - The values of the hardware to be added to the lab
   */
  const onAddHardwareToLab = async (values: unknown) => {
    const hardwareId = (values as { hardware: number }).hardware;
    await addHardwareToLab(lab!.id, hardwareId);
    await fetchHardware();
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
    await removeHardwareFromLab(lab!.id, hardwareId);
    await fetchHardware();
  }

  // If the user is creating a new hardware, show the form to create it
  if (createHardwarePage) {
    return (
      <div>
        <Button 
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
    );
  }

  return (
    <>
      <Button 
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
            <Card
              hoverable
              onClick={() => router.push(`/hardware/${hardware.id}`)}
              style={{ width: '100%' }}
            >
              <Typography.Title level={5}>{hardware[HardwareFields.NAME]}</Typography.Title>
            </Card>
            <Button onClick={() => onRemoveHardwareFromLab(hardware.id)}>Remover</Button>
          </List.Item>
        )}
      />
    </>
  );
}
