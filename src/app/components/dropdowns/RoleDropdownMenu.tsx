"use client";

import { Tooltip, type MenuProps } from "antd";
import { Role, RoleLetter } from "~/types/role";
import { labels, titles } from "./roleConstants";

interface TempRoleDropdownMenuProps {
  currentRole: Role;
  userRole: Role;
  id: string;
  onRoleChange: (role: Role) => void;
}

interface ChangeRoleDropdownMenuProps {
  currentRole: Role;
  userRole: Role;
  id: string;
  onRoleChange: (id: string, role: RoleLetter) => Promise<void>;
}

export function TempRoleDropdownMenu({
  currentRole,
  userRole,
  id,
  onRoleChange,
}: TempRoleDropdownMenuProps): MenuProps["items"] {
  const items: MenuProps["items"] = [];

  // Student role option
  if (currentRole !== Role.STUDENT) {
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
  if (currentRole !== Role.TEACHER && userRole !== Role.STUDENT) {
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
  if (currentRole !== Role.ADMIN && userRole === Role.ADMIN) {
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

export function ChangeRoleDropdownMenu({
  currentRole,
  userRole,
  id,
  onRoleChange,
}: ChangeRoleDropdownMenuProps): MenuProps["items"] {
  const items: MenuProps["items"] = [];

  // Student role option
  if (userRole !== Role.STUDENT) {
    items.push({
      key: "student",
      label: (
        <Tooltip title={titles.student}>
          <div onClick={() => onRoleChange(id, RoleLetter.STUDENT)}>{labels.student}</div>
        </Tooltip>
      ),
    });
  }

  // Teacher role option
  if (userRole !== Role.TEACHER) {
    items.push({
      key: "teacher",
      label: (
        <Tooltip title={titles.teacher}>
          <div onClick={() => onRoleChange(id, RoleLetter.TEACHER)}>{labels.teacher}</div>
        </Tooltip>
      ),
    });
  }

  // Admin role option
  if (userRole !== Role.ADMIN) {
    items.push({
      key: "admin",
      label: (
        <Tooltip title={titles.admin}>
          <div onClick={() => onRoleChange(id, RoleLetter.ADMIN)}>{labels.admin}</div>
        </Tooltip>
      ),
    });
  }

  return items;
}

// Legacy function for backward compatibility
export function RoleDropdownMenu({
  currentRole,
  userRole,
  isTemporary = false,
  id,
  onRoleChange,
}: {
  currentRole: Role;
  userRole: Role;
  isTemporary?: boolean;
  id: string;
  onRoleChange: (id: string, role: RoleLetter) => Promise<void> | ((role: Role) => void);
}): MenuProps["items"] {
  if (isTemporary) {
    return TempRoleDropdownMenu({
      currentRole,
      userRole,
      id,
      onRoleChange: onRoleChange as unknown as (role: Role) => void,
    });
  } else {
    return ChangeRoleDropdownMenu({
      currentRole,
      userRole,
      id,
      onRoleChange: onRoleChange as unknown as (id: string, role: RoleLetter) => Promise<void>,
    });
  }
}
