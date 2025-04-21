"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Role } from "~/types/role";
import { useRouter } from "next/navigation";
// Define all the valid roles
const VALID_ROLES: Role[] = ["student", "teacher", "admin"];

interface TempRoleContextProps {
  tempRole: Role;
  setTempRole: (role: Role) => void;
}

const TempRoleContext = createContext<TempRoleContextProps>({
  tempRole: "student",
  setTempRole: () => {},
});

interface TempRoleProviderProps {
  children: ReactNode;
  role: Role;
}

// Helper function to check if a role can be assigned based on user's real role
const canAssignRole = (userRole: Role, targetRole: Role): boolean => {
  switch (userRole) {
    case "student":
      return targetRole === "student";
    case "teacher":
      return targetRole === "student" || targetRole === "teacher";
    case "admin":
      return targetRole === "student" || targetRole === "teacher" || targetRole === "admin";
    default:
      return targetRole === userRole;
  }
};

export default function TempRoleProvider ({ children, role }: TempRoleProviderProps) {
  const router = useRouter()

  const [tempRole, setTempRoleState] = useState<Role>(() => {
    if (typeof window !== 'undefined') {
      // If the user is in a browser, check if there is a stored role
      const storedRole = localStorage.getItem('tempRole') as Role | null
      // Validate stored role
      if (storedRole && VALID_ROLES.includes(storedRole)) {
        // Check if the stored role is allowed for the user's real role
        if (canAssignRole(role, storedRole)) {
          return storedRole
        }
      }
    }
    return role
  })

  // Update tempRole when role changes
  useEffect(() => {
    if (role && !canAssignRole(role, tempRole)) {
      setTempRoleState(role);
      if (typeof window !== 'undefined') {
        localStorage.setItem('tempRole', role);
      }
    }
  }, [role, tempRole]);

  const setTempRole = (role: Role) => {
    // Validate the new role
    if (!VALID_ROLES.includes(role)) {
      router.push(`/error?message=Invalid role`)
    }

    // Check if the user can assign this role based on their real role
    if (!canAssignRole(role, tempRole)) {
      router.push(`/error?message=User with role ${role} cannot assign role ${tempRole}`)
    }

    setTempRoleState(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tempRole', role);
    }
  };

  // Event listener used to detect manual localStorage changes
  useEffect(() => {
    // If the code is not running in the browser, return
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tempRole' && e.newValue) {
        // Validate the new value
        if (VALID_ROLES.includes(e.newValue as Role) && 
            canAssignRole(role, e.newValue as Role)) {
          setTempRoleState(e.newValue as Role);
        } else {
          // If invalid, revert to the current valid role
          localStorage.setItem('tempRole', tempRole);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [tempRole, role]);

  return (
    <TempRoleContext.Provider value={{ tempRole, setTempRole }}> 
      {children}
    </TempRoleContext.Provider>
  );
};

export const useTempRole = () => useContext(TempRoleContext);