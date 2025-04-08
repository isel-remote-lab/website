import { CalendarOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Layout, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { auth } from "~/server/auth";

const labsWidth = 300;

// TODO: Add a function to get the labs from the database
export const labs = ["FPGA 1", "Laboratório Química 1"];

const cardStyle = {
  width: labsWidth,
  height: "100%",
  hoverable: true,
  border: "none",
};

export default async function Dashboard() {
  const session = await auth();
  const { tempRole } = session!.user;

  function getLabActions(labId: number) {
    return [
      <Tooltip title="Calendário do laboratório" key="calendar">
        <Link href={`/labs/${labId}/calendar`}>
          <CalendarOutlined />
        </Link>
      </Tooltip>,
      <Tooltip title="Editar laboratório" key="settings">
      <Link href={`/labs/${labId}/settings`}>
        <SettingOutlined />
      </Link>
    </Tooltip>,
    ];
  }

  return (
    <Layout style={{ padding: "1%" }}>
      <Title level={2}>Os meus laboratórios</Title>
      <Divider/>
      <Flex wrap gap="small">
        {labs.map((lab, index) => {
          const labId = index + 1;
          return (
            <Card
              key={labId}
              style={cardStyle}
              actions={tempRole === "teacher" ? getLabActions(labId) : []}
            >
              <Link href={`/labs/${labId}`} key={labId}>
                <Title level={4} style={{ textAlign: "center" }}>
                  {lab}
                </Title>
              </Link>
            </Card>
          );
        })}
        
        {tempRole === "teacher" && (
          <Link href="/labs/create">
            <Tooltip title="Criar laboratório">
              <Button style={cardStyle} icon={<PlusOutlined />} size="large" />
            </Tooltip>
          </Link>
        )}
      </Flex>
    </Layout>
  );
}
