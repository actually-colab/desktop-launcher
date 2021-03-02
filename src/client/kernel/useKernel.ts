import { ipcRenderer, IpcRendererEvent } from 'electron';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { IpcKernelProcessPayload, IPC_KERNEL_PROCESS_CHANNEL } from '../../shared/types/ipc';

import { sendKernelProcessToMain } from '../utils/ipc';
import { ReduxState } from '../redux';
import { _kernel } from '../redux/actions';
import { extractGatewayUri } from './jupyter';

/**
 * Hook to connect to a kernel
 */
const useKernel = () => {
  const kernelPid = useSelector((state: ReduxState) => state.kernel.kernelPid);

  const dispatch = useDispatch();

  /**
   * Kernel Process IPC listener
   */
  const ipcKernelListener = React.useCallback(
    (_: IpcRendererEvent, data: IpcKernelProcessPayload) => {
      switch (data.type) {
        case 'start': {
          console.log('Received kernel process id', data);

          if ((data.pid ?? -1) !== -1) {
            // Update the kernel PID
            dispatch(_kernel.kernelProcessStart(data.pid, data.version));
          }
          break;
        }
        case 'end': {
          console.log('Kernel process was killed', data);

          dispatch(_kernel.kernelProcessStart(-1, ''));
          break;
        }
        case 'stdout': {
          console.log('Received kernel process stdout', data);

          const uri = extractGatewayUri(data.message);

          if (uri) {
            console.log('Found gateway URI', uri);

            // Update the gateway uri
            dispatch(_kernel.setKernelGateway(uri));
          }

          // Log the message to kernel outputs
          const messagePieces = data.message.split('\n');

          for (const piece of messagePieces) {
            if (piece.startsWith('[')) {
              dispatch(
                _kernel.kernelProcessStdout({
                  ...data,
                  message: piece,
                  dateString: format(data.date, 'Pp'),
                })
              );

              break;
            }
          }

          break;
        }
        default:
          break;
      }
    },
    [dispatch]
  );

  /**
   * Manage the kernel process IPC listener
   */
  React.useEffect(() => {
    // Notify main that client is ready to connect
    if (kernelPid === -1) {
      console.log('Notifying main process client is ready');
      sendKernelProcessToMain({
        type: 'ready',
      });
    }

    ipcRenderer.on(IPC_KERNEL_PROCESS_CHANNEL, ipcKernelListener);

    return () => {
      ipcRenderer.removeListener(IPC_KERNEL_PROCESS_CHANNEL, ipcKernelListener);
    };
  }, [ipcKernelListener, kernelPid]);

  return null;
};

export default useKernel;
