"use client"

import { LaboratoryFields, type LaboratoryResponse } from "~/types/laboratory";

import { useEffect, useRef, useState } from 'react'

let websocketURI: string

export default function LabInfo({ [LaboratoryFields.NAME]: name }: LaboratoryResponse) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminal = useRef<any>(null)
  const socket = useRef<WebSocket | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const isInitialized = useRef(false)

  useEffect(() => {

    if (isInitialized.current) return

    const initTerminal = async () => {
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
          websocketURI = "ws://localhost:1906"

          const { Terminal } = await import('@xterm/xterm')

          console.log(websocketURI)     
          console.log('Creating terminal instance')
          terminal.current = new Terminal()
          
          console.log('Opening terminal')
          terminal.current.open(terminalRef.current)
          
          // Initialize WebSocket connection
          initWebSocket()
          
          setIsLoaded(true)
          console.log('Terminal opened successfully')
          
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
      console.log('Creating WebSocket connection')
      socket.current = new WebSocket(websocketURI)
      
      socket.current.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
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
        console.log('WebSocket disconnected')
        setIsConnected(false)
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
        console.log('Disposing terminal')
        terminal.current.dispose()
      }
    }
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <span>Terminal Status: {isLoaded ? 'Loaded' : 'Loading...'}</span>
        <span style={{ marginLeft: '20px' }}>
          Connection: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </span>
      </div>
      <div 
        ref={terminalRef} 
        style={{
          border: '1px solid #ccc',
          backgroundColor: '#000'
        }} 
      />
    </div>
  )
}