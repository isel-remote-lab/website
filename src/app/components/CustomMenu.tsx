import { LogoutOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Tooltip, type MenuProps } from "antd";
import Link from "next/link"
import CustomBreadcrumb from "./CustomBreadcrumb";
import UserImage from "./UserImage";
import { auth } from "~/server/auth";
import RoleDropdown from "./RoleDropdown";
import LogoSwitch from "./LogoSwitch";

/**
 * Client menu component
 * @returns The client menu component
 */
export default async function CustomMenu() {
    const session = await auth();
    const { role, tempRole } = session!.user;

    /**
     * Dropdown items for the user menu
     * @type {MenuProps['items']}
     */
    const dropdownItems: MenuProps['items'] = [
      {
        key: 'account',
        label: (
            <Link href="/account">
              Conta
            </Link>
        ),
        icon: <UserOutlined />,
      },
      /*
      {
        key: "change-theme",
        label: (
          <Tooltip title="Mudar o tema">
            <Link href="/theme">
              Mudar tema
            </Link>
          </Tooltip>
        ),
        icon: <SunOutlined />,
      },
      */
      {
        key: 'logout',
        label: (
          <Link href="/api/auth/signout">
            Sair
          </Link>
        ),
        icon: <LogoutOutlined />,
      },
    ]

    /**
     * Menu items for the client menu
     * @type {MenuProps['items']}
     */
    const menuItems = [
      {
        key: 'logo',
        label: <LogoSwitch />,
      },
      {
        key: 'breadcrumb',
        label: (
            <CustomBreadcrumb />
        ),
        style: {fontSize: 18, fontWeight: 'bold'},
      },
      // If the user is either an admin or a teacher, show the create lab and the change role options
      ...(role !== "student"
        ? [
            // If the user is watching the page as a teacher, show the create lab option
            ...(tempRole === "teacher"
              ? [ {
                    key: 'create-lab',
                    label: (
                      <Tooltip title="Criar laboratório">
                        <Link href="/lab/create">
                          <PlusOutlined style={{fontSize: "125%"}}/>
                        </Link>
                      </Tooltip>
                    ),
                    style: (tempRole === "teacher" ? { marginLeft: 'auto' } : {}),
                  } ]
              : []),
            // If the user is an admin or a teacher, show the change role option
            {
              key: 'change-role',
              label: (
                <RoleDropdown 
                  role={role}
                  tempRole={tempRole}
                />
              ),
              style: (tempRole !== "teacher" ? { marginLeft: 'auto' } : {}),
            },
          ]
        : []),
      {
        key: 'options',
        label: (
            <Dropdown menu={{ items: dropdownItems }} trigger={['hover']}>
              <Avatar icon={<UserImage />} size={45}/>
            </Dropdown>
        ),
      }
    ]
    
    return <Menu mode="horizontal" style={{alignItems: 'center', height: 64 }} items={menuItems}/>
}

