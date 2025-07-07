"use client"

import { useEffect, useState } from "react";
import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { Uris } from "~/server/services/uris";
import LabTerminal from "./LabTerminal";
import Text from "antd/es/typography/Text";
import { useRouter } from "next/navigation";

interface LabInfoProps {
  id: string
}

interface RemainingTimeData {
  eventId: number;
  type: string;
  remainingTime: number;
  timeUnit: string;
}

export default function LabInfo({ id }: LabInfoProps) {
  const [websocketURI, setWebsocketURI] = useState<string>("")
  const [api, contextHolder] = notification.useNotification()
  const [remainingTime, setRemainingTime] = useState<number>(0)
  const [timeText, setTimeText] = useState<string>("")
  const [waitingQueuePos, setWaitingQueuePos] = useState<number>(0)
  const router = useRouter()
  
  useEffect(() => {
    const sse = new EventSource(Uris.LabSession.LAB_SESSION.replace("{id}", id), {
      withCredentials: true,
    })
  
    // On error, show an error notification
    sse.onerror = () => {
      api.error({
        message: "Error",
        description: "Error connecting to the lab session, please try again later",
        placement: "top",
        onClose: () => router.push("/")
      })
      sse.close()
    }

    // Waiting queue messages
    sse.addEventListener("waitingQueue", (event) => {
      const data = JSON.parse(event.data)
      setWaitingQueuePos(data.waitingQueuePos)
    })

    // Lab session starting messages
    sse.addEventListener("labSessionStarting", (event) => {
      const data = JSON.parse(event.data)
      const hwIpAddress = data.hwIpAddress
      const websocketURI = `ws://${hwIpAddress}/ws`
      setWebsocketURI(websocketURI)
    })
    
    // New messages with the remaining time
    sse.addEventListener("message", (event) => {
      try {
        const data: RemainingTimeData = JSON.parse(event.data)
        const timeUnit = data.timeUnit.toLowerCase()
        const timeText = data.remainingTime === 1 ? timeUnit.slice(0, -1) : timeUnit
        setTimeText(timeText)
        
        const messageArgs = {
          placement: "top" as NotificationPlacement,
        }

        setRemainingTime(data.remainingTime)

        switch (data.type) {
          case "session_warning":
            api.info({
              message: "Session Time Warning",
              description: `Your lab session will end in ${data.remainingTime} ${timeText}`,
              duration: 5,
              ...messageArgs
            });
            break;
          case "session_ending":
            /*api.warning({
              message: "Session Ending Soon",
              description: `Your lab session will end in ${data.remainingTime} ${timeText}`,
              ...messageArgs
            });*/
            break;
          case "session_ended":
            api.error({
              message: "Session Ended",
              description: "Your lab session has ended",
              ...messageArgs
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error parsing message data:", error)
      }
    })

    return () => {
      sse.close()
    }
  }, [api])

  return (
    <>
      {contextHolder}
      {waitingQueuePos > 0 ? <Text>You are on the waiting queue on position {waitingQueuePos}</Text> :
        <>
          {remainingTime > 0 && <Text>Remaining time: {remainingTime} {timeText}</Text>}
          {websocketURI && <LabTerminal websocketURI={websocketURI} />}
        </>
      }
    </>
  )
}