'use client'
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, type MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Logo item for the menu
 * @type {MenuProps['items'][0]}
 */
const logoItem = {
  key: 'logo',
  label: (
      <Link
      href="/"
      style={{ color: 'black' }}
      >
      RL
      </Link>
  ),
  style: { fontSize: 24, fontWeight: 'bold'},
}

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
        </Link>),
      icon: <UserOutlined />,
    },
    /*{
      key: 'change-theme',
      label: 'Alterar tema',
      icon: (
        <SunOutlined />
      )
    },
    {
      key: 'settings',
      label: 'Configurações',
      icon: <SettingOutlined />,
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
];

/**
 * Options item for the menu
 * @type {MenuProps['items'][1]}
 */
const optionsItem = {
  key: 'options',
  label: (
      <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
          <Avatar>
          <UserOutlined />
          </Avatar>
      </Dropdown>
  ),
  style: { marginLeft: 'auto' },
}

/**
 * Get the menu items for the application
 * @returns {MenuProps['items']} The menu items
 */
function MenuItems() {
    let items = [logoItem];

    const path = usePathname();
    console.log(path);
    if (path?.includes('/lab')) {
        const labItems = [
            {
                key: 'calendar',
                label: 'Calendário',
            },
        ];

        items = items.concat(labItems);
    }

    return items.concat([optionsItem]);
}

/**
 * Client menu component
 * @returns The client menu component
 */
export default function ClientMenu() {
    return <Menu mode="horizontal" items={MenuItems()}/>
}
