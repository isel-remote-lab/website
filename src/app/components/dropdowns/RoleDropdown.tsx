"use client";

import { UserSwitchOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import { useTempRole } from "~/contexts/TempRoleContext";

interface RoleDropdownProps {
  role: string
}

export default function RoleDropdown({ role }: RoleDropdownProps) {
  const { tempRole, setTempRole } = useTempRole()

  const items: MenuProps["items"] = [
    // If the user is watching the page as a student, don't show it as an option
    ...(tempRole !== "student"
      ? [
          {
            key: "student",
            label: (
              <Tooltip title="Mudar para estudante">
                <div onClick={() => setTempRole("student")}>Estudante</div>
              </Tooltip>
            ),
          },
        ]
      : []),
    // If the user is watching the page as a teacher, don't show it as an option
    // Only show it if the user is indeed a teacher or an admin
    ...(tempRole !== "teacher" && role !== "student"
      ? [
          {
            key: "teacher",
            label: (
              <Tooltip title="Mudar para professor">
                <div onClick={() => setTempRole("teacher")}>Professor</div>
              </Tooltip>
            ),
          },
        ]
      : []),
    // If the user is watching the page as an admin, don't show it as an option
    // Ony show it if the user is indeed an admin
    ...(tempRole !== "admin" && role === "admin"
      ? [
          {
            key: "admin",
            label: (
              <Tooltip title="Mudar para administrador">
                <div onClick={() => setTempRole("admin")}>Administrador</div>
              </Tooltip>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      {role !== "student" && (
        <Dropdown menu={{ items: items }} trigger={["hover"]}>
          <UserSwitchOutlined style={{ fontSize: "125%" }} />
        </Dropdown>
      )}
    </>
  );
}
