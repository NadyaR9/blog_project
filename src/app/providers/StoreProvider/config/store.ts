import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entites/Counter';
import { userReducer } from 'entites/User';
import { LoginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: LoginReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducer,
    devTools: __DEV__,
    preloadedState: initialState,
  });
}
