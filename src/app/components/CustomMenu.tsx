import { LogoutOutlined, PlusOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Tooltip, type MenuProps } from "antd";
import Link from "next/link"
import CustomBreadcrumb from "./CustomBreadcrumb";
import UserImage from "./UserImage";
import { auth } from "~/server/auth";
import Image from "next/image";
import changeRole from "~/server/changeRole";

/**
 * Client menu component
 * @returns The client menu component
 */
export default async function CustomMenu() {
    const session = await auth();
    if (!session?.user) return false;
    const { role } = session.user;

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

    const roleChangeItems: MenuProps['items'] = [
      {
        key: 'student',
        label: (
          <Tooltip title="Mudar para estudante">
            <div onClick={(changeRole("student"))}>
              Estudante
            </div>
          </Tooltip>
        ),
      },
      {
        key: 'teacher',
        label: (
          <Tooltip title="Mudar para professor">
            <div onClick={(changeRole("teacher"))}>
              Professor
            </div>
          </Tooltip>
        ),
      },
      ...(role !== "teacher"
        ? [
            {
              key: 'admin',
              label: (
                <Tooltip title="Mudar para administrador">
                  <div onClick={(changeRole("admin"))}>
                    Administrador
                  </div>
                </Tooltip>
              ),
            },
        ]
        : []),
    ]

    /**
     * Menu items for the client menu
     * @type {MenuProps['items']}
     */
    const menuItems = [
      {
        key: 'logo',
        label: (
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="RL"
              width={40}
              height={40}
              />
          </Link>
        )
      },
      {
        key: 'breadcrumb',
        label: (
            <CustomBreadcrumb />
        ),
        style: {fontSize: 18, fontWeight: 'bold'},
      },
      ...(role !== "student"
        ? [
            {
              key: 'create-lab',
              label: (
                <Tooltip title="Criar laboratório" placement="bottom">
                  <Link href="/lab/create">
                    <PlusOutlined style={{fontSize: "125%"}}/>
                  </Link>
                </Tooltip>
              ),
              style: { marginLeft: 'auto' },
            },
            {
              key: 'change-role',
              label: (
                <Dropdown menu={{ items: roleChangeItems }} trigger={['hover']}>
                  <UserSwitchOutlined style={{fontSize: "125%"}}/>
                </Dropdown>
              )
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

