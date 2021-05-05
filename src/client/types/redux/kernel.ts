import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StdoutMessage } from '../../../shared/types/ipc';

export const KERNEL_PROCESS = {
  START: 'KERNEL_PROCESS_START',
  STDOUT: 'KERNEL_PROCESS_STDOUT',
} as const;
export const KERNEL_GATEWAY = {
  SET: 'SET_KERNEL_GATEWAY',
} as const;

type ActionError = {
  error: {
    message: string;
  };
};

type KernelProcessStartAction = {
  type: typeof KERNEL_PROCESS.START;
  pid: number;
  version: string;
  token: string;
};

type KernelProcessStdoutAction = {
  type: typeof KERNEL_PROCESS.STDOUT;
  message: StdoutMessage;
};

type SetKernelGatewayAction = {
  type: typeof KERNEL_GATEWAY.SET;
  uri: string;
};

/**
 * An action for manipulating the editor redux store
 */
export type KernelActionTypes = KernelProcessStartAction | KernelProcessStdoutAction | SetKernelGatewayAction;

/**
 * An asynchronous action for manipulating the editor redux store
 */
export type KernelAsyncActionTypes = ThunkAction<void, unknown, unknown, Action<string>>;
