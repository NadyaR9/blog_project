import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entites/Article';
import { CounterSchema } from 'entites/Counter';
import { ProfileSchema } from 'entites/Profile';
import { UserSchema } from 'entites/User';
import { AddNewCommentSchema } from 'features/AddNewComment';
import { LoginSchema } from 'features/AuthByUsername';
import { ScrollSaverSchema } from 'features/ScrollSaver';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
  scrollSaver: ScrollSaverSchema,
  counter: CounterSchema,
  user: UserSchema,
  loginForm?: LoginSchema,
  profile?: ProfileSchema,
  articleDetails?: ArticleDetailsSchema,
  articleDetailsComments?: ArticleDetailsCommentsSchema,
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
