"use client";

import {
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Empty, Flex, Layout, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useTempRole } from "~/contexts/TempRoleContext";
import { LaboratoryFields, type LaboratoryResponse } from "~/types/laboratory";
import { Role } from "~/types/role";

const labsWidth = 280;

const cardStyle = {
  width: labsWidth,
  height: 160,
  border: "none",
};

interface DashboardInfoProps {
  labs: LaboratoryResponse[];
}

export default function DashboardInfo({ labs }: DashboardInfoProps) {
  const { tempRole } = useTempRole();

  function getLabActions(labId: number) {
    return [
      /*
      <Tooltip title="Calendário do laboratório" key="calendar">
        <Link href={`/labs/${labId}/calendar`}>
          <CalendarOutlined />
        </Link>
      </Tooltip>,
      */
      tempRole === Role.TEACHER && (
        <Tooltip title="Editar laboratório" key="settings">
          <Link href={`/labs/${labId}/settings`}>
            <SettingOutlined />
          </Link>
        </Tooltip>
      ),
    ].filter(Boolean);
  }

  return (
    <Layout style={{ padding: "1%" }}>
      <Title level={2}>Os meus laboratórios</Title>
      <Divider />
      <Flex wrap gap="small">
        {labs.map((lab) => {
          return (
            <Card key={lab.id} style={cardStyle} actions={getLabActions(lab.id)}>
              <Link href={`/labs/${lab.id}`} key={lab.id}>
                <Title level={4} style={{ textAlign: "center" }}>
                  {lab[LaboratoryFields.NAME]}
                </Title>
              </Link>
            </Card>
          );
        })}
        {tempRole === Role.TEACHER ? (
          <Link href="/labs/create">
            <Tooltip title="Criar laboratório">
              <Button style={cardStyle} icon={<PlusOutlined />} size="large" />
            </Tooltip>
          </Link>
        ) : (
          labs.length == 0 && (
            <Button
              style={{ ...cardStyle, cursor: "default"}}
              icon={
                <Empty
                  description="Nenhum laboratório disponível"
                  styles={{ image: { height: 80 } }}
                />
              }
              size="large"
            />
          )
        )}
      </Flex>
    </Layout>
  );
}