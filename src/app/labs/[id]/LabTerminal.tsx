"use client"

import { useEffect, useRef, useState } from 'react'
import type { Terminal as XTermTerminal } from '@xterm/xterm'
import { Terminal } from '@xterm/xterm'

interface LabTerminalProps {
  websocketURI: string
}

export default function LabTerminal(props: LabTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [term, setTerm] = useState<XTermTerminal | null>(null)
  const socket = useRef<WebSocket | null>(null)

  // Create and dispose terminal instance
  useEffect(() => {
    let terminalInstance: XTermTerminal | null = null
    let disposed = false

    const createTerminal = async () => {
      
      terminalInstance = new Terminal({
        theme: {
          background: '#ffffff',
          foreground: '#000000',
          cursor: '#000000'
        },
        cursorBlink: true
      })
      if (!disposed) setTerm(terminalInstance)
    }
    createTerminal()

    return () => {
      disposed = true
      if (terminalInstance) terminalInstance.dispose()
    }
  }, [])

  // Open terminal and handle events
  useEffect(() => {
    if (!term) return

    if (terminalRef.current) {
      term.open(terminalRef.current)
    }

    // WebSocket connection
    socket.current = new WebSocket(props.websocketURI)  
    socket.current.onopen = () => term.write('\r\nConnected to server\r\n')
    socket.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as { type: string, data: string }
        if (message.type === 'output') {
          term.write(String(message.data))
        }
      } catch {
        term.write(typeof event.data === 'string' ? event.data : String(event.data))
      }
    }
    socket.current.onclose = () => term.write('\r\nDisconnected from server\r\n')
    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error)
      term.write('\r\nConnection error\r\n')
    }
  
    // Terminal input handler
    const disposable = term.onData((data) => {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify({ type: 'input', data }))
      }
    })

    return () => {
      disposable.dispose()
      if (socket.current) socket.current.close()
      term.dispose()
    }
  }, [term, props.websocketURI])

  useEffect(() => {
    // Send a "ping" every 60 seconds to keep
    // the WebSocket connection alive (e.g., when behind Cloudflare)
    const pingInterval = setInterval(() => {
      if (socket.current!.readyState === WebSocket.OPEN) {
        socket.current!.send(JSON.stringify({ type: 'ping' }))
      }
    }, 60 * 1000)

    // Clean up the interval when the component unmounts or the socket changes
    return () => clearInterval(pingInterval)
  }, [socket.current])

  return (
    <div>
      <div ref={terminalRef}/>
    </div>
  )
}