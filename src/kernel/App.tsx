import { ipcRenderer, IpcRendererEvent } from 'electron';
import React from 'react';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { nanoid } from 'nanoid';

import { ALLOWED_ORIGIN } from '../shared/constants/client';
import { IpcKernelProcessPayload, IPC_KERNEL_PROCESS_CHANNEL } from '../shared/types/ipc';
import { promiseExec } from '../shared/system/process';
import { getGatewayVersion, installGateway } from './system/jupyter';
import { sendKernelProcessToMain } from './utils/ipc';
/**
 * The kernel process renderer's entry point
 */
const EntryPoint: React.FC = () => {
  const kernelProcess = React.useRef<ChildProcessWithoutNullStreams | null>(null);
  const kernelProcessStatus = React.useRef<'starting' | ''>('');
  const kernelProcessWaitingForToken = React.useRef<boolean>(false);
  const kernelProcessMessageIndex = React.useRef<number>(0);
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

    kernelProcessStatus.current = 'starting';

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
      // Check for a saved token for the notebook server
      let token = localStorage.getItem('jupyter-token');

      // If no token is found, generate and save it
      if (!token) {
        token = nanoid();
        localStorage.setItem('jupyter-token', token);
      }

      // Spawn the kernel gateway
      kernelProcess.current = spawn('jupyter', [
        'notebook',
        '--NotebookApp.open_browser=False',
        `--NotebookApp.allow_origin_pat="${ALLOWED_ORIGIN.source}"`,
        `--NotebookApp.token="${token}"`,
      ]);

      const messageHandler = (message: string) => {
        console.log('Kernel:', { message });

        sendKernelProcessToMain({
          type: 'stdout',
          id: kernelProcessMessageIndex.current,
          message,
          date: new Date(),
        });

        kernelProcessMessageIndex.current++;
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

        kernelProcess.current = null;
      });

      kernelProcessStatus.current = '';
    } catch (error) {
      console.error(error);
      setKernelError(error.message);
    }
  }, []);

  /**
   * Kernel Process IPC listener
   */
  const ipcKernelListener = React.useCallback(
    async (_: IpcRendererEvent, data: IpcKernelProcessPayload) => {
      switch (data.type) {
        case 'new-token': {
          console.log('New token request received');

          // Verify that there is no ongoing action to wait for
          if (kernelProcessStatus.current !== '') {
            kernelProcessWaitingForToken.current = true;
            break;
          }

          // Kill the existing process
          if (kernelProcess.current !== null) {
            await promiseExec('jupyter notebook stop');
          }

          // Generate a new token
          localStorage.setItem('jupyter-token', nanoid());

          // Restart the kernel process
          startKernelProcess();
          break;
        }
        default:
          break;
      }
    },
    [startKernelProcess]
  );

  /**
   * Manage the kernel process
   */
  React.useEffect(() => {
    ipcRenderer.on(IPC_KERNEL_PROCESS_CHANNEL, ipcKernelListener);

    startKernelProcess();

    return () => {
      ipcRenderer.removeListener(IPC_KERNEL_PROCESS_CHANNEL, ipcKernelListener);
    };
  }, [ipcKernelListener, startKernelProcess]);

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
