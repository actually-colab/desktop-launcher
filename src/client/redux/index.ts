import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import kernel, { KernelState } from './kernel';

/**
 * The type of the combined reducer
 */
export type ReduxState = {
  kernel: KernelState;
};

/**
 * The combined redux store
 */
export const reducers = combineReducers({
  kernel,
});

/**
 * The combined redux store with support for async actions
 */
export default createStore(reducers, applyMiddleware(ReduxThunk));
