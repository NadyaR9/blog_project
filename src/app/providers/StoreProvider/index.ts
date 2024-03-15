import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';

export type { AppDispatch } from './config/store';
export type {
  StateSchema, StateSchemaKyes, ReduxStoreWithManager, ThunkExtraArg, ThunkConfig,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
};
