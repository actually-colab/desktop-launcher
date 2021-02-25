import { StdoutMessage } from '../../../shared/types/ipc';

import { KernelActionTypes, KERNEL_GATEWAY, KERNEL_PROCESS } from '../../types/redux/kernel';

/**
 * Handle the kernel process starting with a PID
 */
export const kernelProcessStart = (pid: number, version: string): KernelActionTypes => ({
  type: KERNEL_PROCESS.START,
  pid,
  version,
});

/**
 * Handle the kernel process messages to stdout
 */
export const kernelProcessStdout = (message: StdoutMessage): KernelActionTypes => ({
  type: KERNEL_PROCESS.STDOUT,
  message,
});

/**
 * Set the kernel gateway uri
 */
export const setKernelGateway = (uri: string): KernelActionTypes => ({
  type: KERNEL_GATEWAY.SET,
  uri,
});
