"use client";

import { UserSwitchOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import { useTempRole } from "~/contexts/TempRoleContext";
import { Role } from "~/types/role";
interface RoleDropdownProps {
  role: Role
}

export default function RoleDropdown({ role }: RoleDropdownProps) {
  const { tempRole, setTempRole } = useTempRole()

  const items: MenuProps["items"] = [
    // If the user is watching the page as a student, don't show it as an option
    ...(tempRole !== Role.STUDENT
      ? [
          {
            key: "student",
            label: (
              <Tooltip title="Mudar para estudante">
                <div onClick={() => setTempRole(Role.STUDENT)}>Estudante</div>
              </Tooltip>
            ),
          },
        ]
      : []),
    // If the user is watching the page as a teacher, don't show it as an option
    // Only show it if the user is indeed a teacher or an admin
    ...(tempRole !== Role.TEACHER && role !== Role.STUDENT
      ? [
          {
            key: "teacher",
            label: (
              <Tooltip title="Mudar para professor">
                <div onClick={() => setTempRole(Role.TEACHER)}>Professor</div>
              </Tooltip>
            ),
          },
        ]
      : []),
    // If the user is watching the page as an admin, don't show it as an option
    // Ony show it if the user is indeed an admin
    ...(tempRole !== Role.ADMIN && role === Role.ADMIN
      ? [
          {
            key: "admin",
            label: (
              <Tooltip title="Mudar para administrador">
                <div onClick={() => setTempRole(Role.ADMIN)}>Administrador</div>
              </Tooltip>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      {role !== Role.STUDENT && (
        <Dropdown menu={{ items: items }} trigger={["hover"]}>
          <UserSwitchOutlined style={{ fontSize: "125%" }} />
        </Dropdown>
      )}
    </>
  );
}
