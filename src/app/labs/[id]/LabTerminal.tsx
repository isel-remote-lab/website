"use client"

import { useEffect, useRef } from 'react'

interface LabTerminalProps {
  websocketURI: string
}

export default function LabTerminal(props: LabTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminal = useRef<any>(null)
  const socket = useRef<WebSocket | null>(null)
  const isInitialized = useRef(false)
  

  useEffect(() => {
    if (isInitialized.current) return

    const initTerminal = async () => {
      const { Terminal } = await import('@xterm/xterm')
      if (terminalRef.current && !terminal.current) {
        try {

          isInitialized.current = true
          
          // Get Hardware from API
          /*const hardwareId = 1
          let response = await fetch("http://nginx:8080/api/v1/hardware/" + hardwareId, {
            headers: {
              "X-API-Key": process.env.API_KEY || ""
            }
          })
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const hardware = await response.json()
          console.log(hardware)
          */

          terminal.current = new Terminal()
          terminal.current.open(terminalRef.current)
          
          // Initialize WebSocket connection
          initWebSocket()
          
          // Handle terminal input - send to WebSocket
          terminal.current.onData((data: string) => {
            if (socket.current && socket.current.readyState === WebSocket.OPEN) {
              socket.current.send(JSON.stringify({
                type: 'input',
                data: data
              }))
            }
          })
          
        } catch (error) {
          console.error('Error creating terminal:', error)
        }
      }
    }

    const initWebSocket = () => {
      socket.current = new WebSocket(props.websocketURI)
      
      socket.current.onopen = () => {
        if (terminal.current) {
          terminal.current.write('\r\nConnected to server\r\n')
        }
      }
      
      socket.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          if (message.type === 'output' && terminal.current) {
            terminal.current.write(message.data)
          }
        } catch (e) {
          // If it's not JSON, treat as raw data
          if (terminal.current) {
            terminal.current.write(event.data)
          }
        }
      }
      
      socket.current.onclose = () => {
        if (terminal.current) {
          terminal.current.write('\r\nDisconnected from server\r\n')
        }
      }
      
      socket.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        if (terminal.current) {
          terminal.current.write('\r\nConnection error\r\n')
        }
      }
    }

    initTerminal()

    return () => {
      if (socket.current) {
        socket.current.close()
      }
      if (terminal.current) {
        terminal.current.dispose()
      }
    }
  }, [])

  return (
    <div>
      <div ref={terminalRef}/>
    </div>
  )
}