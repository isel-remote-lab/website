"use client";

import { Breadcrumb } from "antd";
import { type BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { usePathname } from "next/navigation";
import { labs } from "~/app/page";
import { itemRender } from "~/server/browserHistoryItemRender";

/**
 * The breadcrumb item for the dashboard
 * @type {Breadcrumb.Item}
 */
const breadcrumbDashboard: BreadcrumbItemType[] = [
  {
    title: "Dashboard",
    path: "/",
  },
];

/**
 * Special paths that have custom titles
 * @type {Record<string, string>}
 */
const specialPaths: Record<string, string[]> = {
  "/account": ["Perfil"],
  "/lab/create": ["Criar laboratório"],
  "/lab/edit": ["Editar laboratório"],
};

/**
 * Translations for the breadcrumb items
 * @type {Record<string, string>}
 */
const translations: Record<string, string> = {
  account: "Perfil",
  lab: "Laboratório",
  labs: "Laboratórios",
  settings: "Configurações",
  devices: "Dispositivos",
  device: "Dispositivo",
};

/**
 * Generates breadcrumb items based on the current pathname
 * @param {string} pathname - The current pathname
 * @returns {Breadcrumb.Item[]} - The breadcrumb items
 */
function generateBreadcrumbItems(pathname: string): BreadcrumbItemType[] {
  // Split the pathname into an array of path segments
  const pathnames = pathname.split("/").filter((x) => x);

  const items: BreadcrumbItemType[] = [];

  // Check if the pathname is in special paths
  if (specialPaths[pathname]) {
    items.push({
      title: specialPaths[pathname],
      path: pathname,
    });
  } else {
    for (let i = 0; i < pathnames.length; i++) {
      const pathname = pathnames[i];

      // Check if the pathname is a number (lab ID)
      if (/^\d+$/.test(pathname!)) {
        const labId = pathname;
        // TODO : Add logic to get the name of the lab from the database
        const labName = labs[parseInt(labId!) - 1]?.labName;
        // Convert Laboratory object to string for ReactNode compatibility
        items[items.length - 1]!.title = labName ? labName : `Lab ${labId}`;
      } else {
        const title =
          translations[pathname!] ??
          pathname!.charAt(0).toUpperCase() + pathname!.slice(1);
        const href = "/" + pathnames.slice(0, i + 1).join("/");
        items.push({ title, href });
      }
    }
  }

  items[items.length - 1]!.href = undefined;

  return [...breadcrumbDashboard, ...items];
}

export default function CustomBreadcrumb() {
  const pathname = usePathname();
  if (!pathname) return null;

  // Check if the path is the dashboard, if so, don't show the breadcrumb
  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb
      itemRender={itemRender}
      items={generateBreadcrumbItems(pathname)}
      style={{ padding: 24 }}
    />
  );
}
