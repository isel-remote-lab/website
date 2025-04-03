'use client'

import { Breadcrumb, Divider } from "antd"
import { type BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb"
import { usePathname } from "next/navigation"
import { itemRender } from "~/server/BrowserHistoryItemRender"

/**
 * The breadcrumb item for the dashboard
 * @type {Breadcrumb.Item}
 */
const breadcrumbDashboard: BreadcrumbItemType[] = [
    {
        title: 'Dashboard',
        path: '/',
    }
]

/**
 * Special paths that have custom titles
 * @type {Record<string, string>}
 */
const specialPaths: Record<string, string[]> = {
    "/account": ["Perfil"],
    "/lab/create": ["Criar laboratório"],
    "/lab/edit": ["Editar laboratório"],
}

/**
 * Translations for the breadcrumb items
 * @type {Record<string, string>}
 */
const translations: Record<string, string> = {
    account: "Perfil",
    lab: "Laboratório",
    labs: "Laboratórios",
    devices: "Dispositivos",
    device: "Dispositivo",
}
  

/**
 * Generates breadcrumb items based on the current pathname
 * @param {string} pathname - The current pathname
 * @returns {Breadcrumb.Item[]} - The breadcrumb items
 */
function generateBreadcrumbItems(pathname: string): BreadcrumbItemType[] {

    // Split the pathname into an array of path segments
    const pathnames = pathname.split('/').filter((x) => x)

    const items: BreadcrumbItemType[] = []

    // Check if the pathname is in special paths
    if (specialPaths[pathname]) {
        items.push(
            {
                title: specialPaths[pathname],
                path: pathname,
            }
        )
    } else {
        for (let i = 0; i < pathnames.length; i++) {
            const pathname = pathnames[i]
            
            // Se o segmento for somente números, junta com o item anterior
            if (/^\d+$/.test(pathname!)) {
            if (items.length > 0) {
                // Atualiza o título do último item, concatenando com um espaço e o número
                (items[items.length - 1]!.title as string) += ` ${pathname}`
                // Atualiza a URL (href) do último item, adicionando o número
                items[items.length - 1]!.href += `/${pathname}`
            } else {
                // Caso não haja item anterior, cria um novo (cuidado: cenário incomum)
                items.push({
                title: pathname,
                path: `/${pathname}`,
                })
            }
            } else {
            // Trata o segmento normalmente:
            // Aplica tradução se disponível, senão capitaliza a primeira letra
            const title = translations[pathname!.toLowerCase()] ?? (pathname!.charAt(0).toUpperCase() + pathname!.slice(1))
            // Constrói a URL (href) até o segmento atual
            const href = '/' + pathnames.slice(0, i + 1).join('/')
            items.push({ title, href })
            }
        }
    }

      items[items.length - 1]!.href = undefined

      return [...breadcrumbDashboard, ...items]
}

export default function CustomBreadcrumb() {
    const pathname = usePathname()
    if (!pathname) return null

    // Check if the path is the dashboard, if so, don't show the breadcrumb
    if (pathname === '/') {
        return null
    }

    return (
        <div id = 'breadcrumb'>
            <Breadcrumb itemRender={itemRender} items={generateBreadcrumbItems(pathname)} style={{padding: 24}}/>
            <Divider style={{margin: 0}}/>
        </div>
    )
}

