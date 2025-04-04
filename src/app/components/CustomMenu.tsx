import { LogoutOutlined, PlusOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Tooltip, type MenuProps } from "antd";
import Link from "next/link"
import CustomBreadcrumb from "./CustomBreadcrumb";
import UserImage from "./UserImage";
import { auth } from "~/server/auth";
import Image from "next/image";

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
      // If the user is watching the page as a student, don't show it as an option
      ...(role !== "student"
        ? [ {
              key: 'student',
              label: (
                <Tooltip title="Mudar para estudante">
                  <div>
                    Estudante
                  </div>
                </Tooltip>
              ),
            } 
          ]
        : []),
      // If the user is watching the page as a teacher, don't show it as an option
      ...(role !== "teacher"
        ? [
            {
              key: 'teacher',
              label: (
                <Tooltip title="Mudar para professor">
                  <div>
                    Professor
                  </div>
                </Tooltip>
              ),
            },
            // If the user is watching the page as an admin, don't show it as an option
            ...(role !== "admin"
              ? [
                  {
                    key: 'admin',
                    label: (
                      <Tooltip title="Mudar para administrador">
                        <div>
                          Administrador
                        </div>
                      </Tooltip>
                    ),
                  },
              ]
              : []),
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
      // If the user is either an admin or a teacher, show the create lab and the change role options
      ...(role !== "student"
        ? [
            // If the user is a teacher, show the create lab option
            ...(role === "teacher"
              ? [ {
                    key: 'create-lab',
                    label: (
                      <Tooltip title="Criar laboratório" placement="bottom">
                        <Link href="/lab/create">
                          <PlusOutlined style={{fontSize: "125%"}}/>
                        </Link>
                      </Tooltip>
                    ),
                    style: { marginLeft: 'auto' },
                  } ]
              : []),
            // If the user is an admin or a teacher, show the change role option
            {
              key: 'change-role',
              label: (
                <Dropdown menu={{ items: roleChangeItems }} trigger={['hover']}>
                  <div>
                    <UserSwitchOutlined style={{fontSize: "125%"}}/>
                  </div>
                </Dropdown>
              ),
              style: (role === "admin" ? { marginLeft: 'auto' } : {}),
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

