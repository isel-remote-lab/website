import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Image } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import DefaultPage from "./DefaultPage";

const avatarSize = 250;

interface profilePageProps {
  name: string;
  email: string;
  role: string;
  image: string | null | undefined;
}

/**
 * Profile page component
 * @param {profilePageProps} props - The profile page props
 * @param {string} props.name - The user's name
 * @param {string} props.email - The user's email
 * @param {string} props.role - The user's role
 * @param {string} props.image - The user's image URL
 * @returns The profile page component
 */
export default function ProfilePage({
  name,
  email,
  role,
  image,
}: profilePageProps) {
  return (
    <DefaultPage>
      <Flex wrap gap="large" align="center" style={{ flexDirection: "column" }}>
        <Avatar size={avatarSize}>
          <Image
            src={image ?? undefined}
            alt="User Avatar"
            width={avatarSize}
            height={avatarSize}
          />
        </Avatar>
        <Title level={1} style={{ margin: 0 }}>
          {name}
        </Title>
        <Flex gap="small">
          <UserOutlined />
          <Title level={5} style={{ margin: 0 }}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Title>
        </Flex>
        <Flex gap="small">
          <Link href={`mailto:${email}`}>
            <MailOutlined />
          </Link>
          <Title level={4}>{email}</Title>
        </Flex>
      </Flex>
    </DefaultPage>
  );
}
