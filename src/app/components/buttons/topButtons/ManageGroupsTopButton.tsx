"use client";

import { TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { useTempRole } from "~/contexts/TempRoleContext";
import { Role } from "~/types/role";

export default function ManageGroupsTopButton() {
  const { tempRole } = useTempRole();

  return (
    <>
      {
        /* If the user is watching the page as a teacher, show the manage groups option */
        tempRole === Role.TEACHER && (
          <div style={{ position: "relative", zIndex: 1 }}>
            <Tooltip
              title="Gerir grupos"
              placement="bottom"
              mouseEnterDelay={0.5}
              styles={{ root: { zIndex: 1000 } }}
            >
              <Link href="/groups">
                <TeamOutlined style={{ fontSize: "125%" }} />
              </Link>
            </Tooltip>
          </div>
        )
      }
    </>
  );
}
