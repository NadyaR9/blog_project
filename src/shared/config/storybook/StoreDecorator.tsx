import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entites/Article/model/slice/articleDetailsSlice';
import { addNewCommentReducer } from '@/features/AddNewComment/model/slices/addNewCommentSlice';
import { LoginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage';
import { profileReducer } from '@/features/editableProfileCard/model/slices/profileSlice';
import { ReducerList } from '../lib/components';

const defaultAsyncReducers: ReducerList = {
  loginForm: LoginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducerList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
