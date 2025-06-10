"use client";

import { List, Typography, Button } from 'antd';
import { getUserGroups } from '~/server/services/groupsService';
import { useEffect, useState } from 'react';
import type { GroupResponse } from '~/types/group';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import GroupInfoForm from '~/app/components/labs/groups/GroupInfoForm';

interface ManageGroupsInfoProps {
  labId: string;
}

export default function ManageGroupsInfo({ labId }: ManageGroupsInfoProps) {
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await getUserGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleFormFinish = async (values: unknown) => {
    // TODO: Implement group creation logic
    setShowForm(false);
    // Refresh groups list after creation
    const fetchedGroups = await getUserGroups();
    setGroups(fetchedGroups);
  };

  const createGroup = () => {
    setShowForm(true);
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
          onFinish={handleFormFinish}
          submitButtonText="Criar Grupo"
        />
      </div>
    );
  }

  return (
    <div>
      <Button 
        type="default" 
        style={{ marginBottom: 16, width: "100%" }}
        onClick={createGroup}
      >
        <PlusOutlined />
        Criar Grupo
      </Button>
      <List
        loading={loading}
        dataSource={groups}
        renderItem={(group) => (
          <List.Item>
            <div>
              <Typography.Title level={5}>{group.groupName}</Typography.Title>
              <Typography.Paragraph>{group.groupDescription}</Typography.Paragraph>
              <Typography.Text type="secondary">
                Created at: {new Date(group.createdAt).toLocaleDateString()}
              </Typography.Text>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
