"use client";

import { List, Typography, Button, Card, Form, Select, Input } from 'antd';
import { addUserToGroup, createGroup, getGroupUsers, removeUserFromGroup } from '~/server/services/groupsService';
import { useEffect, useState } from 'react';
import { type GroupRequest, type GroupResponse } from '~/types/group';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import GroupInfoForm from '~/app/components/groups/GroupInfoForm';
import { useRouter } from 'next/navigation';
import { type UserResponse } from '~/types/user';

interface ManageGroupInfoProps {
  group: GroupResponse;
}

export default function ManageGroupInfo({ group }: ManageGroupInfoProps) {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getGroupUsers(group.id);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchUsers();
  }, [group]);

  const onFinish = async (values: unknown) => {
    const response = await addUserToGroup(group.id, values as number);

    if (response) {
      setShowForm(false);
    }
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item name="user" label="Usuário">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Adicionar</Button>
        </Form.Item>
      </Form>
      <List
        loading={loading}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => router.push(`/users/${user.userId}`)}
              style={{ width: '100%' }}
            >
              <Typography.Title level={5}>{user.name}</Typography.Title>
              <Button type="link" onClick={() => removeUserFromGroup(group.id, user.userId)}>Remover</Button>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
