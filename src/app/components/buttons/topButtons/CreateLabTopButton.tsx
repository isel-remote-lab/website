"use client";

import { AppstoreAddOutlined, FileAddOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { useTempRole } from "~/contexts/TempRoleContext";
import { Role } from "~/types/role";

export default function CrateLabTopButton() {
  const { tempRole } = useTempRole();

  return (
    <>
      {
        /* If the user is watching the page as a teacher, show the create lab option */
        tempRole === Role.TEACHER && (
          <div style={{ position: "relative", zIndex: 1 }}>
            <Tooltip
              title="Criar laboratório"
              placement="bottom"
              mouseEnterDelay={0.5}
              styles={{ root: { zIndex: 1000 } }}
            >
              <Link href="/labs/create">
                <AppstoreAddOutlined style={{ fontSize: "125%" }} />
              </Link>
            </Tooltip>
          </div>
        )
      }
    </>
  );
}
