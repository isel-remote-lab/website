"use client";

import { List, Typography, Button, Card } from 'antd';
import { createGroup, getLabGroups, getUserGroups } from '~/server/services/groupsService';
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
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // TODO: Change fetch to get groups from laboratory
        let fetchedGroups: GroupResponse[] = [];
        if (lab) {
          fetchedGroups = await getLabGroups(lab.id);
        } else {
          fetchedGroups = await getUserGroups();
        }
        setGroups(fetchedGroups);
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
    console.log(values);

    const response = await createGroup(values as GroupRequest);

    // TODO: Add group to laboratory

    if (response) {
      setShowForm(false);
    }
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
    <div>
      <Button 
        type="default" 
        style={{ marginBottom: 16, width: "100%" }}
        onClick={createGroupButton}
      >
        <PlusOutlined />
        Criar Grupo
      </Button>
      <List
        loading={loading}
        dataSource={groups}
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
    </div>
  );
}
