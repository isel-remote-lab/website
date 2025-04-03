import { type ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Link from "next/link";

export const itemRender = (route: ItemType, _params: unknown, routes: ItemType[], _paths: string[]): React.ReactNode => {
    const isLast = routes.indexOf(route) === routes.length - 1
    if (route.path === undefined) {
        return <span>{route.title}</span>;
    }
    return isLast ? (
      <span>{route.title}</span>
    ) : (
      <Link href={route.path}>{route.title}</Link>
    );
};