import "~/styles/globals.css";
import "@xterm/xterm/css/xterm.css";

import { type Metadata } from "next";
import React from "react";
import { Content } from "antd/es/layout/layout";
import CheckLogin from "./checkLogin";
import { SessionProvider } from "next-auth/react";
import Menu from "./components/customs/CustomMenu";
import TempRoleProvider from "~/contexts/TempRoleContext";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

/**
 * Metadata for the Remote Lab application
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "ISEL Remote Lab",
  description: "ISEL Remote Lab",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/**
 * Root layout for the Remote Lab application
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child components to be rendered
 * @param {React.ReactNode} props.modal - The modal component to be rendered
 * @returns {React.ReactNode} The root layout component
 */
export default async function RootLayout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const role = session.user.role;

  return (
    <html>
      <body style={{ backgroundColor: "#f5f5f5" }}>
        <SessionProvider>
          <CheckLogin>
            <TempRoleProvider role={role}>
                <Menu />
                <Content style={{ padding: 24 }}>
                  {children}
                  {modal}
                </Content>
            </TempRoleProvider>
          </CheckLogin>
        </SessionProvider>
      </body>
    </html>
  );
}
