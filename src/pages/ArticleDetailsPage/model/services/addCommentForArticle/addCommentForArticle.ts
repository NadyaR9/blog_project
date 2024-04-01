import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkApi;
  try {
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
      return rejectWithValue('errorAddComment');
    }
    const response = await extra.api.post<Comment>('/comments', {
      articleId: article.id,
      userId: userData.id,
      text,
    });

    if (!response.data) {
      throw new Error();
    }

    dispatch(fetchCommentsByArticleId(article.id));

    return response.data;
  } catch (e) {
    return rejectWithValue('errorAddComment');
  }
});
