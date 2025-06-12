"use client";

import { Breadcrumb } from "antd";
import { type BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { usePathname } from "next/navigation";
import { itemRender } from "~/server/browserHistoryItemRender";
import { GroupFields, type GroupResponse } from "~/types/group";
import { LaboratoryFields, type LaboratoryResponse } from "~/types/laboratory";
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

interface generateBreadcrumbItemsProps {
  pathname: string;
  labs: LaboratoryResponse[];
  groups: GroupResponse[];
}

/**
 * Generates breadcrumb items based on the current pathname
 * @param {string} pathname - The current pathname
 * @returns {Breadcrumb.Item[]} - The breadcrumb items
 */
function generateBreadcrumbItems({ pathname, labs, groups }: generateBreadcrumbItemsProps): BreadcrumbItemType[] {
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

      // Check if the pathname is a number (lab ID or group ID)
      if (/^\d+$/.test(pathname!)) {
        const id = pathname;

        switch (pathnames[i - 1]) {
          case "groups":
            const groupName = groups[parseInt(id!) - 1]?.[GroupFields.NAME];
            items[items.length - 1]!.title = groupName ?? `Grupo ${id}`;
            break;
          default:
            const name = labs[parseInt(id!) - 1]?.[LaboratoryFields.NAME];
            items[items.length - 1]!.title = name ?? `Lab ${id}`;
            break;
        }
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

interface CustomBreadcrumbProps {
  labs: LaboratoryResponse[];
  groups: GroupResponse[];
}

export default function CustomBreadcrumb({ labs = [], groups = [] }: CustomBreadcrumbProps) {
  const pathname = usePathname();
  if (!pathname) return null;

  // Check if the path is the dashboard, if so, don't show the breadcrumb
  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb
      itemRender={itemRender}
      items={generateBreadcrumbItems({pathname, labs, groups})}
      style={{ padding: 24 }}
    />
  );
}
