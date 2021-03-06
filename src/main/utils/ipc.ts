import { BrowserWindow } from 'electron';

import {
  IpcKernelProcessPayload,
  IpcMainToKernelPayload,
  IPC_KERNEL_PROCESS_CHANNEL,
  IPC_MAIN_TO_KERNEL_CHANNEL,
} from '../../shared/types/ipc';

/**
 * Send an IPC kernel payload to the kernel process from the main process
 */
export const sendToKernelProcess = (window: BrowserWindow | null, payload: IpcMainToKernelPayload) => {
  window?.webContents.send(IPC_MAIN_TO_KERNEL_CHANNEL, payload);
};

/**
 * Send an IPC kernel payload to the client process from the main process
 */
export const sendKernelProcessToClient = (window: BrowserWindow | null, payload: IpcKernelProcessPayload) => {
  window?.webContents.send(IPC_KERNEL_PROCESS_CHANNEL, payload);
};
