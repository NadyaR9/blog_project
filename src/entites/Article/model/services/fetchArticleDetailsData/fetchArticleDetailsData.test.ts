import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleDetailsData } from './fetchArticleDetailsData';

const data = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
};

describe('fetchArticleDetailsData.test', () => {
  test('success request', async () => {
    const thunk = new TestAsyncThunk(fetchArticleDetailsData);

    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('faild request', async () => {
    const thunk = new TestAsyncThunk(fetchArticleDetailsData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('123');

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
