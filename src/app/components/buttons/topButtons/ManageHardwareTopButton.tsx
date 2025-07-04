"use client";

import { LaptopOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { useTempRole } from "~/contexts/TempRoleContext";
import { Role } from "~/types/role";

export default function ManageHardwareTopButton() {
  const { tempRole } = useTempRole();

  return (
    <>
      {
        /* If the user is watching the page as a teacher, show the manage hardware option */
        tempRole === Role.TEACHER && (
          <div style={{ position: "relative", zIndex: 1 }}>
            <Tooltip
              title="Gerir hardware"
              placement="bottom"
              mouseEnterDelay={0.5}
              styles={{ root: { zIndex: 1000 } }}
            >
              <Link href="/hardware">
                <LaptopOutlined style={{ fontSize: "125%" }} />
              </Link>
            </Tooltip>
          </div>
        )
      }
    </>
  );
}
