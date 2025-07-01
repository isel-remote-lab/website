"use client"

import LabTerminal from "./LabTerminal";

export default function LabInfo() {
  const websocketURI = "ws://localhost:1906"

  return (
    <div>
      <LabTerminal websocketURI={websocketURI} />
    </div>
  )
}