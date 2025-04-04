"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface RoleContextProps {
  tempRole: string;
  setTempRole: (role: string) => void;
}

const RoleContext = createContext<RoleContextProps>({
  tempRole: "",
  setTempRole: () => {
    // Default function does nothing
  }
});

export const TempRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession()
  const [tempRole, setTempRole] = useState("")

  // Inicializa o tempRole com o role da sessão, se disponível
  useEffect(() => {
    if (session && session.user && session.user.role) {
      setTempRole(session.user.role);
    }
  }, [session]);

  return (
    <RoleContext.Provider value={{ tempRole, setTempRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
