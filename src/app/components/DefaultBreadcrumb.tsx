import { Breadcrumb, Divider } from "antd"
import { type BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb"

/**
 * The breadcrumb item for the dashboard
 * @type {Breadcrumb.Item}
 */
const breadcrumbDashboard: BreadcrumbItemType[] = [
    {
        title: 'Dashboard',
        href: '/',
    }
]

/**
 * The default breadcrumb component props
 */
interface DefaultBreadcrumbProps {
    current: BreadcrumbItemType
}

export default function DefaultBreadcrumb({ current }: DefaultBreadcrumbProps) {
    return (
        <div id = 'breadcrumb'>
            <Breadcrumb items={[...breadcrumbDashboard, current]} />
            <Divider />
        </div>
    )
}

