import { Avatar, Flex, Image } from "antd";
import Title from "antd/es/typography/Title";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import getAccountInfo from "~/services/session/getAccountInfo";

export const avatarSize = 250

export default async function AccountInfo() {
    const accountInfo = await getAccountInfo()
    const { name, email, role, image, joinedAt } = accountInfo

    return(
        <Flex wrap gap="large" align="center" style={{ flexDirection: "column" }}>
                <Avatar size={avatarSize}>
                    <Image
                    src={image ?? undefined}
                    alt="User Avatar"
                    width={avatarSize}
                    height={avatarSize}
                    />
                </Avatar>
                <Title level={1}>{name}</Title>
                <Flex gap="small">
                    <UserOutlined/>
                    <Title level={5}>{role.charAt(0).toUpperCase() + role.slice(1)}</Title>
                </Flex>
                <Flex gap="small">
                    <Link href={`mailto:${email}`}>
                        <MailOutlined/>
                    </Link>
                    <Title level={4}>
                        {email}
                    </Title>
                </Flex>
                <Title level={5}>{new Date(joinedAt).toLocaleDateString()}</Title>
            </Flex>
    )
}