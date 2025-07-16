"use client";

import { List, Typography, Button, Card, Form, Input, Tooltip } from 'antd';
import { addUserToGroup, getGroupUsers, removeUserFromGroup } from '~/server/services/groupsService';
import { useEffect, useState } from 'react';
import { type GroupResponse } from '~/types/group';
import { type UserResponse } from '~/types/user';
import { DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface ManageGroupInfoProps {
  group: GroupResponse;
}

export default function ManageGroupInfo({ group }: ManageGroupInfoProps) {
  const [users, setUsers] = useState<UserResponse[]>([]);
  
  const [loaded, setLoaded] = useState(false);

  /**
   * Fetch the users from the database
   * If the user is in a lab, fetch the users from the lab
   * If the user is not in a lab, fetch the users from the user
   */
  const fetchUsers = async () => {
    setLoaded(false);
    try {
      const fetchedUsers = await getGroupUsers(group.id);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoaded(true);
    }
  };

  // Use effect to fetch the users from the database when the component is mounted
  useEffect(() => {
    void fetchUsers();
  }, []);

  /**
   * Add a user to the group
   * @param values - The values of the user to be added to the group
   */
  const onAddUserToGroup = async (values: unknown) => {
    const userId = (values as { user: number }).user;
    await addUserToGroup(group.id, userId);
    await fetchUsers();
  };

  /**
   * Form to add a user to the group
   * @returns The form to add a user to the group
   */
  const AddUserToGroupForm = () => {
    return (
      <Form onFinish={onAddUserToGroup}>
        <Form.Item name="user" label="Usuário">
          <Input type="number" placeholder="ID do usuário" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Adicionar</Button>
        </Form.Item>
      </Form>
    );
  }

  /**
   * Remove a user from the group
   * @param userId - The id of the user to be removed from the group
   */
  const onRemoveUserFromGroup = async (userId: number) => {
    await removeUserFromGroup(group.id, userId);
    await fetchUsers();
  }

  /**
   * Get the actions for the card
   * @param userId - The id of the user
   * @returns The actions for the card
   */
  function cardActions(userId: number) {
    return [
        <Tooltip title="Remover Utilizador do Grupo" key="removeUser">
          <Button type="link" onClick={() => onRemoveUserFromGroup(userId)}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
    ].filter(Boolean);
  }

  return (
    <>
      <AddUserToGroupForm />
      <List
        loading={!loaded}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card actions={cardActions(user.id)} style={{ width: "100%" }}>
              <Link href={`/users/${user.id}`}>
                <Typography.Title level={5}>{user.name}</Typography.Title>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
