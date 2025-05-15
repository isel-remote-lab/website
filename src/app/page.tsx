"use client"

import { CalendarOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Empty, Flex, Layout, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useTempRole } from "~/contexts/TempRoleContext";
import { labsService } from "~/services/labsService";

const labsWidth = 300;

// TODO: Add a function to get the labs from the database
//export const labs = ["FPGA 1", "Laboratório Química 1"];

export const labs = await labsService.getAllLabs();

const cardStyle = {
  width: labsWidth,
  height: 145,
  //hoverable: true,
  border: "none",
};

export default function Dashboard() {
  const { tempRole } = useTempRole();

  function getLabActions(labId: number) {
    return [
      <Tooltip title="Calendário do laboratório" key="calendar">
        <Link href={`/labs/${labId}/calendar`}>
          <CalendarOutlined />
        </Link>
      </Tooltip>,
      tempRole === "teacher" && (
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
      <Divider/>
      <Flex wrap gap="small">
        {
          labs.map((lab, index) => {
            const labId = index + 1;
            return (
            <Card
              key={labId}
              style={cardStyle}
              actions={getLabActions(labId)}
            >
              <Link href={`/labs/${labId}`} key={labId}>
                <Title level={4} style={{ textAlign: "center" }}>
                  {lab.labName}
                </Title>
              </Link>
            </Card>
            );
          })
        }
        {tempRole === "teacher" ?
          <Link href="/labs/create">
            <Tooltip title="Criar laboratório">
              <Button style={cardStyle} icon={<PlusOutlined />} size="large" />
            </Tooltip>
          </Link>
        : labs.length == 0 && (
          <Button style={{...cardStyle, cursor: "default", padding: 10}} icon={<Empty description="Nenhum laboratório disponível" />} size="large"/>
        )}
      </Flex>
    </Layout>
  );
}
