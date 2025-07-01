"use client";

import { List, Typography, Button, Card, Form, Select } from 'antd';
import { createGroup, getLabGroups, getUserGroups } from '~/server/services/groupsService';
import { addGroupToLab, removeGroupFromLab } from '~/server/services/labsService';
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
  const [userGroups, setUserGroups] = useState<GroupResponse[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [createGroupPage, setCreateGroupPage] = useState(false);
  const router = useRouter();
  const createGroupButtonString = "Criar Grupo";

  /**
   * Fetch the groups from the database
   * If the user is in a lab, fetch the groups from the lab
   * If the user is not in a lab, fetch the groups from the user
   */
  const fetchGroups = async () => {
    setLoaded(false);
    try {
        if (lab) {
          setGroups(await getLabGroups(lab.id));
          setUserGroups(await getUserGroups());
        } else {
          setGroups(await getUserGroups());
        }
    } finally {
      setLoaded(true);
    }
  };

  // Use effect to fetch the groups from the database when the component is mounted
  useEffect(() => {
    // Only fetch the groups if the form is not being shown
    if (!createGroupPage) {
      void fetchGroups();
    }
  }, [createGroupPage]);

  /**
   * Create a new group and add it to the lab or user
   * @param values - The values of the group to be created
   */
  const onCreateGroup = async (values: unknown) => {
    const response = await createGroup(values as GroupRequest);
    if (lab) {
      await addGroupToLab(response.id, lab.id);
    }
    // When the showForm is false, the useEffect will fetch the groups again
    setCreateGroupPage(false);
  };

  /**
   * Add a group to the lab
   * @param values - The values of the group to be added to the lab
   */
  const onAddGroupToLab = async (values: unknown) => {
    const groupId = (values as { group: number }).group;
    await addGroupToLab(lab!.id, groupId);
    await fetchGroups();
  };

  /**
   * Form to add a group to the lab
   * @returns The form to add a group to the lab
   */
  const AddGroupToLabForm = () => {
    const filteredGroups = userGroups.filter((group) => !groups.some((g) => g.id === group.id));

    return (
      <Form onFinish={onAddGroupToLab}>
        <Form.Item name="group" label="Grupo">
          <Select options={filteredGroups.map((group) => ({ label: group[GroupFields.NAME], value: group.id }))} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Adicionar</Button>
        </Form.Item>
      </Form>
    );
  }

  /**
   * Remove a group from the lab
   * @param groupId - The id of the group to be removed from the lab
   */
  const onRemoveGroupFromLab = async (groupId: number) => {
    await removeGroupFromLab(lab!.id, groupId);
    await fetchGroups();
  }

  // If the user is creating a new group, show the form to create it
  if (createGroupPage) {
    return (
      <div>
        <Button 
          style={{ marginBottom: 16 }}
          onClick={() => setCreateGroupPage(false)}
        >
          <ArrowLeftOutlined />
          Voltar
        </Button>
        <GroupInfoForm
          submitButtonText={createGroupButtonString}
          onFinish={onCreateGroup}
        />
      </div>
    );
  }

  return (
    <>
      <Button 
        style={{ marginBottom: 16, width: "100%" }}
        onClick={() => setCreateGroupPage(true)}
      >
        <PlusOutlined />
        {createGroupButtonString}
      </Button>
      {lab && <AddGroupToLabForm />}
      <List
        loading={!loaded}
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
            <Button onClick={() => onRemoveGroupFromLab(group.id)}>Remover</Button>
          </List.Item>
        )}
      />
    </>
  );
}
