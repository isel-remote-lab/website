"use client";

import { IdcardOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useTempRole } from "~/contexts/TempRoleContext";
import { Role } from "~/types/role";
import { RoleDropdownMenu } from "./RoleDropdownMenu";

interface RoleDropdownProps {
  role: Role;
}

export default function RoleDropdown({ role }: RoleDropdownProps) {
  const { tempRole, setTempRole } = useTempRole();

  const iconStyle = { fontSize: "125%" };

  return (
    <>
      {role !== Role.STUDENT && (
        <Dropdown
          menu={{
            items: RoleDropdownMenu({
              currentRole: tempRole,
              userRole: role,
              onRoleChange: setTempRole,
              isTemporary: true,
            }),
          }}
          trigger={["hover"]}
        >
          {tempRole === Role.STUDENT ? (
            <UserOutlined style={iconStyle} />
          ) : tempRole === Role.TEACHER ? (
            <IdcardOutlined style={iconStyle} />
          ) : (
            <ToolOutlined style={iconStyle} />
          )}
        </Dropdown>
      )}
    </>
  );
}
