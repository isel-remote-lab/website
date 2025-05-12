import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, type MenuProps } from "antd";
import Link from "next/link";
import CustomBreadcrumb from "./CustomBreadcrumb";
import UserImage from "../UserImage";
import { auth } from "~/server/auth";
import Image from "next/image";
import Search from "antd/es/input/Search";
import CrateLabTopButton from "../buttons/topButtons/CrateLabTopButton";
import RoleDropdown from "../dropdowns/RoleDropdown";

/**
 * Client menu component
 * @returns The client menu component
 */
export default async function CustomMenu() {
  const session = await auth()

  const { role } = session!.user;

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

  const menuItems: MenuProps["items"] = [
    {
      key: "logo",
      label: (
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/black-logo.svg" alt="RL" width={60} height={0}/>
        </Link>
      ),
    },
    {
      key: "breadcrumb",
      label: <CustomBreadcrumb />,
      style: { fontSize: 18, fontWeight: "bold" }
    },
    {
      key: "search",
      label: (
        <div style={{ width: "100%", display: "f<lex", justifyContent: "center" }}>
          <Search placeholder="Pesquisar..." style={{ width: "30rem", maxWidth: "100%" }} />
        </div>
      ),
      style: { position: "absolute", left: "50%", transform: "translateX(-50%)", top: "25%" }
    },
    {
      key: "create-lab",
      label: <CrateLabTopButton role={role} />,
      style: { marginLeft: "auto" }
    },
    {
      key: "change-role",
      label: <RoleDropdown role={role} />,
    },
    /*
    {
      key: "extra-buttons",
      label: <ExtraButtons role={role} />,
      style: { marginLeft: "auto" }
    },
    */
    {
      key: "options",
      label: (
        <Dropdown menu={{ items: dropdownItems }} trigger={["hover"]}>
          <Avatar icon={<UserImage />} size={45} />
        </Dropdown>
      ),
    }
  ];

  return (
    <Menu
      mode="horizontal"
      style={{
        display: "flex",
        alignItems: "center",
        height: menuHeight,
        width: "100%",
        position: "relative"
      }}
      items={menuItems}
    />
  );
}
