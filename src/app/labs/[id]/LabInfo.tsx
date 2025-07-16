"use client"

import { useEffect, useState } from "react";
import { Card, Result, Typography } from "antd";
import { Uris } from "~/server/services/uris";
import LabTerminal from "./LabTerminal";
import { useRouter } from "next/navigation";
import { useNotifications } from "~/hooks/useNotifications";
import DefaultPage from "~/app/components/defaults/DefaultPage";

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
  const { contextHolder, showError, showInfo } = useNotifications();
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
      showError({
        message: "Erro ao conectar",
        description: "Erro ao conectar ao laboratório, por favor tente novamente mais tarde.",
        onClose: () => router.refresh(),
        onClick: () => router.push("/")
      })
      sse.close()
    }

    // Waiting queue messages
    sse.addEventListener("waitingQueue", (event: MessageEvent) => {
      const data = JSON.parse(event.data) as { waitingQueuePos: number };
      setWaitingQueuePos(data.waitingQueuePos);
    })

    // Lab session starting messages
    sse.addEventListener("labSessionStarting", (event: MessageEvent) => {
      const data = JSON.parse(event.data) as { hwIpAddress: string };
      const hwIpAddress = data.hwIpAddress;
      const websocketURI = `ws://${hwIpAddress}/ws`;
      setWebsocketURI(websocketURI);
    })
    
    // New messages with the remaining time
    sse.addEventListener("message", (event: MessageEvent) => {
      const data = JSON.parse(event.data) as RemainingTimeData;
      const timeUnit = data.timeUnit.toLowerCase()
      
      // Translate time units to Portuguese
      let timeText = ""
      if (timeUnit === "minutes" || timeUnit === "minute") {
        timeText = data.remainingTime === 1 ? "minuto" : "minutos"
      } else if (timeUnit === "seconds" || timeUnit === "second") {
        timeText = data.remainingTime === 1 ? "segundo" : "segundos"
      } else if (timeUnit === "hours" || timeUnit === "hour") {
        timeText = data.remainingTime === 1 ? "hora" : "horas"
      } else {
        // Fallback to original logic if unit is not recognized
        timeText = data.remainingTime === 1 ? timeUnit.slice(0, -1) : timeUnit
      }
      
      setTimeText(timeText)
      
      setRemainingTime(data.remainingTime)

      switch (data.type) {
        case "session_warning":
          if (data.remainingTime > 0) {
            showInfo({
              message: "Aviso de tempo de sessão",
              description: `A sessão irá terminar em ${data.remainingTime} ${timeText}. Não saia ou recarregue a página.`
            });
            setWaitingQueuePos(0)
          } else {
            showError({
              message: "Sessão encerrada",
              description: "A sessão foi encerrada"
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
  }, [showError, showInfo, id, router])

  return (
    <>
      {contextHolder}
      {waitingQueuePos > 0 ? (
        <DefaultPage>
          <Result
            status="info"
            title="Está na fila de espera"
            subTitle={`Está na fila de espera na posição ${waitingQueuePos}. Por favor aguarde e não saia ou recarregue a página.`}
          />
        </DefaultPage>
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