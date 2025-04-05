"use client"
import DefaultModal from "../DefaultModal";
import { useState } from "react";
import { Avatar, Flex, Image, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AccountModalProps {
    name: string
    email: string
    role: string
    image: string
}

const avatarSize = 250;

/**
 * Account page component
 * @returns {JSX.Element | null} - The account page component
 */
export default function AccountModal({name, email, role, image}: AccountModalProps) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(true)

    function handleCancel() {
        router.push("/")
    }

    return (
        <DefaultModal isModalOpen={isModalOpen} handleCancel={handleCancel}>
            <Flex wrap gap="large" align="center" style={{ flexDirection: "column" }}>
                <Avatar size={avatarSize}>
                    <Image
                    src={image ?? undefined}
                    alt="User Avatar"
                    width={avatarSize}
                    height={avatarSize}
                    />
                </Avatar>
                <Title level={1} style={{ margin: 0 }}>{name}</Title>
                <Flex gap="small">
                    <UserOutlined/>
                    <Title level={5} style={{ margin: 0 }}>{role.charAt(0).toUpperCase() + role.slice(1)}</Title>
                </Flex>
                <Flex gap="small">
                    <Link href={`mailto:${email}`}>
                        <MailOutlined/>
                    </Link>
                    <Title level={4}>
                        {email}
                    </Title>
                </Flex>
            </Flex>
        </DefaultModal>
    )
}
