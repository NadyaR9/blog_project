import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entites/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entites/Profile';
import { LoginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { ReducerList } from '../lib/components';

const defaultAsyncReducers: ReducerList = {
  loginForm: LoginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducerList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
