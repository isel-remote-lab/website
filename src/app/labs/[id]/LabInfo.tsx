"use client"

import { useEffect } from "react";
import { Uris } from "~/server/services/uris";
//import LabTerminal from "./LabTerminal";

interface LabInfoProps {
  id: string
}

export default async function LabInfo({ id }: LabInfoProps) {
  //const websocketURI = "ws://localhost:1906"

  useEffect(() => {
    const sse = new EventSource(Uris.LabSession.CREATE.replace("{id}", id))
    sse.onmessage = (event) => {
      console.log(event.data)
    }

    return () => {
      sse.close()
    }
  }, [])

  return (
    <div>
      {/*<LabTerminal websocketURI={websocketURI} />*/}
    </div>
  )
}