"use client";

import { EditOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { type Role, type RoleLetter } from "~/types/role";
import { updateUserRole } from "~/server/services/usersService";
import { ChangeRoleDropdownMenu } from "./RoleDropdownMenu";
import { useRouter } from "next/navigation";
import { useNotifications } from "~/hooks/useNotifications";

interface ChangeRoleDropdownProps {
  role: Role;
  id: string;
  userName: string;
}

export default function ChangeRoleDropdown({
  role,
  id,
  userName,
}: ChangeRoleDropdownProps) {
  const { contextHolder, showSuccess, showError } = useNotifications();
  const router = useRouter();

  const handleRoleChange = async (userId: string, newRole: RoleLetter) => {
    try {
      await updateUserRole(userId, { role: newRole });
      
      showSuccess({
        message: "Role atualizada com sucesso",
        description: `A role do utilizador ${userName} foi alterada com sucesso`
      });
      
      // Refresh the page to show the updated role
      router.refresh();
    } catch {
      showError({
        message: "Erro ao atualizar role",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde"
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{
          items: ChangeRoleDropdownMenu({
            currentRole: role,
            userRole: role,
            id: id,
            onRoleChange: handleRoleChange,
          }),
        }}
        trigger={["hover"]}
      >
        <EditOutlined />
      </Dropdown>
    </>
  );
}
