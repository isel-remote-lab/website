"use client";

import {
  CalendarOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Empty, Flex, Layout, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useTempRole } from "~/contexts/TempRoleContext";
import type { Laboratory } from "~/types/laboratory";
import { Role } from "~/types/role";

const labsWidth = 280;

const cardStyle = {
  width: labsWidth,
  height: 130,
  border: "none",
};

export default function DashboardInfo({ labs }: { labs: Laboratory[] }) {
  const { tempRole } = useTempRole();

  function getLabActions(labId: number) {
    return [
      <Tooltip title="Calendário do laboratório" key="calendar">
        <Link href={`/labs/${labId}/calendar`}>
          <CalendarOutlined />
        </Link>
      </Tooltip>,
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
        {labs.map((lab, index) => {
          const labId = index + 1;
          return (
            <Card key={labId} style={cardStyle} actions={getLabActions(labId)}>
              <Link href={`/labs/${labId}`} key={labId}>
                <Title level={4} style={{ textAlign: "center" }}>
                  {lab.labName}
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