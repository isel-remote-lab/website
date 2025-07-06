"use client"

import { useEffect, useState } from "react";
import { Uris } from "~/server/services/uris";
import LabTerminal from "./LabTerminal";

interface LabInfoProps {
  id: string
}

export default function LabInfo({ id }: LabInfoProps) {
  const [websocketURI, setWebsocketURI] = useState<string>("")

  useEffect(() => {
    const sse = new EventSource(Uris.LabSession.LAB_SESSION.replace("{id}", id), {
      withCredentials: true,
    })

    sse.addEventListener("labSessionStarting", (event) => {
      console.log("labSessionStarting", event)
      const data = JSON.parse(event.data)
      setWebsocketURI(data.websocketURI)
    })

    return () => {
      sse.close()
    }
  }, [])

  return (
    <div>
      <LabTerminal websocketURI={websocketURI} />
    </div>
  )
}