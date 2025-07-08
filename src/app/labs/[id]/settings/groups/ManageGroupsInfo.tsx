"use client";

import { List, Typography, Button, Card, Form, Select, Tooltip, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { createGroup, deleteGroup, getLabGroups, getUserGroups } from '~/server/services/groupsService';
import { addGroupToLab, removeGroupFromLab } from '~/server/services/labsService';
import { useEffect, useState } from 'react';
import { GroupFields, type GroupRequest, type GroupResponse } from '~/types/group';
import { ArrowLeftOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import GroupInfoForm from '~/app/components/groups/GroupInfoForm';
import type { LaboratoryResponse } from '~/types/laboratory';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  const [api, contextHolder] = notification.useNotification()

  const argsProps = {
    placement: "top" as NotificationPlacement,
    duration: 5
  }

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
    // Only fetch the groups if the form is not being shown and lab is available
    if (!createGroupPage) {
      fetchGroups();
    }
  }, [createGroupPage]);

  /**
   * Create a new group and add it to the lab or user
   * @param values - The values of the group to be created
   */
  const onCreateGroup = async (values: unknown) => {
    const response = await createGroup(values as GroupRequest);
    if (response) {
      if (lab) {
        await addGroupToLab(response.id, lab.id);
      }
      
      api.success({
        message: "Grupo criado com sucesso",
        description: lab ? "O grupo foi criado e adicionado ao laboratório" : "O grupo foi criado com sucesso",
        ...argsProps
      })
      
      // When the showForm is false, the useEffect will fetch the groups again
      setCreateGroupPage(false);
    } else {
      api.error({
        message: "Erro ao criar grupo",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  };

  /**
   * Add a group to the lab
   * @param values - The values of the group to be added to the lab
   */
  const onAddGroupToLab = async (values: unknown) => {
    try {
      const groupId = (values as { group: number }).group;
      await addGroupToLab(lab!.id, groupId);
      
      api.success({
        message: "Grupo adicionado com sucesso",
        description: "O grupo foi adicionado ao laboratório",
        ...argsProps
      })
      await fetchGroups();
    } catch (error) {
      api.error({
        message: "Erro ao adicionar grupo",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
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
    try {
      if (lab) {
        await removeGroupFromLab(lab.id, groupId);
      } else {
        await deleteGroup(groupId);
      }
      
      api.success({
        message: lab ? "Grupo removido com sucesso" : "Grupo eliminado com sucesso",
        description: lab ? "O grupo foi removido do laboratório" : "O grupo foi eliminado permanentemente",
        ...argsProps
      })
      await fetchGroups();
    } catch (error) {
      api.error({
        message: lab ? "Erro ao remover grupo" : "Erro ao eliminar grupo",
        description: "Por favor, tente novamente mais tarde",
        ...argsProps
      })
    }
  }

  // If the user is creating a new group, show the form to create it
  if (createGroupPage) {
    return (
      <>
        {contextHolder}
        <div>
          <Button 
            type="default"
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
      </>
    );
  }

  /**
   * Get the actions for the card
   * @param groupId - The id of the group
   * @returns The actions for the card
   */
  function cardActions(groupId: number) {
    const title = lab ? "Remover Grupo do Laboratório" : "Eliminar Grupo";
    const icon = lab ? <MinusOutlined /> : <DeleteOutlined />;
    const onClick = lab ? () => onRemoveGroupFromLab(groupId) : () => onRemoveGroupFromLab(groupId);
    const key = lab ? "removeGroupFromLab" : "deleteGroup";
    return [
        <Tooltip title={title} key={key}>
          <Button type="link" onClick={onClick} danger={!lab}>
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
            <Card actions={cardActions(group.id)} style={{ width: "100%" }}>
              <Link href={`/groups/${group.id}`}>
                <Typography.Title level={5}>{group[GroupFields.NAME]}</Typography.Title>
                <Typography.Paragraph>{group[GroupFields.DESCRIPTION]}</Typography.Paragraph>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
