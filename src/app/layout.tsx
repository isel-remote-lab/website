import "~/styles/globals.css";

import { type Metadata } from "next";
import { Dropdown, Avatar, Menu, MenuProps } from "antd";
import React from "react";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Content } from "antd/es/layout/layout";


/**
 * Metadata for the Remote Lab application
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Remote Lab",
  description: "Remote Lab",
  //icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/**
 * Dropdown items for the user menu
 * @type {MenuProps['items']}
 */
const dropdownItems: MenuProps['items'] = [
  {
    key: 'account',
    label: 'Perfil',
    icon: <UserOutlined />,
  },
  {
    key: 'settings',
    label: 'Configurações',
    icon: <SettingOutlined />,
  },
  {
    key: 'logout',
    label: 'Sair',
    icon: <LogoutOutlined />,
  },
];

/**
 * Menu items for the Remote Lab application
 * @type {MenuProps['items']}
 */
const menuItems: MenuProps['items'] = [
  {
    key: 'logo',
    label: 'RL',
    style: { fontSize: 24, fontWeight: 'bold' },
  },
  {
    key: 'options',
    label: (
      <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
          <Avatar>
            <UserOutlined />
          </Avatar>
      </Dropdown>
    ),
    style: { marginLeft: 'auto' },
  },
];

/**
 * Root layout for the Remote Lab application
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child components to be rendered
 * @returns {React.ReactNode} The root layout component
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body style={{ backgroundColor: "#f5f5f5" }}>
        <Menu mode="horizontal" items={menuItems}/>
        <Content style={{ padding: 24 }}>
          {children}
        </Content>
      </body>
    </html>
  );
}
