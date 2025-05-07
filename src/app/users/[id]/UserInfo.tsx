import { Dropdown, Flex, Image, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import {
  CalendarOutlined,
  EditOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { auth } from "~/server/auth";
import { Role } from "~/types/role";

export const avatarSize = 250;

interface UserInfoProps {
  name: string;
  email: string;
  role: Role;
  image: string;
  createdAt: string;
}

export default async function UserInfo({
  name,
  email,
  role,
  image,
  createdAt,
}: UserInfoProps) {
  const session = await auth();
  const ownRole = session!.user.role;

  let title;

  const titles = {
    [Role.STUDENT]: "Aluno",
    [Role.TEACHER]: "Professor",
    [Role.ADMIN]: "Administrador",
  };

  title = titles[role as keyof typeof titles];

  const isAdminAndNotOwnProfile =
    ownRole === Role.ADMIN && email !== session!.user.email!;

  return (
    <Flex wrap gap="large" align="center" style={{ flexDirection: "column" }}>
      <div
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt="User Avatar"
          width={avatarSize}
          height={avatarSize}
        />
      </div>
      <Title level={1}>{name}</Title>
      <Tooltip title={isAdminAndNotOwnProfile ? "" : title}>
        <Flex gap="small">
          <UserOutlined />
          <Title style={{ marginBottom: "0" }} level={5}>
            {title}
          </Title>
          {/* TODO: Add option to admins to change the role of the user*/}
          {isAdminAndNotOwnProfile && (
            <Tooltip title="Mudar role">
              <Dropdown trigger={["click"]}>
                <EditOutlined />
              </Dropdown>
            </Tooltip>
          )}
        </Flex>
      </Tooltip>
      <Tooltip title="Enviar email">
        <Link href={`mailto:${email}`}>
          <Flex gap="small">
            <MailOutlined />
            <Title style={{ marginBottom: "0" }} level={5}>
              {email}
            </Title>
          </Flex>
        </Link>
      </Tooltip>
      <Tooltip title="Data de adesão">
        <Flex gap="small">
          <CalendarOutlined />
          <Title style={{ marginBottom: "0" }} level={5}>
            {createdAt}
          </Title>
        </Flex>
      </Tooltip>
    </Flex>
  );
}
