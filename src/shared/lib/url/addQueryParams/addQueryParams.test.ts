import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
  test('test single param', () => {
    const params = getQueryParams({ sort: 'sort' });
    expect(params).toBe('?sort=sort');
  });
  test('test multiple params', () => {
    const params = getQueryParams({ sort: 'sort', test: 'value' });
    expect(params).toBe('?sort=sort&test=value');
  });
  test('test undefined param', () => {
    const params = getQueryParams({ sort: 'sort', test: undefined });
    expect(params).toBe('?sort=sort');
  });
});
