import { useEffect, useRef } from 'react';
import type { Terminal as XTermTerminal } from '@xterm/xterm';

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let terminal: XTermTerminal | null = null;
    let disposed = false;

    const loadTerminal = async () => {
      const { Terminal } = await import('@xterm/xterm');
      if (terminalRef.current && !disposed) {
        terminal = new Terminal();
        terminal.open(terminalRef.current);
      }
    };

    loadTerminal();

    return () => {
      disposed = true;
      if (terminal) terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: 400 }} />;
}