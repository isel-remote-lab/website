import { Avatar, Flex, Image, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import { CalendarOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import getAccountInfo from "~/services/session/getAccountInfo";

export const avatarSize = 250

export default async function AccountInfo() {
    const accountInfo = await getAccountInfo()
    const { name, email, role, image, joinedAt } = accountInfo

    let title

    const titles = {
        student: "Aluno",
        teacher: "Professor",
        admin: "Administrador",
    }

    title = titles[role as keyof typeof titles]

    return(
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
                <Tooltip title={title}>
                    <Flex gap="small">
                        <UserOutlined/>
                        <Title style={{marginBottom: "0"}} level={5}>{title}</Title>
                    </Flex>
                </Tooltip>
                <Tooltip title="Enviar email">
                    <Link href={`mailto:${email}`}>
                        <Flex gap="small">
                            <MailOutlined/>
                            <Title style={{marginBottom: "0"}} level={5}>
                                {email}
                            </Title>
                        </Flex>
                    </Link>
                </Tooltip>
                <Tooltip title="Data de adesão">
                    <Flex gap="small">
                        <CalendarOutlined/>
                        <Title style={{marginBottom: "0"}} level={5}>{new Date(joinedAt).toLocaleDateString()}</Title>
                    </Flex>
                </Tooltip>
            </Flex>
    )
}