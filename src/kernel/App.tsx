import React from 'react';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { nanoid } from 'nanoid';

import { ALLOWED_ORIGIN } from '../shared/constants/client';
import { getGatewayVersion, installGateway } from './system/jupyter';
import { sendKernelProcessToMain } from './utils/ipc';
/**
 * The kernel process renderer's entry point
 */
const EntryPoint: React.FC = () => {
  const kernelProcess = React.useRef<ChildProcessWithoutNullStreams | null>(null);
  const [gatewayVersion, setGatewayVersion] = React.useState<string>('');
  const [pid, setPid] = React.useState<number>(-1);
  const [kernelError, setKernelError] = React.useState<string>('');

  /**
   * Manage the kernel process main event loop
   */
  const startKernelProcess = React.useCallback(async () => {
    if (kernelProcess.current !== null) {
      return;
    }

    // Check if the kernel gateway is available
    let version = await getGatewayVersion();
    setGatewayVersion(version ?? 'Unknown');

    console.log('Kernel gateway version:', version);

    if (!version) {
      version = await installGateway();
      setGatewayVersion(version ?? 'Install failed');

      console.log('Kernel gateway installed version', version);
    }

    if (!version) {
      console.log('Failed to install kernel gateway');
      return;
    }

    try {
      // Generate a random token for the notebook server
      const token = nanoid();

      // Spawn the kernel gateway
      kernelProcess.current = spawn('jupyter', [
        'notebook',
        '--NotebookApp.open_browser=False',
        `--NotebookApp.allow_origin=${ALLOWED_ORIGIN}`,
        `--NotebookApp.token=${token}`,
      ]);

      let messageId = 0;

      const messageHandler = (message: string) => {
        console.log('Kernel:', { message });

        sendKernelProcessToMain({
          type: 'stdout',
          id: messageId,
          message,
          date: new Date(),
        });

        messageId++;
      };

      kernelProcess.current.stderr.setEncoding('utf-8');
      kernelProcess.current.stderr.on('data', messageHandler);
      kernelProcess.current.stdout.setEncoding('utf-8');
      kernelProcess.current.stdout.on('data', messageHandler);

      // Notify main process the kernel is ready
      console.log('Kernel gateway started', kernelProcess.current.pid);

      setPid(kernelProcess.current.pid);
      sendKernelProcessToMain({
        type: 'start',
        pid: kernelProcess.current.pid,
        version,
        token,
      });

      kernelProcess.current.on('close', () => {
        // Notify main process the kernel is closed to safely exit
        console.log('Kernel gateway closed');
        sendKernelProcessToMain({
          type: 'end',
          pid: kernelProcess.current?.pid ?? -1,
        });
      });
    } catch (error) {
      console.error(error);
      setKernelError(error.message);
    }
  }, []);

  /**
   * Manage the kernel process
   */
  React.useEffect(() => {
    startKernelProcess();
  }, [startKernelProcess]);

  return (
    <div>
      <pre>gateway_version: {gatewayVersion}</pre>
      <pre>kernel_pid: {pid}</pre>
      <pre>error: {kernelError}</pre>
    </div>
  );
};

export default function App() {
  return <EntryPoint />;
}
