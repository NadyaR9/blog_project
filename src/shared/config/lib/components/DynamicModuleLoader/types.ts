import { StateSchema, StateSchemaKyes } from 'app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';

export type ReducerList = {
  [name in StateSchemaKyes]?: Reducer<NonNullable<StateSchema[name]>>
}
