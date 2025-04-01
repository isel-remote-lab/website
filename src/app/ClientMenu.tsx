'use client'
import { LeftOutlined, LogoutOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, type MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import router from "next/router";

/**
 * Back item for the menu
 * @type {MenuProps['items'][0]}
 */
const backItem = {
  key: 'back',
  label: <button onClick={() => router.back()}/>,
  icon: <LeftOutlined />
}

/**
 * Logo item for the menu
 * @type {MenuProps['items'][0]}
 */
const logoItem = {
  key: 'logo',
  label: (
      <Link href="/" 
      //style={{ color: 'black' }}
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
      key: 'change-role',
      label: 'Mudar de Role', // TODO: Melhorar a label e adicionar logica de roles
      icon: <UserSwitchOutlined/>
    },
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
    // Start with the logo item
    let items: MenuProps['items'] = []

    const path = usePathname()

    if (path === null) {
      return items.concat(logoItem)
    }

    if (path.endsWith('/create')) {
      return items.concat(logoItem)
    }

    if (path.endsWith('/calendar')) {
      //items = items.concat(backItem)
    }

    items = items.concat(logoItem);

    // If the path is /lab/:id, add the lab items to the menu
    if (path.startsWith('/lab/')) {
      const labItems = [
          {
              key: 'calendar',
              label: (
                  <Link href={path + "/calendar"}>
                      Calendário
                  </Link>
              ),
              active: !path.endsWith('/calendar'),
          },
      ];

      // Add the lab items to the menu
      items = items.concat(labItems)
    }

    // Add the options item to the menu
    return items.concat([optionsItem])
}

/**
 * Client menu component
 * @returns The client menu component
 */
export default function ClientMenu() {
    return <Menu mode="horizontal" items={MenuItems()}/>
}
