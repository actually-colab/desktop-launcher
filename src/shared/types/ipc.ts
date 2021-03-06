type IpcKernelProcessReady = {
  type: 'ready';
};

type IpcKernelProcessStart = {
  type: 'start';
  pid: number;
  version: string;
  token: string;
};

type IpcKernelProcessEnd = {
  type: 'end';
  pid: number;
};

type IpcKernelProcessRequestNewToken = {
  type: 'new-token';
};

export type StdoutMessage = {
  id: number;
  message: string;
  date: Date;
  dateString?: string;
};

type IpcKernelProcessStdout = {
  type: 'stdout';
} & StdoutMessage;

/**
 * The channel for kernel process messages. These messages can be sent from the kernel to the main process as well as from the main process to the client
 */
export const IPC_KERNEL_PROCESS_CHANNEL = 'kernel-process';
/**
 * The payload for the kernel process
 */
export type IpcKernelProcessPayload =
  | IpcKernelProcessReady
  | IpcKernelProcessStart
  | IpcKernelProcessEnd
  | IpcKernelProcessRequestNewToken
  | IpcKernelProcessStdout;

type IpcMainToKernelRequestClose = {
  type: 'request-close';
};

/**
 * The channel for communicating from the main process to the kernel process
 */
export const IPC_MAIN_TO_KERNEL_CHANNEL = 'main-to-kernel';
/**
 * The payload for the main-to-kernel channel
 */
export type IpcMainToKernelPayload = IpcMainToKernelRequestClose;
