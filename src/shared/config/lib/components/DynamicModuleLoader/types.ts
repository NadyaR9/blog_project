import { Reducer } from '@reduxjs/toolkit';
import { StateSchema, StateSchemaKyes } from '@/app/providers/StoreProvider';

export type ReducerList = {
  [name in StateSchemaKyes]?: Reducer<NonNullable<StateSchema[name]>>
}
