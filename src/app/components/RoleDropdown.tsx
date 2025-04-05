"use client";

import { UserSwitchOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip, type MenuProps } from "antd";
import { useSession } from "next-auth/react";

interface RoleDropdownProps {
  role: string;
  tempRole: string;
}

export default function RoleDropdown({ role, tempRole }: RoleDropdownProps) {
  const { update } = useSession();

  const changeTempRole = async (role: string) => {
    await update({ tempRole: role });
  };

  const items: MenuProps["items"] = [
    // If the user is watching the page as a student, don't show it as an option
    ...(tempRole !== "student"
      ? [
          {
            key: "student",
            label: (
              <Tooltip title="Mudar para estudante">
                <div onClick={() => changeTempRole("student")}>Estudante</div>
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
                <div onClick={() => changeTempRole("teacher")}>Professor</div>
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
                <div onClick={() => changeTempRole("admin")}>Administrador</div>
              </Tooltip>
            ),
          },
        ]
      : []),
  ];

  return (
    <Dropdown menu={{ items: items }} trigger={["hover"]}>
      <UserSwitchOutlined style={{ fontSize: "125%" }} />
    </Dropdown>
  );
}
