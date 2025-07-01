"use client";

import { List, Typography, Button, Card, Form, Input } from 'antd';
import { addUserToGroup, getGroupUsers, removeUserFromGroup } from '~/server/services/groupsService';
import { useEffect, useState } from 'react';
import { type GroupResponse } from '~/types/group';
import { useRouter } from 'next/navigation';
import { type UserResponse } from '~/types/user';

interface ManageGroupInfoProps {
  group: GroupResponse;
}

export default function ManageGroupInfo({ group }: ManageGroupInfoProps) {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
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
  }, [loading]);

  const onAddUser = async (values: unknown) => {
    const userId = (values as { user: number }).user
    await addUserToGroup(group.id, userId);
  };

  return (
    <>
      <Form onFinish={onAddUser}>
        <Form.Item name="user" label="Usuário">
          <Input type="number" placeholder="ID do usuário" />
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
