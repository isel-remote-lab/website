"use client";

import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { LaboratoryResponse } from '~/types/laboratory';
import { useRouter } from 'next/navigation';
import { HardwareFields, HardwareResponse } from '~/types/hardware';
import { getHardware, getLabHardware } from '~/server/services/hardwareService';
import { Button, Card, Typography } from 'antd';
import { List } from 'antd';

interface ManageHardwareInfoProps {
  lab?: LaboratoryResponse;
}

export default function ManageHardwareInfo({ lab }: ManageHardwareInfoProps) {
  const [allHardware, setAllHardware] = useState<HardwareResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        let fetchedHardware: HardwareResponse[] = [];
        if (lab) {
          fetchedHardware = await getLabHardware(lab.id);
        } else {
          fetchedHardware = await getHardware();
        }
        setAllHardware(fetchedHardware);
      } catch (error) {
        console.error('Error fetching hardware:', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchHardware();
  }, [lab]);

  return (
    <>
      <Button 
        type="default" 
        style={{ marginBottom: 16, width: "100%" }}
        onClick={() => {}}
      >
        <PlusOutlined />
        Adicionar Hardware
      </Button>
      <List
        loading={loading}
        dataSource={allHardware}
        renderItem={(hardware) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => router.push(`/hardware/${hardware.id}`)}
              style={{ width: '100%' }}
            >
              <Typography.Title level={5}>{hardware[HardwareFields.NAME]}</Typography.Title>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
