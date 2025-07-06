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

    sse.onmessage = (event) => {
      console.log("New event, event name: ", event.data)
    }

    sse.addEventListener("labSessionStarting", (event) => {
      const data = JSON.parse(event.data)
      const hwIpAddress = data.hwIpAddress
      const websocketURI = `ws://${hwIpAddress}/ws`
      setWebsocketURI(websocketURI)
    })

    return () => {
      sse.close()
    }
  }, [])

  return (
    <div>
      {websocketURI && <LabTerminal websocketURI={websocketURI} />}
    </div>
  )
}