"use client";

import { Flex, Image, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import {
  CalendarOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { auth } from "~/server/auth";
import { Role } from "~/types/role";
import ChangeRoleDropdown from "~/app/components/dropdowns/ChangeRoleDropdown";
import { useTempRole } from "~/contexts/TempRoleContext";

export const avatarSize = 250;

export type UserInfo = {
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
}: UserInfo) {
  const titles = {
    [Role.STUDENT]: "Aluno",
    [Role.TEACHER]: "Professor",
    [Role.ADMIN]: "Administrador",
  } as const;

  const title = titles[role];

  const { tempRole } = useTempRole()
  const session = await auth()
  const userEmail = session?.user.email

  const isAdminAndNotOwnProfile = tempRole === Role.ADMIN && email !== userEmail

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
          {isAdminAndNotOwnProfile && (
            <Tooltip title="Mudar role">
              <ChangeRoleDropdown role={role} onRoleChange={() => {}} />
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
