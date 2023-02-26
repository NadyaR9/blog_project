import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entites/Counter';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      counter: counterReducer,
    },
    devTools: __DEV__,
    preloadedState: initialState,
  });
}
