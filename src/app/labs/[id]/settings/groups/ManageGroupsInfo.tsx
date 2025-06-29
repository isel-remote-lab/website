"use client";

import { List, Typography, Button, Card, Form, Select } from 'antd';
import { createGroup, getLabGroups, getUserGroups } from '~/server/services/groupsService';
import { addGroupToLab } from '~/server/services/labsService';
import { useEffect, useState } from 'react';
import { GroupFields, type GroupRequest, type GroupResponse } from '~/types/group';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import GroupInfoForm from '~/app/components/groups/GroupInfoForm';
import type { LaboratoryResponse } from '~/types/laboratory';
import { useRouter } from 'next/navigation';

interface ManageGroupsInfoProps {
  lab?: LaboratoryResponse;
}

export default function ManageGroupsInfo({ lab }: ManageGroupsInfoProps) {
  const [labGroups, setLabGroups] = useState<GroupResponse[]>([]);
  const [userGroups, setUserGroups] = useState<GroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedUserGroups = await getUserGroups();
        setUserGroups(fetchedUserGroups);
        if (lab) {
          const fetchedLabGroups = await getLabGroups(lab.id);
          setLabGroups(fetchedLabGroups);
        } else {
          setLabGroups(userGroups);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchGroups();
  }, [showForm, lab]);

  const createGroupButton = () => {
    setShowForm(true);
  };

  const onFinish = async (values: unknown) => {
    const response = await createGroup(values as GroupRequest);

    if (lab) {
      await addGroupToLab(response.id, lab.id);
    }

    if (response) {
      setShowForm(false);
    }
  };

  const onAddGroupToLab = async (values: unknown) => {
    await addGroupToLab(values as number, lab!.id);
  };  

  if (showForm) {
    return (
      <div>
        <Button 
          type="default" 
          style={{ marginBottom: 16 }}
          onClick={() => setShowForm(false)}
        >
          <ArrowLeftOutlined />
          Voltar
        </Button>
        <GroupInfoForm
          submitButtonText="Criar Grupo"
          onFinish={onFinish}
        />
      </div>
    );
  }

  return (
    <>
      <Button 
        type="default" 
        style={{ marginBottom: 16, width: "100%" }}
        onClick={createGroupButton}
      >
        <PlusOutlined />
        Criar Grupo
      </Button>
      {lab && (
        <Form 
          onFinish={onAddGroupToLab}
        >
          <Form.Item name="group" label="Grupo">
            <Select options={userGroups.map((group) => ({ label: group[GroupFields.NAME], value: group.id }))} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Adicionar</Button>
          </Form.Item>
        </Form>
      )}
      <List
        loading={loading}
        dataSource={labGroups}
        renderItem={(group) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => router.push(`/groups/${group.id}`)}
              style={{ width: '100%' }}
            >
              <Typography.Title level={5}>{group[GroupFields.NAME]}</Typography.Title>
              <Typography.Paragraph>{group[GroupFields.DESCRIPTION]}</Typography.Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
