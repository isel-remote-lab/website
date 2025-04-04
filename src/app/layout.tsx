import "~/styles/globals.css";

import { type Metadata } from "next";
import React from "react";
import { Content } from "antd/es/layout/layout";
import CheckLogin from "./checkLogin";
import { SessionProvider } from "next-auth/react";
import Menu from "./components/CustomMenu";

/**
 * Metadata for the Remote Lab application
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Remote Lab",
  description: "Remote Lab",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/**
 * Root layout for the Remote Lab application
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child components to be rendered
 * @returns {React.ReactNode} The root layout component
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body style={{ backgroundColor: "#f5f5f5" }}>
        <SessionProvider>
          <CheckLogin>
            <Menu />
            <Content style={{ padding: 24 }}>{children}</Content>
          </CheckLogin>
        </SessionProvider>
      </body>
    </html>
  );
}
