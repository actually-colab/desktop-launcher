import { StdoutMessage } from '../../shared/types/ipc';

import { KernelActionTypes, KERNEL_GATEWAY, KERNEL_PROCESS } from '../types/redux/kernel';

/**
 * The kernel redux state
 */
export interface KernelState {
  gatewayUri: string;
  gatewayVersion: string;
  kernelPid: number;
  kernelToken: string;
  kernelStdout: StdoutMessage[];
}

const initialState: KernelState = {
  gatewayUri: '',
  gatewayVersion: '',
  kernelPid: -1,
  kernelToken: '',
  kernelStdout: [],
};

/**
 * The kernel reducer
 */
const reducer = (state = initialState, action: KernelActionTypes): KernelState => {
  switch (action.type) {
    case KERNEL_PROCESS.START: {
      if (state.kernelPid !== -1 && action.pid !== -1) {
        // Don't process duplicate starts
        return state;
      }

      return {
        ...state,
        gatewayVersion: action.version,
        kernelPid: action.pid,
        kernelToken: action.token,
      };
    }
    case KERNEL_PROCESS.STDOUT:
      return {
        ...state,
        kernelStdout: [...state.kernelStdout, action.message].sort((a, b) => a.id - b.id),
      };
    case KERNEL_GATEWAY.SET:
      return {
        ...state,
        gatewayUri: action.uri,
      };
    default:
      return state;
  }
};

export default reducer;
