"use client";

import { IdcardOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useTempRole } from "~/contexts/TempRoleContext";
import { Role } from "~/types/role";
import { TempRoleDropdownMenu } from "./RoleDropdownMenu";

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
            items: TempRoleDropdownMenu({
              currentRole: tempRole,
              userRole: role,
              id: "",
              onRoleChange: setTempRole,
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
