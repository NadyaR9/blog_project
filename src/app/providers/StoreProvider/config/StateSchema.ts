import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AddNewCommentSchema } from '@/features/AddNewComment';
import { LoginSchema } from '@/features/AuthByUsername';
import { ScrollSaverSchema } from '@/features/ScrollSaver';
import { ProfileSchema } from '@/features/editableProfileCard';
import { ArticlesDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
  scrollSaver: ScrollSaverSchema,
  counter: CounterSchema,
  user: UserSchema,
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>,

  loginForm?: LoginSchema,
  profile?: ProfileSchema,
  articleDetails?: ArticleDetailsSchema,
  articleDetailsPage?: ArticlesDetailsPageSchema,
  addNewComment?: AddNewCommentSchema,
  articles?: ArticlesPageSchema,
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

export interface ThunkExtraArg {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArg,
  state: StateSchema,
}
