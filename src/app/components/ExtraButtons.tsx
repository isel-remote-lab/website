"use client"

import { PlusOutlined } from "@ant-design/icons"
import { Flex, Tooltip } from "antd"
import Link from "next/link"
import { useTempRole } from "~/contexts/TempRoleContext"
import RoleDropdown from "./dropdowns/RoleDropdown"

interface ExtraButtonsProps {
    role: string
}

export default function getExtraButtons({ role }: ExtraButtonsProps) {
    const { tempRole, setTempRole } = useTempRole()

    return (
    <Flex gap="small" justify="end">
        {/* If the user is watching the page as a teacher, show the create lab option */
        tempRole === "teacher" && (
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Tooltip title="Criar laboratório" placement="bottom" mouseEnterDelay={0.5} styles={{ root: { zIndex: 1000 } }}>
                    <Link href="/labs/create">
                        <PlusOutlined style={{ fontSize: "125%" }} />
                    </Link>
                </Tooltip>
            </div>
        )}
        <RoleDropdown role={role}/>
    </Flex>
)
}