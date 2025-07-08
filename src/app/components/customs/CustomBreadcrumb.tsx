"use client";

import { Breadcrumb } from "antd";
import { type BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { itemRender } from "~/server/browserHistoryItemRender";
import { getLabById } from "~/server/services/labsService";
import { getGroupById } from "~/server/services/groupsService";
import { getHardwareById } from "~/server/services/hardwareService";
import { GroupFields, type GroupResponse } from "~/types/group";
import { LaboratoryFields, type LaboratoryResponse } from "~/types/laboratory";
import type { HardwareResponse } from "~/types/hardware";

// Cache to avoid refetching the same data
const breadcrumbCache = {
  labs: new Map<number, LaboratoryResponse>(),
  groups: new Map<number, GroupResponse>(),
  hardware: new Map<number, HardwareResponse>(),
  pending: new Set<string>()
};

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
  groups: "Grupos",
  group: "Grupo",
  hardware: "Hardware",
  users: "Utilizadores",
  user: "Utilizador",
  create: "Criar",
  edit: "Editar",
  calendar: "Calendário",
  search: "Pesquisar",
};

interface BreadcrumbData {
  labs: Map<number, LaboratoryResponse>;
  groups: Map<number, GroupResponse>;
  hardware: Map<number, HardwareResponse>;
}

/**
 * Generates breadcrumb items based on the current pathname
 * @param {string} pathname - The current pathname
 * @param {BreadcrumbData} breadcrumbData - The breadcrumb data
 * @param {boolean} isLoading - Whether data is currently loading
 * @returns {Breadcrumb.Item[]} - The breadcrumb items
 */
function generateBreadcrumbItems(pathname: string, breadcrumbData: BreadcrumbData, isLoading: boolean): BreadcrumbItemType[] {
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
        const id = parseInt(pathname!);

        switch (pathnames[i - 1]) {
          case "groups":
            const groupName = breadcrumbData.groups.get(id)?.[GroupFields.NAME];
            if (groupName) {
              items[items.length - 1]!.title = groupName;
            } else if (isLoading) {
              items[items.length - 1]!.title = "Carregando...";
            } else {
              items[items.length - 1]!.title = `Grupo ${id}`;
            }
            break;
          case "hardware":
            const hardwareName = breadcrumbData.hardware.get(id)?.name;
            if (hardwareName) {
              items[items.length - 1]!.title = hardwareName;
            } else if (isLoading) {
              items[items.length - 1]!.title = "Carregando...";
            } else {
              items[items.length - 1]!.title = `Hardware ${id}`;
            }
            break;
          case "users":
            items[items.length - 1]!.title = `Utilizador ${id}`;
            break;
          default:
            const labName = breadcrumbData.labs.get(id)?.[LaboratoryFields.NAME];
            if (labName) {
              items[items.length - 1]!.title = labName;
            } else if (isLoading) {
              items[items.length - 1]!.title = "Carregando...";
            } else {
              items[items.length - 1]!.title = `Laboratório ${id}`;
            }
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

export default function CustomBreadcrumb() {
  const pathname = usePathname();
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData>({
    labs: new Map(),
    groups: new Map(),
    hardware: new Map()
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch specific data needed for current path
  const fetchBreadcrumbData = async () => {
    if (!pathname) return;
    
    const pathnames = pathname.split("/").filter((x) => x);
    const neededData: { labs: number[], groups: number[], hardware: number[] } = {
      labs: [],
      groups: [],
      hardware: []
    };

    // Identify what data we need for this path
    for (let i = 0; i < pathnames.length; i++) {
      const pathname = pathnames[i];
      if (/^\d+$/.test(pathname!)) {
        const id = parseInt(pathname!);
        
        switch (pathnames[i - 1]) {
          case "groups":
            if (!breadcrumbCache.groups.has(id)) {
              neededData.groups.push(id);
            }
            break;
          case "hardware":
            if (!breadcrumbCache.hardware.has(id)) {
              neededData.hardware.push(id);
            }
            break;
          case "users":
            // Skip users for now
            break;
          default:
            if (!breadcrumbCache.labs.has(id)) {
              neededData.labs.push(id);
            }
            break;
        }
      }
    }

    // Fetch only the needed data
    if (neededData.labs.length > 0 || neededData.groups.length > 0 || neededData.hardware.length > 0) {
      setIsLoading(true);
      try {
        // Fetch labs
        const labPromises = neededData.labs.map(async (labId) => {
          const cacheKey = `lab-${labId}`;
          if (breadcrumbCache.pending.has(cacheKey)) return null;
          
          breadcrumbCache.pending.add(cacheKey);
          try {
            const lab = await getLabById(labId);
            breadcrumbCache.labs.set(labId, lab);
            return { id: labId, data: lab };
          } catch (error) {
            console.warn(`Failed to fetch lab ${labId}:`, error);
            return null;
          } finally {
            breadcrumbCache.pending.delete(cacheKey);
          }
        });

        // Fetch groups
        const groupPromises = neededData.groups.map(async (groupId) => {
          const cacheKey = `group-${groupId}`;
          if (breadcrumbCache.pending.has(cacheKey)) return null;
          
          breadcrumbCache.pending.add(cacheKey);
          try {
            const group = await getGroupById(groupId);
            breadcrumbCache.groups.set(groupId, group);
            return { id: groupId, data: group };
          } catch (error) {
            console.warn(`Failed to fetch group ${groupId}:`, error);
            return null;
          } finally {
            breadcrumbCache.pending.delete(cacheKey);
          }
        });

        // Fetch hardware
        const hardwarePromises = neededData.hardware.map(async (hardwareId) => {
          const cacheKey = `hardware-${hardwareId}`;
          if (breadcrumbCache.pending.has(cacheKey)) return null;
          
          breadcrumbCache.pending.add(cacheKey);
          try {
            const hw = await getHardwareById(hardwareId);
            breadcrumbCache.hardware.set(hardwareId, hw);
            return { id: hardwareId, data: hw };
          } catch (error) {
            console.warn(`Failed to fetch hardware ${hardwareId}:`, error);
            return null;
          } finally {
            breadcrumbCache.pending.delete(cacheKey);
          }
        });

        // Wait for all promises to resolve
        await Promise.all([
          Promise.all(labPromises),
          Promise.all(groupPromises),
          Promise.all(hardwarePromises)
        ]);

        // Update component state with cached data
        setBreadcrumbData({
          labs: new Map(breadcrumbCache.labs),
          groups: new Map(breadcrumbCache.groups),
          hardware: new Map(breadcrumbCache.hardware)
        });
      } catch (error) {
        console.error("Error fetching breadcrumb data:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Update with cached data even if no new data was fetched
      setBreadcrumbData({
        labs: new Map(breadcrumbCache.labs),
        groups: new Map(breadcrumbCache.groups),
        hardware: new Map(breadcrumbCache.hardware)
      });
    }
  };

  // Fetch data when pathname changes
  useEffect(() => {
    void fetchBreadcrumbData();
  }, [pathname]);

  if (!pathname) return null;

  // Check if the path is the dashboard, if so, don't show the breadcrumb
  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb
      itemRender={itemRender}
      items={generateBreadcrumbItems(pathname, breadcrumbData, isLoading)}
      style={{ padding: 24 }}
    />
  );
}
