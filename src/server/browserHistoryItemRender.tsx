import { Tooltip } from "antd";
import { type ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Link from "next/link";

export const itemRender = (route: ItemType, _params: unknown, routes: ItemType[], _paths: string[]): React.ReactNode => {
    const isLast = routes.indexOf(route) === routes.length - 1
    if (route.path === undefined) {
        return <span>{route.title}</span>;
    }

    const titleLowerCase = String(route.title as string).toLowerCase();

    return isLast ? (
      <span>{route.title}</span>
    ) : (
      <Tooltip title={`Ir para ${titleLowerCase}`}>
        <Link href={route.path}>{route.title}</Link>
      </Tooltip>
    );
};