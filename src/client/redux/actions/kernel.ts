import { StdoutMessage } from '../../../shared/types/ipc';

import { KernelActionTypes, KERNEL_GATEWAY, KERNEL_PROCESS } from '../../types/redux/kernel';
import { sendKernelProcessToMain } from '../../utils/ipc';

/**
 * Handle the kernel process starting with a PID
 */
export const kernelProcessStart = (pid: number, version: string, token: string): KernelActionTypes => ({
  type: KERNEL_PROCESS.START,
  pid,
  version,
  token,
});

/**
 * Handle the kernel process messages to stdout
 */
export const kernelProcessStdout = (message: StdoutMessage): KernelActionTypes => ({
  type: KERNEL_PROCESS.STDOUT,
  message,
});

/**
 * Request a new token be generated
 */
export const kernelProcessRequestNewToken = (): KernelActionTypes => {
  sendKernelProcessToMain({
    type: 'new-token',
  });

  return {
    type: KERNEL_PROCESS.REQUEST_NEW_TOKEN,
  };
};

/**
 * Set the kernel gateway uri
 */
export const setKernelGateway = (uri: string): KernelActionTypes => ({
  type: KERNEL_GATEWAY.SET,
  uri,
});
