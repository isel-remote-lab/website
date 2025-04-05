"use client";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "antd";

export default function LogoSwitch() {
  const [hovered, setHovered] = useState(false);

  return (
    <Tooltip title="Pesquisar">
      <Link
        href="/search"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "flex", alignItems: "center" }}
      >
        {hovered ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SearchOutlined style={{ fontSize: "125%" }} />
          </div>
        ) : (
          <Image src="/logo.svg" alt="RL" width={40} height={40} />
        )}
      </Link>
    </Tooltip>
  );
}
