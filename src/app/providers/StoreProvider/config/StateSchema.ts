import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entites/Counter';
import { UserSchema } from 'entites/User';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
  counter: CounterSchema,
  user: UserSchema,
  loginForm?: LoginSchema,
}

export type StateSchemaKyes = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>,
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
  add: (key: StateSchemaKyes, reducer: Reducer) => void,
  remove: (key: StateSchemaKyes) => void,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager,
}
