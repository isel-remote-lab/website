"use client";

import { UserSwitchOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useTempRole } from "~/contexts/TempRoleContext";
import { Role } from "~/types/role";
import { RoleDropdownMenu } from "./RoleDropdownMenu";

interface RoleDropdownProps {
  role: Role
}

export default function RoleDropdown({ role }: RoleDropdownProps) {
  const { tempRole, setTempRole } = useTempRole()

  return (
    <>
      {role !== Role.STUDENT && (
        <Dropdown 
          menu={{ 
            items: RoleDropdownMenu({ 
              currentRole: tempRole, 
              userRole: role, 
              onRoleChange: setTempRole,
              isTemporary: true
            }) 
          }} 
          trigger={["hover"]}
        >
          <UserSwitchOutlined style={{ fontSize: "125%" }} />
        </Dropdown>
      )}
    </>
  );
}
