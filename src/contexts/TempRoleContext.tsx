"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface TempRoleContextProps {
  tempRole: string;
  setTempRole: (role: string) => void;
}

const TempRoleContext = createContext<TempRoleContextProps>({
  tempRole: "",
  setTempRole: () => {},
});

interface TempRoleProviderProps {
  children: ReactNode;
  initialRole?: string;
}

export const TempRoleProvider = ({ children, initialRole = "" }: TempRoleProviderProps) => {
  const [tempRole, setTempRoleState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tempRole') || initialRole;
    }
    return initialRole;
  });

  const setTempRole = (role: string) => {
    setTempRoleState(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tempRole', role);
    }
  };

  return (
    <TempRoleContext.Provider value={{ tempRole, setTempRole }}> 
      {children}
    </TempRoleContext.Provider>
  );
};

export const useTempRole = () => useContext(TempRoleContext);