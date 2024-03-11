import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleSortField, ArticleTypes, ArticleView } from 'entites/Article';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticles } from '../fetchArticles/fetchArticles';

jest.mock('../fetchArticles/fetchArticles');

describe('fetchNextArticlesPage.test.test', () => {
  test('success request', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        view: ArticleView.SMALL,
        _inited: true,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
        type: ArticleTypes.ALL,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
  });
  test('fetchArticles not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        view: ArticleView.SMALL,
        _inited: true,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
        type: ArticleTypes.ALL,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticles).not.toHaveBeenCalled();
  });
  test('fetchArticles not called cause isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
        view: ArticleView.SMALL,
        _inited: true,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
        type: ArticleTypes.ALL,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticles).not.toHaveBeenCalled();
  });
});
