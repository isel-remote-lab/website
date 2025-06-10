"use client";

import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";

interface DefaultDrawerProps {
  title?: string | null;
  children?: React.ReactNode | null;
  open?: boolean;
  onClose?: () => void;
}

const drawerOptions: DrawerProps = {
  placement: "right",
  width: 600,
  closable: true,
};

/**
 * Default drawer component
 * @param {DefaultDrawerProps} props - The default drawer props
 * @param {React.ReactNode} [props.children] - The drawer content
 * @returns The default drawer component
 */
export default function DefaultDrawer({
  title = null,
  children = null,
  open = false,
  onClose = () => {},
}: DefaultDrawerProps) {
  return (
    <Drawer
        placement={drawerOptions.placement}
        title={title}
        onClose={onClose}
        open={open}
        width={drawerOptions.width}
        closable={drawerOptions.closable}
      >
        {children}
      </Drawer>
  );
}
