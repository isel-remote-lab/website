"use client";

import { EditOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { type Role } from "~/types/role";
import { RoleDropdownMenu } from "./RoleDropdownMenu";

interface ChangeRoleDropdownProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

export default function ChangeRoleDropdown({
  role,
  onRoleChange,
}: ChangeRoleDropdownProps) {
  return (
    <Dropdown
      menu={{
        items: RoleDropdownMenu({
          currentRole: role,
          userRole: role,
          onRoleChange,
          isTemporary: false,
        }),
      }}
      trigger={["hover"]}
    >
      <EditOutlined />
    </Dropdown>
  );
}
