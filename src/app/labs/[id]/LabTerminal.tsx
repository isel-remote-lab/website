"use client"

import { useEffect, useRef } from 'react'
import type { Terminal as XTermTerminal } from '@xterm/xterm'

interface LabTerminalProps {
  websocketURI: string
}

export default function LabTerminal(props: LabTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminal = useRef<XTermTerminal | null>(null)
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

          // Set white background and black text
          terminal.current = new Terminal({
            theme: {
              background: '#ffffff',
              foreground: '#000000',
            },
            cursorBlink: true, // Cursor should blink
            cursorStyle: 'block', // Block cursor for visibility
          })
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
          const message = JSON.parse(event.data) as { type: string, data: string }
          if (message.type === 'output' && terminal.current) {
            terminal.current.write(String(message.data))
          }
        } catch {
          // If it's not JSON, treat as raw data
          if (terminal.current) {
            terminal.current.write(typeof event.data === 'string' ? event.data : String(event.data))
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

    void initTerminal()

    return () => {
      if (socket.current) {
        socket.current.close()
      }
      if (terminal.current) {
        terminal.current.dispose()
      }
    }
  }, [props.websocketURI])

  return (
    <div>
      <div ref={terminalRef}/>
    </div>
  )
}