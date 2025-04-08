import { LogoutOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Tooltip, type MenuProps } from "antd";
import Link from "next/link";
import CustomBreadcrumb from "./CustomBreadcrumb";
import UserImage from "../UserImage";
import RoleDropdown from "../dropdowns/RoleDropdown";
import { auth } from "~/server/auth";
import Image from "next/image";
import Search from "antd/es/input/Search";

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
  const dropdownItems: MenuProps["items"] = [
    {
      key: "account",
      label: <Link href="/account">Conta</Link>,
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
      key: "logout",
      label: <Link href="/api/auth/signout">Sair</Link>,
      icon: <LogoutOutlined />,
    },
  ];

  const menuHeight = 64;

  /**
   * Menu items for the client menu
   * @type {MenuProps['items']}
   */
  const menuItems: MenuProps["items"] = [
    {
      key: "logo",
      label: (
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/logo.svg" alt="RL" width={40} height={40} />
        </Link>
      ),
    },
    {
      key: "breadcrumb",
      label: <CustomBreadcrumb />,
      style: { fontSize: 18, fontWeight: "bold" },
    },
    {
      key: "search",
      label: <Search placeholder="Pesquisar..." />,
      style: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: menuHeight / 4,
        width: "30%",
      },
    },
    // If the user is either an admin or a teacher, show the create lab and the change role options
    ...(role !== "student"
      ? [
          // If the user is watching the page as a teacher, show the create lab option
          ...(tempRole === "teacher"
            ? [
                {
                  key: "create-lab",
                  label: (
                    <Tooltip title="Criar laboratório">
                      <Link href="/lab/create">
                        <PlusOutlined style={{ fontSize: "125%" }} />
                      </Link>
                    </Tooltip>
                  ),
                  style: tempRole === "teacher" ? { marginLeft: "auto" } : {},
                },
              ]
            : []),
          // If the user is an admin or a teacher, show the change role option
          {
            key: "change-role",
            label: <RoleDropdown role={role} tempRole={tempRole} />,
            style: tempRole !== "teacher" ? { marginLeft: "auto" } : {},
          },
        ]
      : []),
    {
      key: "options",
      label: (
        <Dropdown menu={{ items: dropdownItems }} trigger={["hover"]}>
          <Avatar icon={<UserImage />} size={45} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Menu
      mode="horizontal"
      style={{ alignItems: "center", height: menuHeight }}
      items={menuItems}
    />
  );
}
