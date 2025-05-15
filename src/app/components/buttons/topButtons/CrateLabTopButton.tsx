"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { useTempRole } from "~/contexts/TempRoleContext";

interface CrateLabTopButtonProps {
  role: string;
}

export default function CrateLabTopButton({ role }: CrateLabTopButtonProps) {
  const { tempRole } = useTempRole();

  return (
    <>
      {
        /* If the user is watching the page as a teacher, show the create lab option */
        tempRole === "teacher" && (
          <div style={{ position: "relative", zIndex: 1 }}>
            <Tooltip
              title="Criar laboratório"
              placement="bottom"
              mouseEnterDelay={0.5}
              styles={{ root: { zIndex: 1000 } }}
            >
              <Link href="/labs/create">
                <PlusOutlined style={{ fontSize: "125%" }} />
              </Link>
            </Tooltip>
          </div>
        )
      }
    </>
  );
}
