"use client"

import { useEffect, useState } from "react";
import { Card, notification, Result, Typography } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { Uris } from "~/server/services/uris";
import LabTerminal from "./LabTerminal";
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
        message: "Erro ao conectar",
        description: "Erro ao conectar ao laboratório, por favor tente novamente mais tarde.",
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
          if (data.remainingTime > 0) {
            api.info({
              message: "Aviso de tempo de sessão",
              description: `A sessão irá terminar em ${data.remainingTime} ${timeText}. Não saia ou recarregue a página.`,
              duration: 5,
              ...messageArgs
            });
            setWaitingQueuePos(0)
          } else {
            api.error({
              message: "Sessão encerrada",
              description: "A sessão foi encerrada",
              ...messageArgs
            });
          }
          break;
        default:
          break;
      }
    })

    return () => {
      sse.close()
    }
  }, [api])

  return (
    <>
      {contextHolder}
      {waitingQueuePos > 0 ? (
        <Result
          status="info"
          title="Está na fila de espera"
          subTitle={`Está na fila de espera na posição ${waitingQueuePos}. Por favor aguarde e não saia ou recarregue a página.`}
        />
      ) :
        <>
          {remainingTime > 0 && (
            <Typography.Title level={5}>Tempo restante: {remainingTime} {timeText}</Typography.Title>
          )}
          {websocketURI && (
            <Card style={{ margin: "auto", padding: 20 }}>
              <LabTerminal websocketURI={websocketURI} />
            </Card>
          )}
        </>
      }
    </>
  )
}