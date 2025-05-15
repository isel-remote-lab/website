"use client";

import { Tooltip, type MenuProps } from "antd";
import { Role } from "~/types/role";
import { labels, titles } from "./roleConstants";

interface RoleDropdownMenuProps {
  currentRole: Role;
  userRole: Role;
  onRoleChange: (role: Role) => void;
  isTemporary?: boolean;
}

export function RoleDropdownMenu({
  currentRole,
  userRole,
  onRoleChange,
  isTemporary = false,
}: RoleDropdownMenuProps): MenuProps["items"] {
  const items: MenuProps["items"] = [];

  // Student role option
  if (isTemporary ? currentRole !== Role.STUDENT : userRole !== Role.STUDENT) {
    items.push({
      key: "student",
      label: (
        <Tooltip title={titles.student}>
          <div onClick={() => onRoleChange(Role.STUDENT)}>{labels.student}</div>
        </Tooltip>
      ),
    });
  }

  // Teacher role option
  if (
    isTemporary
      ? currentRole !== Role.TEACHER && userRole !== Role.STUDENT
      : userRole !== Role.TEACHER
  ) {
    items.push({
      key: "teacher",
      label: (
        <Tooltip title={titles.teacher}>
          <div onClick={() => onRoleChange(Role.TEACHER)}>{labels.teacher}</div>
        </Tooltip>
      ),
    });
  }

  // Admin role option
  if (
    isTemporary
      ? currentRole !== Role.ADMIN && userRole === Role.ADMIN
      : userRole !== Role.ADMIN
  ) {
    items.push({
      key: "admin",
      label: (
        <Tooltip title={titles.admin}>
          <div onClick={() => onRoleChange(Role.ADMIN)}>{labels.admin}</div>
        </Tooltip>
      ),
    });
  }

  return items;
}
