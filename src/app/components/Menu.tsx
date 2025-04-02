import { LogoutOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, type MenuProps } from "antd";
import Link from "next/link";

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
 * Menu items for the client menu
 * @type {MenuProps['items']}
 */
const menuItems = [
  {
    key: 'logo',
    label: (
        <Link href="/" 
        //style={{ color: 'black' }}
        >
        RL
        </Link>
    ),
    style: { fontSize: 24, fontWeight: 'bold'},
    disabled: true
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
  }
]

/**
 * Client menu component
 * @returns The client menu component
 */
export default function ClientMenu() {
    return <Menu mode="horizontal" items={menuItems}/>
}
